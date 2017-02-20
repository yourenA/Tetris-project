/**
 * Created by Administrator on 2017/2/20.
 */

/**
 * 定义方块
 */

/**
 * ES6 Class
 * Class不存在变量提升（hoist），这一点与ES5完全不同。
 * class Bar {
 *   constructor(){} constructor方法是类的默认方法
 *   doStuff() {
 *    console.log('stuff');
 *   }
 * }
 * 使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。
 * var b = new Bar();
 * b.doStuff() // "stuff"
 */
class Block {
    constructor(siteSize) {
        /**
         * 将new Block(siteSize) 参数传进this
         */
        this.siteSize = siteSize;
    }

    /**
     * 判断是否可以移动
     */
    canMove() {
        let activeModel = document.querySelector('.activityModel'),
            top = parseInt(activeModel.style.top),
            left = parseInt(activeModel.style.left),
            canMoveRight = true,
            canMoveTop = true,
            canMoveDown = true,
            canMoveLeft=true;

        if(left+20>= this.siteSize.left+this.siteSize.width){
            canMoveRight=false;
        }
        if(left-20<this.siteSize.left){
            canMoveLeft=false;
        }
        if(top+20>=this.siteSize.top+this.siteSize.height){
            canMoveDown=false;
        }
        if(top-20<this.siteSize.top){
            canMoveTop=false;
        }

        return{
            canMoveRight:canMoveRight,
            canMoveLeft:canMoveLeft,
            canMoveTop:canMoveTop,
            canMoveDown:canMoveDown
        }
    }

    /**
     * 键盘事件
     */
    move() {
        document.onkeydown = (e)=> {
            let activeModel = document.querySelector('.activityModel'),
                left = parseInt(activeModel.style.left ? parseInt(activeModel.style.left) : 0),
                top = parseInt(activeModel.style.top ? parseInt(activeModel.style.top) : 0),
                canMoveRight,
                canMoveLeft,
                canMoveTop,
                canMoveDown;


            const key = e.keyCode;
            console.log("key", key);
            switch (key) {
                //left
                case 37:
                    canMoveLeft=this.canMove().canMoveLeft;
                    if(canMoveLeft){
                        activeModel.style.left = `${left - 20}px`;
                    }else{
                        console.log("can`t move left")
                    }

                    break;
                //up
                case 38:
                    canMoveTop=this.canMove().canMoveTop;
                    if(canMoveTop){
                        activeModel.style.top = `${top - 20}px`;
                    }else{
                        console.log("can`t move top")
                    }
                    break;
                //right
                case 39:
                    canMoveRight=this.canMove().canMoveRight;
                    if(canMoveRight){
                        activeModel.style.left = `${left + 20}px`;
                    }else{
                        console.log("can`t move right")
                    }
                    break;
                case 40:
                    canMoveDown=this.canMove().canMoveDown;
                    if(canMoveDown){
                        activeModel.style.top = `${top + 20}px`;
                    }else{
                        console.log("can`t move down");
                    }
                    break;
                default:
                    console.log("请选择上下左右按键");
                    break;
            }
        }
    }

    /**
     * 初始化方块*/
    init() {
        let activeModel = document.createElement('div');
        activeModel.className = 'activityModel';
        activeModel.style.top=`${this.siteSize.top}px`;
        activeModel.style.left=`${this.siteSize.left+this.siteSize.width/2}px`
        document.body.appendChild(activeModel);
    }
}

/**
 *浏览器初始化
 */

/**
 * ES6箭头函数
 * 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
 * var sum = (num1, num2) => num1 + num2;
 * 等同于
 * var sum = function(num1, num2) {
 * return num1 + num2;
 * };
 */
window.onload = () => {
    console.log("window onload");
    let site = document.querySelector('.site');
    // Window.getComputedStyle() 方法会在一个元素应用完有效样式且计算完所有属性的基本值之后给出所有 CSS 属性的值。
    let {width, height, left, top} =window.getComputedStyle(site);
    let siteSize = {
        width: parseInt(width),
        height: parseInt(height),
        left: parseInt(left),
        top: parseInt(top)
    }
    let block = new Block(siteSize);
    block.init();
    block.move();

};
