/*
- start、move、end // 兼容touch和mouse
- panstart、pan、panend
    panstart 开始滑屏,用户在屏幕中第一次滑动
- pressstart、pressend、presscancel
- tap
*/

function enableGesture(ele){
    let contexts = {};
    const MOUSE_TYPE = Symbol("mouse");
    if(!("ontouchstart" in document)){
        ele.addEventListener("mousedown", (e) => {
            contexts[MOUSE_TYPE] = {};
            onStart(e,contexts[MOUSE_TYPE]);
            let move = (event) => {
                const stop = ()=>{
                    event.preventDefault()
                };
                contexts[MOUSE_TYPE].stop = stop;
                onMove(event,contexts[MOUSE_TYPE]);
            };
            let end = (event) => {
                onEnd(event,contexts[MOUSE_TYPE]);
                document.removeEventListener("mousemove", move);
            }
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", end, { once: true });
        });
    }
    ele.addEventListener("touchstart",(e)=>{
        for(let touch of e.changedTouches){
            contexts[touch.identifier] = {};
            onStart(touch,contexts[touch.identifier]);
        }
    });
    ele.addEventListener("touchmove",(e)=>{
        const stop = ()=>{
            e.preventDefault();
        }
        for(let touch of e.changedTouches){
            contexts[touch.identifier].stop = stop;
            onMove(touch,contexts[touch.identifier]);
        }
    });
    ele.addEventListener("touchend",(e)=>{
        for(let touch of e.changedTouches){
            onEnd(touch,contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    });
    let onStart = (e,contexts)=>{
        ele.dispatchEvent(Object.assign(new CustomEvent("start"),{
            clientX: e.clientX,
            clientY: e.clientY
        }));
        contexts.isTap = true;
        contexts.startX = e.clientX;
        contexts.startY = e.clientY;
        clearTimeout(contexts.timeout);
        contexts.timeout = setTimeout(()=>{
            contexts.isTap = false;
            contexts.isPress = true;
            ele.dispatchEvent(Object.assign(new CustomEvent("pressstart"),{
                clientX: e.clientX,
                clientY: e.clientY
            }));
        },500)
    };
    let onMove = (e,contexts)=>{
        let dx = e.clientX - contexts.startX;
        let dy = e.clientY - contexts.startY;
        ele.dispatchEvent(Object.assign(new CustomEvent("move"),{
            clientX: e.clientX,
            clientY: e.clientY
        }));
        if(dx ** 2 + dy ** 2 > 100&&(!contexts.isPan)){
            contexts.isPan = true;
            if(contexts.isPress){
                ele.dispatchEvent(Object.assign(new CustomEvent("presscancel"),{
                    clientX: e.clientX,
                    clientY: e.clientY
                }));
            }
            clearTimeout(contexts.timeout);
            contexts.isTap = false;
            contexts.isPress = false;
            ele.dispatchEvent(Object.assign(new CustomEvent("panstart"),{
                clientX: e.clientX,
                clientY: e.clientY,
                startX: contexts.startX,
                startY: contexts.startY,
                stop: contexts.stop
            }));
            return ;
        }
        if(contexts.isPan){
            ele.dispatchEvent(Object.assign(new CustomEvent("pan"),{
                clientX: e.clientX,
                clientY: e.clientY,
                startX: contexts.startX,
                startY: contexts.startY,
                stop: contexts.stop
            }));
        }
    };
    let onEnd = (e,contexts)=>{
        clearTimeout(contexts.timeout);
        if(contexts.isPan){
            ele.dispatchEvent(Object.assign(new CustomEvent("panend"),{
                clientX: e.clientX,
                clientY: e.clientY,
                startX: contexts.startX,
                startY: contexts.startY
            }));
            contexts.isPan = false;
        }
        if (contexts.isTap) {
            ele.dispatchEvent(Object.assign(new CustomEvent("tap"), {
                clientX: e.clientX,
                clientY: e.clientY
            }));
            contexts.isTap = false;
        }
        if (contexts.isPress) {
            ele.dispatchEvent(Object.assign(new CustomEvent("pressend"), {
                clientX: e.clientX,
                clientY: e.clientY
            }));
            contexts.isPress = false;
        }
        ele.dispatchEvent(Object.assign(new CustomEvent("end"),{
            clientX: e.clientX,
            clientY: e.clientY
        }))
    }
}
