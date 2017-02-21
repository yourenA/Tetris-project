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
        this.arr = params.arr;
        this.nextArr=params.nextArr;
        this.highestScore=params.highestScore;
        this.delay=params.delay;
        this.BLOCK_SIZE = params.BLOCK_SIZE;
        this.curLeft = params.curLeft;
        this.curTop = params.curTop;
    }

    /**
     * 数组矩阵顺时针旋转
     */
    clockwise(arr) {
        let newArr = [];
        for (let i = 0; i <= arr[0].length - 1; i++) {
            let temArr = [];
            for (let j = arr.length - 1; j >= 0; j--) {
                temArr.push(arr[j][i]);
            }
            newArr.push(temArr)
        }
        let lefts = [];
        let tops = [];

        this.checkArrWith1(newArr, function (i, j) {
            lefts.push(j * this.BLOCK_SIZE);
            tops.push(i * this.BLOCK_SIZE);
        });

        return {
            newArr: newArr,
            lefts: lefts,
            tops: tops
        }
    }

    /**
     * 判断二维数组为1的下标
     */

    checkArrWith1(arr, callback,el,className) {
        console.log(arr)
        for (let i = 0; i <= arr.length - 1; i++) {//循环二维数组
            for (let j = 0; j <= arr[0].length - 1; j++) {
                //如果二维数据里的数据为1，则把i,j对应的位置画出来
                if (arr[i][j] == 1) {
                    callback.call(this, i + this.curTop, j + this.curLeft,el, className)
                }
            }
        }
    }

    /**
     * 根据数组矩阵画出当前方块
     */
    draw(i, j,el,className) {
        let left = className === 'nextModel' ? j * this.BLOCK_SIZE - (this.siteSize.left + this.siteSize.width / 2 - this.BLOCK_SIZE) : j * this.BLOCK_SIZE;
        let top = className === 'nextModel' ? i * this.BLOCK_SIZE - this.siteSize.top : i * this.BLOCK_SIZE;
        let model = document.createElement('div');
        model.className = className;
        model.style.top = `${top}px`;
        model.style.left = `${left}px`;
        el.appendChild(model);
        debugger
    }

    /**
     *获取当前方块可以到达的边界
     */
    getInterval(curLeft, curTop) {
        let inactiveModel = document.querySelectorAll('.inactiveModel'),//获取已经失效的model
            highest = null,
            leftmost = null,
            rightmost = null;
        if (inactiveModel.length === 0) {//如果没有失效的model,则边界为
            highest = this.siteSize.top + this.siteSize.height;
            leftmost = this.siteSize.left - this.BLOCK_SIZE;
            rightmost = this.siteSize.left + this.siteSize.width;
        } else {
            let tops = [],
                lefts = [],
                rights = [];
            for (let v of inactiveModel) {//循环所有的失效model
                let left = parseInt(v.style.left),//获得每一个失效model的left和top
                    top = parseInt(v.style.top);
                if (left === curLeft) {
                    tops.push(top)
                }
                if (top === curTop) {
                    if (left < curLeft) {
                        lefts.push(left)
                    } else if (left > curLeft) {
                        rights.push(left)
                    }
                }
            }
            if (tops.length === 0) {
                highest = this.siteSize.top + this.siteSize.height;
            } else {
                highest = Math.min(...tops);
            }

            if (lefts.length === 0) {
                leftmost = this.siteSize.left - this.BLOCK_SIZE;
            } else {
                leftmost = Math.max(...lefts);
            }

            if (rights.length === 0) {
                rightmost = this.siteSize.left + this.siteSize.width;
            } else {
                rightmost = Math.min(...rights);
            }
        }
        return {
            highest: highest,
            leftmost: leftmost,
            rightmost: rightmost
        };
    }

    /**
     * 消除砖块
     */
    eliminate() {
        let res = [],
            inactiveModels = [...document.querySelectorAll('.inactiveModel')];
        inactiveModels.sort(function (a, b) {
            return parseInt(a.style.top) - parseInt(b.style.top);
        });

        for (let i = 0; i < inactiveModels.length;) {
            let count = 0,
                models = [];
            for (let j = 0; j < inactiveModels.length; j++) {
                if (inactiveModels[i].style.top === inactiveModels[j].style.top) {
                    count++;
                    models.push(inactiveModels[j]);
                }
            }

            res.push({
                models: models,
                count: count,
                top: parseInt(inactiveModels[i].style.top)
            });
            //for 循环的最后一个参数可以放在循环体内
            i += count
        }
        return res

    }

    /**
     * 当灰色砖块高于画布偏移量，游戏结束
     */
    gameOver(){
        const inactiveModel=document.querySelectorAll('.inactiveModel');
        let tops=[];
        for(let v of inactiveModel){
            tops.push(parseInt(v.style.top));
        }
        return Math.min(...tops) <=this.siteSize.top
    }

    /**
     * gameOver填充动画
     */
    /**
     * class 静态方法
     * 该方法不会被实例继承，而是直接通过类来调用 Block.fill();
     * 父类的静态方法，可以被子类继承。
     */
    static fill(curTop,curLeft){
        let model=document.createElement('div');
        model.className='inactiveModel';
        model.style.left=`${curLeft}px`;
        model.style.top=`${curTop}px`;
        document.body.appendChild(model);
    }
    /**
     * 判断是否可以移动
     */
    canMove(arr, deform = false, dispalcement=1,move = {
        canMoveRight: true,
        canMoveDown: true,
        canMoveLeft: true
    }) {
        //checkArrWith1是确定i，j
        this.checkArrWith1(arr, function (i, j) {
            let {highest, leftmost, rightmost}=this.getInterval(j * this.BLOCK_SIZE, i * this.BLOCK_SIZE);
            if (deform) {
                if (this.BLOCK_SIZE * (j + 1) > rightmost) {
                    move.canMoveRight = false;
                }
                if (this.BLOCK_SIZE * (i + dispalcement) > highest) {
                    move.canMoveDown = false;
                }
                if (this.BLOCK_SIZE * (j - 1) < leftmost) {
                    move.canMoveLeft = false
                }
            } else {
                if (this.BLOCK_SIZE * (j + 1) >= rightmost) {
                    move.canMoveRight = false;
                }
                if (this.BLOCK_SIZE * (i + dispalcement) >= highest) {
                    move.canMoveDown = false;
                }
                if (this.BLOCK_SIZE * (j - 1) <= leftmost) {
                    move.canMoveLeft = false
                }
            }

        });
        return move;
        /* Array.from方法用于将类数组转为真正的数组
         for...of: for...in循环读取键名，for...of循环读取键值
         for(let v of Array.from(activeModel)){
         tops.push(parseInt(v.style.top));
         lefts.push(parseInt(v.style.left))
         }

         min() 方法可返回指定的数字中带有最低值的数字。参数为用逗号分隔的参数序列，不是数组
         max() 方法可返回指定的数字中带有最大值的数字。
         ... 扩展运算符：将数组转为用逗号分隔的参数序列
         ... reset运算符：其功能与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组
         let top = Math.min(...tops),
         left = Math.min(...lefts),
         right = Math.max(...lefts),
         down = Math.max(...tops);
         if (deform) {
         if (right + 20 >= this.siteSize.left + this.siteSize.width) {
         canMoveRight = false;
         }
         } else {
         if (right + 20 >= this.siteSize.left + this.siteSize.width) {
         canMoveRight = false;
         }
         }

         if (left - 20 < this.siteSize.left) {
         canMoveLeft = false;
         }
         if (down + 20 >= this.siteSize.top + this.siteSize.height) {
         canMoveDown = false;
         }
         if (top - 20 < this.siteSize.top) {
         canMoveTop = false;
         }

         return {
         canMoveRight: canMoveRight,
         canMoveLeft: canMoveLeft,
         canMoveTop: canMoveTop,
         canMoveDown: canMoveDown
         }*/
    }

    /**
     * 键盘事件
     */
    move() {
        document.onkeydown = (e)=> {
            let activeModel = document.querySelectorAll('.activityModel'),
                move,
                canMoveRight,
                canMoveLeft,
                canMoveTop,
                canMoveDown;
            const key = e.keyCode;
            if(activeModel.length){
                switch (key) {
                    //left
                    case 37:
                        canMoveLeft = this.canMove(this.arr).canMoveLeft;
                        if (canMoveLeft) {
                            for (let v of activeModel) {
                                v.style.left = `${parseInt(v.style.left) - this.BLOCK_SIZE}px`;
                            }
                            this.curLeft--;

                        } else {
                            console.log("can`t move left")
                        }

                        break;
                    //up
                    case 38:
                        let {newArr, lefts, tops}=this.clockwise(this.arr);
                        move = this.canMove(newArr, true);
                        canMoveDown = move.canMoveDown;
                        canMoveRight = move.canMoveRight;
                        canMoveLeft = move.canMoveLeft;
                        if (canMoveRight && canMoveDown && canMoveLeft) {
                            this.arr = newArr;
                            for (let i in lefts) {
                                activeModel[i].style.left = `${lefts[i]}px`;
                                activeModel[i].style.top = `${tops[i]}px`
                            }
                        }
                        break;
                    //right
                    case 39:
                        canMoveRight = this.canMove(this.arr).canMoveRight;
                        if (canMoveRight) {
                            for (let v of activeModel) {
                                v.style.left = `${parseInt(v.style.left) + this.BLOCK_SIZE}px`;
                            }
                            this.curLeft++
                        } else {
                            console.log("can`t move right")
                        }
                        break;
                    case 32:
                        canMoveDown = this.canMove(this.arr,false,2).canMoveDown;
                        if (canMoveDown) {
                            for (let v of activeModel) {
                                v.style.top = `${parseInt(v.style.top) + 2*this.BLOCK_SIZE}px`;
                            }
                            this.curTop +=2;
                        } else {
                            console.log("can`t move down");
                        }
                        break;
                    default:
                        console.log("请选择上下左右按键");
                        break;
                }
            }
        }
    }

    /**
     * 初始化方块*/
    init() {
        let next=document.querySelector('#next');
        next.innerHTML=null;
        //画出第一个activityModel
        this.checkArrWith1(this.arr, this.draw,document.body,'activityModel');
        //画出第一个nextModel
        this.checkArrWith1(this.nextArr,this.draw,next,'nextModel');
        debugger
        let aciveModel = document.querySelectorAll('.activityModel');
        const fallDown = setTimeout(function loop() {
            //setTimeout会改变this的指向，所以需要bind(this)
            let canMoveDown = this.canMove(this.arr).canMoveDown;
            if (canMoveDown) {
                for (let v of aciveModel) {
                    v.style.top = `${parseInt(v.style.top) + this.BLOCK_SIZE}px`
                }
                this.curTop++;
                setTimeout(loop.bind(this),this.delay/window.__level__);

            } else {
                for (let i = 0; i <= aciveModel.length - 1; i++) {
                    aciveModel[i].className = 'inactiveModel';
                }

                let res = this.eliminate();
                for (let i = 0; i < res.length; i++) {
                    let {count, models, top}=res[i];
                    if (count === parseInt(this.siteSize.width / this.BLOCK_SIZE)) {
                        for (let j = 0; j < models.length; j++) {
                            document.body.removeChild(models[j]);
                        }
                        let inactiveModels = document.querySelectorAll('.inactiveModel');
                        for (let v of inactiveModels) {
                            if (parseInt(v.style.top) < top) {
                                v.style.top = `${parseInt(v.style.top) + this.BLOCK_SIZE}px`
                            }
                        }
                        window.__score__+=window.__level__ * 100;
                        let score=document.querySelector('#score');
                        score.innerText=window.__score__;
                        if (window.__score__ - (window.__level__ - 1) * (window.__level__ - 1) * 1000 >= window.__level__ * window.__level__ * 1000
                            && window.__level__ <= 4) {
                            window.__level__++;
                            let level = document.querySelector('#level');
                            level.innerText = window.__level__;
                        }


                    }
                }

                if(this.gameOver()){
                    console.log('game over');
                    let curTop=this.siteSize.height+this.siteSize.top-this.BLOCK_SIZE,
                        curLeft=this.siteSize.width+this.siteSize.left-this.BLOCK_SIZE;
                    let fillId=setInterval(function () {
                        Block.fill(curTop,curLeft);
                        curLeft -= this.BLOCK_SIZE;
                        if(curLeft < this.siteSize.left){
                            curLeft =this.siteSize.width+this.siteSize.left-this.BLOCK_SIZE;
                            curTop -= this.BLOCK_SIZE
                        }
                        if(curTop < this.siteSize.top){
                            clearInterval(fillId);
                            let next=document.querySelector('#next');
                            next.innerHTML=null;
                            let startOrRestart=document.querySelector('.start-restart');
                            startOrRestart.style.display='block';
                            startOrRestart.onclick=(e)=>{
                                e.preventDefault();
                                startOrRestart.style.display='none';
                                let inactiveModels=[...document.querySelectorAll('.inactiveModel')];
                                if(inactiveModels.length>0){
                                    for(let v of inactiveModels){
                                        document.body.removeChild(v);
                                    }
                                }
                                if (this.highestScore < window.__score__) {
                                    localStorage.setItem('highestScore', window.__score__);
                                    let highestScoreDiv = document.querySelector('#highest-score');
                                    highestScoreDiv.innerText = window.__score__;
                                }
                                window.__score__ = 0;
                                let score = document.querySelector('#score');
                                score.innerText = window.__score__;
                                window.__level__ = 1;
                                let level = document.querySelector('#level');
                                level.innerText = window.__level__;
                                this.init();
                            }
                        }
                    }.bind(this),30)
                }else{
                    init(this.nextArr)
                }
                clearTimeout(fallDown)
            }
        }.bind(this), 600)
    }
}
/**
 * 数据初始化
 */
