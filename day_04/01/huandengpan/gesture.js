// - 常用事件
//     - start、move、end  //兼容touch和move
//     - pressstart、pressend，presscancle    //长按
//     - tap  //点击
//     - panstart、pan、panend  // 滑屏
// - 自定义事件
//     - new CustomEvent
//     - elemnt.dispatchEvent

function enableGesture(element) {
    // 存储基础信息
    let contexts = {};
    const mouse_type = Symbol("mouse");
    //看看当前使用环境 是否支持touch类型的事件
    if (!("ontouchstart" in document)) {
        // 不支持支持 mouse类型事件
        element.addEventListener("mousedown", (event) => {
            let move = (event) => {
                const stop = ()=>{
                    event.preventDefault();
                }
                contexts[mouse_type].stop = stop
                onMove(event, contexts[mouse_type]);
            };
            let end = (event) => {
                onEnd(event, contexts[mouse_type]);
                // 结束的时候，要移除mousemove事件
                document.removeEventListener("mousemove", move);
            }
            document.addEventListener("mousemove", move);
            contexts[mouse_type] = {};
            onStart(event, contexts[mouse_type]);
            document.addEventListener("mouseup", end, { once: true });
        });
    }
    element.addEventListener("touchstart", (event) => {
        for (let touch of event.changedTouches) {
            //每一根手指都保存一份信息，来进行区别
            contexts[touch.identifier] = {};
            // 当前事件的参数
            onStart(touch, contexts[touch.identifier]);
        }
    });
    element.addEventListener("touchmove", (event) => {
        const stop = ()=>{
            event.preventDefault();
        }
        for (let touch of event.changedTouches) {
            touch.stop = stop;
            onMove(touch, contexts[touch.identifier]);
        }
    });
    element.addEventListener("touchend", (event) => {
        for (let touch of event.changedTouches) {
            onEnd(touch, contexts[touch.identifier]);
            // 手指抬起的时候  就删除这个手指信息，下次再点击的时候，就成为新的手指
            delete contexts[touch.identifier];
        }
    });
    // 事件处理函数
    let onStart = (point, context) => {
        // PC、移动端都执行这个事件  start
        // 除了自定时间的属性外，合并一些其他的属性
        element.dispatchEvent(Object.assign(new CustomEvent('start'), {
            startX: point.clientX,
            startY: point.clientY,
            clientX: point.clientX,
            clientY: point.clientY
        }));
        context.startX = point.clientX;
        context.startY = point.clientY;
        context.isTap = true; // 点击
        context.isPan = false; // 滑屏
        context.isPress = false; // 长按
        clearTimeout(context.timoutHandler)
        // 来取分时长按  还是    点击
        context.timoutHandler = setTimeout(() => {
            if (context.isPan) return;
            context.isTap = false;
            context.isPress = true;
            element.dispatchEvent(Object.assign(new CustomEvent('pressstart'), {
                clientX: point.clientX,
                clientY: point.clientY
            }))
        }, 300);
    };
    let onMove = (point, context) => {
        // 横向  纵向的滑动距离
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;
        if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
            clearTimeout(context.timoutHandler);
            if(context.isPress){
                element.dispatchEvent(new CustomEvent('presscancel'))
            }
            context.isTap = false;
            // 进行了滑屏
            context.isPan = true;
            context.isPress = false;
            // 开始滑屏   用户在屏幕中第一次滑动
            element.dispatchEvent(Object.assign(new CustomEvent("panstart"), {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                stop: point.stop
            }));
            return ;
        }
        //滑屏中
        if (context.isPan) {
            element.dispatchEvent(Object.assign(new CustomEvent("pan"), {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                stop: point.stop
            }));
        }
        element.dispatchEvent(Object.assign(new CustomEvent("move"), {
            clientX: point.clientX,
            clientY: point.clientY
        }))
    };
    let onEnd = (point, context) => {
        clearTimeout(context.timoutHandler);
        //滑屏结束
        if (context.isPan) {
            element.dispatchEvent(Object.assign(new CustomEvent('panend'), {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            }))
            context.isPan = false
        }
        if (context.isTap) {
            element.dispatchEvent(Object.assign(new CustomEvent("tap"), {
                clientX: point.clientX,
                clientY: point.clientY
            }));
            context.isTap = false
        }
        if (context.isPress) {
            element.dispatchEvent(Object.assign(new CustomEvent("pressend"), {
                clientX: point.clientX,
                clientY: point.clientY
            }));
            context.isPress = false
        }
        element.dispatchEvent(Object.assign(new CustomEvent("end"), {
            clientX: point.clientX,
            clientY: point.clientY
        }))
    }
}

