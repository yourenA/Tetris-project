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
    constructor(params) {
        /**
         * 将new Block(params) 参数传进this
         */
        this.siteSize = params.siteSize;
        this.arr=params.arr;
        this.BLOCK_SIZE=params.BLOCK_SIZE
    }

    /**
     * 判断二维数组为1的下标
     */

     checkArrWith1(arr,callback){
        for(let i=0;i<=arr.length-1;i++){
            console.log(arr[i])
            for(let j=0;j<=arr.length-1;j++){
                if(arr[i][j]==1){
                    console.log("i:",i," j:",j)
                    callback.call(this,i,j)
                }
            }
        }
     }

    /**
     * 根据数组矩阵画出当前方块
     */
    draw(i,j){
        let activeModel = document.createElement('div');
        activeModel.className = 'activityModel';
        activeModel.style.top=`${this.siteSize.top+i*this.BLOCK_SIZE}px`;
        activeModel.style.left=`${this.siteSize.left+this.siteSize.width/2+j*this.BLOCK_SIZE}px`;
        document.body.appendChild(activeModel);
    }

    /**
     * 判断是否可以移动
     */
    canMove() {
        let activeModel = document.querySelectorAll('.activityModel'),
            tops = [],
            lefts = [],
            canMoveRight = true,
            canMoveTop = true,
            canMoveDown = true,
            canMoveLeft=true;

        //Array.from方法用于将类数组转为真正的数组
        //for...of: for...in循环读取键名，for...of循环读取键值
        for(let v of Array.from(activeModel)){
            tops.push(parseInt(v.style.top));
            lefts.push(parseInt(v.style.left))
        }

        //min() 方法可返回指定的数字中带有最低值的数字。参数为用逗号分隔的参数序列，不是数组
        //max() 方法可返回指定的数字中带有最大值的数字。
        //... 扩展运算符：将数组转为用逗号分隔的参数序列
        //... reset运算符：其功能与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组
        let top=Math.min(...tops),
            left=Math.min(...lefts),
            right=Math.max(...lefts),
            down=Math.max(...tops);
        if(right+20>= this.siteSize.left+this.siteSize.width){
            canMoveRight=false;
        }
        if(left-20<this.siteSize.left){
            canMoveLeft=false;
        }
        if(down+20>=this.siteSize.top+this.siteSize.height){
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
            let activeModel = document.querySelectorAll('.activityModel'),
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
                        for(let v of activeModel){
                            v.style.left = `${parseInt(v.style.left) - 20}px`;
                        }

                    }else{
                        console.log("can`t move left")
                    }

                    break;
                //up
                case 38:
                    canMoveTop=this.canMove().canMoveTop;
                    if(canMoveTop){
                        for(let v of activeModel){
                            v.style.top = `${parseInt(v.style.top) - 20}px`;
                        }
                    }else{
                        console.log("can`t move top")
                    }
                    break;
                //right
                case 39:
                    canMoveRight=this.canMove().canMoveRight;
                    if(canMoveRight){
                        for(let v of activeModel){
                            v.style.left = `${parseInt(v.style.left) + 20}px`;
                        }
                    }else{
                        console.log("can`t move right")
                    }
                    break;
                case 40:
                    canMoveDown=this.canMove().canMoveDown;
                    if(canMoveDown){
                        for(let v of activeModel){
                            v.style.top = `${parseInt(v.style.top) + 20}px`;
                        }
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
        this.checkArrWith1(this.arr,this.draw)
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
    };
    const arr=[[1,0],[1,0],[1,1]];
    const BLOCK_SIZE=20;
    const params={
        arr:arr,
        siteSize:siteSize,
        BLOCK_SIZE:BLOCK_SIZE
    }
    let block = new Block(params);
    block.init();
    block.move();

};
