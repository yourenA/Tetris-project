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
            for (var i = 0; i <= arr.length - 1; i++) {
                for (var j = 0; j <= arr[0].length - 1; j++) {
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
        }

        /**
         *获取当前方块可以到达的边界
         */

    }, {
        key: 'getInterval',
        value: function getInterval(curLeft, curTop) {
            var inactiveModel = document.querySelectorAll('.inactiveModel'),
                highest = null,
                leftmost = null,
                rightmost = null;
            if (inactiveModel.length === 0) {
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

                        var left = parseInt(v.style.left),
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
            this.checkArrWith1(this.arr, this.draw, document.body, 'activityModel');
            this.checkArrWith1(this.nextArr, this.draw, next, 'nextModel');

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
        nextRandom = Math.floor(Math.random() * __arr__.length),
        arr = nextArr ? nextArr : __arr__[random],
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
    var block = new Block(params);
    block.init();
    block.move();
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
    console.log("window onload");
    var site = document.querySelector('.site');
    // Window.getComputedStyle() 方法会在一个元素应用完有效样式且计算完所有属性的基本值之后给出所有 CSS 属性的值。

    var _window$getComputedSt = window.getComputedStyle(site),
        width = _window$getComputedSt.width,
        height = _window$getComputedSt.height,
        left = _window$getComputedSt.left,
        top = _window$getComputedSt.top;

    var siteSize = {
        width: parseInt(width),
        height: parseInt(height),
        left: parseInt(left),
        top: parseInt(top)
    };
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
    var curLeft = parseInt((siteSize.left + siteSize.width / 2) / BLOCK_SIZE);
    var curTop = parseInt(siteSize.top / BLOCK_SIZE);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkJsb2NrIiwicGFyYW1zIiwic2l0ZVNpemUiLCJhcnIiLCJuZXh0QXJyIiwiaGlnaGVzdFNjb3JlIiwiZGVsYXkiLCJCTE9DS19TSVpFIiwiY3VyTGVmdCIsImN1clRvcCIsIm5ld0FyciIsImkiLCJsZW5ndGgiLCJ0ZW1BcnIiLCJqIiwicHVzaCIsImxlZnRzIiwidG9wcyIsImNoZWNrQXJyV2l0aDEiLCJjYWxsYmFjayIsImVsIiwiY2xhc3NOYW1lIiwiY2FsbCIsImxlZnQiLCJ3aWR0aCIsInRvcCIsIm1vZGVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsImluYWN0aXZlTW9kZWwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGlnaGVzdCIsImxlZnRtb3N0IiwicmlnaHRtb3N0IiwiaGVpZ2h0IiwicmlnaHRzIiwidiIsInBhcnNlSW50IiwiTWF0aCIsIm1pbiIsIm1heCIsInJlcyIsImluYWN0aXZlTW9kZWxzIiwic29ydCIsImEiLCJiIiwiY291bnQiLCJtb2RlbHMiLCJkZWZvcm0iLCJkaXNwYWxjZW1lbnQiLCJtb3ZlIiwiY2FuTW92ZVJpZ2h0IiwiY2FuTW92ZURvd24iLCJjYW5Nb3ZlTGVmdCIsImdldEludGVydmFsIiwib25rZXlkb3duIiwiZSIsImFjdGl2ZU1vZGVsIiwiY2FuTW92ZVRvcCIsImtleSIsImtleUNvZGUiLCJjYW5Nb3ZlIiwiY29uc29sZSIsImxvZyIsImNsb2Nrd2lzZSIsIm5leHQiLCJxdWVyeVNlbGVjdG9yIiwiaW5uZXJIVE1MIiwiZHJhdyIsImJvZHkiLCJhY2l2ZU1vZGVsIiwiZmFsbERvd24iLCJzZXRUaW1lb3V0IiwibG9vcCIsImJpbmQiLCJ3aW5kb3ciLCJfX2xldmVsX18iLCJlbGltaW5hdGUiLCJyZW1vdmVDaGlsZCIsIl9fc2NvcmVfXyIsInNjb3JlIiwiaW5uZXJUZXh0IiwibGV2ZWwiLCJnYW1lT3ZlciIsImZpbGxJZCIsInNldEludGVydmFsIiwiZmlsbCIsImNsZWFySW50ZXJ2YWwiLCJzdGFydE9yUmVzdGFydCIsImRpc3BsYXkiLCJvbmNsaWNrIiwicHJldmVudERlZmF1bHQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiaGlnaGVzdFNjb3JlRGl2IiwiaW5pdCIsImNsZWFyVGltZW91dCIsInJhbmRvbSIsImZsb29yIiwiX19hcnJfXyIsIm5leHRSYW5kb20iLCJfX3NpdGVTaXplX18iLCJfX0JMT0NLX1NJWkVfXyIsIl9fY3VyTGVmdF9fIiwiX19jdXJUb3BfXyIsIl9faGlnaGVzdFNjb3JlX18iLCJibG9jayIsIm9ubG9hZCIsInNpdGUiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0SXRlbSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBSUE7Ozs7QUFJQTs7Ozs7Ozs7Ozs7OztJQWFNQSxLO0FBQ0YsbUJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDaEI7OztBQUdBLGFBQUtDLFFBQUwsR0FBZ0JELE9BQU9DLFFBQXZCO0FBQ0EsYUFBS0MsR0FBTCxHQUFXRixPQUFPRSxHQUFsQjtBQUNBLGFBQUtDLE9BQUwsR0FBYUgsT0FBT0csT0FBcEI7QUFDQSxhQUFLQyxZQUFMLEdBQWtCSixPQUFPSSxZQUF6QjtBQUNBLGFBQUtDLEtBQUwsR0FBV0wsT0FBT0ssS0FBbEI7QUFDQSxhQUFLQyxVQUFMLEdBQWtCTixPQUFPTSxVQUF6QjtBQUNBLGFBQUtDLE9BQUwsR0FBZVAsT0FBT08sT0FBdEI7QUFDQSxhQUFLQyxNQUFMLEdBQWNSLE9BQU9RLE1BQXJCO0FBQ0g7O0FBRUQ7Ozs7Ozs7a0NBR1VOLEcsRUFBSztBQUNYLGdCQUFJTyxTQUFTLEVBQWI7QUFDQSxpQkFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLEtBQUtSLElBQUksQ0FBSixFQUFPUyxNQUFQLEdBQWdCLENBQXJDLEVBQXdDRCxHQUF4QyxFQUE2QztBQUN6QyxvQkFBSUUsU0FBUyxFQUFiO0FBQ0EscUJBQUssSUFBSUMsSUFBSVgsSUFB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d0IsT0FBUCxHQUFpQmxHLEdBQWpCO0FBQ0EwRSxXQUFPMEIsWUFBUCxHQUFzQnJHLFFBQXRCO0FBQ0EyRSxXQUFPMkIsY0FBUCxHQUF3QmpHLFVBQXhCO0FBQ0FzRSxXQUFPNEIsV0FBUCxHQUFxQmpHLE9BQXJCO0FBQ0FxRSxXQUFPNkIsVUFBUCxHQUFvQmpHLE1BQXBCO0FBQ0FvRSxXQUFPQyxTQUFQLEdBQWlCLENBQWpCO0FBQ0FELFdBQU9JLFNBQVAsR0FBaUIsQ0FBakI7QUFDQSxRQUFNNUUsZUFBYXlGLGFBQWFrQixPQUFiLENBQXFCLGNBQXJCLEtBQXdDLENBQTNEO0FBQ0EsUUFBSWhCLGtCQUFnQnJFLFNBQVN5QyxhQUFULENBQXVCLGdCQUF2QixDQUFwQjtBQUNBNEIsb0JBQWdCYixTQUFoQixHQUEwQjlFLFlBQTFCO0FBQ0F3RSxXQUFPOEIsZ0JBQVAsR0FBd0J0RyxZQUF4Qjs7QUFFQSxRQUFJNEcsUUFBTXRGLFNBQVN5QyxhQUFULENBQXVCLGdCQUF2QixDQUFWO0FBQ0E2QyxVQUFNckIsT0FBTixHQUFjLFVBQUNsQyxDQUFELEVBQUs7QUFDZkEsVUFBRW1DLGNBQUY7QUFDQW9CLGNBQU05QixTQUFOLEdBQWdCLFNBQWhCO0FBQ0E4QixjQUFNcEYsS0FBTixDQUFZOEQsT0FBWixHQUFvQixNQUFwQjtBQUNBTTtBQUNILEtBTEQ7QUFRSCxDQXhFRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFkbWluaXN0cmF0b3Igb24gMjAxNy8yLzIwLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiDlrprkuYnmlrnlnZdcclxuICovXHJcblxyXG4vKipcclxuICogRVM2IENsYXNzXHJcbiAqIENsYXNz5LiN5a2Y5Zyo5Y+Y6YeP5o+Q5Y2H77yIaG9pc3TvvInvvIzov5nkuIDngrnkuI5FUzXlrozlhajkuI3lkIzjgIJcclxuICogY2xhc3MgQmFyIHtcclxuICogICBjb25zdHJ1Y3Rvcigpe30gY29uc3RydWN0b3Lmlrnms5XmmK/nsbvnmoTpu5jorqTmlrnms5VcclxuICogICBkb1N0dWZmKCkge1xyXG4gKiAgICBjb25zb2xlLmxvZygnc3R1ZmYnKTtcclxuICogICB9XHJcbiAqIH1cclxuICog5L2/55So55qE5pe25YCZ77yM5Lmf5piv55u05o6l5a+557G75L2/55SobmV35ZG95Luk77yM6Lef5p6E6YCg5Ye95pWw55qE55So5rOV5a6M5YWo5LiA6Ie044CCXHJcbiAqIHZhciBiID0gbmV3IEJhcigpO1xyXG4gKiBiLmRvU3R1ZmYoKSAvLyBcInN0dWZmXCJcclxuICovXHJcbmNsYXNzIEJsb2NrIHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWwhm5ldyBCbG9jayhwYXJhbXMpIOWPguaVsOS8oOi/m3RoaXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNpdGVTaXplID0gcGFyYW1zLnNpdGVTaXplO1xyXG4gICAgICAgIHRoaXMuYXJyID0gcGFyYW1zLmFycjtcclxuICAgICAgICB0aGlzLm5leHRBcnI9cGFyYW1zLm5leHRBcnI7XHJcbiAgICAgICAgdGhpcy5oaWdoZXN0U2NvcmU9cGFyYW1zLmhpZ2hlc3RTY29yZTtcclxuICAgICAgICB0aGlzLmRlbGF5PXBhcmFtcy5kZWxheTtcclxuICAgICAgICB0aGlzLkJMT0NLX1NJWkUgPSBwYXJhbXMuQkxPQ0tfU0laRTtcclxuICAgICAgICB0aGlzLmN1ckxlZnQgPSBwYXJhbXMuY3VyTGVmdDtcclxuICAgICAgICB0aGlzLmN1clRvcCA9IHBhcmFtcy5jdXJUb3A7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDnu4Tnn6npmLXpobrml7bpkojml4vovaxcclxuICAgICAqL1xyXG4gICAgY2xvY2t3aXNlKGFycikge1xyXG4gICAgICAgIGxldCBuZXdBcnIgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBhcnJbMF0ubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1BcnIgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGFyci5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xyXG4gICAgICAgICAgICAgICAgdGVtQXJyLnB1c2goYXJyW2pdW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdBcnIucHVzaCh0ZW1BcnIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZWZ0cyA9IFtdO1xyXG4gICAgICAgIGxldCB0b3BzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuY2hlY2tBcnJXaXRoMShuZXdBcnIsIGZ1bmN0aW9uIChpLCBqKSB7XHJcbiAgICAgICAgICAgIGxlZnRzLnB1c2goaiAqIHRoaXMuQkxPQ0tfU0laRSk7XHJcbiAgICAgICAgICAgIHRvcHMucHVzaChpICogdGhpcy5CTE9DS19TSVpFKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmV3QXJyOiBuZXdBcnIsXHJcbiAgICAgICAgICAgIGxlZnRzOiBsZWZ0cyxcclxuICAgICAgICAgICAgdG9wczogdG9wc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreS6jOe7tOaVsOe7hOS4ujHnmoTkuIvmoIdcclxuICAgICAqL1xyXG5cclxuICAgIGNoZWNrQXJyV2l0aDEoYXJyLCBjYWxsYmFjayxlbCxjbGFzc05hbWUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBhcnIubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGFyclswXS5sZW5ndGggLSAxOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJbaV1bal0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgaSArIHRoaXMuY3VyVG9wLCBqICsgdGhpcy5jdXJMZWZ0LGVsLCBjbGFzc05hbWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7mlbDnu4Tnn6npmLXnlLvlh7rlvZPliY3mlrnlnZdcclxuICAgICAqL1xyXG4gICAgZHJhdyhpLCBqLGVsLGNsYXNzTmFtZSkge1xyXG4gICAgICAgIGxldCBsZWZ0ID0gY2xhc3NOYW1lID09PSAnbmV4dE1vZGVsJyA/IGogKiB0aGlzLkJMT0NLX1NJWkUgLSAodGhpcy5zaXRlU2l6ZS5sZWZ0ICsgdGhpcy5zaXRlU2l6ZS53aWR0aCAvIDIgLSB0aGlzLkJMT0NLX1NJWkUpIDogaiAqIHRoaXMuQkxPQ0tfU0laRTtcclxuICAgICAgICBsZXQgdG9wID0gY2xhc3NOYW1lID09PSAnbmV4dE1vZGVsJyA/IGkgKiB0aGlzLkJMT0NLX1NJWkUgLSB0aGlzLnNpdGVTaXplLnRvcCA6IGkgKiB0aGlzLkJMT0NLX1NJWkU7XHJcbiAgICAgICAgbGV0IG1vZGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbW9kZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gICAgICAgIG1vZGVsLnN0eWxlLnRvcCA9IGAke3RvcH1weGA7XHJcbiAgICAgICAgbW9kZWwuc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgO1xyXG4gICAgICAgIGVsLmFwcGVuZENoaWxkKG1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAq6I635Y+W5b2T5YmN5pa55Z2X5Y+v5Lul5Yiw6L6+55qE6L6555WMXHJcbiAgICAgKi9cclxuICAgIGdldEludGVydmFsKGN1ckxlZnQsIGN1clRvcCkge1xyXG4gICAgICAgIGxldCBpbmFjdGl2ZU1vZGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluYWN0aXZlTW9kZWwnKSxcclxuICAgICAgICAgICAgaGlnaGVzdCA9IG51bGwsXHJcbiAgICAgICAgICAgIGxlZnRtb3N0ID0gbnVsbCxcclxuICAgICAgICAgICAgcmlnaHRtb3N0ID0gbnVsbDtcclxuICAgICAgICBpZiAoaW5hY3RpdmVNb2RlbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgaGlnaGVzdCA9IHRoaXMuc2l0ZVNpemUudG9wICsgdGhpcy5zaXRlU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGxlZnRtb3N0ID0gdGhpcy5zaXRlU2l6ZS5sZWZ0IC0gdGhpcy5CTE9DS19TSVpFO1xyXG4gICAgICAgICAgICByaWdodG1vc3QgPSB0aGlzLnNpdGVTaXplLmxlZnQgKyB0aGlzLnNpdGVTaXplLndpZHRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB0b3BzID0gW10sXHJcbiAgICAgICAgICAgICAgICBsZWZ0cyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgcmlnaHRzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IHYgb2YgaW5hY3RpdmVNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlZnQgPSBwYXJzZUludCh2LnN0eWxlLmxlZnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IHBhcnNlSW50KHYuc3R5bGUudG9wKTtcclxuICAgICAgICAgICAgICAgIGlmIChsZWZ0ID09PSBjdXJMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wcy5wdXNoKHRvcClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0b3AgPT09IGN1clRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0IDwgY3VyTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0cy5wdXNoKGxlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsZWZ0ID4gY3VyTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodHMucHVzaChsZWZ0KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodG9wcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGhpZ2hlc3QgPSB0aGlzLnNpdGVTaXplLnRvcCArIHRoaXMuc2l0ZVNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGlnaGVzdCA9IE1hdGgubWluKC4uLnRvcHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGVmdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0bW9zdCA9IHRoaXMuc2l0ZVNpemUubGVmdCAtIHRoaXMuQkxPQ0tfU0laRTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxlZnRtb3N0ID0gTWF0aC5tYXgoLi4ubGVmdHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmlnaHRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRtb3N0ID0gdGhpcy5zaXRlU2l6ZS5sZWZ0ICsgdGhpcy5zaXRlU2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0bW9zdCA9IE1hdGgubWluKC4uLnJpZ2h0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhpZ2hlc3Q6IGhpZ2hlc3QsXHJcbiAgICAgICAgICAgIGxlZnRtb3N0OiBsZWZ0bW9zdCxcclxuICAgICAgICAgICAgcmlnaHRtb3N0OiByaWdodG1vc3RcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5raI6Zmk56CW5Z2XXHJcbiAgICAgKi9cclxuICAgIGVsaW1pbmF0ZSgpIHtcclxuICAgICAgICBsZXQgcmVzID0gW10sXHJcbiAgICAgICAgICAgIGluYWN0aXZlTW9kZWxzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbmFjdGl2ZU1vZGVsJyldO1xyXG4gICAgICAgIGluYWN0aXZlTW9kZWxzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEuc3R5bGUudG9wKSAtIHBhcnNlSW50KGIuc3R5bGUudG9wKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmFjdGl2ZU1vZGVscy5sZW5ndGg7KSB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDAsXHJcbiAgICAgICAgICAgICAgICBtb2RlbHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpbmFjdGl2ZU1vZGVscy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluYWN0aXZlTW9kZWxzW2ldLnN0eWxlLnRvcCA9PT0gaW5hY3RpdmVNb2RlbHNbal0uc3R5bGUudG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbHMucHVzaChpbmFjdGl2ZU1vZGVsc1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG1vZGVsczogbW9kZWxzLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IGNvdW50LFxyXG4gICAgICAgICAgICAgICAgdG9wOiBwYXJzZUludChpbmFjdGl2ZU1vZGVsc1tpXS5zdHlsZS50b3ApXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL2ZvciDlvqrnjq/nmoTmnIDlkI7kuIDkuKrlj4LmlbDlj6/ku6XmlL7lnKjlvqrnjq/kvZPlhoVcclxuICAgICAgICAgICAgaSArPSBjb3VudFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T54Gw6Imy56CW5Z2X6auY5LqO55S75biD5YGP56e76YeP77yM5ri45oiP57uT5p2fXHJcbiAgICAgKi9cclxuICAgIGdhbWVPdmVyKCl7XHJcbiAgICAgICAgY29uc3QgaW5hY3RpdmVNb2RlbD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5hY3RpdmVNb2RlbCcpO1xyXG4gICAgICAgIGxldCB0b3BzPVtdO1xyXG4gICAgICAgIGZvcihsZXQgdiBvZiBpbmFjdGl2ZU1vZGVsKXtcclxuICAgICAgICAgICAgdG9wcy5wdXNoKHBhcnNlSW50KHYuc3R5bGUudG9wKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbiguLi50b3BzKSA8PXRoaXMuc2l0ZVNpemUudG9wXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnYW1lT3ZlcuWhq+WFheWKqOeUu1xyXG4gICAgICovXHJcbiAgICAvKipcclxuICAgICAqIGNsYXNzIOmdmeaAgeaWueazlVxyXG4gICAgICog6K+l5pa55rOV5LiN5Lya6KKr5a6e5L6L57un5om/77yM6ICM5piv55u05o6l6YCa6L+H57G75p2l6LCD55SoIEJsb2NrLmZpbGwoKTtcclxuICAgICAqIOeItuexu+eahOmdmeaAgeaWueazle+8jOWPr+S7peiiq+WtkOexu+e7p+aJv+OAglxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZmlsbChjdXJUb3AsY3VyTGVmdCl7XHJcbiAgICAgICAgbGV0IG1vZGVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG1vZGVsLmNsYXNzTmFtZT0naW5hY3RpdmVNb2RlbCc7XHJcbiAgICAgICAgbW9kZWwuc3R5bGUubGVmdD1gJHtjdXJMZWZ0fXB4YDtcclxuICAgICAgICBtb2RlbC5zdHlsZS50b3A9YCR7Y3VyVG9wfXB4YDtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGVsKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Y+v5Lul56e75YqoXHJcbiAgICAgKi9cclxuICAgIGNhbk1vdmUoYXJyLCBkZWZvcm0gPSBmYWxzZSwgZGlzcGFsY2VtZW50PTEsbW92ZSA9IHtcclxuICAgICAgICBjYW5Nb3ZlUmlnaHQ6IHRydWUsXHJcbiAgICAgICAgY2FuTW92ZURvd246IHRydWUsXHJcbiAgICAgICAgY2FuTW92ZUxlZnQ6IHRydWVcclxuICAgIH0pIHtcclxuICAgICAgICB0aGlzLmNoZWNrQXJyV2l0aDEoYXJyLCBmdW5jdGlvbiAoaSwgaikge1xyXG4gICAgICAgICAgICBsZXQge2hpZ2hlc3QsIGxlZnRtb3N0LCByaWdodG1vc3R9PXRoaXMuZ2V0SW50ZXJ2YWwoaiAqIHRoaXMuQkxPQ0tfU0laRSwgaSAqIHRoaXMuQkxPQ0tfU0laRSk7XHJcbiAgICAgICAgICAgIGlmIChkZWZvcm0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkJMT0NLX1NJWkUgKiAoaiArIDEpID4gcmlnaHRtb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkJMT0NLX1NJWkUgKiAoaSArIGRpc3BhbGNlbWVudCkgPiBoaWdoZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChqIC0gMSkgPCBsZWZ0bW9zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmUuY2FuTW92ZUxlZnQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChqICsgMSkgPj0gcmlnaHRtb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkJMT0NLX1NJWkUgKiAoaSArIGRpc3BhbGNlbWVudCkgPj0gaGlnaGVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmUuY2FuTW92ZURvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkJMT0NLX1NJWkUgKiAoaiAtIDEpIDw9IGxlZnRtb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlTGVmdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG1vdmU7XHJcbiAgICAgICAgLyogQXJyYXkuZnJvbeaWueazleeUqOS6juWwhuexu+aVsOe7hOi9rOS4uuecn+ato+eahOaVsOe7hFxyXG4gICAgICAgICBmb3IuLi5vZjogZm9yLi4uaW7lvqrnjq/or7vlj5bplK7lkI3vvIxmb3IuLi5vZuW+queOr+ivu+WPlumUruWAvFxyXG4gICAgICAgICBmb3IobGV0IHYgb2YgQXJyYXkuZnJvbShhY3RpdmVNb2RlbCkpe1xyXG4gICAgICAgICB0b3BzLnB1c2gocGFyc2VJbnQodi5zdHlsZS50b3ApKTtcclxuICAgICAgICAgbGVmdHMucHVzaChwYXJzZUludCh2LnN0eWxlLmxlZnQpKVxyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBtaW4oKSDmlrnms5Xlj6/ov5Tlm57mjIflrprnmoTmlbDlrZfkuK3luKbmnInmnIDkvY7lgLznmoTmlbDlrZfjgILlj4LmlbDkuLrnlKjpgJflj7fliIbpmpTnmoTlj4LmlbDluo/liJfvvIzkuI3mmK/mlbDnu4RcclxuICAgICAgICAgbWF4KCkg5pa55rOV5Y+v6L+U5Zue5oyH5a6a55qE5pWw5a2X5Lit5bim5pyJ5pyA5aSn5YC855qE5pWw5a2X44CCXHJcbiAgICAgICAgIC4uLiDmianlsZXov5DnrpfnrKbvvJrlsIbmlbDnu4TovazkuLrnlKjpgJflj7fliIbpmpTnmoTlj4LmlbDluo/liJdcclxuICAgICAgICAgLi4uIHJlc2V06L+Q566X56ym77ya5YW25Yqf6IO95LiO5omp5bGV6L+Q566X56ym5oGw5aW955u45Y+N77yM5oqK6YCX5Y+36ZqU5byA55qE5YC85bqP5YiX57uE5ZCI5oiQ5LiA5Liq5pWw57uEXHJcbiAgICAgICAgIGxldCB0b3AgPSBNYXRoLm1pbiguLi50b3BzKSxcclxuICAgICAgICAgbGVmdCA9IE1hdGgubWluKC4uLmxlZnRzKSxcclxuICAgICAgICAgcmlnaHQgPSBNYXRoLm1heCguLi5sZWZ0cyksXHJcbiAgICAgICAgIGRvd24gPSBNYXRoLm1heCguLi50b3BzKTtcclxuICAgICAgICAgaWYgKGRlZm9ybSkge1xyXG4gICAgICAgICBpZiAocmlnaHQgKyAyMCA+PSB0aGlzLnNpdGVTaXplLmxlZnQgKyB0aGlzLnNpdGVTaXplLndpZHRoKSB7XHJcbiAgICAgICAgIGNhbk1vdmVSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGlmIChyaWdodCArIDIwID49IHRoaXMuc2l0ZVNpemUubGVmdCArIHRoaXMuc2l0ZVNpemUud2lkdGgpIHtcclxuICAgICAgICAgY2FuTW92ZVJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgaWYgKGxlZnQgLSAyMCA8IHRoaXMuc2l0ZVNpemUubGVmdCkge1xyXG4gICAgICAgICBjYW5Nb3ZlTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGlmIChkb3duICsgMjAgPj0gdGhpcy5zaXRlU2l6ZS50b3AgKyB0aGlzLnNpdGVTaXplLmhlaWdodCkge1xyXG4gICAgICAgICBjYW5Nb3ZlRG93biA9IGZhbHNlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGlmICh0b3AgLSAyMCA8IHRoaXMuc2l0ZVNpemUudG9wKSB7XHJcbiAgICAgICAgIGNhbk1vdmVUb3AgPSBmYWxzZTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgY2FuTW92ZVJpZ2h0OiBjYW5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgIGNhbk1vdmVMZWZ0OiBjYW5Nb3ZlTGVmdCxcclxuICAgICAgICAgY2FuTW92ZVRvcDogY2FuTW92ZVRvcCxcclxuICAgICAgICAgY2FuTW92ZURvd246IGNhbk1vdmVEb3duXHJcbiAgICAgICAgIH0qL1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSu55uY5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIG1vdmUoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gKGUpPT4ge1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlTW9kZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZpdHlNb2RlbCcpLFxyXG4gICAgICAgICAgICAgICAgbW92ZSxcclxuICAgICAgICAgICAgICAgIGNhbk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgIGNhbk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZVRvcCxcclxuICAgICAgICAgICAgICAgIGNhbk1vdmVEb3duO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBlLmtleUNvZGU7XHJcbiAgICAgICAgICAgIGlmKGFjdGl2ZU1vZGVsLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVMZWZ0ID0gdGhpcy5jYW5Nb3ZlKHRoaXMuYXJyKS5jYW5Nb3ZlTGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbk1vdmVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFjdGl2ZU1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS5sZWZ0ID0gYCR7cGFyc2VJbnQodi5zdHlsZS5sZWZ0KSAtIHRoaXMuQkxPQ0tfU0laRX1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ckxlZnQtLTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbmB0IG1vdmUgbGVmdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL3VwXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHtuZXdBcnIsIGxlZnRzLCB0b3BzfT10aGlzLmNsb2Nrd2lzZSh0aGlzLmFycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmUgPSB0aGlzLmNhbk1vdmUobmV3QXJyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZURvd24gPSBtb3ZlLmNhbk1vdmVEb3duO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlUmlnaHQgPSBtb3ZlLmNhbk1vdmVSaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZUxlZnQgPSBtb3ZlLmNhbk1vdmVMZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuTW92ZVJpZ2h0ICYmIGNhbk1vdmVEb3duICYmIGNhbk1vdmVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFyciA9IG5ld0FycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gbGVmdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNb2RlbFtpXS5zdHlsZS5sZWZ0ID0gYCR7bGVmdHNbaV19cHhgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1vZGVsW2ldLnN0eWxlLnRvcCA9IGAke3RvcHNbaV19cHhgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVSaWdodCA9IHRoaXMuY2FuTW92ZSh0aGlzLmFycikuY2FuTW92ZVJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuTW92ZVJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFjdGl2ZU1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS5sZWZ0ID0gYCR7cGFyc2VJbnQodi5zdHlsZS5sZWZ0KSArIHRoaXMuQkxPQ0tfU0laRX1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ckxlZnQrK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW5gdCBtb3ZlIHJpZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZURvd24gPSB0aGlzLmNhbk1vdmUodGhpcy5hcnIsZmFsc2UsMikuY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYW5Nb3ZlRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBhY3RpdmVNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYuc3R5bGUudG9wID0gYCR7cGFyc2VJbnQodi5zdHlsZS50b3ApICsgMip0aGlzLkJMT0NLX1NJWkV9cHhgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJUb3AgKz0yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW5gdCBtb3ZlIGRvd25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLor7fpgInmi6nkuIrkuIvlt6blj7PmjInplK5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5pa55Z2XKi9cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IG5leHQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHQnKTtcclxuICAgICAgICBuZXh0LmlubmVySFRNTD1udWxsO1xyXG4gICAgICAgIHRoaXMuY2hlY2tBcnJXaXRoMSh0aGlzLmFyciwgdGhpcy5kcmF3LGRvY3VtZW50LmJvZHksJ2FjdGl2aXR5TW9kZWwnKTtcclxuICAgICAgICB0aGlzLmNoZWNrQXJyV2l0aDEodGhpcy5uZXh0QXJyLHRoaXMuZHJhdyxuZXh0LCduZXh0TW9kZWwnKTtcclxuXHJcbiAgICAgICAgbGV0IGFjaXZlTW9kZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZpdHlNb2RlbCcpO1xyXG4gICAgICAgIGNvbnN0IGZhbGxEb3duID0gc2V0VGltZW91dChmdW5jdGlvbiBsb29wKCkge1xyXG4gICAgICAgICAgICAvL3NldFRpbWVvdXTkvJrmlLnlj5h0aGlz55qE5oyH5ZCR77yM5omA5Lul6ZyA6KaBYmluZCh0aGlzKVxyXG4gICAgICAgICAgICBsZXQgY2FuTW92ZURvd24gPSB0aGlzLmNhbk1vdmUodGhpcy5hcnIpLmNhbk1vdmVEb3duO1xyXG4gICAgICAgICAgICBpZiAoY2FuTW92ZURvd24pIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHYgb2YgYWNpdmVNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHYuc3R5bGUudG9wID0gYCR7cGFyc2VJbnQodi5zdHlsZS50b3ApICsgdGhpcy5CTE9DS19TSVpFfXB4YFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJUb3ArKztcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQobG9vcC5iaW5kKHRoaXMpLHRoaXMuZGVsYXkvd2luZG93Ll9fbGV2ZWxfXyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gYWNpdmVNb2RlbC5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2l2ZU1vZGVsW2ldLmNsYXNzTmFtZSA9ICdpbmFjdGl2ZU1vZGVsJztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gdGhpcy5lbGltaW5hdGUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHtjb3VudCwgbW9kZWxzLCB0b3B9PXJlc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IHBhcnNlSW50KHRoaXMuc2l0ZVNpemUud2lkdGggLyB0aGlzLkJMT0NLX1NJWkUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbW9kZWxzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG1vZGVsc1tqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluYWN0aXZlTW9kZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluYWN0aXZlTW9kZWwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBpbmFjdGl2ZU1vZGVscykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHYuc3R5bGUudG9wKSA8IHRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYuc3R5bGUudG9wID0gYCR7cGFyc2VJbnQodi5zdHlsZS50b3ApICsgdGhpcy5CTE9DS19TSVpFfXB4YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fX3Njb3JlX18rPXdpbmRvdy5fX2xldmVsX18gKiAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY29yZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUuaW5uZXJUZXh0PXdpbmRvdy5fX3Njb3JlX187XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuX19zY29yZV9fIC0gKHdpbmRvdy5fX2xldmVsX18gLSAxKSAqICh3aW5kb3cuX19sZXZlbF9fIC0gMSkgKiAxMDAwID49IHdpbmRvdy5fX2xldmVsX18gKiB3aW5kb3cuX19sZXZlbF9fICogMTAwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgd2luZG93Ll9fbGV2ZWxfXyA8PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX19sZXZlbF9fKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGV2ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGV2ZWwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsLmlubmVyVGV4dCA9IHdpbmRvdy5fX2xldmVsX187XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdhbWVPdmVyKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnYW1lIG92ZXInKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VyVG9wPXRoaXMuc2l0ZVNpemUuaGVpZ2h0K3RoaXMuc2l0ZVNpemUudG9wLXRoaXMuQkxPQ0tfU0laRSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyTGVmdD10aGlzLnNpdGVTaXplLndpZHRoK3RoaXMuc2l0ZVNpemUubGVmdC10aGlzLkJMT0NLX1NJWkU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGxJZD1zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJsb2NrLmZpbGwoY3VyVG9wLGN1ckxlZnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJMZWZ0IC09IHRoaXMuQkxPQ0tfU0laRTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY3VyTGVmdCA8IHRoaXMuc2l0ZVNpemUubGVmdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJMZWZ0ID10aGlzLnNpdGVTaXplLndpZHRoK3RoaXMuc2l0ZVNpemUubGVmdC10aGlzLkJMT0NLX1NJWkU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJUb3AgLT0gdGhpcy5CTE9DS19TSVpFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY3VyVG9wIDwgdGhpcy5zaXRlU2l6ZS50b3Ape1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChmaWxsSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQuaW5uZXJIVE1MPW51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRPclJlc3RhcnQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LXJlc3RhcnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3JSZXN0YXJ0LnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3JSZXN0YXJ0Lm9uY2xpY2s9KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3JSZXN0YXJ0LnN0eWxlLmRpc3BsYXk9J25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmFjdGl2ZU1vZGVscz1bLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluYWN0aXZlTW9kZWwnKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5hY3RpdmVNb2RlbHMubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHYgb2YgaW5hY3RpdmVNb2RlbHMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oaWdoZXN0U2NvcmUgPCB3aW5kb3cuX19zY29yZV9fKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaWdoZXN0U2NvcmUnLCB3aW5kb3cuX19zY29yZV9fKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhpZ2hlc3RTY29yZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoaWdoZXN0LXNjb3JlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RTY29yZURpdi5pbm5lclRleHQgPSB3aW5kb3cuX19zY29yZV9fO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX19zY29yZV9fID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZS5pbm5lclRleHQgPSB3aW5kb3cuX19zY29yZV9fO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fX2xldmVsX18gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZXZlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsZXZlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsLmlubmVyVGV4dCA9IHdpbmRvdy5fX2xldmVsX187XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksMzApXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpbml0KHRoaXMubmV4dEFycilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChmYWxsRG93bilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSwgNjAwKVxyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiDmlbDmja7liJ3lp4vljJZcclxuICovXHJcbmNvbnN0IGluaXQgPSAobmV4dEFycik9PiB7XHJcbiAgICBjb25zdCByYW5kb209TWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSpfX2Fycl9fLmxlbmd0aCkpLFxyXG4gICAgICAgIG5leHRSYW5kb209TWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSpfX2Fycl9fLmxlbmd0aCkpLFxyXG4gICAgICAgIGFyciA9bmV4dEFyciA/IG5leHRBcnIgOiBfX2Fycl9fW3JhbmRvbV0sXHJcbiAgICAgICAgZGVsYXk9NjAwO1xyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIGFycjogYXJyLFxyXG4gICAgICAgIG5leHRBcnI6X19hcnJfX1tuZXh0UmFuZG9tXSxcclxuICAgICAgICBzaXRlU2l6ZTogX19zaXRlU2l6ZV9fLFxyXG4gICAgICAgIEJMT0NLX1NJWkU6IF9fQkxPQ0tfU0laRV9fLFxyXG4gICAgICAgIGN1ckxlZnQ6IF9fY3VyTGVmdF9fLFxyXG4gICAgICAgIGN1clRvcDogX19jdXJUb3BfXyxcclxuICAgICAgICBkZWxheTpkZWxheSxcclxuICAgICAgICBoaWdoZXN0U2NvcmU6X19oaWdoZXN0U2NvcmVfX1xyXG4gICAgfTtcclxuICAgIGxldCBibG9jayA9IG5ldyBCbG9jayhwYXJhbXMpO1xyXG4gICAgYmxvY2suaW5pdCgpO1xyXG4gICAgYmxvY2subW92ZSgpO1xyXG59O1xyXG4vKipcclxuICrmtY/op4jlmajliJ3lp4vljJZcclxuICovXHJcblxyXG4vKipcclxuICogRVM2566t5aS05Ye95pWwXHJcbiAqIOWHveaVsOS9k+WGheeahHRoaXPlr7nosaHvvIzlsLHmmK/lrprkuYnml7bmiYDlnKjnmoTlr7nosaHvvIzogIzkuI3mmK/kvb/nlKjml7bmiYDlnKjnmoTlr7nosaHjgIJcclxuICogdmFyIHN1bSA9IChudW0xLCBudW0yKSA9PiBudW0xICsgbnVtMjtcclxuICog562J5ZCM5LqOXHJcbiAqIHZhciBzdW0gPSBmdW5jdGlvbihudW0xLCBudW0yKSB7XHJcbiAqIHJldHVybiBudW0xICsgbnVtMjtcclxuICogfTtcclxuICovXHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIndpbmRvdyBvbmxvYWRcIik7XHJcbiAgICBsZXQgc2l0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlJyk7XHJcbiAgICAvLyBXaW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSgpIOaWueazleS8muWcqOS4gOS4quWFg+e0oOW6lOeUqOWujOacieaViOagt+W8j+S4lOiuoeeul+WujOaJgOacieWxnuaAp+eahOWfuuacrOWAvOS5i+WQjue7meWHuuaJgOaciSBDU1Mg5bGe5oCn55qE5YC844CCXHJcbiAgICBsZXQge3dpZHRoLCBoZWlnaHQsIGxlZnQsIHRvcH0gPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNpdGUpO1xyXG4gICAgbGV0IHNpdGVTaXplID0ge1xyXG4gICAgICAgIHdpZHRoOiBwYXJzZUludCh3aWR0aCksXHJcbiAgICAgICAgaGVpZ2h0OiBwYXJzZUludChoZWlnaHQpLFxyXG4gICAgICAgIGxlZnQ6IHBhcnNlSW50KGxlZnQpLFxyXG4gICAgICAgIHRvcDogcGFyc2VJbnQodG9wKVxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFyciA9W1xyXG4gICAgICAgIC8vTFxyXG4gICAgICAgIFtbMSwgMF0sIFsxLCAwXSwgWzEsIDFdXSxcclxuICAgICAgICBbWzEsIDEsIDFdLCBbMSwgMCwgMF1dLFxyXG4gICAgICAgIFtbMSwgMV0sIFswLCAxXSwgWzAsIDFdXSxcclxuICAgICAgICBbWzAsIDAsIDFdLCBbMSwgMSwgMV1dLFxyXG4gICAgICAgIC8v44CPXHJcbiAgICAgICAgW1swLCAxXSwgWzAsIDFdLCBbMSwgMV1dLFxyXG4gICAgICAgIFtbMSwgMCwgMF0sIFsxLCAxLCAxXV0sXHJcbiAgICAgICAgW1sxLCAxXSwgWzEsIDBdLCBbMSwgMF1dLFxyXG4gICAgICAgIFtbMSwgMSwgMV0sIFswLCAwLCAxXV0sXHJcbiAgICAgICAgLy9JXHJcbiAgICAgICAgW1sxXSwgWzFdLCBbMV0sIFsxXV0sXHJcbiAgICAgICAgW1sxLCAxLCAxLCAxXV0sXHJcbiAgICAgICAgW1sxXSwgWzFdLCBbMV0sIFsxXV0sXHJcbiAgICAgICAgW1sxLCAxLCAxLCAxXV0sXHJcbiAgICAgICAgLy/nlLBcclxuICAgICAgICBbWzEsIDFdLCBbMSwgMV1dLFxyXG4gICAgICAgIFtbMSwgMV0sIFsxLCAxXV0sXHJcbiAgICAgICAgW1sxLCAxXSwgWzEsIDFdXSxcclxuICAgICAgICBbWzEsIDFdLCBbMSwgMV1dLFxyXG4gICAgICAgIC8vVFxyXG4gICAgICAgIFtbMSwgMSwgMV0sIFswLCAxLCAwXV0sXHJcbiAgICAgICAgW1swLCAxXSwgWzEsIDFdLCBbMCwgMV1dLFxyXG4gICAgICAgIFtbMCwgMSwgMF0sIFsxLCAxLCAxXV0sXHJcbiAgICAgICAgW1sxLCAwXSwgWzEsIDFdLCBbMSwgMF1dLFxyXG4gICAgICAgIC8vWlxyXG4gICAgICAgIFtbMSwgMSwgMF0sIFswLCAxLCAxXV0sXHJcbiAgICAgICAgW1swLCAxXSwgWzEsIDFdLCBbMSwgMF1dLFxyXG4gICAgICAgIFtbMSwgMSwgMF0sIFswLCAxLCAxXV0sXHJcbiAgICAgICAgW1swLCAxXSwgWzEsIDFdLCBbMSwgMF1dLFxyXG4gICAgICAgIC8v5YCSWlxyXG4gICAgICAgIFtbMCwgMSwgMV0sIFsxLCAxLCAwXV0sXHJcbiAgICAgICAgW1sxLCAwXSwgWzEsIDFdLCBbMCwgMV1dLFxyXG4gICAgICAgIFtbMCwgMSwgMV0sIFsxLCAxLCAwXV0sXHJcbiAgICAgICAgW1sxLCAwXSwgWzEsIDFdLCBbMCwgMV1dXHJcbiAgICBdO1xyXG4gICAgY29uc3QgQkxPQ0tfU0laRSA9IDIwO1xyXG4gICAgbGV0IGN1ckxlZnQgPSBwYXJzZUludCgoc2l0ZVNpemUubGVmdCArIHNpdGVTaXplLndpZHRoIC8gMikgLyBCTE9DS19TSVpFKTtcclxuICAgIGxldCBjdXJUb3AgPSBwYXJzZUludChzaXRlU2l6ZS50b3AgLyBCTE9DS19TSVpFKTtcclxuICAgIHdpbmRvdy5fX2Fycl9fID0gYXJyO1xyXG4gICAgd2luZG93Ll9fc2l0ZVNpemVfXyA9IHNpdGVTaXplO1xyXG4gICAgd2luZG93Ll9fQkxPQ0tfU0laRV9fID0gQkxPQ0tfU0laRTtcclxuICAgIHdpbmRvdy5fX2N1ckxlZnRfXyA9IGN1ckxlZnQ7XHJcbiAgICB3aW5kb3cuX19jdXJUb3BfXyA9IGN1clRvcDtcclxuICAgIHdpbmRvdy5fX2xldmVsX189MTtcclxuICAgIHdpbmRvdy5fX3Njb3JlX189MDtcclxuICAgIGNvbnN0IGhpZ2hlc3RTY29yZT1sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlnaGVzdFNjb3JlJykgfHwgMDtcclxuICAgIGxldCBoaWdoZXN0U2NvcmVEaXY9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hpZ2hlc3Qtc2NvcmUnKTtcclxuICAgIGhpZ2hlc3RTY29yZURpdi5pbm5lclRleHQ9aGlnaGVzdFNjb3JlO1xyXG4gICAgd2luZG93Ll9faGlnaGVzdFNjb3JlX189aGlnaGVzdFNjb3JlO1xyXG5cclxuICAgIGxldCBzdGFydD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtcmVzdGFydCcpO1xyXG4gICAgc3RhcnQub25jbGljaz0oZSk9PntcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgc3RhcnQuaW5uZXJUZXh0PSdyZXN0YXJ0JztcclxuICAgICAgICBzdGFydC5zdHlsZS5kaXNwbGF5PSdub25lJztcclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbn07XHJcbiJdfQ==