const init = (nextArr)=> {
    const random=Math.floor((Math.random()*__arr__.length)),//当前方块数组
        nextRandom=Math.floor((Math.random()*__arr__.length)),//下一方块数组
        arr =nextArr ? nextArr : __arr__[random],//arr为二维数组 如果有传进init()参数，使用参数为arr,否则以[random]为arr
        delay=600;
    const params = {
        arr: arr,
        nextArr:__arr__[nextRandom],
        siteSize: __siteSize__,
        BLOCK_SIZE: __BLOCK_SIZE__,
        curLeft: __curLeft__,
        curTop: __curTop__,
        delay:delay,
        highestScore:__highestScore__
    };
    let block = new Block(params);//实例化对象class
    block.init();//调用实例init方法
    block.move();//调用实例move方法
};
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
    let site = document.querySelector('.site');
    // Window.getComputedStyle() 方法会在一个元素应用完有效样式且计算完所有属性的基本值之后给出所有 CSS 属性的值。
    let {width, height, left, top} =window.getComputedStyle(site);
    //将获取到的width, height, left, top放到一个对象里
    let siteSize = {
        width: parseInt(width),
        height: parseInt(height),
        left: parseInt(left),
        top: parseInt(top)
    };
    //定义不同形状 三位数组
    const arr =[
        //L
        [[1, 0], [1, 0], [1, 1]],
        [[1, 1, 1], [1, 0, 0]],
        [[1, 1], [0, 1], [0, 1]],
        [[0, 0, 1], [1, 1, 1]],
        //』
        [[0, 1], [0, 1], [1, 1]],
        [[1, 0, 0], [1, 1, 1]],
        [[1, 1], [1, 0], [1, 0]],
        [[1, 1, 1], [0, 0, 1]],
        //I
        [[1], [1], [1], [1]],
        [[1, 1, 1, 1]],
        [[1], [1], [1], [1]],
        [[1, 1, 1, 1]],
        //田
        [[1, 1], [1, 1]],
        [[1, 1], [1, 1]],
        [[1, 1], [1, 1]],
        [[1, 1], [1, 1]],
        //T
        [[1, 1, 1], [0, 1, 0]],
        [[0, 1], [1, 1], [0, 1]],
        [[0, 1, 0], [1, 1, 1]],
        [[1, 0], [1, 1], [1, 0]],
        //Z
        [[1, 1, 0], [0, 1, 1]],
        [[0, 1], [1, 1], [1, 0]],
        [[1, 1, 0], [0, 1, 1]],
        [[0, 1], [1, 1], [1, 0]],
        //倒Z
        [[0, 1, 1], [1, 1, 0]],
        [[1, 0], [1, 1], [0, 1]],
        [[0, 1, 1], [1, 1, 0]],
        [[1, 0], [1, 1], [0, 1]]
    ];
    const BLOCK_SIZE = 20;
    /*定义开始偏移量基数*/
    let curLeft = parseInt((siteSize.left + siteSize.width / 2) / BLOCK_SIZE);//15，偏移15个单位
    let curTop = parseInt(siteSize.top / BLOCK_SIZE);//10
    window.__arr__ = arr;
    window.__siteSize__ = siteSize;
    window.__BLOCK_SIZE__ = BLOCK_SIZE;
    window.__curLeft__ = curLeft;
    window.__curTop__ = curTop;
    window.__level__=1;
    window.__score__=0;
    const highestScore=localStorage.getItem('highestScore') || 0;
    let highestScoreDiv=document.querySelector('#highest-score');
    highestScoreDiv.innerText=highestScore;
    window.__highestScore__=highestScore;

    let start=document.querySelector('.start-restart');
    start.onclick=(e)=>{
        e.preventDefault();
        start.innerText='restart';
        start.style.display='none';
        init();
    };


};
