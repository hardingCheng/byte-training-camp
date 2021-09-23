class HuanDengPan{
    constructor(opt) {
        let {imgList} = opt
        for (let s in opt){
            this[s] = opt[s]
        }
        this.x = 0 // 当前幻灯片的横轴位置
        this.startX = 0 // 开始滑动时，幻灯片的位置
        this.isMove = false; // 当用户进行左右滑动的时候，才进行幻灯片移动
        this.viewWidth = imgList.parentNode.clientWidth;
        this.index = 0 // 默认选中第几章
        this.imgsLen = 0;
        this.isBreak = false;
        this.animateTime = 0;
        enableGesture(imgList)
        this.initLayout()
        this.imgsLen = imgList.children.length
        imgList.addEventListener('panstart',(e) => {
            this.panstart(e)
        })
        imgList.addEventListener('pan',(e) => {
            this.pan(e)
        })
        imgList.addEventListener('panend',(e) => {
            this.panend(e)
        })
        imgList.addEventListener('start',(e) => {
            this.start(e)
        })
        imgList.addEventListener('end',(e) => {
            this.panend(e)
            this.autoPlay();
        })
        this.autoPlay()
    }
    //修改布局  实现无缝轮播
    initLayout(){
        let imgs = this.imgList.children
        let firstImage = imgs[0]
        let lastImage = imgs[imgs.length - 1]
        this.imgList.insertBefore(lastImage.cloneNode(true),firstImage)
        this.imgList.appendChild(firstImage.cloneNode(true))
        this.x = -this.viewWidth
        this.index = 1
        this.setTransform()
    }
    resetLayout(){
        let targetIndex = -this.index*this.viewWidth;
        let disX = targetIndex - this.x;
        if(this.index === 0){
            this.index = this.imgsLen -2
        }else if (this.index === this.imgsLen -1){
            this.index = 1
        }
        this.x = -this.index*this.viewWidth + disX;
        this.setTransform();
    }
    //按下
    start(){
        if(this.animateTime){
            clearInterval(this.animateTime);
            this.isBreak = true;
        } else {
            this.isBreak = false;
        }
        clearInterval(this.autoTimer);
    }
    //首次滑动方向，及用户的想要进行滑动的方向
    panstart(e){
        let disX = e.clientX - e.startX
        let disY = e.clientY - e.startY
        if(this.index === 0 || this.index === this.imgsLen -1){}{

        }
        if(Math.abs(disX) < Math.abs(disY)){
            this.isMove = false
            e.stop()
        }else {
            this.isMove = true
        }
        this.startX = this.x
    }
    pan(e){
       if(this.isMove){
           let disX = e.clientX - e.startX
           let disY = e.clientY - e.startY
           this.x = this.startX + disX
           this.setTransform()
           e.stop()
       }
    }
    panend(e){
        this.index =Math.round(-this.x / this.viewWidth)
        let targetX = -this.index * this.viewWidth
        this.animate(targetX)
        this.setNavs();
    }
    //同步标识位置
    setNavs(){
        if (!this.navs.length) {
            return;
        }
        this.navs.forEach(nav => {
            nav.className = ""
        });
        const nowIndex = this.index>0?(this.index - 1)%this.navs.length:this.navs.length-1;
        this.navs[nowIndex].className = "active";
    }
    setTransform(){
        this.imgList.style.transform = `translate3d(${this.x})px,0,0`
    }
    autoPlay(){
        this.autoTimer = setInterval(()=>{
            if(this.index === this.imgsLen-1){
                this.resetLayout();
            }
            this.index++;
            this.animate(-this.index*this.viewWidth);
            this.setNavs();
        },3000);
    }
    animate(targetX) {
        const time = Math.abs(targetX - this.x);
        let t = 0;
        let b = this.x;
        let c = targetX - this.x;
        let d = Math.ceil(time/(1000/60));
        clearTimeout(this.animateTime);
        this.animateTime = setInterval(()=>{
            t++;
            if(t === d){
                clearInterval(this.animateTime);
                this.animateTime = 0;
            }
            this.x = this.easeOut(t,b,c,d);
            this.setTransform();
        },1000/60);
    }
    // tween 动画算法
    /*
        t: current time（当前时间）；
        b: beginning value（初始值）；
        c: change in value（变化量）；
        d: duration（持续时间）。
        */
    easeOut (t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    }
}
