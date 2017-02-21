'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var Block = function () {
    function Block(params) {
        _classCallCheck(this, Block);

        /**
         * 将new Block(params) 参数传进this
         */
        this.siteSize = params.siteSize;
        this.arr = params.arr;
        this.nextArr = params.nextArr;
        this.highestScore = params.highestScore;
        this.delay = params.delay;
        this.BLOCK_SIZE = params.BLOCK_SIZE;
        this.curLeft = params.curLeft;
        this.curTop = params.curTop;
    }

    /**
     * 数组矩阵顺时针旋转
     */


    _createClass(Block, [{
        key: 'clockwise',
        value: function clockwise(arr) {
            var newArr = [];
            for (var i = 0; i <= arr[0].length - 1; i++) {
                var temArr = [];
                for (var j = arr.length - 1; j >= 0; j--) {
                    temArr.push(arr[j][i]);
                }
                newArr.push(temArr);
            }
            var lefts = [];
            var tops = [];

            this.checkArrWith1(newArr, function (i, j) {
                lefts.push(j * this.BLOCK_SIZE);
                tops.push(i * this.BLOCK_SIZE);
            });

            return {
                newArr: newArr,
                lefts: lefts,
                tops: tops
            };
        }

        /**
         * 判断二维数组为1的下标
         */

    }, {
        key: 'checkArrWith1',
        value: function checkArrWith1(arr, callback, el, className) {
            console.log(arr);
            for (var i = 0; i <= arr.length - 1; i++) {
                //循环二维数组
                for (var j = 0; j <= arr[0].length - 1; j++) {
                    //如果二维数据里的数据为1，则把i,j对应的位置画出来
                    if (arr[i][j] == 1) {
                        callback.call(this, i + this.curTop, j + this.curLeft, el, className);
                    }
                }
            }
        }

        /**
         * 根据数组矩阵画出当前方块
         */

    }, {
        key: 'draw',
        value: function draw(i, j, el, className) {
            var left = className === 'nextModel' ? j * this.BLOCK_SIZE - (this.siteSize.left + this.siteSize.width / 2 - this.BLOCK_SIZE) : j * this.BLOCK_SIZE;
            var top = className === 'nextModel' ? i * this.BLOCK_SIZE - this.siteSize.top : i * this.BLOCK_SIZE;
            var model = document.createElement('div');
            model.className = className;
            model.style.top = top + 'px';
            model.style.left = left + 'px';
            el.appendChild(model);
            debugger;
        }

        /**
         *获取当前方块可以到达的边界
         */

    }, {
        key: 'getInterval',
        value: function getInterval(curLeft, curTop) {
            var inactiveModel = document.querySelectorAll('.inactiveModel'),
                //获取已经失效的model
            highest = null,
                leftmost = null,
                rightmost = null;
            if (inactiveModel.length === 0) {
                //如果没有失效的model,则边界为
                highest = this.siteSize.top + this.siteSize.height;
                leftmost = this.siteSize.left - this.BLOCK_SIZE;
                rightmost = this.siteSize.left + this.siteSize.width;
            } else {
                var tops = [],
                    lefts = [],
                    rights = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = inactiveModel[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var v = _step.value;
                        //循环所有的失效model
                        var left = parseInt(v.style.left),
                            //获得每一个失效model的left和top
                        top = parseInt(v.style.top);
                        if (left === curLeft) {
                            tops.push(top);
                        }
                        if (top === curTop) {
                            if (left < curLeft) {
                                lefts.push(left);
                            } else if (left > curLeft) {
                                rights.push(left);
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (tops.length === 0) {
                    highest = this.siteSize.top + this.siteSize.height;
                } else {
                    highest = Math.min.apply(Math, tops);
                }

                if (lefts.length === 0) {
                    leftmost = this.siteSize.left - this.BLOCK_SIZE;
                } else {
                    leftmost = Math.max.apply(Math, lefts);
                }

                if (rights.length === 0) {
                    rightmost = this.siteSize.left + this.siteSize.width;
                } else {
                    rightmost = Math.min.apply(Math, rights);
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

    }, {
        key: 'eliminate',
        value: function eliminate() {
            var res = [],
                inactiveModels = [].concat(_toConsumableArray(document.querySelectorAll('.inactiveModel')));
            inactiveModels.sort(function (a, b) {
                return parseInt(a.style.top) - parseInt(b.style.top);
            });

            for (var i = 0; i < inactiveModels.length;) {
                var count = 0,
                    models = [];
                for (var j = 0; j < inactiveModels.length; j++) {
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
                i += count;
            }
            return res;
        }

        /**
         * 当灰色砖块高于画布偏移量，游戏结束
         */

    }, {
        key: 'gameOver',
        value: function gameOver() {
            var inactiveModel = document.querySelectorAll('.inactiveModel');
            var tops = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = inactiveModel[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var v = _step2.value;

                    tops.push(parseInt(v.style.top));
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return Math.min.apply(Math, tops) <= this.siteSize.top;
        }

        /**
         * gameOver填充动画
         */
        /**
         * class 静态方法
         * 该方法不会被实例继承，而是直接通过类来调用 Block.fill();
         * 父类的静态方法，可以被子类继承。
         */

    }, {
        key: 'canMove',

        /**
         * 判断是否可以移动
         */
        value: function canMove(arr) {
            var deform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var dispalcement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
            var move = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
                canMoveRight: true,
                canMoveDown: true,
                canMoveLeft: true
            };

            //checkArrWith1是确定i，j
            this.checkArrWith1(arr, function (i, j) {
                var _getInterval = this.getInterval(j * this.BLOCK_SIZE, i * this.BLOCK_SIZE),
                    highest = _getInterval.highest,
                    leftmost = _getInterval.leftmost,
                    rightmost = _getInterval.rightmost;

                if (deform) {
                    if (this.BLOCK_SIZE * (j + 1) > rightmost) {
                        move.canMoveRight = false;
                    }
                    if (this.BLOCK_SIZE * (i + dispalcement) > highest) {
                        move.canMoveDown = false;
                    }
                    if (this.BLOCK_SIZE * (j - 1) < leftmost) {
                        move.canMoveLeft = false;
                    }
                } else {
                    if (this.BLOCK_SIZE * (j + 1) >= rightmost) {
                        move.canMoveRight = false;
                    }
                    if (this.BLOCK_SIZE * (i + dispalcement) >= highest) {
                        move.canMoveDown = false;
                    }
                    if (this.BLOCK_SIZE * (j - 1) <= leftmost) {
                        move.canMoveLeft = false;
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

    }, {
        key: 'move',
        value: function move() {
            var _this = this;

            document.onkeydown = function (e) {
                var activeModel = document.querySelectorAll('.activityModel'),
                    move = void 0,
                    canMoveRight = void 0,
                    canMoveLeft = void 0,
                    canMoveTop = void 0,
                    canMoveDown = void 0;
                var key = e.keyCode;
                if (activeModel.length) {
                    switch (key) {
                        //left
                        case 37:
                            canMoveLeft = _this.canMove(_this.arr).canMoveLeft;
                            if (canMoveLeft) {
                                var _iteratorNormalCompletion3 = true;
                                var _didIteratorError3 = false;
                                var _iteratorError3 = undefined;

                                try {
                                    for (var _iterator3 = activeModel[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                        var v = _step3.value;

                                        v.style.left = parseInt(v.style.left) - _this.BLOCK_SIZE + 'px';
                                    }
                                } catch (err) {
                                    _didIteratorError3 = true;
                                    _iteratorError3 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                            _iterator3.return();
                                        }
                                    } finally {
                                        if (_didIteratorError3) {
                                            throw _iteratorError3;
                                        }
                                    }
                                }

                                _this.curLeft--;
                            } else {
                                console.log("can`t move left");
                            }

                            break;
                        //up
                        case 38:
                            var _clockwise = _this.clockwise(_this.arr),
                                newArr = _clockwise.newArr,
                                lefts = _clockwise.lefts,
                                tops = _clockwise.tops;

                            move = _this.canMove(newArr, true);
                            canMoveDown = move.canMoveDown;
                            canMoveRight = move.canMoveRight;
                            canMoveLeft = move.canMoveLeft;
                            if (canMoveRight && canMoveDown && canMoveLeft) {
                                _this.arr = newArr;
                                for (var i in lefts) {
                                    activeModel[i].style.left = lefts[i] + 'px';
                                    activeModel[i].style.top = tops[i] + 'px';
                                }
                            }
                            break;
                        //right
                        case 39:
                            canMoveRight = _this.canMove(_this.arr).canMoveRight;
                            if (canMoveRight) {
                                var _iteratorNormalCompletion4 = true;
                                var _didIteratorError4 = false;
                                var _iteratorError4 = undefined;

                                try {
                                    for (var _iterator4 = activeModel[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                        var _v = _step4.value;

                                        _v.style.left = parseInt(_v.style.left) + _this.BLOCK_SIZE + 'px';
                                    }
                                } catch (err) {
                                    _didIteratorError4 = true;
                                    _iteratorError4 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                            _iterator4.return();
                                        }
                                    } finally {
                                        if (_didIteratorError4) {
                                            throw _iteratorError4;
                                        }
                                    }
                                }

                                _this.curLeft++;
                            } else {
                                console.log("can`t move right");
                            }
                            break;
                        case 32:
                            canMoveDown = _this.canMove(_this.arr, false, 2).canMoveDown;
                            if (canMoveDown) {
                                var _iteratorNormalCompletion5 = true;
                                var _didIteratorError5 = false;
                                var _iteratorError5 = undefined;

                                try {
                                    for (var _iterator5 = activeModel[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                        var _v2 = _step5.value;

                                        _v2.style.top = parseInt(_v2.style.top) + 2 * _this.BLOCK_SIZE + 'px';
                                    }
                                } catch (err) {
                                    _didIteratorError5 = true;
                                    _iteratorError5 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                            _iterator5.return();
                                        }
                                    } finally {
                                        if (_didIteratorError5) {
                                            throw _iteratorError5;
                                        }
                                    }
                                }

                                _this.curTop += 2;
                            } else {
                                console.log("can`t move down");
                            }
                            break;
                        default:
                            console.log("请选择上下左右按键");
                            break;
                    }
                }
            };
        }

        /**
         * 初始化方块*/

    }, {
        key: 'init',
        value: function init() {
            var next = document.querySelector('#next');
            next.innerHTML = null;
            //画出第一个activityModel
            this.checkArrWith1(this.arr, this.draw, document.body, 'activityModel');
            //画出第一个nextModel
            this.checkArrWith1(this.nextArr, this.draw, next, 'nextModel');
            debugger;
            var aciveModel = document.querySelectorAll('.activityModel');
            var fallDown = setTimeout(function loop() {
                //setTimeout会改变this的指向，所以需要bind(this)
                var canMoveDown = this.canMove(this.arr).canMoveDown;
                if (canMoveDown) {
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                        for (var _iterator6 = aciveModel[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var v = _step6.value;

                            v.style.top = parseInt(v.style.top) + this.BLOCK_SIZE + 'px';
                        }
                    } catch (err) {
                        _didIteratorError6 = true;
                        _iteratorError6 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                _iterator6.return();
                            }
                        } finally {
                            if (_didIteratorError6) {
                                throw _iteratorError6;
                            }
                        }
                    }

                    this.curTop++;
                    setTimeout(loop.bind(this), this.delay / window.__level__);
                } else {
                    for (var i = 0; i <= aciveModel.length - 1; i++) {
                        aciveModel[i].className = 'inactiveModel';
                    }

                    var res = this.eliminate();
                    for (var _i = 0; _i < res.length; _i++) {
                        var _res$_i = res[_i],
                            count = _res$_i.count,
                            models = _res$_i.models,
                            top = _res$_i.top;

                        if (count === parseInt(this.siteSize.width / this.BLOCK_SIZE)) {
                            for (var j = 0; j < models.length; j++) {
                                document.body.removeChild(models[j]);
                            }
                            var inactiveModels = document.querySelectorAll('.inactiveModel');
                            var _iteratorNormalCompletion7 = true;
                            var _didIteratorError7 = false;
                            var _iteratorError7 = undefined;

                            try {
                                for (var _iterator7 = inactiveModels[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                    var _v3 = _step7.value;

                                    if (parseInt(_v3.style.top) < top) {
                                        _v3.style.top = parseInt(_v3.style.top) + this.BLOCK_SIZE + 'px';
                                    }
                                }
                            } catch (err) {
                                _didIteratorError7 = true;
                                _iteratorError7 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                        _iterator7.return();
                                    }
                                } finally {
                                    if (_didIteratorError7) {
                                        throw _iteratorError7;
                                    }
                                }
                            }

                            window.__score__ += window.__level__ * 100;
                            var score = document.querySelector('#score');
                            score.innerText = window.__score__;
                            if (window.__score__ - (window.__level__ - 1) * (window.__level__ - 1) * 1000 >= window.__level__ * window.__level__ * 1000 && window.__level__ <= 4) {
                                window.__level__++;
                                var level = document.querySelector('#level');
                                level.innerText = window.__level__;
                            }
                        }
                    }

                    if (this.gameOver()) {
                        console.log('game over');
                        var curTop = this.siteSize.height + this.siteSize.top - this.BLOCK_SIZE,
                            curLeft = this.siteSize.width + this.siteSize.left - this.BLOCK_SIZE;
                        var fillId = setInterval(function () {
                            var _this2 = this;

                            Block.fill(curTop, curLeft);
                            curLeft -= this.BLOCK_SIZE;
                            if (curLeft < this.siteSize.left) {
                                curLeft = this.siteSize.width + this.siteSize.left - this.BLOCK_SIZE;
                                curTop -= this.BLOCK_SIZE;
                            }
                            if (curTop < this.siteSize.top) {
                                clearInterval(fillId);
                                var _next = document.querySelector('#next');
                                _next.innerHTML = null;
                                var startOrRestart = document.querySelector('.start-restart');
                                startOrRestart.style.display = 'block';
                                startOrRestart.onclick = function (e) {
                                    e.preventDefault();
                                    startOrRestart.style.display = 'none';
                                    var inactiveModels = [].concat(_toConsumableArray(document.querySelectorAll('.inactiveModel')));
                                    if (inactiveModels.length > 0) {
                                        var _iteratorNormalCompletion8 = true;
                                        var _didIteratorError8 = false;
                                        var _iteratorError8 = undefined;

                                        try {
                                            for (var _iterator8 = inactiveModels[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                                var _v4 = _step8.value;

                                                document.body.removeChild(_v4);
                                            }
                                        } catch (err) {
                                            _didIteratorError8 = true;
                                            _iteratorError8 = err;
                                        } finally {
                                            try {
                                                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                                    _iterator8.return();
                                                }
                                            } finally {
                                                if (_didIteratorError8) {
                                                    throw _iteratorError8;
                                                }
                                            }
                                        }
                                    }
                                    if (_this2.highestScore < window.__score__) {
                                        localStorage.setItem('highestScore', window.__score__);
                                        var highestScoreDiv = document.querySelector('#highest-score');
                                        highestScoreDiv.innerText = window.__score__;
                                    }
                                    window.__score__ = 0;
                                    var score = document.querySelector('#score');
                                    score.innerText = window.__score__;
                                    window.__level__ = 1;
                                    var level = document.querySelector('#level');
                                    level.innerText = window.__level__;
                                    _this2.init();
                                };
                            }
                        }.bind(this), 30);
                    } else {
                        _init(this.nextArr);
                    }
                    clearTimeout(fallDown);
                }
            }.bind(this), 600);
        }
    }], [{
        key: 'fill',
        value: function fill(curTop, curLeft) {
            var model = document.createElement('div');
            model.className = 'inactiveModel';
            model.style.left = curLeft + 'px';
            model.style.top = curTop + 'px';
            document.body.appendChild(model);
        }
    }]);

    return Block;
}();
/**
 * 数据初始化
 */


var _init = function _init(nextArr) {
    var random = Math.floor(Math.random() * __arr__.length),
        //当前方块数组
    nextRandom = Math.floor(Math.random() * __arr__.length),
        //下一方块数组
    arr = nextArr ? nextArr : __arr__[random],
        //arr为二维数组 如果有传进init()参数，使用参数为arr,否则以[random]为arr
    delay = 600;
    var params = {
        arr: arr,
        nextArr: __arr__[nextRandom],
        siteSize: __siteSize__,
        BLOCK_SIZE: __BLOCK_SIZE__,
        curLeft: __curLeft__,
        curTop: __curTop__,
        delay: delay,
        highestScore: __highestScore__
    };
    var block = new Block(params); //实例化对象class
    block.init(); //调用实例init方法
    block.move(); //调用实例move方法
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
window.onload = function () {
    var site = document.querySelector('.site');
    // Window.getComputedStyle() 方法会在一个元素应用完有效样式且计算完所有属性的基本值之后给出所有 CSS 属性的值。

    var _window$getComputedSt = window.getComputedStyle(site),
        width = _window$getComputedSt.width,
        height = _window$getComputedSt.height,
        left = _window$getComputedSt.left,
        top = _window$getComputedSt.top;
    //将获取到的width, height, left, top放到一个对象里


    var siteSize = {
        width: parseInt(width),
        height: parseInt(height),
        left: parseInt(left),
        top: parseInt(top)
    };
    //定义不同形状 三位数组
    var arr = [
    //L
    [[1, 0], [1, 0], [1, 1]], [[1, 1, 1], [1, 0, 0]], [[1, 1], [0, 1], [0, 1]], [[0, 0, 1], [1, 1, 1]],
    //』
    [[0, 1], [0, 1], [1, 1]], [[1, 0, 0], [1, 1, 1]], [[1, 1], [1, 0], [1, 0]], [[1, 1, 1], [0, 0, 1]],
    //I
    [[1], [1], [1], [1]], [[1, 1, 1, 1]], [[1], [1], [1], [1]], [[1, 1, 1, 1]],
    //田
    [[1, 1], [1, 1]], [[1, 1], [1, 1]], [[1, 1], [1, 1]], [[1, 1], [1, 1]],
    //T
    [[1, 1, 1], [0, 1, 0]], [[0, 1], [1, 1], [0, 1]], [[0, 1, 0], [1, 1, 1]], [[1, 0], [1, 1], [1, 0]],
    //Z
    [[1, 1, 0], [0, 1, 1]], [[0, 1], [1, 1], [1, 0]], [[1, 1, 0], [0, 1, 1]], [[0, 1], [1, 1], [1, 0]],
    //倒Z
    [[0, 1, 1], [1, 1, 0]], [[1, 0], [1, 1], [0, 1]], [[0, 1, 1], [1, 1, 0]], [[1, 0], [1, 1], [0, 1]]];
    var BLOCK_SIZE = 20;
    /*定义开始偏移量基数*/
    var curLeft = parseInt((siteSize.left + siteSize.width / 2) / BLOCK_SIZE); //15，偏移15个单位
    var curTop = parseInt(siteSize.top / BLOCK_SIZE); //10
    window.__arr__ = arr;
    window.__siteSize__ = siteSize;
    window.__BLOCK_SIZE__ = BLOCK_SIZE;
    window.__curLeft__ = curLeft;
    window.__curTop__ = curTop;
    window.__level__ = 1;
    window.__score__ = 0;
    var highestScore = localStorage.getItem('highestScore') || 0;
    var highestScoreDiv = document.querySelector('#highest-score');
    highestScoreDiv.innerText = highestScore;
    window.__highestScore__ = highestScore;

    var start = document.querySelector('.start-restart');
    start.onclick = function (e) {
        e.preventDefault();
        start.innerText = 'restart';
        start.style.display = 'none';
        _init();
    };
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkJsb2NrIiwicGFyYW1zIiwic2l0ZVNpemUiLCJhcnIiLCJuZXh0QXJyIiwiaGlnaGVzdFNjb3JlIiwiZGVsYXkiLCJCTE9DS19TSVpFIiwiY3VyTGVmdCIsImN1clRvcCIsIm5ld0FyciIsImkiLCJsZW5ndGgiLCJ0ZW1BcnIiLCJqIiwicHVzaCIsImxlZnRzIiwidG9wcyIsImNoZWNrQXJyV2l0aDEiLCJjYWxsYmFjayIsImVsIiwiY2xhc3NOYW1lIiwiY29uc29sZSIsImxvZyIsImNhbGwiLCJsZWZ0Iiwid2lkdGgiLCJ0b3AiLCJtb2RlbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwiYXBwZW5kQ2hpbGQiLCJpbmFjdGl2ZU1vZGVsIiwicXVlcnlTZWxlY3RvckFsbCIsImhpZ2hlc3QiLCJsZWZ0bW9zdCIsInJpZ2h0bW9zdCIsImhlaWdodCIsInJpZ2h0cyIsInYiLCJwYXJzZUludCIsIk1hdGgiLCJtaW4iLCJtYXgiLCJyZXMiLCJpbmFjdGl2ZU1vZGVscyIsInNvcnQiLCJhIiwiYiIsImNvdW50IiwibW9kZWxzIiwiZGVmb3JtIiwiZGlzcGFsY2VtZW50IiwibW92ZSIsImNhbk1vdmVSaWdodCIsImNhbk1vdmVEb3duIiwiY2FuTW92ZUxlZnQiLCJnZXRJbnRlcnZhbCIsIm9ua2V5ZG93biIsImUiLCJhY3RpdmVNb2RlbCIsImNhbk1vdmVUb3AiLCJrZXkiLCJrZXlDb2RlIiwiY2FuTW92ZSIsImNsb2Nrd2lzZSIsIm5leHQiLCJxdWVyeVNlbGVjdG9yIiwiaW5uZXJIVE1MIiwiZHJhdyIsImJvZHkiLCJhY2l2ZU1vZGVsIiwiZmFsbERvd24iLCJzZXRUaW1lb3V0IiwibG9vcCIsImJpbmQiLCJ3aW5kb3ciLCJfX2xldmVsX18iLCJlbGltaW5hdGUiLCJyZW1vdmVDaGlsZCIsIl9fc2NvcmVfXyIsInNjb3JlIiwiaW5uZXJUZXh0IiwibGV2ZWwiLCJnYW1lT3ZlciIsImZpbGxJZCIsInNldEludGVydmFsIiwiZmlsbCIsImNsZWFySW50ZXJ2YWwiLCJzdGFydE9yUmVzdGFydCIsImRpc3BsYXkiLCJvbmNsaWNrIiwicHJldmVudERlZmF1bHQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiaGlnaGVzdFNjb3JlRGl2IiwiaW5pdCIsImNsZWFyVGltZW91dCIsInJhbmRvbSIsImZsb29yIiwiX19hcnJfXyIsIm5leHRSYW5kb20iLCJfX3NpdGVTaXplX18iLCJfX0JMT0NLX1NJWkVfXyIsIl9fY3VyTGVmdF9fIiwiX19jdXJUb3BfXyIsIl9faGlnaGVzdFNjb3JlX18iLCJibG9jayIsIm9ubG9hZCIsInNpdGUiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0SXRlbSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBSUE7Ozs7QUFJQTs7Ozs7Ozs7Ozs7OztJQWFNQSxLO0FBQ0YsbUJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDaEI7OztBQUdBLGFBQUtDLFFBQUwsR0FBZ0JELE9BQU9DLFFBQXZCO0FBQ0EsYUFBS0MsR0FBTCxHQUFXRixPQUFPRSxHQUFsQjtBQUNBLGFBQUtDLE9BQUwsR0FBYUgsT0FBT0csT0FBcEI7QUFDQSxhQUFLQyxZQUFMLEdBQWtCSixPQUFPSSxZQUF6QjtBQUNBLGFBQUtDLEtBQUwsR0FBV0wsT0FBT0ssS0FBbEI7QUFDQSxhQUFLQyxVQUFMLEdBQWtCTixPQUFPTSxVQUF6QjtBQUNBLGFBQUtDLE9BQUwsR0FBZVAsT0FBT08sT0FBdEI7QUFDQSxhQUFLQyxNQUFMLEdBQWNSLE9BQU9RLE1BQXJCO0FBQ0g7O0FBRUQ7Ozs7Ozs7a0NBR1VOLEcsRUFBSztBQUNYLGdCQUFJTyxTQUFTLEVBQWI7QUFDQSxpQkFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLEtBQUtSLElBQUksQ0FBSixFQUFPUyxNQUFQLEdBQWdCLENBQXJDLEVBQXdDRCxHQUF4QyxFQUE2QztBQUN6QyxvQkFBSUUsU0FBUyxFQUFiO0FBQ0EscUJBQUssSUFBSUMsSUFBSVgsSUFB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QUFVaUMsU0FBUyxDQUFDdkMsU0FBU3VCLElBQVQsR0FBZ0J2QixTQUFTd0IsS0FBVCxHQUFpQixDQUFsQyxJQUF1Q25CLFVBQWhELENBQWQsQ0FuRGtCLENBbUR3RDtBQUMxRSxRQUFJRSxTQUFTZ0MsU0FBU3ZDLFNBQVN5QixHQUFULEdBQWVwQixVQUF4QixDQUFiLENBcERrQixDQW9EK0I7QUFDakRzRSxXQUFPd0IsT0FBUCxHQUFpQmxHLEdBQWpCO0FBQ0EwRSxXQUFPMEIsWUFBUCxHQUFzQnJHLFFBQXRCO0FBQ0EyRSxXQUFPMkIsY0FBUCxHQUF3QmpHLFVBQXhCO0FBQ0FzRSxXQUFPNEIsV0FBUCxHQUFxQmpHLE9BQXJCO0FBQ0FxRSxXQUFPNkIsVUFBUCxHQUFvQmpHLE1BQXBCO0FBQ0FvRSxXQUFPQyxTQUFQLEdBQWlCLENBQWpCO0FBQ0FELFdBQU9JLFNBQVAsR0FBaUIsQ0FBakI7QUFDQSxRQUFNNUUsZUFBYXlGLGFBQWFrQixPQUFiLENBQXFCLGNBQXJCLEtBQXdDLENBQTNEO0FBQ0EsUUFBSWhCLGtCQUFnQm5FLFNBQVN1QyxhQUFULENBQXVCLGdCQUF2QixDQUFwQjtBQUNBNEIsb0JBQWdCYixTQUFoQixHQUEwQjlFLFlBQTFCO0FBQ0F3RSxXQUFPOEIsZ0JBQVAsR0FBd0J0RyxZQUF4Qjs7QUFFQSxRQUFJNEcsUUFBTXBGLFNBQVN1QyxhQUFULENBQXVCLGdCQUF2QixDQUFWO0FBQ0E2QyxVQUFNckIsT0FBTixHQUFjLFVBQUNoQyxDQUFELEVBQUs7QUFDZkEsVUFBRWlDLGNBQUY7QUFDQW9CLGNBQU05QixTQUFOLEdBQWdCLFNBQWhCO0FBQ0E4QixjQUFNbEYsS0FBTixDQUFZNEQsT0FBWixHQUFvQixNQUFwQjtBQUNBTTtBQUNILEtBTEQ7QUFRSCxDQTFFRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFkbWluaXN0cmF0b3Igb24gMjAxNy8yLzIwLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiDlrprkuYnmlrnlnZdcclxuICovXHJcblxyXG4vKipcclxuICogRVM2IENsYXNzXHJcbiAqIENsYXNz5LiN5a2Y5Zyo5Y+Y6YeP5o+Q5Y2H77yIaG9pc3TvvInvvIzov5nkuIDngrnkuI5FUzXlrozlhajkuI3lkIzjgIJcclxuICogY2xhc3MgQmFyIHtcclxuICogICBjb25zdHJ1Y3Rvcigpe30gY29uc3RydWN0b3Lmlrnms5XmmK/nsbvnmoTpu5jorqTmlrnms5VcclxuICogICBkb1N0dWZmKCkge1xyXG4gKiAgICBjb25zb2xlLmxvZygnc3R1ZmYnKTtcclxuICogICB9XHJcbiAqIH1cclxuICog5L2/55So55qE5pe25YCZ77yM5Lmf5piv55u05o6l5a+557G75L2/55SobmV35ZG95Luk77yM6Lef5p6E6YCg5Ye95pWw55qE55So5rOV5a6M5YWo5LiA6Ie044CCXHJcbiAqIHZhciBiID0gbmV3IEJhcigpO1xyXG4gKiBiLmRvU3R1ZmYoKSAvLyBcInN0dWZmXCJcclxuICovXHJcbmNsYXNzIEJsb2NrIHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWwhm5ldyBCbG9jayhwYXJhbXMpIOWPguaVsOS8oOi/m3RoaXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNpdGVTaXplID0gcGFyYW1zLnNpdGVTaXplO1xyXG4gICAgICAgIHRoaXMuYXJyID0gcGFyYW1zLmFycjtcclxuICAgICAgICB0aGlzLm5leHRBcnI9cGFyYW1zLm5leHRBcnI7XHJcbiAgICAgICAgdGhpcy5oaWdoZXN0U2NvcmU9cGFyYW1zLmhpZ2hlc3RTY29yZTtcclxuICAgICAgICB0aGlzLmRlbGF5PXBhcmFtcy5kZWxheTtcclxuICAgICAgICB0aGlzLkJMT0NLX1NJWkUgPSBwYXJhbXMuQkxPQ0tfU0laRTtcclxuICAgICAgICB0aGlzLmN1ckxlZnQgPSBwYXJhbXMuY3VyTGVmdDtcclxuICAgICAgICB0aGlzLmN1clRvcCA9IHBhcmFtcy5jdXJUb3A7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDnu4Tnn6npmLXpobrml7bpkojml4vovaxcclxuICAgICAqL1xyXG4gICAgY2xvY2t3aXNlKGFycikge1xyXG4gICAgICAgIGxldCBuZXdBcnIgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBhcnJbMF0ubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1BcnIgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGFyci5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xyXG4gICAgICAgICAgICAgICAgdGVtQXJyLnB1c2goYXJyW2pdW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdBcnIucHVzaCh0ZW1BcnIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZWZ0cyA9IFtdO1xyXG4gICAgICAgIGxldCB0b3BzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuY2hlY2tBcnJXaXRoMShuZXdBcnIsIGZ1bmN0aW9uIChpLCBqKSB7XHJcbiAgICAgICAgICAgIGxlZnRzLnB1c2goaiAqIHRoaXMuQkxPQ0tfU0laRSk7XHJcbiAgICAgICAgICAgIHRvcHMucHVzaChpICogdGhpcy5CTE9DS19TSVpFKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmV3QXJyOiBuZXdBcnIsXHJcbiAgICAgICAgICAgIGxlZnRzOiBsZWZ0cyxcclxuICAgICAgICAgICAgdG9wczogdG9wc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreS6jOe7tOaVsOe7hOS4ujHnmoTkuIvmoIdcclxuICAgICAqL1xyXG5cclxuICAgIGNoZWNrQXJyV2l0aDEoYXJyLCBjYWxsYmFjayxlbCxjbGFzc05hbWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhhcnIpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gYXJyLmxlbmd0aCAtIDE7IGkrKykgey8v5b6q546v5LqM57u05pWw57uEXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGFyclswXS5sZW5ndGggLSAxOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIC8v5aaC5p6c5LqM57u05pWw5o2u6YeM55qE5pWw5o2u5Li6Me+8jOWImeaKimksauWvueW6lOeahOS9jee9rueUu+WHuuadpVxyXG4gICAgICAgICAgICAgICAgaWYgKGFycltpXVtqXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBpICsgdGhpcy5jdXJUb3AsIGogKyB0aGlzLmN1ckxlZnQsZWwsIGNsYXNzTmFtZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruaVsOe7hOefqemYteeUu+WHuuW9k+WJjeaWueWdl1xyXG4gICAgICovXHJcbiAgICBkcmF3KGksIGosZWwsY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgbGV0IGxlZnQgPSBjbGFzc05hbWUgPT09ICduZXh0TW9kZWwnID8gaiAqIHRoaXMuQkxPQ0tfU0laRSAtICh0aGlzLnNpdGVTaXplLmxlZnQgKyB0aGlzLnNpdGVTaXplLndpZHRoIC8gMiAtIHRoaXMuQkxPQ0tfU0laRSkgOiBqICogdGhpcy5CTE9DS19TSVpFO1xyXG4gICAgICAgIGxldCB0b3AgPSBjbGFzc05hbWUgPT09ICduZXh0TW9kZWwnID8gaSAqIHRoaXMuQkxPQ0tfU0laRSAtIHRoaXMuc2l0ZVNpemUudG9wIDogaSAqIHRoaXMuQkxPQ0tfU0laRTtcclxuICAgICAgICBsZXQgbW9kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBtb2RlbC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICAgICAgbW9kZWwuc3R5bGUudG9wID0gYCR7dG9wfXB4YDtcclxuICAgICAgICBtb2RlbC5zdHlsZS5sZWZ0ID0gYCR7bGVmdH1weGA7XHJcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQobW9kZWwpO1xyXG4gICAgICAgIGRlYnVnZ2VyXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKuiOt+WPluW9k+WJjeaWueWdl+WPr+S7peWIsOi+vueahOi+ueeVjFxyXG4gICAgICovXHJcbiAgICBnZXRJbnRlcnZhbChjdXJMZWZ0LCBjdXJUb3ApIHtcclxuICAgICAgICBsZXQgaW5hY3RpdmVNb2RlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbmFjdGl2ZU1vZGVsJyksLy/ojrflj5blt7Lnu4/lpLHmlYjnmoRtb2RlbFxyXG4gICAgICAgICAgICBoaWdoZXN0ID0gbnVsbCxcclxuICAgICAgICAgICAgbGVmdG1vc3QgPSBudWxsLFxyXG4gICAgICAgICAgICByaWdodG1vc3QgPSBudWxsO1xyXG4gICAgICAgIGlmIChpbmFjdGl2ZU1vZGVsLmxlbmd0aCA9PT0gMCkgey8v5aaC5p6c5rKh5pyJ5aSx5pWI55qEbW9kZWws5YiZ6L6555WM5Li6XHJcbiAgICAgICAgICAgIGhpZ2hlc3QgPSB0aGlzLnNpdGVTaXplLnRvcCArIHRoaXMuc2l0ZVNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICBsZWZ0bW9zdCA9IHRoaXMuc2l0ZVNpemUubGVmdCAtIHRoaXMuQkxPQ0tfU0laRTtcclxuICAgICAgICAgICAgcmlnaHRtb3N0ID0gdGhpcy5zaXRlU2l6ZS5sZWZ0ICsgdGhpcy5zaXRlU2l6ZS53aWR0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdG9wcyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgbGVmdHMgPSBbXSxcclxuICAgICAgICAgICAgICAgIHJpZ2h0cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIGluYWN0aXZlTW9kZWwpIHsvL+W+queOr+aJgOacieeahOWkseaViG1vZGVsXHJcbiAgICAgICAgICAgICAgICBsZXQgbGVmdCA9IHBhcnNlSW50KHYuc3R5bGUubGVmdCksLy/ojrflvpfmr4/kuIDkuKrlpLHmlYhtb2RlbOeahGxlZnTlkox0b3BcclxuICAgICAgICAgICAgICAgICAgICB0b3AgPSBwYXJzZUludCh2LnN0eWxlLnRvcCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVmdCA9PT0gY3VyTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcHMucHVzaCh0b3ApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodG9wID09PSBjdXJUb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCA8IGN1ckxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdHMucHVzaChsZWZ0KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGVmdCA+IGN1ckxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRzLnB1c2gobGVmdClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRvcHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBoaWdoZXN0ID0gdGhpcy5zaXRlU2l6ZS50b3AgKyB0aGlzLnNpdGVTaXplLmhlaWdodDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhpZ2hlc3QgPSBNYXRoLm1pbiguLi50b3BzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxlZnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGVmdG1vc3QgPSB0aGlzLnNpdGVTaXplLmxlZnQgLSB0aGlzLkJMT0NLX1NJWkU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0bW9zdCA9IE1hdGgubWF4KC4uLmxlZnRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJpZ2h0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0bW9zdCA9IHRoaXMuc2l0ZVNpemUubGVmdCArIHRoaXMuc2l0ZVNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByaWdodG1vc3QgPSBNYXRoLm1pbiguLi5yaWdodHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhpZ2hlc3Q6IGhpZ2hlc3QsXHJcbiAgICAgICAgICAgIGxlZnRtb3N0OiBsZWZ0bW9zdCxcclxuICAgICAgICAgICAgcmlnaHRtb3N0OiByaWdodG1vc3RcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5raI6Zmk56CW5Z2XXHJcbiAgICAgKi9cclxuICAgIGVsaW1pbmF0ZSgpIHtcclxuICAgICAgICBsZXQgcmVzID0gW10sXHJcbiAgICAgICAgICAgIGluYWN0aXZlTW9kZWxzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbmFjdGl2ZU1vZGVsJyldO1xyXG4gICAgICAgIGluYWN0aXZlTW9kZWxzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEuc3R5bGUudG9wKSAtIHBhcnNlSW50KGIuc3R5bGUudG9wKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmFjdGl2ZU1vZGVscy5sZW5ndGg7KSB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDAsXHJcbiAgICAgICAgICAgICAgICBtb2RlbHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpbmFjdGl2ZU1vZGVscy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluYWN0aXZlTW9kZWxzW2ldLnN0eWxlLnRvcCA9PT0gaW5hY3RpdmVNb2RlbHNbal0uc3R5bGUudG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbHMucHVzaChpbmFjdGl2ZU1vZGVsc1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG1vZGVsczogbW9kZWxzLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IGNvdW50LFxyXG4gICAgICAgICAgICAgICAgdG9wOiBwYXJzZUludChpbmFjdGl2ZU1vZGVsc1tpXS5zdHlsZS50b3ApXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL2ZvciDlvqrnjq/nmoTmnIDlkI7kuIDkuKrlj4LmlbDlj6/ku6XmlL7lnKjlvqrnjq/kvZPlhoVcclxuICAgICAgICAgICAgaSArPSBjb3VudFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T54Gw6Imy56CW5Z2X6auY5LqO55S75biD5YGP56e76YeP77yM5ri45oiP57uT5p2fXHJcbiAgICAgKi9cclxuICAgIGdhbWVPdmVyKCl7XHJcbiAgICAgICAgY29uc3QgaW5hY3RpdmVNb2RlbD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5hY3RpdmVNb2RlbCcpO1xyXG4gICAgICAgIGxldCB0b3BzPVtdO1xyXG4gICAgICAgIGZvcihsZXQgdiBvZiBpbmFjdGl2ZU1vZGVsKXtcclxuICAgICAgICAgICAgdG9wcy5wdXNoKHBhcnNlSW50KHYuc3R5bGUudG9wKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbiguLi50b3BzKSA8PXRoaXMuc2l0ZVNpemUudG9wXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnYW1lT3ZlcuWhq+WFheWKqOeUu1xyXG4gICAgICovXHJcbiAgICAvKipcclxuICAgICAqIGNsYXNzIOmdmeaAgeaWueazlVxyXG4gICAgICog6K+l5pa55rOV5LiN5Lya6KKr5a6e5L6L57un5om/77yM6ICM5piv55u05o6l6YCa6L+H57G75p2l6LCD55SoIEJsb2NrLmZpbGwoKTtcclxuICAgICAqIOeItuexu+eahOmdmeaAgeaWueazle+8jOWPr+S7peiiq+WtkOexu+e7p+aJv+OAglxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZmlsbChjdXJUb3AsY3VyTGVmdCl7XHJcbiAgICAgICAgbGV0IG1vZGVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG1vZGVsLmNsYXNzTmFtZT0naW5hY3RpdmVNb2RlbCc7XHJcbiAgICAgICAgbW9kZWwuc3R5bGUubGVmdD1gJHtjdXJMZWZ0fXB4YDtcclxuICAgICAgICBtb2RlbC5zdHlsZS50b3A9YCR7Y3VyVG9wfXB4YDtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGVsKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Y+v5Lul56e75YqoXHJcbiAgICAgKi9cclxuICAgIGNhbk1vdmUoYXJyLCBkZWZvcm0gPSBmYWxzZSwgZGlzcGFsY2VtZW50PTEsbW92ZSA9IHtcclxuICAgICAgICBjYW5Nb3ZlUmlnaHQ6IHRydWUsXHJcbiAgICAgICAgY2FuTW92ZURvd246IHRydWUsXHJcbiAgICAgICAgY2FuTW92ZUxlZnQ6IHRydWVcclxuICAgIH0pIHtcclxuICAgICAgICAvL2NoZWNrQXJyV2l0aDHmmK/noa7lrppp77yMalxyXG4gICAgICAgIHRoaXMuY2hlY2tBcnJXaXRoMShhcnIsIGZ1bmN0aW9uIChpLCBqKSB7XHJcbiAgICAgICAgICAgIGxldCB7aGlnaGVzdCwgbGVmdG1vc3QsIHJpZ2h0bW9zdH09dGhpcy5nZXRJbnRlcnZhbChqICogdGhpcy5CTE9DS19TSVpFLCBpICogdGhpcy5CTE9DS19TSVpFKTtcclxuICAgICAgICAgICAgaWYgKGRlZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChqICsgMSkgPiByaWdodG1vc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlLmNhbk1vdmVSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChpICsgZGlzcGFsY2VtZW50KSA+IGhpZ2hlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlLmNhbk1vdmVEb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5CTE9DS19TSVpFICogKGogLSAxKSA8IGxlZnRtb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlTGVmdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5CTE9DS19TSVpFICogKGogKyAxKSA+PSByaWdodG1vc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlLmNhbk1vdmVSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChpICsgZGlzcGFsY2VtZW50KSA+PSBoaWdoZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChqIC0gMSkgPD0gbGVmdG1vc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlLmNhbk1vdmVMZWZ0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbW92ZTtcclxuICAgICAgICAvKiBBcnJheS5mcm9t5pa55rOV55So5LqO5bCG57G75pWw57uE6L2s5Li655yf5q2j55qE5pWw57uEXHJcbiAgICAgICAgIGZvci4uLm9mOiBmb3IuLi5pbuW+queOr+ivu+WPlumUruWQje+8jGZvci4uLm9m5b6q546v6K+75Y+W6ZSu5YC8XHJcbiAgICAgICAgIGZvcihsZXQgdiBvZiBBcnJheS5mcm9tKGFjdGl2ZU1vZGVsKSl7XHJcbiAgICAgICAgIHRvcHMucHVzaChwYXJzZUludCh2LnN0eWxlLnRvcCkpO1xyXG4gICAgICAgICBsZWZ0cy5wdXNoKHBhcnNlSW50KHYuc3R5bGUubGVmdCkpXHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIG1pbigpIOaWueazleWPr+i/lOWbnuaMh+WumueahOaVsOWtl+S4reW4puacieacgOS9juWAvOeahOaVsOWtl+OAguWPguaVsOS4uueUqOmAl+WPt+WIhumalOeahOWPguaVsOW6j+WIl++8jOS4jeaYr+aVsOe7hFxyXG4gICAgICAgICBtYXgoKSDmlrnms5Xlj6/ov5Tlm57mjIflrprnmoTmlbDlrZfkuK3luKbmnInmnIDlpKflgLznmoTmlbDlrZfjgIJcclxuICAgICAgICAgLi4uIOaJqeWxlei/kOeul+espu+8muWwhuaVsOe7hOi9rOS4uueUqOmAl+WPt+WIhumalOeahOWPguaVsOW6j+WIl1xyXG4gICAgICAgICAuLi4gcmVzZXTov5DnrpfnrKbvvJrlhbblip/og73kuI7mianlsZXov5DnrpfnrKbmgbDlpb3nm7jlj43vvIzmiorpgJflj7fpmpTlvIDnmoTlgLzluo/liJfnu4TlkIjmiJDkuIDkuKrmlbDnu4RcclxuICAgICAgICAgbGV0IHRvcCA9IE1hdGgubWluKC4uLnRvcHMpLFxyXG4gICAgICAgICBsZWZ0ID0gTWF0aC5taW4oLi4ubGVmdHMpLFxyXG4gICAgICAgICByaWdodCA9IE1hdGgubWF4KC4uLmxlZnRzKSxcclxuICAgICAgICAgZG93biA9IE1hdGgubWF4KC4uLnRvcHMpO1xyXG4gICAgICAgICBpZiAoZGVmb3JtKSB7XHJcbiAgICAgICAgIGlmIChyaWdodCArIDIwID49IHRoaXMuc2l0ZVNpemUubGVmdCArIHRoaXMuc2l0ZVNpemUud2lkdGgpIHtcclxuICAgICAgICAgY2FuTW92ZVJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgaWYgKHJpZ2h0ICsgMjAgPj0gdGhpcy5zaXRlU2l6ZS5sZWZ0ICsgdGhpcy5zaXRlU2l6ZS53aWR0aCkge1xyXG4gICAgICAgICBjYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBpZiAobGVmdCAtIDIwIDwgdGhpcy5zaXRlU2l6ZS5sZWZ0KSB7XHJcbiAgICAgICAgIGNhbk1vdmVMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYgKGRvd24gKyAyMCA+PSB0aGlzLnNpdGVTaXplLnRvcCArIHRoaXMuc2l0ZVNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgIGNhbk1vdmVEb3duID0gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYgKHRvcCAtIDIwIDwgdGhpcy5zaXRlU2l6ZS50b3ApIHtcclxuICAgICAgICAgY2FuTW92ZVRvcCA9IGZhbHNlO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICBjYW5Nb3ZlUmlnaHQ6IGNhbk1vdmVSaWdodCxcclxuICAgICAgICAgY2FuTW92ZUxlZnQ6IGNhbk1vdmVMZWZ0LFxyXG4gICAgICAgICBjYW5Nb3ZlVG9wOiBjYW5Nb3ZlVG9wLFxyXG4gICAgICAgICBjYW5Nb3ZlRG93bjogY2FuTW92ZURvd25cclxuICAgICAgICAgfSovXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplK7nm5jkuovku7ZcclxuICAgICAqL1xyXG4gICAgbW92ZSgpIHtcclxuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSAoZSk9PiB7XHJcbiAgICAgICAgICAgIGxldCBhY3RpdmVNb2RlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpdml0eU1vZGVsJyksXHJcbiAgICAgICAgICAgICAgICBtb3ZlLFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlVG9wLFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGUua2V5Q29kZTtcclxuICAgICAgICAgICAgaWYoYWN0aXZlTW9kZWwubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZUxlZnQgPSB0aGlzLmNhbk1vdmUodGhpcy5hcnIpLmNhbk1vdmVMZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuTW92ZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHYgb2YgYWN0aXZlTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LnN0eWxlLmxlZnQgPSBgJHtwYXJzZUludCh2LnN0eWxlLmxlZnQpIC0gdGhpcy5CTE9DS19TSVpFfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyTGVmdC0tO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSBsZWZ0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdXBcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQge25ld0FyciwgbGVmdHMsIHRvcHN9PXRoaXMuY2xvY2t3aXNlKHRoaXMuYXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZSA9IHRoaXMuY2FuTW92ZShuZXdBcnIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlRG93biA9IG1vdmUuY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVSaWdodCA9IG1vdmUuY2FuTW92ZVJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlTGVmdCA9IG1vdmUuY2FuTW92ZUxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYW5Nb3ZlUmlnaHQgJiYgY2FuTW92ZURvd24gJiYgY2FuTW92ZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyID0gbmV3QXJyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBsZWZ0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1vZGVsW2ldLnN0eWxlLmxlZnQgPSBgJHtsZWZ0c1tpXX1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTW9kZWxbaV0uc3R5bGUudG9wID0gYCR7dG9wc1tpXX1weGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL3JpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZVJpZ2h0ID0gdGhpcy5jYW5Nb3ZlKHRoaXMuYXJyKS5jYW5Nb3ZlUmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYW5Nb3ZlUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHYgb2YgYWN0aXZlTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LnN0eWxlLmxlZnQgPSBgJHtwYXJzZUludCh2LnN0eWxlLmxlZnQpICsgdGhpcy5CTE9DS19TSVpFfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyTGVmdCsrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbmB0IG1vdmUgcmlnaHRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDMyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlRG93biA9IHRoaXMuY2FuTW92ZSh0aGlzLmFycixmYWxzZSwyKS5jYW5Nb3ZlRG93bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbk1vdmVEb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFjdGl2ZU1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS50b3AgPSBgJHtwYXJzZUludCh2LnN0eWxlLnRvcCkgKyAyKnRoaXMuQkxPQ0tfU0laRX1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1clRvcCArPTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbmB0IG1vdmUgZG93blwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuivt+mAieaLqeS4iuS4i+W3puWPs+aMiemUrlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbmlrnlnZcqL1xyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBsZXQgbmV4dD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dCcpO1xyXG4gICAgICAgIG5leHQuaW5uZXJIVE1MPW51bGw7XHJcbiAgICAgICAgLy/nlLvlh7rnrKzkuIDkuKphY3Rpdml0eU1vZGVsXHJcbiAgICAgICAgdGhpcy5jaGVja0FycldpdGgxKHRoaXMuYXJyLCB0aGlzLmRyYXcsZG9jdW1lbnQuYm9keSwnYWN0aXZpdHlNb2RlbCcpO1xyXG4gICAgICAgIC8v55S75Ye656ys5LiA5LiqbmV4dE1vZGVsXHJcbiAgICAgICAgdGhpcy5jaGVja0FycldpdGgxKHRoaXMubmV4dEFycix0aGlzLmRyYXcsbmV4dCwnbmV4dE1vZGVsJyk7XHJcbiAgICAgICAgZGVidWdnZXJcclxuICAgICAgICBsZXQgYWNpdmVNb2RlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpdml0eU1vZGVsJyk7XHJcbiAgICAgICAgY29uc3QgZmFsbERvd24gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIGxvb3AoKSB7XHJcbiAgICAgICAgICAgIC8vc2V0VGltZW91dOS8muaUueWPmHRoaXPnmoTmjIflkJHvvIzmiYDku6XpnIDopoFiaW5kKHRoaXMpXHJcbiAgICAgICAgICAgIGxldCBjYW5Nb3ZlRG93biA9IHRoaXMuY2FuTW92ZSh0aGlzLmFycikuY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgIGlmIChjYW5Nb3ZlRG93bikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBhY2l2ZU1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS50b3AgPSBgJHtwYXJzZUludCh2LnN0eWxlLnRvcCkgKyB0aGlzLkJMT0NLX1NJWkV9cHhgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1clRvcCsrO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChsb29wLmJpbmQodGhpcyksdGhpcy5kZWxheS93aW5kb3cuX19sZXZlbF9fKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBhY2l2ZU1vZGVsLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjaXZlTW9kZWxbaV0uY2xhc3NOYW1lID0gJ2luYWN0aXZlTW9kZWwnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLmVsaW1pbmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQge2NvdW50LCBtb2RlbHMsIHRvcH09cmVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gcGFyc2VJbnQodGhpcy5zaXRlU2l6ZS53aWR0aCAvIHRoaXMuQkxPQ0tfU0laRSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtb2RlbHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobW9kZWxzW2pdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5hY3RpdmVNb2RlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5hY3RpdmVNb2RlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIGluYWN0aXZlTW9kZWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodi5zdHlsZS50b3ApIDwgdG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS50b3AgPSBgJHtwYXJzZUludCh2LnN0eWxlLnRvcCkgKyB0aGlzLkJMT0NLX1NJWkV9cHhgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9fc2NvcmVfXys9d2luZG93Ll9fbGV2ZWxfXyAqIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjb3JlPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY29yZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZS5pbm5lclRleHQ9d2luZG93Ll9fc2NvcmVfXztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5fX3Njb3JlX18gLSAod2luZG93Ll9fbGV2ZWxfXyAtIDEpICogKHdpbmRvdy5fX2xldmVsX18gLSAxKSAqIDEwMDAgPj0gd2luZG93Ll9fbGV2ZWxfXyAqIHdpbmRvdy5fX2xldmVsX18gKiAxMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB3aW5kb3cuX19sZXZlbF9fIDw9IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fX2xldmVsX18rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZXZlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsZXZlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwuaW5uZXJUZXh0ID0gd2luZG93Ll9fbGV2ZWxfXztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2FtZU92ZXIoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dhbWUgb3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJUb3A9dGhpcy5zaXRlU2l6ZS5oZWlnaHQrdGhpcy5zaXRlU2l6ZS50b3AtdGhpcy5CTE9DS19TSVpFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJMZWZ0PXRoaXMuc2l0ZVNpemUud2lkdGgrdGhpcy5zaXRlU2l6ZS5sZWZ0LXRoaXMuQkxPQ0tfU0laRTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsbElkPXNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmxvY2suZmlsbChjdXJUb3AsY3VyTGVmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckxlZnQgLT0gdGhpcy5CTE9DS19TSVpFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjdXJMZWZ0IDwgdGhpcy5zaXRlU2l6ZS5sZWZ0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckxlZnQgPXRoaXMuc2l0ZVNpemUud2lkdGgrdGhpcy5zaXRlU2l6ZS5sZWZ0LXRoaXMuQkxPQ0tfU0laRTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvcCAtPSB0aGlzLkJMT0NLX1NJWkVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjdXJUb3AgPCB0aGlzLnNpdGVTaXplLnRvcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGZpbGxJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5pbm5lckhUTUw9bnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydE9yUmVzdGFydD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtcmVzdGFydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPclJlc3RhcnQuc3R5bGUuZGlzcGxheT0nYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPclJlc3RhcnQub25jbGljaz0oZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPclJlc3RhcnQuc3R5bGUuZGlzcGxheT0nbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluYWN0aXZlTW9kZWxzPVsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5hY3RpdmVNb2RlbCcpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpbmFjdGl2ZU1vZGVscy5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdiBvZiBpbmFjdGl2ZU1vZGVscyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhpZ2hlc3RTY29yZSA8IHdpbmRvdy5fX3Njb3JlX18pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpZ2hlc3RTY29yZScsIHdpbmRvdy5fX3Njb3JlX18pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGlnaGVzdFNjb3JlRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hpZ2hlc3Qtc2NvcmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGVzdFNjb3JlRGl2LmlubmVyVGV4dCA9IHdpbmRvdy5fX3Njb3JlX187XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fX3Njb3JlX18gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY29yZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlLmlubmVyVGV4dCA9IHdpbmRvdy5fX3Njb3JlX187XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9fbGV2ZWxfXyA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxldmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xldmVsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwuaW5uZXJUZXh0ID0gd2luZG93Ll9fbGV2ZWxfXztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwzMClcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXQodGhpcy5uZXh0QXJyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGZhbGxEb3duKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLCA2MDApXHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIOaVsOaNruWIneWni+WMllxyXG4gKi9cclxuY29uc3QgaW5pdCA9IChuZXh0QXJyKT0+IHtcclxuICAgIGNvbnN0IHJhbmRvbT1NYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpKl9fYXJyX18ubGVuZ3RoKSksLy/lvZPliY3mlrnlnZfmlbDnu4RcclxuICAgICAgICBuZXh0UmFuZG9tPU1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkqX19hcnJfXy5sZW5ndGgpKSwvL+S4i+S4gOaWueWdl+aVsOe7hFxyXG4gICAgICAgIGFyciA9bmV4dEFyciA/IG5leHRBcnIgOiBfX2Fycl9fW3JhbmRvbV0sLy9hcnLkuLrkuoznu7TmlbDnu4Qg5aaC5p6c5pyJ5Lyg6L+baW5pdCgp5Y+C5pWw77yM5L2/55So5Y+C5pWw5Li6YXJyLOWQpuWImeS7pVtyYW5kb21d5Li6YXJyXHJcbiAgICAgICAgZGVsYXk9NjAwO1xyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIGFycjogYXJyLFxyXG4gICAgICAgIG5leHRBcnI6X19hcnJfX1tuZXh0UmFuZG9tXSxcclxuICAgICAgICBzaXRlU2l6ZTogX19zaXRlU2l6ZV9fLFxyXG4gICAgICAgIEJMT0NLX1NJWkU6IF9fQkxPQ0tfU0laRV9fLFxyXG4gICAgICAgIGN1ckxlZnQ6IF9fY3VyTGVmdF9fLFxyXG4gICAgICAgIGN1clRvcDogX19jdXJUb3BfXyxcclxuICAgICAgICBkZWxheTpkZWxheSxcclxuICAgICAgICBoaWdoZXN0U2NvcmU6X19oaWdoZXN0U2NvcmVfX1xyXG4gICAgfTtcclxuICAgIGxldCBibG9jayA9IG5ldyBCbG9jayhwYXJhbXMpOy8v5a6e5L6L5YyW5a+56LGhY2xhc3NcclxuICAgIGJsb2NrLmluaXQoKTsvL+iwg+eUqOWunuS+i2luaXTmlrnms5VcclxuICAgIGJsb2NrLm1vdmUoKTsvL+iwg+eUqOWunuS+i21vdmXmlrnms5VcclxufTtcclxuLyoqXHJcbiAq5rWP6KeI5Zmo5Yid5aeL5YyWXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEVTNueureWktOWHveaVsFxyXG4gKiDlh73mlbDkvZPlhoXnmoR0aGlz5a+56LGh77yM5bCx5piv5a6a5LmJ5pe25omA5Zyo55qE5a+56LGh77yM6ICM5LiN5piv5L2/55So5pe25omA5Zyo55qE5a+56LGh44CCXHJcbiAqIHZhciBzdW0gPSAobnVtMSwgbnVtMikgPT4gbnVtMSArIG51bTI7XHJcbiAqIOetieWQjOS6jlxyXG4gKiB2YXIgc3VtID0gZnVuY3Rpb24obnVtMSwgbnVtMikge1xyXG4gKiByZXR1cm4gbnVtMSArIG51bTI7XHJcbiAqIH07XHJcbiAqL1xyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgbGV0IHNpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZScpO1xyXG4gICAgLy8gV2luZG93LmdldENvbXB1dGVkU3R5bGUoKSDmlrnms5XkvJrlnKjkuIDkuKrlhYPntKDlupTnlKjlrozmnInmlYjmoLflvI/kuJTorqHnrpflrozmiYDmnInlsZ7mgKfnmoTln7rmnKzlgLzkuYvlkI7nu5nlh7rmiYDmnIkgQ1NTIOWxnuaAp+eahOWAvOOAglxyXG4gICAgbGV0IHt3aWR0aCwgaGVpZ2h0LCBsZWZ0LCB0b3B9ID13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzaXRlKTtcclxuICAgIC8v5bCG6I635Y+W5Yiw55qEd2lkdGgsIGhlaWdodCwgbGVmdCwgdG9w5pS+5Yiw5LiA5Liq5a+56LGh6YeMXHJcbiAgICBsZXQgc2l0ZVNpemUgPSB7XHJcbiAgICAgICAgd2lkdGg6IHBhcnNlSW50KHdpZHRoKSxcclxuICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KGhlaWdodCksXHJcbiAgICAgICAgbGVmdDogcGFyc2VJbnQobGVmdCksXHJcbiAgICAgICAgdG9wOiBwYXJzZUludCh0b3ApXHJcbiAgICB9O1xyXG4gICAgLy/lrprkuYnkuI3lkIzlvaLnirYg5LiJ5L2N5pWw57uEXHJcbiAgICBjb25zdCBhcnIgPVtcclxuICAgICAgICAvL0xcclxuICAgICAgICBbWzEsIDBdLCBbMSwgMF0sIFsxLCAxXV0sXHJcbiAgICAgICAgW1sxLCAxLCAxXSwgWzEsIDAsIDBdXSxcclxuICAgICAgICBbWzEsIDFdLCBbMCwgMV0sIFswLCAxXV0sXHJcbiAgICAgICAgW1swLCAwLCAxXSwgWzEsIDEsIDFdXSxcclxuICAgICAgICAvL+OAj1xyXG4gICAgICAgIFtbMCwgMV0sIFswLCAxXSwgWzEsIDFdXSxcclxuICAgICAgICBbWzEsIDAsIDBdLCBbMSwgMSwgMV1dLFxyXG4gICAgICAgIFtbMSwgMV0sIFsxLCAwXSwgWzEsIDBdXSxcclxuICAgICAgICBbWzEsIDEsIDFdLCBbMCwgMCwgMV1dLFxyXG4gICAgICAgIC8vSVxyXG4gICAgICAgIFtbMV0sIFsxXSwgWzFdLCBbMV1dLFxyXG4gICAgICAgIFtbMSwgMSwgMSwgMV1dLFxyXG4gICAgICAgIFtbMV0sIFsxXSwgWzFdLCBbMV1dLFxyXG4gICAgICAgIFtbMSwgMSwgMSwgMV1dLFxyXG4gICAgICAgIC8v55SwXHJcbiAgICAgICAgW1sxLCAxXSwgWzEsIDFdXSxcclxuICAgICAgICBbWzEsIDFdLCBbMSwgMV1dLFxyXG4gICAgICAgIFtbMSwgMV0sIFsxLCAxXV0sXHJcbiAgICAgICAgW1sxLCAxXSwgWzEsIDFdXSxcclxuICAgICAgICAvL1RcclxuICAgICAgICBbWzEsIDEsIDFdLCBbMCwgMSwgMF1dLFxyXG4gICAgICAgIFtbMCwgMV0sIFsxLCAxXSwgWzAsIDFdXSxcclxuICAgICAgICBbWzAsIDEsIDBdLCBbMSwgMSwgMV1dLFxyXG4gICAgICAgIFtbMSwgMF0sIFsxLCAxXSwgWzEsIDBdXSxcclxuICAgICAgICAvL1pcclxuICAgICAgICBbWzEsIDEsIDBdLCBbMCwgMSwgMV1dLFxyXG4gICAgICAgIFtbMCwgMV0sIFsxLCAxXSwgWzEsIDBdXSxcclxuICAgICAgICBbWzEsIDEsIDBdLCBbMCwgMSwgMV1dLFxyXG4gICAgICAgIFtbMCwgMV0sIFsxLCAxXSwgWzEsIDBdXSxcclxuICAgICAgICAvL+WAklpcclxuICAgICAgICBbWzAsIDEsIDFdLCBbMSwgMSwgMF1dLFxyXG4gICAgICAgIFtbMSwgMF0sIFsxLCAxXSwgWzAsIDFdXSxcclxuICAgICAgICBbWzAsIDEsIDFdLCBbMSwgMSwgMF1dLFxyXG4gICAgICAgIFtbMSwgMF0sIFsxLCAxXSwgWzAsIDFdXVxyXG4gICAgXTtcclxuICAgIGNvbnN0IEJMT0NLX1NJWkUgPSAyMDtcclxuICAgIC8q5a6a5LmJ5byA5aeL5YGP56e76YeP5Z+65pWwKi9cclxuICAgIGxldCBjdXJMZWZ0ID0gcGFyc2VJbnQoKHNpdGVTaXplLmxlZnQgKyBzaXRlU2l6ZS53aWR0aCAvIDIpIC8gQkxPQ0tfU0laRSk7Ly8xNe+8jOWBj+enuzE15Liq5Y2V5L2NXHJcbiAgICBsZXQgY3VyVG9wID0gcGFyc2VJbnQoc2l0ZVNpemUudG9wIC8gQkxPQ0tfU0laRSk7Ly8xMFxyXG4gICAgd2luZG93Ll9fYXJyX18gPSBhcnI7XHJcbiAgICB3aW5kb3cuX19zaXRlU2l6ZV9fID0gc2l0ZVNpemU7XHJcbiAgICB3aW5kb3cuX19CTE9DS19TSVpFX18gPSBCTE9DS19TSVpFO1xyXG4gICAgd2luZG93Ll9fY3VyTGVmdF9fID0gY3VyTGVmdDtcclxuICAgIHdpbmRvdy5fX2N1clRvcF9fID0gY3VyVG9wO1xyXG4gICAgd2luZG93Ll9fbGV2ZWxfXz0xO1xyXG4gICAgd2luZG93Ll9fc2NvcmVfXz0wO1xyXG4gICAgY29uc3QgaGlnaGVzdFNjb3JlPWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaWdoZXN0U2NvcmUnKSB8fCAwO1xyXG4gICAgbGV0IGhpZ2hlc3RTY29yZURpdj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGlnaGVzdC1zY29yZScpO1xyXG4gICAgaGlnaGVzdFNjb3JlRGl2LmlubmVyVGV4dD1oaWdoZXN0U2NvcmU7XHJcbiAgICB3aW5kb3cuX19oaWdoZXN0U2NvcmVfXz1oaWdoZXN0U2NvcmU7XHJcblxyXG4gICAgbGV0IHN0YXJ0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1yZXN0YXJ0Jyk7XHJcbiAgICBzdGFydC5vbmNsaWNrPShlKT0+e1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBzdGFydC5pbm5lclRleHQ9J3Jlc3RhcnQnO1xyXG4gICAgICAgIHN0YXJ0LnN0eWxlLmRpc3BsYXk9J25vbmUnO1xyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH07XHJcblxyXG5cclxufTtcclxuIl19
