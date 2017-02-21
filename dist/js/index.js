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
        value: function checkArrWith1(arr, callback) {
            for (var i = 0; i <= arr.length - 1; i++) {
                for (var j = 0; j <= arr[0].length - 1; j++) {
                    if (arr[i][j] == 1) {
                        callback.call(this, i + this.curTop, j + this.curLeft);
                    }
                }
            }
        }

        /**
         * 根据数组矩阵画出当前方块
         */

    }, {
        key: 'draw',
        value: function draw(i, j) {
            var activeModel = document.createElement('div');
            activeModel.className = 'activityModel';
            activeModel.style.top = i * this.BLOCK_SIZE + 'px';
            activeModel.style.left = j * this.BLOCK_SIZE + 'px';
            document.body.appendChild(activeModel);
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
            this.checkArrWith1(this.arr, this.draw);
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
                    setTimeout(loop.bind(this), 600);
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
                                    _this2.init();
                                };
                            }
                        }.bind(this), 30);
                    } else {
                        _init();
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


var _init = function _init() {
    var random = Math.floor(Math.random() * __arr__.length),
        arr = __arr__[random];
    var params = {
        arr: arr,
        siteSize: __siteSize__,
        BLOCK_SIZE: __BLOCK_SIZE__,
        curLeft: __curLeft__,
        curTop: __curTop__
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

    _init();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkJsb2NrIiwicGFyYW1zIiwic2l0ZVNpemUiLCJhcnIiLCJCTE9DS19TSVpFIiwiY3VyTGVmdCIsImN1clRvcCIsIm5ld0FyciIsImkiLCJsZW5ndGgiLCJ0ZW1BcnIiLCJqIiwicHVzaCIsImxlZnRzIiwidG9wcyIsImNoZWNrQXJyV2l0aDEiLCJjYWxsYmFjayIsImNhbGwiLCJhY3RpdmVNb2RlbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInN0eWxlIiwidG9wIiwibGVmdCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImluYWN0aXZlTW9kZWwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGlnaGVzdCIsImxlZnRtb3N0IiwicmlnaHRtb3N0IiwiaGVpZ2h0Iiwid2lkdGgiLCJyaWdodHMiLCJ2IiwicGFyc2VJbnQiLCJNYXRoIiwibWluIiwibWF4IiwicmVzIiwiaW5hY3RpdmVNb2RlbHMiLCJzb3J0IiwiYSIsImIiLCJjb3VudCIsIm1vZGVscyIsImRlZm9ybSIsImRpc3BhbGNlbWVudCIsIm1vdmUiLCJjYW5Nb3ZlUmlnaHQiLCJjYW5Nb3ZlRG93biIsImNhbk1vdmVMZWZ0IiwiZ2V0SW50ZXJ2YWwiLCJvbmtleWRvd24iLCJlIiwiY2FuTW92ZVRvcCIsImtleSIsImtleUNvZGUiLCJjYW5Nb3ZlIiwiY29uc29sZSIsImxvZyIsImNsb2Nrd2lzZSIsImRyYXciLCJhY2l2ZU1vZGVsIiwiZmFsbERvd24iLCJzZXRUaW1lb3V0IiwibG9vcCIsImJpbmQiLCJlbGltaW5hdGUiLCJyZW1vdmVDaGlsZCIsImdhbWVPdmVyIiwiZmlsbElkIiwic2V0SW50ZXJ2YWwiLCJmaWxsIiwiY2xlYXJJbnRlcnZhbCIsInN0YXJ0T3JSZXN0YXJ0IiwicXVlcnlTZWxlY3RvciIsImRpc3BsYXkiLCJvbmNsaWNrIiwicHJldmVudERlZmF1bHQiLCJpbml0IiwiY2xlYXJUaW1lb3V0IiwibW9kZWwiLCJyYW5kb20iLCJmbG9vciIsIl9fYXJyX18iLCJfX3NpdGVTaXplX18iLCJfX0JMT0NLX1NJWkVfXyIsIl9fY3VyTGVmdF9fIiwiX19jdXJUb3BfXyIsImJsb2NrIiwid2luZG93Iiwib25sb2FkIiwic2l0ZSIsImdldENvbXB1dGVkU3R5bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFJQTs7OztBQUlBOzs7Ozs7Ozs7Ozs7O0lBYU1BLEs7QUFDRixtQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNoQjs7O0FBR0EsYUFBS0MsUUFBTCxHQUFnQkQsT0FBT0MsUUFBdkI7QUFDQSxhQUFLQyxHQUFMLEdBQVdGLE9BQU9FLEdBQWxCO0FBQ0EsYUFBS0MsVUFBTCxHQUFrQkgsT0FBT0csVUFBekI7QUFDQSxhQUFLQyxPQUFMLEdBQWVKLE9BQU9JLE9BQXRCO0FBQ0EsYUFBS0MsTUFBTCxHQUFjTCxPQUFPSyxNQUFyQjtBQUNIOztBQUVEOzs7Ozs7O2tDQUdVSCxHLEVBQUs7QUFDWCxnQkFBSUksU0FBUyxFQUFiO0FBQ0EsaUJBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxLQUFLTCxJQUFJLENBQUosRUFBT00sTUFBUCxHQUFnQixDQUFyQyxFQUF3Q0QsR0FBeEMsRUFBNkM7QUFDekMsb0JBQUlFLFNBQVMsRUFBYjtBQUNBLHFCQUFLLElBQUlDLElBQUlSLElBQUlNLE1BQUosR0FBYSxDQUExQixFQUE2QkUsS0FBSyxDQUFsQyxFQUFxQ0EsR0FBckMsRUFBMEM7QUFDdENELDJCQUFPRSxJQUFQLENBQVlULElBQUlRLENBQUosRUFBT0gsQ0FBUCxDQUFaO0FBQ0g7QUFDREQsdUJBQU9LLElBQVAsQ0FBWUYsTUFBWjtBQUNIO0FBQ0QsZ0JBQUlHLFFBQVEsRUFBWjtBQUNBLGdCQUFJQyxPQUFPLEVBQVg7O0FBRUEsaUJBQUtDLGFBQUwsQ0FBbUJSLE1BQW5CLEVBQTJCLFVBQVVDLENBQVYsRUFBYUcsQ0FBYixFQUFnQjtBQUN2Q0Usc0JBQU1ELElBQU4sQ0FBV0QsSUFBSSxLQUFLUCxVQUFwQjtBQUNBVSxx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aW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBBZG1pbmlzdHJhdG9yIG9uIDIwMTcvMi8yMC5cclxuICovXHJcblxyXG4vKipcclxuICog5a6a5LmJ5pa55Z2XXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEVTNiBDbGFzc1xyXG4gKiBDbGFzc+S4jeWtmOWcqOWPmOmHj+aPkOWNh++8iGhvaXN077yJ77yM6L+Z5LiA54K55LiORVM15a6M5YWo5LiN5ZCM44CCXHJcbiAqIGNsYXNzIEJhciB7XHJcbiAqICAgY29uc3RydWN0b3IoKXt9IGNvbnN0cnVjdG9y5pa55rOV5piv57G755qE6buY6K6k5pa55rOVXHJcbiAqICAgZG9TdHVmZigpIHtcclxuICogICAgY29uc29sZS5sb2coJ3N0dWZmJyk7XHJcbiAqICAgfVxyXG4gKiB9XHJcbiAqIOS9v+eUqOeahOaXtuWAme+8jOS5n+aYr+ebtOaOpeWvueexu+S9v+eUqG5ld+WRveS7pO+8jOi3n+aehOmAoOWHveaVsOeahOeUqOazleWujOWFqOS4gOiHtOOAglxyXG4gKiB2YXIgYiA9IG5ldyBCYXIoKTtcclxuICogYi5kb1N0dWZmKCkgLy8gXCJzdHVmZlwiXHJcbiAqL1xyXG5jbGFzcyBCbG9jayB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlsIZuZXcgQmxvY2socGFyYW1zKSDlj4LmlbDkvKDov5t0aGlzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zaXRlU2l6ZSA9IHBhcmFtcy5zaXRlU2l6ZTtcclxuICAgICAgICB0aGlzLmFyciA9IHBhcmFtcy5hcnI7XHJcbiAgICAgICAgdGhpcy5CTE9DS19TSVpFID0gcGFyYW1zLkJMT0NLX1NJWkU7XHJcbiAgICAgICAgdGhpcy5jdXJMZWZ0ID0gcGFyYW1zLmN1ckxlZnQ7XHJcbiAgICAgICAgdGhpcy5jdXJUb3AgPSBwYXJhbXMuY3VyVG9wO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pWw57uE55+p6Zi16aG65pe26ZKI5peL6L2sXHJcbiAgICAgKi9cclxuICAgIGNsb2Nrd2lzZShhcnIpIHtcclxuICAgICAgICBsZXQgbmV3QXJyID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gYXJyWzBdLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGVtQXJyID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBhcnIubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgICAgICAgICAgIHRlbUFyci5wdXNoKGFycltqXVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3QXJyLnB1c2godGVtQXJyKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVmdHMgPSBbXTtcclxuICAgICAgICBsZXQgdG9wcyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLmNoZWNrQXJyV2l0aDEobmV3QXJyLCBmdW5jdGlvbiAoaSwgaikge1xyXG4gICAgICAgICAgICBsZWZ0cy5wdXNoKGogKiB0aGlzLkJMT0NLX1NJWkUpO1xyXG4gICAgICAgICAgICB0b3BzLnB1c2goaSAqIHRoaXMuQkxPQ0tfU0laRSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5ld0FycjogbmV3QXJyLFxyXG4gICAgICAgICAgICBsZWZ0czogbGVmdHMsXHJcbiAgICAgICAgICAgIHRvcHM6IHRvcHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3kuoznu7TmlbDnu4TkuLox55qE5LiL5qCHXHJcbiAgICAgKi9cclxuXHJcbiAgICBjaGVja0FycldpdGgxKGFyciwgY2FsbGJhY2spIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBhcnIubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGFyclswXS5sZW5ndGggLSAxOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJbaV1bal0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgaSArIHRoaXMuY3VyVG9wLCBqICsgdGhpcy5jdXJMZWZ0KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5pWw57uE55+p6Zi155S75Ye65b2T5YmN5pa55Z2XXHJcbiAgICAgKi9cclxuICAgIGRyYXcoaSwgaikge1xyXG4gICAgICAgIGxldCBhY3RpdmVNb2RlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGFjdGl2ZU1vZGVsLmNsYXNzTmFtZSA9ICdhY3Rpdml0eU1vZGVsJztcclxuICAgICAgICBhY3RpdmVNb2RlbC5zdHlsZS50b3AgPSBgJHtpICogdGhpcy5CTE9DS19TSVpFfXB4YDtcclxuICAgICAgICBhY3RpdmVNb2RlbC5zdHlsZS5sZWZ0ID0gYCR7aiAqIHRoaXMuQkxPQ0tfU0laRX1weGA7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhY3RpdmVNb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKuiOt+WPluW9k+WJjeaWueWdl+WPr+S7peWIsOi+vueahOi+ueeVjFxyXG4gICAgICovXHJcbiAgICBnZXRJbnRlcnZhbChjdXJMZWZ0LCBjdXJUb3ApIHtcclxuICAgICAgICBsZXQgaW5hY3RpdmVNb2RlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbmFjdGl2ZU1vZGVsJyksXHJcbiAgICAgICAgICAgIGhpZ2hlc3QgPSBudWxsLFxyXG4gICAgICAgICAgICBsZWZ0bW9zdCA9IG51bGwsXHJcbiAgICAgICAgICAgIHJpZ2h0bW9zdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKGluYWN0aXZlTW9kZWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGhpZ2hlc3QgPSB0aGlzLnNpdGVTaXplLnRvcCArIHRoaXMuc2l0ZVNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICBsZWZ0bW9zdCA9IHRoaXMuc2l0ZVNpemUubGVmdCAtIHRoaXMuQkxPQ0tfU0laRTtcclxuICAgICAgICAgICAgcmlnaHRtb3N0ID0gdGhpcy5zaXRlU2l6ZS5sZWZ0ICsgdGhpcy5zaXRlU2l6ZS53aWR0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdG9wcyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgbGVmdHMgPSBbXSxcclxuICAgICAgICAgICAgICAgIHJpZ2h0cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIGluYWN0aXZlTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZWZ0ID0gcGFyc2VJbnQodi5zdHlsZS5sZWZ0KSxcclxuICAgICAgICAgICAgICAgICAgICB0b3AgPSBwYXJzZUludCh2LnN0eWxlLnRvcCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVmdCA9PT0gY3VyTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcHMucHVzaCh0b3ApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodG9wID09PSBjdXJUb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCA8IGN1ckxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdHMucHVzaChsZWZ0KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGVmdCA+IGN1ckxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRzLnB1c2gobGVmdClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRvcHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBoaWdoZXN0ID0gdGhpcy5zaXRlU2l6ZS50b3AgKyB0aGlzLnNpdGVTaXplLmhlaWdodDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhpZ2hlc3QgPSBNYXRoLm1pbiguLi50b3BzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxlZnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGVmdG1vc3QgPSB0aGlzLnNpdGVTaXplLmxlZnQgLSB0aGlzLkJMT0NLX1NJWkU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0bW9zdCA9IE1hdGgubWF4KC4uLmxlZnRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJpZ2h0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0bW9zdCA9IHRoaXMuc2l0ZVNpemUubGVmdCArIHRoaXMuc2l0ZVNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByaWdodG1vc3QgPSBNYXRoLm1pbiguLi5yaWdodHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoaWdoZXN0OiBoaWdoZXN0LFxyXG4gICAgICAgICAgICBsZWZ0bW9zdDogbGVmdG1vc3QsXHJcbiAgICAgICAgICAgIHJpZ2h0bW9zdDogcmlnaHRtb3N0XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa2iOmZpOegluWdl1xyXG4gICAgICovXHJcbiAgICBlbGltaW5hdGUoKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IFtdLFxyXG4gICAgICAgICAgICBpbmFjdGl2ZU1vZGVscyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5hY3RpdmVNb2RlbCcpXTtcclxuICAgICAgICBpbmFjdGl2ZU1vZGVscy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChhLnN0eWxlLnRvcCkgLSBwYXJzZUludChiLnN0eWxlLnRvcCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5hY3RpdmVNb2RlbHMubGVuZ3RoOykge1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwLFxyXG4gICAgICAgICAgICAgICAgbW9kZWxzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaW5hY3RpdmVNb2RlbHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmFjdGl2ZU1vZGVsc1tpXS5zdHlsZS50b3AgPT09IGluYWN0aXZlTW9kZWxzW2pdLnN0eWxlLnRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxzLnB1c2goaW5hY3RpdmVNb2RlbHNbal0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBtb2RlbHM6IG1vZGVscyxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBjb3VudCxcclxuICAgICAgICAgICAgICAgIHRvcDogcGFyc2VJbnQoaW5hY3RpdmVNb2RlbHNbaV0uc3R5bGUudG9wKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9mb3Ig5b6q546v55qE5pyA5ZCO5LiA5Liq5Y+C5pWw5Y+v5Lul5pS+5Zyo5b6q546v5L2T5YaFXHJcbiAgICAgICAgICAgIGkgKz0gY291bnRcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW9k+eBsOiJsuegluWdl+mrmOS6jueUu+W4g+WBj+enu+mHj++8jOa4uOaIj+e7k+adn1xyXG4gICAgICovXHJcbiAgICBnYW1lT3Zlcigpe1xyXG4gICAgICAgIGNvbnN0IGluYWN0aXZlTW9kZWw9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluYWN0aXZlTW9kZWwnKTtcclxuICAgICAgICBsZXQgdG9wcz1bXTtcclxuICAgICAgICBmb3IobGV0IHYgb2YgaW5hY3RpdmVNb2RlbCl7XHJcbiAgICAgICAgICAgIHRvcHMucHVzaChwYXJzZUludCh2LnN0eWxlLnRvcCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTWF0aC5taW4oLi4udG9wcykgPD10aGlzLnNpdGVTaXplLnRvcFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2FtZU92ZXLloavlhYXliqjnlLtcclxuICAgICAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiBjbGFzcyDpnZnmgIHmlrnms5VcclxuICAgICAqIOivpeaWueazleS4jeS8muiiq+WunuS+i+e7p+aJv++8jOiAjOaYr+ebtOaOpemAmui/h+exu+adpeiwg+eUqCBCbG9jay5maWxsKCk7XHJcbiAgICAgKiDniLbnsbvnmoTpnZnmgIHmlrnms5XvvIzlj6/ku6XooqvlrZDnsbvnu6fmib/jgIJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZpbGwoY3VyVG9wLGN1ckxlZnQpe1xyXG4gICAgICAgIGxldCBtb2RlbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBtb2RlbC5jbGFzc05hbWU9J2luYWN0aXZlTW9kZWwnO1xyXG4gICAgICAgIG1vZGVsLnN0eWxlLmxlZnQ9YCR7Y3VyTGVmdH1weGA7XHJcbiAgICAgICAgbW9kZWwuc3R5bGUudG9wPWAke2N1clRvcH1weGA7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RlbCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuWPr+S7peenu+WKqFxyXG4gICAgICovXHJcbiAgICBjYW5Nb3ZlKGFyciwgZGVmb3JtID0gZmFsc2UsIGRpc3BhbGNlbWVudD0xLG1vdmUgPSB7XHJcbiAgICAgICAgY2FuTW92ZVJpZ2h0OiB0cnVlLFxyXG4gICAgICAgIGNhbk1vdmVEb3duOiB0cnVlLFxyXG4gICAgICAgIGNhbk1vdmVMZWZ0OiB0cnVlXHJcbiAgICB9KSB7XHJcbiAgICAgICAgdGhpcy5jaGVja0FycldpdGgxKGFyciwgZnVuY3Rpb24gKGksIGopIHtcclxuICAgICAgICAgICAgbGV0IHtoaWdoZXN0LCBsZWZ0bW9zdCwgcmlnaHRtb3N0fT10aGlzLmdldEludGVydmFsKGogKiB0aGlzLkJMT0NLX1NJWkUsIGkgKiB0aGlzLkJMT0NLX1NJWkUpO1xyXG4gICAgICAgICAgICBpZiAoZGVmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5CTE9DS19TSVpFICogKGogKyAxKSA+IHJpZ2h0bW9zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmUuY2FuTW92ZVJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5CTE9DS19TSVpFICogKGkgKyBkaXNwYWxjZW1lbnQpID4gaGlnaGVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmUuY2FuTW92ZURvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkJMT0NLX1NJWkUgKiAoaiAtIDEpIDwgbGVmdG1vc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlLmNhbk1vdmVMZWZ0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkJMT0NLX1NJWkUgKiAoaiArIDEpID49IHJpZ2h0bW9zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmUuY2FuTW92ZVJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5CTE9DS19TSVpFICogKGkgKyBkaXNwYWxjZW1lbnQpID49IGhpZ2hlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlLmNhbk1vdmVEb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5CTE9DS19TSVpFICogKGogLSAxKSA8PSBsZWZ0bW9zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmUuY2FuTW92ZUxlZnQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBtb3ZlO1xyXG4gICAgICAgIC8qIEFycmF5LmZyb23mlrnms5XnlKjkuo7lsIbnsbvmlbDnu4TovazkuLrnnJ/mraPnmoTmlbDnu4RcclxuICAgICAgICAgZm9yLi4ub2Y6IGZvci4uLmlu5b6q546v6K+75Y+W6ZSu5ZCN77yMZm9yLi4ub2blvqrnjq/or7vlj5bplK7lgLxcclxuICAgICAgICAgZm9yKGxldCB2IG9mIEFycmF5LmZyb20oYWN0aXZlTW9kZWwpKXtcclxuICAgICAgICAgdG9wcy5wdXNoKHBhcnNlSW50KHYuc3R5bGUudG9wKSk7XHJcbiAgICAgICAgIGxlZnRzLnB1c2gocGFyc2VJbnQodi5zdHlsZS5sZWZ0KSlcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgbWluKCkg5pa55rOV5Y+v6L+U5Zue5oyH5a6a55qE5pWw5a2X5Lit5bim5pyJ5pyA5L2O5YC855qE5pWw5a2X44CC5Y+C5pWw5Li655So6YCX5Y+35YiG6ZqU55qE5Y+C5pWw5bqP5YiX77yM5LiN5piv5pWw57uEXHJcbiAgICAgICAgIG1heCgpIOaWueazleWPr+i/lOWbnuaMh+WumueahOaVsOWtl+S4reW4puacieacgOWkp+WAvOeahOaVsOWtl+OAglxyXG4gICAgICAgICAuLi4g5omp5bGV6L+Q566X56ym77ya5bCG5pWw57uE6L2s5Li655So6YCX5Y+35YiG6ZqU55qE5Y+C5pWw5bqP5YiXXHJcbiAgICAgICAgIC4uLiByZXNldOi/kOeul+espu+8muWFtuWKn+iDveS4juaJqeWxlei/kOeul+espuaBsOWlveebuOWPje+8jOaKiumAl+WPt+malOW8gOeahOWAvOW6j+WIl+e7hOWQiOaIkOS4gOS4quaVsOe7hFxyXG4gICAgICAgICBsZXQgdG9wID0gTWF0aC5taW4oLi4udG9wcyksXHJcbiAgICAgICAgIGxlZnQgPSBNYXRoLm1pbiguLi5sZWZ0cyksXHJcbiAgICAgICAgIHJpZ2h0ID0gTWF0aC5tYXgoLi4ubGVmdHMpLFxyXG4gICAgICAgICBkb3duID0gTWF0aC5tYXgoLi4udG9wcyk7XHJcbiAgICAgICAgIGlmIChkZWZvcm0pIHtcclxuICAgICAgICAgaWYgKHJpZ2h0ICsgMjAgPj0gdGhpcy5zaXRlU2l6ZS5sZWZ0ICsgdGhpcy5zaXRlU2l6ZS53aWR0aCkge1xyXG4gICAgICAgICBjYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBpZiAocmlnaHQgKyAyMCA+PSB0aGlzLnNpdGVTaXplLmxlZnQgKyB0aGlzLnNpdGVTaXplLndpZHRoKSB7XHJcbiAgICAgICAgIGNhbk1vdmVSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmIChsZWZ0IC0gMjAgPCB0aGlzLnNpdGVTaXplLmxlZnQpIHtcclxuICAgICAgICAgY2FuTW92ZUxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBpZiAoZG93biArIDIwID49IHRoaXMuc2l0ZVNpemUudG9wICsgdGhpcy5zaXRlU2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgY2FuTW92ZURvd24gPSBmYWxzZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBpZiAodG9wIC0gMjAgPCB0aGlzLnNpdGVTaXplLnRvcCkge1xyXG4gICAgICAgICBjYW5Nb3ZlVG9wID0gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgIGNhbk1vdmVSaWdodDogY2FuTW92ZVJpZ2h0LFxyXG4gICAgICAgICBjYW5Nb3ZlTGVmdDogY2FuTW92ZUxlZnQsXHJcbiAgICAgICAgIGNhbk1vdmVUb3A6IGNhbk1vdmVUb3AsXHJcbiAgICAgICAgIGNhbk1vdmVEb3duOiBjYW5Nb3ZlRG93blxyXG4gICAgICAgICB9Ki9cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUruebmOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBtb3ZlKCkge1xyXG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IChlKT0+IHtcclxuICAgICAgICAgICAgbGV0IGFjdGl2ZU1vZGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2aXR5TW9kZWwnKSxcclxuICAgICAgICAgICAgICAgIG1vdmUsXHJcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgIGNhbk1vdmVUb3AsXHJcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlRG93bjtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gZS5rZXlDb2RlO1xyXG4gICAgICAgICAgICBpZihhY3RpdmVNb2RlbC5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2xlZnRcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlTGVmdCA9IHRoaXMuY2FuTW92ZSh0aGlzLmFycikuY2FuTW92ZUxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYW5Nb3ZlTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBhY3RpdmVNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYuc3R5bGUubGVmdCA9IGAke3BhcnNlSW50KHYuc3R5bGUubGVmdCkgLSB0aGlzLkJMT0NLX1NJWkV9cHhgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJMZWZ0LS07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW5gdCBtb3ZlIGxlZnRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy91cFxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7bmV3QXJyLCBsZWZ0cywgdG9wc309dGhpcy5jbG9ja3dpc2UodGhpcy5hcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlID0gdGhpcy5jYW5Nb3ZlKG5ld0FyciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVEb3duID0gbW92ZS5jYW5Nb3ZlRG93bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZVJpZ2h0ID0gbW92ZS5jYW5Nb3ZlUmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVMZWZ0ID0gbW92ZS5jYW5Nb3ZlTGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbk1vdmVSaWdodCAmJiBjYW5Nb3ZlRG93biAmJiBjYW5Nb3ZlTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnIgPSBuZXdBcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIGxlZnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTW9kZWxbaV0uc3R5bGUubGVmdCA9IGAke2xlZnRzW2ldfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNb2RlbFtpXS5zdHlsZS50b3AgPSBgJHt0b3BzW2ldfXB4YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlUmlnaHQgPSB0aGlzLmNhbk1vdmUodGhpcy5hcnIpLmNhbk1vdmVSaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbk1vdmVSaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBhY3RpdmVNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYuc3R5bGUubGVmdCA9IGAke3BhcnNlSW50KHYuc3R5bGUubGVmdCkgKyB0aGlzLkJMT0NLX1NJWkV9cHhgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJMZWZ0KytcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSByaWdodFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVEb3duID0gdGhpcy5jYW5Nb3ZlKHRoaXMuYXJyLGZhbHNlLDIpLmNhbk1vdmVEb3duO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuTW92ZURvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHYgb2YgYWN0aXZlTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LnN0eWxlLnRvcCA9IGAke3BhcnNlSW50KHYuc3R5bGUudG9wKSArIDIqdGhpcy5CTE9DS19TSVpFfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyVG9wICs9MjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSBkb3duXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K+36YCJ5oup5LiK5LiL5bem5Y+z5oyJ6ZSuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluaWueWdlyovXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuY2hlY2tBcnJXaXRoMSh0aGlzLmFyciwgdGhpcy5kcmF3KVxyXG4gICAgICAgIGxldCBhY2l2ZU1vZGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2aXR5TW9kZWwnKTtcclxuICAgICAgICBjb25zdCBmYWxsRG93biA9IHNldFRpbWVvdXQoZnVuY3Rpb24gbG9vcCgpIHtcclxuICAgICAgICAgICAgLy9zZXRUaW1lb3V05Lya5pS55Y+YdGhpc+eahOaMh+WQke+8jOaJgOS7pemcgOimgWJpbmQodGhpcylcclxuICAgICAgICAgICAgbGV0IGNhbk1vdmVEb3duID0gdGhpcy5jYW5Nb3ZlKHRoaXMuYXJyKS5jYW5Nb3ZlRG93bjtcclxuICAgICAgICAgICAgaWYgKGNhbk1vdmVEb3duKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFjaXZlTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2LnN0eWxlLnRvcCA9IGAke3BhcnNlSW50KHYuc3R5bGUudG9wKSArIHRoaXMuQkxPQ0tfU0laRX1weGBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyVG9wKys7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3AuYmluZCh0aGlzKSwgNjAwKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBhY2l2ZU1vZGVsLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjaXZlTW9kZWxbaV0uY2xhc3NOYW1lID0gJ2luYWN0aXZlTW9kZWwnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLmVsaW1pbmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQge2NvdW50LCBtb2RlbHMsIHRvcH09cmVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gcGFyc2VJbnQodGhpcy5zaXRlU2l6ZS53aWR0aCAvIHRoaXMuQkxPQ0tfU0laRSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtb2RlbHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobW9kZWxzW2pdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5hY3RpdmVNb2RlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5hY3RpdmVNb2RlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIGluYWN0aXZlTW9kZWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodi5zdHlsZS50b3ApIDwgdG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS50b3AgPSBgJHtwYXJzZUludCh2LnN0eWxlLnRvcCkgKyB0aGlzLkJMT0NLX1NJWkV9cHhgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5nYW1lT3ZlcigpKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FtZSBvdmVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1clRvcD10aGlzLnNpdGVTaXplLmhlaWdodCt0aGlzLnNpdGVTaXplLnRvcC10aGlzLkJMT0NLX1NJWkUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckxlZnQ9dGhpcy5zaXRlU2l6ZS53aWR0aCt0aGlzLnNpdGVTaXplLmxlZnQtdGhpcy5CTE9DS19TSVpFO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxsSWQ9c2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCbG9jay5maWxsKGN1clRvcCxjdXJMZWZ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyTGVmdCAtPSB0aGlzLkJMT0NLX1NJWkU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGN1ckxlZnQgPCB0aGlzLnNpdGVTaXplLmxlZnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyTGVmdCA9dGhpcy5zaXRlU2l6ZS53aWR0aCt0aGlzLnNpdGVTaXplLmxlZnQtdGhpcy5CTE9DS19TSVpFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9wIC09IHRoaXMuQkxPQ0tfU0laRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGN1clRvcCA8IHRoaXMuc2l0ZVNpemUudG9wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZmlsbElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydE9yUmVzdGFydD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtcmVzdGFydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPclJlc3RhcnQuc3R5bGUuZGlzcGxheT0nYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPclJlc3RhcnQub25jbGljaz0oZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPclJlc3RhcnQuc3R5bGUuZGlzcGxheT0nbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluYWN0aXZlTW9kZWxzPVsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5hY3RpdmVNb2RlbCcpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpbmFjdGl2ZU1vZGVscy5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdiBvZiBpbmFjdGl2ZU1vZGVscyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLDMwKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZmFsbERvd24pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyksIDYwMClcclxuICAgIH1cclxufVxyXG4vKipcclxuICog5pWw5o2u5Yid5aeL5YyWXHJcbiAqL1xyXG5jb25zdCBpbml0ID0gKCk9PiB7XHJcbiAgICBjb25zdCByYW5kb209TWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSpfX2Fycl9fLmxlbmd0aCkpLFxyXG4gICAgICAgIGFyciA9X19hcnJfX1tyYW5kb21dO1xyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIGFycjogYXJyLFxyXG4gICAgICAgIHNpdGVTaXplOiBfX3NpdGVTaXplX18sXHJcbiAgICAgICAgQkxPQ0tfU0laRTogX19CTE9DS19TSVpFX18sXHJcbiAgICAgICAgY3VyTGVmdDogX19jdXJMZWZ0X18sXHJcbiAgICAgICAgY3VyVG9wOiBfX2N1clRvcF9fXHJcbiAgICB9O1xyXG4gICAgbGV0IGJsb2NrID0gbmV3IEJsb2NrKHBhcmFtcyk7XHJcbiAgICBibG9jay5pbml0KCk7XHJcbiAgICBibG9jay5tb3ZlKCk7XHJcbn07XHJcbi8qKlxyXG4gKua1j+iniOWZqOWIneWni+WMllxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBFUzbnrq3lpLTlh73mlbBcclxuICog5Ye95pWw5L2T5YaF55qEdGhpc+Wvueixoe+8jOWwseaYr+WumuS5ieaXtuaJgOWcqOeahOWvueixoe+8jOiAjOS4jeaYr+S9v+eUqOaXtuaJgOWcqOeahOWvueixoeOAglxyXG4gKiB2YXIgc3VtID0gKG51bTEsIG51bTIpID0+IG51bTEgKyBudW0yO1xyXG4gKiDnrYnlkIzkuo5cclxuICogdmFyIHN1bSA9IGZ1bmN0aW9uKG51bTEsIG51bTIpIHtcclxuICogcmV0dXJuIG51bTEgKyBudW0yO1xyXG4gKiB9O1xyXG4gKi9cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwid2luZG93IG9ubG9hZFwiKTtcclxuICAgIGxldCBzaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUnKTtcclxuICAgIC8vIFdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCkg5pa55rOV5Lya5Zyo5LiA5Liq5YWD57Sg5bqU55So5a6M5pyJ5pWI5qC35byP5LiU6K6h566X5a6M5omA5pyJ5bGe5oCn55qE5Z+65pys5YC85LmL5ZCO57uZ5Ye65omA5pyJIENTUyDlsZ7mgKfnmoTlgLzjgIJcclxuICAgIGxldCB7d2lkdGgsIGhlaWdodCwgbGVmdCwgdG9wfSA9d2luZG93LmdldENvbXB1dGVkU3R5bGUoc2l0ZSk7XHJcbiAgICBsZXQgc2l0ZVNpemUgPSB7XHJcbiAgICAgICAgd2lkdGg6IHBhcnNlSW50KHdpZHRoKSxcclxuICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KGhlaWdodCksXHJcbiAgICAgICAgbGVmdDogcGFyc2VJbnQobGVmdCksXHJcbiAgICAgICAgdG9wOiBwYXJzZUludCh0b3ApXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyID1bXHJcbiAgICAgICAgLy9MXHJcbiAgICAgICAgW1sxLCAwXSwgWzEsIDBdLCBbMSwgMV1dLFxyXG4gICAgICAgIFtbMSwgMSwgMV0sIFsxLCAwLCAwXV0sXHJcbiAgICAgICAgW1sxLCAxXSwgWzAsIDFdLCBbMCwgMV1dLFxyXG4gICAgICAgIFtbMCwgMCwgMV0sIFsxLCAxLCAxXV0sXHJcbiAgICAgICAgLy/jgI9cclxuICAgICAgICBbWzAsIDFdLCBbMCwgMV0sIFsxLCAxXV0sXHJcbiAgICAgICAgW1sxLCAwLCAwXSwgWzEsIDEsIDFdXSxcclxuICAgICAgICBbWzEsIDFdLCBbMSwgMF0sIFsxLCAwXV0sXHJcbiAgICAgICAgW1sxLCAxLCAxXSwgWzAsIDAsIDFdXSxcclxuICAgICAgICAvL0lcclxuICAgICAgICBbWzFdLCBbMV0sIFsxXSwgWzFdXSxcclxuICAgICAgICBbWzEsIDEsIDEsIDFdXSxcclxuICAgICAgICBbWzFdLCBbMV0sIFsxXSwgWzFdXSxcclxuICAgICAgICBbWzEsIDEsIDEsIDFdXSxcclxuICAgICAgICAvL+eUsFxyXG4gICAgICAgIFtbMSwgMV0sIFsxLCAxXV0sXHJcbiAgICAgICAgW1sxLCAxXSwgWzEsIDFdXSxcclxuICAgICAgICBbWzEsIDFdLCBbMSwgMV1dLFxyXG4gICAgICAgIFtbMSwgMV0sIFsxLCAxXV0sXHJcbiAgICAgICAgLy9UXHJcbiAgICAgICAgW1sxLCAxLCAxXSwgWzAsIDEsIDBdXSxcclxuICAgICAgICBbWzAsIDFdLCBbMSwgMV0sIFswLCAxXV0sXHJcbiAgICAgICAgW1swLCAxLCAwXSwgWzEsIDEsIDFdXSxcclxuICAgICAgICBbWzEsIDBdLCBbMSwgMV0sIFsxLCAwXV0sXHJcbiAgICAgICAgLy9aXHJcbiAgICAgICAgW1sxLCAxLCAwXSwgWzAsIDEsIDFdXSxcclxuICAgICAgICBbWzAsIDFdLCBbMSwgMV0sIFsxLCAwXV0sXHJcbiAgICAgICAgW1sxLCAxLCAwXSwgWzAsIDEsIDFdXSxcclxuICAgICAgICBbWzAsIDFdLCBbMSwgMV0sIFsxLCAwXV0sXHJcbiAgICAgICAgLy/lgJJaXHJcbiAgICAgICAgW1swLCAxLCAxXSwgWzEsIDEsIDBdXSxcclxuICAgICAgICBbWzEsIDBdLCBbMSwgMV0sIFswLCAxXV0sXHJcbiAgICAgICAgW1swLCAxLCAxXSwgWzEsIDEsIDBdXSxcclxuICAgICAgICBbWzEsIDBdLCBbMSwgMV0sIFswLCAxXV1cclxuICAgIF07XHJcbiAgICBjb25zdCBCTE9DS19TSVpFID0gMjA7XHJcbiAgICBsZXQgY3VyTGVmdCA9IHBhcnNlSW50KChzaXRlU2l6ZS5sZWZ0ICsgc2l0ZVNpemUud2lkdGggLyAyKSAvIEJMT0NLX1NJWkUpO1xyXG4gICAgbGV0IGN1clRvcCA9IHBhcnNlSW50KHNpdGVTaXplLnRvcCAvIEJMT0NLX1NJWkUpO1xyXG4gICAgd2luZG93Ll9fYXJyX18gPSBhcnI7XHJcbiAgICB3aW5kb3cuX19zaXRlU2l6ZV9fID0gc2l0ZVNpemU7XHJcbiAgICB3aW5kb3cuX19CTE9DS19TSVpFX18gPSBCTE9DS19TSVpFO1xyXG4gICAgd2luZG93Ll9fY3VyTGVmdF9fID0gY3VyTGVmdDtcclxuICAgIHdpbmRvdy5fX2N1clRvcF9fID0gY3VyVG9wO1xyXG5cclxuICAgIGluaXQoKTtcclxuXHJcblxyXG59O1xyXG4iXX0=
