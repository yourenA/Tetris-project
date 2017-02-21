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
            for (var i = 0; i <= arr.length - 1; i++) {
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
                for (var j = 0; j <= arr.length - 1; j++) {
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
    var params = {
        arr: __arr__,
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
    var arr = [[1, 0], [1, 0], [1, 1]];
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkJsb2NrIiwicGFyYW1zIiwic2l0ZVNpemUiLCJhcnIiLCJCTE9DS19TSVpFIiwiY3VyTGVmdCIsImN1clRvcCIsIm5ld0FyciIsImkiLCJsZW5ndGgiLCJ0ZW1BcnIiLCJqIiwicHVzaCIsImxlZnRzIiwidG9wcyIsImNoZWNrQXJyV2l0aDEiLCJjYWxsYmFjayIsImNhbGwiLCJhY3RpdmVNb2RlbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInN0eWxlIiwidG9wIiwibGVmdCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImluYWN0aXZlTW9kZWwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGlnaGVzdCIsImxlZnRtb3N0IiwicmlnaHRtb3N0IiwiaGVpZ2h0Iiwid2lkdGgiLCJyaWdodHMiLCJ2IiwicGFyc2VJbnQiLCJNYXRoIiwibWluIiwibWF4IiwicmVzIiwiaW5hY3RpdmVNb2RlbHMiLCJzb3J0IiwiYSIsImIiLCJjb3VudCIsIm1vZGVscyIsImRlZm9ybSIsImRpc3BhbGNlbWVudCIsIm1vdmUiLCJjYW5Nb3ZlUmlnaHQiLCJjYW5Nb3ZlRG93biIsImNhbk1vdmVMZWZ0IiwiZ2V0SW50ZXJ2YWwiLCJvbmtleWRvd24iLCJlIiwiY2FuTW92ZVRvcCIsImtleSIsImtleUNvZGUiLCJjYW5Nb3ZlIiwiY29uc29sZSIsImxvZyIsImNsb2Nrd2lzZSIsImRyYXciLCJhY2l2ZU1vZGVsIiwiZmFsbERvd24iLCJzZXRUaW1lb3V0IiwibG9vcCIsImJpbmQiLCJlbGltaW5hdGUiLCJyZW1vdmVDaGlsZCIsImdhbWVPdmVyIiwiZmlsbElkIiwic2V0SW50ZXJ2YWwiLCJmaWxsIiwiY2xlYXJJbnRlcnZhbCIsInN0YXJ0T3JSZXN0YXJ0IiwicXVlcnlTZWxlY3RvciIsImRpc3BsYXkiLCJvbmNsaWNrIiwicHJldmVudERlZmF1bHQiLCJpbml0IiwiY2xlYXJUaW1lb3V0IiwibW9kZWwiLCJfX2Fycl9fIiwiX19zaXRlU2l6ZV9fIiwiX19CTE9DS19TSVpFX18iLCJfX2N1ckxlZnRfXyIsIl9fY3VyVG9wX18iLCJibG9jayIsIndpbmRvdyIsIm9ubG9hZCIsInNpdGUiLCJnZXRDb21wdXRlZFN0eWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBSUE7Ozs7QUFJQTs7Ozs7Ozs7Ozs7OztJQWFNQSxLO0FBQ0YsbUJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDaEI7OztBQUdBLGFBQUtDLFFBQUwsR0FBZ0JELE9BQU9DLFFBQXZCO0FBQ0EsYUFBS0MsR0FBTCxHQUFXRixPQUFPRSxHQUFsQjtBQUNBLGFBQUtDLFVBQUwsR0FBa0JILE9BQU9HLFVBQXpCO0FBQ0EsYUFBS0MsT0FBTCxHQUFlSixPQUFPSSxPQUF0QjtBQUNBLGFBQUtDLE1BQUwsR0FBY0wsT0FBT0ssTUFBckI7QUFDSDs7QUFFRDs7Ozs7OztrQ0FHVUgsRyxFQUFLO0FBQ1gsZ0JBQUlJLFNBQVMsRUFBYjtBQUNBLGlCQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsS0FBS0wsSUFBSU0sTUFBSixHQUFhLENBQWxDLEVBQXFDRCxHQUFyQyxFQUEwQztBQUN0QyxvQkFBSUUsU0FBUyxFQUFiO0FBQ0EscUJBQUssSUFBSUMsSUFBSVIsSUFBSU0sTUFBSixHQUFhLENBQTFCLEVBQTZCRSxLQUFLLENBQWxDLEVBQXFDQSxHQUFyQyxFQUEwQztBQUN0Q0QsMkJBQU9FLElBQVAsQ0FBWVQsSUFBSVEsQ0FBSixFQUFPSCxDQUFQLENBQVo7QUFDSDtBQUNERCx1QkFBT0ssSUFBUCxDQUFZRixNQUFaO0FBQ0g7QUFDRCxnQkFBSUcsUUFBUSxFQUFaO0FBQ0EsZ0JBQUlDLE9BQU8sRUFBWDs7QUFFQSxpQkFBS0MsYUFBTCxDQUFtQlIsTUFBbkIsRUFBMkIsVUFBVUMsQ0FBVixFQUFhRyxDQUFiLEVBQWdCO0FBQ3ZDRSxzQkFBTUQsSUFBTixDQUFXRCxJQUFJLEtBQUtQLFVBQXBCO0FBQ0FVLHFCQUFLRixJQUFMLENBQVVKLElBQUksS0FBS0os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UCxHQUFxQmxGLE9BQXJCO0FBQ0FxRixXQUFPRixVQUFQLEdBQW9CbEYsTUFBcEI7O0FBRUEyRTtBQUdILENBeEJEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQWRtaW5pc3RyYXRvciBvbiAyMDE3LzIvMjAuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIOWumuS5ieaWueWdl1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBFUzYgQ2xhc3NcclxuICogQ2xhc3PkuI3lrZjlnKjlj5jph4/mj5DljYfvvIhob2lzdO+8ie+8jOi/meS4gOeCueS4jkVTNeWujOWFqOS4jeWQjOOAglxyXG4gKiBjbGFzcyBCYXIge1xyXG4gKiAgIGNvbnN0cnVjdG9yKCl7fSBjb25zdHJ1Y3RvcuaWueazleaYr+exu+eahOm7mOiupOaWueazlVxyXG4gKiAgIGRvU3R1ZmYoKSB7XHJcbiAqICAgIGNvbnNvbGUubG9nKCdzdHVmZicpO1xyXG4gKiAgIH1cclxuICogfVxyXG4gKiDkvb/nlKjnmoTml7blgJnvvIzkuZ/mmK/nm7TmjqXlr7nnsbvkvb/nlKhuZXflkb3ku6TvvIzot5/mnoTpgKDlh73mlbDnmoTnlKjms5XlrozlhajkuIDoh7TjgIJcclxuICogdmFyIGIgPSBuZXcgQmFyKCk7XHJcbiAqIGIuZG9TdHVmZigpIC8vIFwic3R1ZmZcIlxyXG4gKi9cclxuY2xhc3MgQmxvY2sge1xyXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5bCGbmV3IEJsb2NrKHBhcmFtcykg5Y+C5pWw5Lyg6L+bdGhpc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2l0ZVNpemUgPSBwYXJhbXMuc2l0ZVNpemU7XHJcbiAgICAgICAgdGhpcy5hcnIgPSBwYXJhbXMuYXJyO1xyXG4gICAgICAgIHRoaXMuQkxPQ0tfU0laRSA9IHBhcmFtcy5CTE9DS19TSVpFO1xyXG4gICAgICAgIHRoaXMuY3VyTGVmdCA9IHBhcmFtcy5jdXJMZWZ0O1xyXG4gICAgICAgIHRoaXMuY3VyVG9wID0gcGFyYW1zLmN1clRvcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaVsOe7hOefqemYtemhuuaXtumSiOaXi+i9rFxyXG4gICAgICovXHJcbiAgICBjbG9ja3dpc2UoYXJyKSB7XHJcbiAgICAgICAgbGV0IG5ld0FyciA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGFyci5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRlbUFyciA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gYXJyLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1BcnIucHVzaChhcnJbal1baV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld0Fyci5wdXNoKHRlbUFycilcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlZnRzID0gW107XHJcbiAgICAgICAgbGV0IHRvcHMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja0FycldpdGgxKG5ld0FyciwgZnVuY3Rpb24gKGksIGopIHtcclxuICAgICAgICAgICAgbGVmdHMucHVzaChqICogdGhpcy5CTE9DS19TSVpFKTtcclxuICAgICAgICAgICAgdG9wcy5wdXNoKGkgKiB0aGlzLkJMT0NLX1NJWkUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZXdBcnI6IG5ld0FycixcclxuICAgICAgICAgICAgbGVmdHM6IGxlZnRzLFxyXG4gICAgICAgICAgICB0b3BzOiB0b3BzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5LqM57u05pWw57uE5Li6MeeahOS4i+agh1xyXG4gICAgICovXHJcblxyXG4gICAgY2hlY2tBcnJXaXRoMShhcnIsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gYXJyLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBhcnIubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2ldW2pdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGkgKyB0aGlzLmN1clRvcCwgaiArIHRoaXMuY3VyTGVmdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruaVsOe7hOefqemYteeUu+WHuuW9k+WJjeaWueWdl1xyXG4gICAgICovXHJcbiAgICBkcmF3KGksIGopIHtcclxuICAgICAgICBsZXQgYWN0aXZlTW9kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBhY3RpdmVNb2RlbC5jbGFzc05hbWUgPSAnYWN0aXZpdHlNb2RlbCc7XHJcbiAgICAgICAgYWN0aXZlTW9kZWwuc3R5bGUudG9wID0gYCR7aSAqIHRoaXMuQkxPQ0tfU0laRX1weGA7XHJcbiAgICAgICAgYWN0aXZlTW9kZWwuc3R5bGUubGVmdCA9IGAke2ogKiB0aGlzLkJMT0NLX1NJWkV9cHhgO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYWN0aXZlTW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICrojrflj5blvZPliY3mlrnlnZflj6/ku6XliLDovr7nmoTovrnnlYxcclxuICAgICAqL1xyXG4gICAgZ2V0SW50ZXJ2YWwoY3VyTGVmdCwgY3VyVG9wKSB7XHJcbiAgICAgICAgbGV0IGluYWN0aXZlTW9kZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5hY3RpdmVNb2RlbCcpLFxyXG4gICAgICAgICAgICBoaWdoZXN0ID0gbnVsbCxcclxuICAgICAgICAgICAgbGVmdG1vc3QgPSBudWxsLFxyXG4gICAgICAgICAgICByaWdodG1vc3QgPSBudWxsO1xyXG4gICAgICAgIGlmIChpbmFjdGl2ZU1vZGVsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBoaWdoZXN0ID0gdGhpcy5zaXRlU2l6ZS50b3AgKyB0aGlzLnNpdGVTaXplLmhlaWdodDtcclxuICAgICAgICAgICAgbGVmdG1vc3QgPSB0aGlzLnNpdGVTaXplLmxlZnQgLSB0aGlzLkJMT0NLX1NJWkU7XHJcbiAgICAgICAgICAgIHJpZ2h0bW9zdCA9IHRoaXMuc2l0ZVNpemUubGVmdCArIHRoaXMuc2l0ZVNpemUud2lkdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHRvcHMgPSBbXSxcclxuICAgICAgICAgICAgICAgIGxlZnRzID0gW10sXHJcbiAgICAgICAgICAgICAgICByaWdodHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBpbmFjdGl2ZU1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVmdCA9IHBhcnNlSW50KHYuc3R5bGUubGVmdCksXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gcGFyc2VJbnQodi5zdHlsZS50b3ApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlZnQgPT09IGN1ckxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3BzLnB1c2godG9wKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRvcCA9PT0gY3VyVG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgPCBjdXJMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRzLnB1c2gobGVmdClcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxlZnQgPiBjdXJMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0cy5wdXNoKGxlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0b3BzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaGlnaGVzdCA9IHRoaXMuc2l0ZVNpemUudG9wICsgdGhpcy5zaXRlU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoaWdoZXN0ID0gTWF0aC5taW4oLi4udG9wcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsZWZ0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGxlZnRtb3N0ID0gdGhpcy5zaXRlU2l6ZS5sZWZ0IC0gdGhpcy5CTE9DS19TSVpFO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGVmdG1vc3QgPSBNYXRoLm1heCguLi5sZWZ0cyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyaWdodHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByaWdodG1vc3QgPSB0aGlzLnNpdGVTaXplLmxlZnQgKyB0aGlzLnNpdGVTaXplLndpZHRoO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRtb3N0ID0gTWF0aC5taW4oLi4ucmlnaHRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGlnaGVzdDogaGlnaGVzdCxcclxuICAgICAgICAgICAgbGVmdG1vc3Q6IGxlZnRtb3N0LFxyXG4gICAgICAgICAgICByaWdodG1vc3Q6IHJpZ2h0bW9zdFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmtojpmaTnoJblnZdcclxuICAgICAqL1xyXG4gICAgZWxpbWluYXRlKCkge1xyXG4gICAgICAgIGxldCByZXMgPSBbXSxcclxuICAgICAgICAgICAgaW5hY3RpdmVNb2RlbHMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluYWN0aXZlTW9kZWwnKV07XHJcbiAgICAgICAgaW5hY3RpdmVNb2RlbHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoYS5zdHlsZS50b3ApIC0gcGFyc2VJbnQoYi5zdHlsZS50b3ApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluYWN0aXZlTW9kZWxzLmxlbmd0aDspIHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMCxcclxuICAgICAgICAgICAgICAgIG1vZGVscyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGluYWN0aXZlTW9kZWxzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5hY3RpdmVNb2RlbHNbaV0uc3R5bGUudG9wID09PSBpbmFjdGl2ZU1vZGVsc1tqXS5zdHlsZS50b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVscy5wdXNoKGluYWN0aXZlTW9kZWxzW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbW9kZWxzOiBtb2RlbHMsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogY291bnQsXHJcbiAgICAgICAgICAgICAgICB0b3A6IHBhcnNlSW50KGluYWN0aXZlTW9kZWxzW2ldLnN0eWxlLnRvcClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vZm9yIOW+queOr+eahOacgOWQjuS4gOS4quWPguaVsOWPr+S7peaUvuWcqOW+queOr+S9k+WGhVxyXG4gICAgICAgICAgICBpICs9IGNvdW50XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPngbDoibLnoJblnZfpq5jkuo7nlLvluIPlgY/np7vph4/vvIzmuLjmiI/nu5PmnZ9cclxuICAgICAqL1xyXG4gICAgZ2FtZU92ZXIoKXtcclxuICAgICAgICBjb25zdCBpbmFjdGl2ZU1vZGVsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbmFjdGl2ZU1vZGVsJyk7XHJcbiAgICAgICAgbGV0IHRvcHM9W107XHJcbiAgICAgICAgZm9yKGxldCB2IG9mIGluYWN0aXZlTW9kZWwpe1xyXG4gICAgICAgICAgICB0b3BzLnB1c2gocGFyc2VJbnQodi5zdHlsZS50b3ApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKC4uLnRvcHMpIDw9dGhpcy5zaXRlU2l6ZS50b3BcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdhbWVPdmVy5aGr5YWF5Yqo55S7XHJcbiAgICAgKi9cclxuICAgIC8qKlxyXG4gICAgICogY2xhc3Mg6Z2Z5oCB5pa55rOVXHJcbiAgICAgKiDor6Xmlrnms5XkuI3kvJrooqvlrp7kvovnu6fmib/vvIzogIzmmK/nm7TmjqXpgJrov4fnsbvmnaXosIPnlKggQmxvY2suZmlsbCgpO1xyXG4gICAgICog54i257G755qE6Z2Z5oCB5pa55rOV77yM5Y+v5Lul6KKr5a2Q57G757un5om/44CCXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmaWxsKGN1clRvcCxjdXJMZWZ0KXtcclxuICAgICAgICBsZXQgbW9kZWw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbW9kZWwuY2xhc3NOYW1lPSdpbmFjdGl2ZU1vZGVsJztcclxuICAgICAgICBtb2RlbC5zdHlsZS5sZWZ0PWAke2N1ckxlZnR9cHhgO1xyXG4gICAgICAgIG1vZGVsLnN0eWxlLnRvcD1gJHtjdXJUb3B9cHhgO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kZWwpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKblj6/ku6Xnp7vliqhcclxuICAgICAqL1xyXG4gICAgY2FuTW92ZShhcnIsIGRlZm9ybSA9IGZhbHNlLCBkaXNwYWxjZW1lbnQ9MSxtb3ZlID0ge1xyXG4gICAgICAgIGNhbk1vdmVSaWdodDogdHJ1ZSxcclxuICAgICAgICBjYW5Nb3ZlRG93bjogdHJ1ZSxcclxuICAgICAgICBjYW5Nb3ZlTGVmdDogdHJ1ZVxyXG4gICAgfSkge1xyXG4gICAgICAgIHRoaXMuY2hlY2tBcnJXaXRoMShhcnIsIGZ1bmN0aW9uIChpLCBqKSB7XHJcbiAgICAgICAgICAgIGxldCB7aGlnaGVzdCwgbGVmdG1vc3QsIHJpZ2h0bW9zdH09dGhpcy5nZXRJbnRlcnZhbChqICogdGhpcy5CTE9DS19TSVpFLCBpICogdGhpcy5CTE9DS19TSVpFKTtcclxuICAgICAgICAgICAgaWYgKGRlZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChqICsgMSkgPiByaWdodG1vc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlLmNhbk1vdmVSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChpICsgZGlzcGFsY2VtZW50KSA+IGhpZ2hlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlLmNhbk1vdmVEb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5CTE9DS19TSVpFICogKGogLSAxKSA8IGxlZnRtb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlTGVmdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5CTE9DS19TSVpFICogKGogKyAxKSA+PSByaWdodG1vc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlLmNhbk1vdmVSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChpICsgZGlzcGFsY2VtZW50KSA+PSBoaWdoZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChqIC0gMSkgPD0gbGVmdG1vc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlLmNhbk1vdmVMZWZ0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbW92ZTtcclxuICAgICAgICAvKiBBcnJheS5mcm9t5pa55rOV55So5LqO5bCG57G75pWw57uE6L2s5Li655yf5q2j55qE5pWw57uEXHJcbiAgICAgICAgIGZvci4uLm9mOiBmb3IuLi5pbuW+queOr+ivu+WPlumUruWQje+8jGZvci4uLm9m5b6q546v6K+75Y+W6ZSu5YC8XHJcbiAgICAgICAgIGZvcihsZXQgdiBvZiBBcnJheS5mcm9tKGFjdGl2ZU1vZGVsKSl7XHJcbiAgICAgICAgIHRvcHMucHVzaChwYXJzZUludCh2LnN0eWxlLnRvcCkpO1xyXG4gICAgICAgICBsZWZ0cy5wdXNoKHBhcnNlSW50KHYuc3R5bGUubGVmdCkpXHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIG1pbigpIOaWueazleWPr+i/lOWbnuaMh+WumueahOaVsOWtl+S4reW4puacieacgOS9juWAvOeahOaVsOWtl+OAguWPguaVsOS4uueUqOmAl+WPt+WIhumalOeahOWPguaVsOW6j+WIl++8jOS4jeaYr+aVsOe7hFxyXG4gICAgICAgICBtYXgoKSDmlrnms5Xlj6/ov5Tlm57mjIflrprnmoTmlbDlrZfkuK3luKbmnInmnIDlpKflgLznmoTmlbDlrZfjgIJcclxuICAgICAgICAgLi4uIOaJqeWxlei/kOeul+espu+8muWwhuaVsOe7hOi9rOS4uueUqOmAl+WPt+WIhumalOeahOWPguaVsOW6j+WIl1xyXG4gICAgICAgICAuLi4gcmVzZXTov5DnrpfnrKbvvJrlhbblip/og73kuI7mianlsZXov5DnrpfnrKbmgbDlpb3nm7jlj43vvIzmiorpgJflj7fpmpTlvIDnmoTlgLzluo/liJfnu4TlkIjmiJDkuIDkuKrmlbDnu4RcclxuICAgICAgICAgbGV0IHRvcCA9IE1hdGgubWluKC4uLnRvcHMpLFxyXG4gICAgICAgICBsZWZ0ID0gTWF0aC5taW4oLi4ubGVmdHMpLFxyXG4gICAgICAgICByaWdodCA9IE1hdGgubWF4KC4uLmxlZnRzKSxcclxuICAgICAgICAgZG93biA9IE1hdGgubWF4KC4uLnRvcHMpO1xyXG4gICAgICAgICBpZiAoZGVmb3JtKSB7XHJcbiAgICAgICAgIGlmIChyaWdodCArIDIwID49IHRoaXMuc2l0ZVNpemUubGVmdCArIHRoaXMuc2l0ZVNpemUud2lkdGgpIHtcclxuICAgICAgICAgY2FuTW92ZVJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgaWYgKHJpZ2h0ICsgMjAgPj0gdGhpcy5zaXRlU2l6ZS5sZWZ0ICsgdGhpcy5zaXRlU2l6ZS53aWR0aCkge1xyXG4gICAgICAgICBjYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBpZiAobGVmdCAtIDIwIDwgdGhpcy5zaXRlU2l6ZS5sZWZ0KSB7XHJcbiAgICAgICAgIGNhbk1vdmVMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYgKGRvd24gKyAyMCA+PSB0aGlzLnNpdGVTaXplLnRvcCArIHRoaXMuc2l0ZVNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgIGNhbk1vdmVEb3duID0gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYgKHRvcCAtIDIwIDwgdGhpcy5zaXRlU2l6ZS50b3ApIHtcclxuICAgICAgICAgY2FuTW92ZVRvcCA9IGZhbHNlO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICBjYW5Nb3ZlUmlnaHQ6IGNhbk1vdmVSaWdodCxcclxuICAgICAgICAgY2FuTW92ZUxlZnQ6IGNhbk1vdmVMZWZ0LFxyXG4gICAgICAgICBjYW5Nb3ZlVG9wOiBjYW5Nb3ZlVG9wLFxyXG4gICAgICAgICBjYW5Nb3ZlRG93bjogY2FuTW92ZURvd25cclxuICAgICAgICAgfSovXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplK7nm5jkuovku7ZcclxuICAgICAqL1xyXG4gICAgbW92ZSgpIHtcclxuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSAoZSk9PiB7XHJcbiAgICAgICAgICAgIGxldCBhY3RpdmVNb2RlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpdml0eU1vZGVsJyksXHJcbiAgICAgICAgICAgICAgICBtb3ZlLFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlVG9wLFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGUua2V5Q29kZTtcclxuICAgICAgICAgICAgaWYoYWN0aXZlTW9kZWwubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZUxlZnQgPSB0aGlzLmNhbk1vdmUodGhpcy5hcnIpLmNhbk1vdmVMZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuTW92ZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHYgb2YgYWN0aXZlTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LnN0eWxlLmxlZnQgPSBgJHtwYXJzZUludCh2LnN0eWxlLmxlZnQpIC0gdGhpcy5CTE9DS19TSVpFfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyTGVmdC0tO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSBsZWZ0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdXBcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQge25ld0FyciwgbGVmdHMsIHRvcHN9PXRoaXMuY2xvY2t3aXNlKHRoaXMuYXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZSA9IHRoaXMuY2FuTW92ZShuZXdBcnIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlRG93biA9IG1vdmUuY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVSaWdodCA9IG1vdmUuY2FuTW92ZVJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlTGVmdCA9IG1vdmUuY2FuTW92ZUxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYW5Nb3ZlUmlnaHQgJiYgY2FuTW92ZURvd24gJiYgY2FuTW92ZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyID0gbmV3QXJyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBsZWZ0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1vZGVsW2ldLnN0eWxlLmxlZnQgPSBgJHtsZWZ0c1tpXX1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTW9kZWxbaV0uc3R5bGUudG9wID0gYCR7dG9wc1tpXX1weGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL3JpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZVJpZ2h0ID0gdGhpcy5jYW5Nb3ZlKHRoaXMuYXJyKS5jYW5Nb3ZlUmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYW5Nb3ZlUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHYgb2YgYWN0aXZlTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LnN0eWxlLmxlZnQgPSBgJHtwYXJzZUludCh2LnN0eWxlLmxlZnQpICsgdGhpcy5CTE9DS19TSVpFfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyTGVmdCsrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbmB0IG1vdmUgcmlnaHRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDMyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlRG93biA9IHRoaXMuY2FuTW92ZSh0aGlzLmFycixmYWxzZSwyKS5jYW5Nb3ZlRG93bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbk1vdmVEb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFjdGl2ZU1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS50b3AgPSBgJHtwYXJzZUludCh2LnN0eWxlLnRvcCkgKyAyKnRoaXMuQkxPQ0tfU0laRX1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1clRvcCArPTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbmB0IG1vdmUgZG93blwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuivt+mAieaLqeS4iuS4i+W3puWPs+aMiemUrlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbmlrnlnZcqL1xyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNoZWNrQXJyV2l0aDEodGhpcy5hcnIsIHRoaXMuZHJhdylcclxuICAgICAgICBsZXQgYWNpdmVNb2RlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpdml0eU1vZGVsJyk7XHJcbiAgICAgICAgY29uc3QgZmFsbERvd24gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIGxvb3AoKSB7XHJcbiAgICAgICAgICAgIC8vc2V0VGltZW91dOS8muaUueWPmHRoaXPnmoTmjIflkJHvvIzmiYDku6XpnIDopoFiaW5kKHRoaXMpXHJcbiAgICAgICAgICAgIGxldCBjYW5Nb3ZlRG93biA9IHRoaXMuY2FuTW92ZSh0aGlzLmFycikuY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgIGlmIChjYW5Nb3ZlRG93bikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBhY2l2ZU1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS50b3AgPSBgJHtwYXJzZUludCh2LnN0eWxlLnRvcCkgKyB0aGlzLkJMT0NLX1NJWkV9cHhgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1clRvcCsrO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChsb29wLmJpbmQodGhpcyksIDYwMCk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gYWNpdmVNb2RlbC5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2l2ZU1vZGVsW2ldLmNsYXNzTmFtZSA9ICdpbmFjdGl2ZU1vZGVsJztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gdGhpcy5lbGltaW5hdGUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHtjb3VudCwgbW9kZWxzLCB0b3B9PXJlc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IHBhcnNlSW50KHRoaXMuc2l0ZVNpemUud2lkdGggLyB0aGlzLkJMT0NLX1NJWkUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbW9kZWxzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG1vZGVsc1tqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluYWN0aXZlTW9kZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluYWN0aXZlTW9kZWwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBpbmFjdGl2ZU1vZGVscykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHYuc3R5bGUudG9wKSA8IHRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYuc3R5bGUudG9wID0gYCR7cGFyc2VJbnQodi5zdHlsZS50b3ApICsgdGhpcy5CTE9DS19TSVpFfXB4YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2FtZU92ZXIoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dhbWUgb3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJUb3A9dGhpcy5zaXRlU2l6ZS5oZWlnaHQrdGhpcy5zaXRlU2l6ZS50b3AtdGhpcy5CTE9DS19TSVpFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJMZWZ0PXRoaXMuc2l0ZVNpemUud2lkdGgrdGhpcy5zaXRlU2l6ZS5sZWZ0LXRoaXMuQkxPQ0tfU0laRTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsbElkPXNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmxvY2suZmlsbChjdXJUb3AsY3VyTGVmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckxlZnQgLT0gdGhpcy5CTE9DS19TSVpFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjdXJMZWZ0IDwgdGhpcy5zaXRlU2l6ZS5sZWZ0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckxlZnQgPXRoaXMuc2l0ZVNpemUud2lkdGgrdGhpcy5zaXRlU2l6ZS5sZWZ0LXRoaXMuQkxPQ0tfU0laRTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvcCAtPSB0aGlzLkJMT0NLX1NJWkVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjdXJUb3AgPCB0aGlzLnNpdGVTaXplLnRvcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGZpbGxJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRPclJlc3RhcnQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LXJlc3RhcnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3JSZXN0YXJ0LnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3JSZXN0YXJ0Lm9uY2xpY2s9KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3JSZXN0YXJ0LnN0eWxlLmRpc3BsYXk9J25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmFjdGl2ZU1vZGVscz1bLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluYWN0aXZlTW9kZWwnKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5hY3RpdmVNb2RlbHMubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHYgb2YgaW5hY3RpdmVNb2RlbHMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwzMClcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXQoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGZhbGxEb3duKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLCA2MDApXHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIOaVsOaNruWIneWni+WMllxyXG4gKi9cclxuY29uc3QgaW5pdCA9ICgpPT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIGFycjogX19hcnJfXyxcclxuICAgICAgICBzaXRlU2l6ZTogX19zaXRlU2l6ZV9fLFxyXG4gICAgICAgIEJMT0NLX1NJWkU6IF9fQkxPQ0tfU0laRV9fLFxyXG4gICAgICAgIGN1ckxlZnQ6IF9fY3VyTGVmdF9fLFxyXG4gICAgICAgIGN1clRvcDogX19jdXJUb3BfX1xyXG4gICAgfTtcclxuICAgIGxldCBibG9jayA9IG5ldyBCbG9jayhwYXJhbXMpO1xyXG4gICAgYmxvY2suaW5pdCgpO1xyXG4gICAgYmxvY2subW92ZSgpO1xyXG59O1xyXG4vKipcclxuICrmtY/op4jlmajliJ3lp4vljJZcclxuICovXHJcblxyXG4vKipcclxuICogRVM2566t5aS05Ye95pWwXHJcbiAqIOWHveaVsOS9k+WGheeahHRoaXPlr7nosaHvvIzlsLHmmK/lrprkuYnml7bmiYDlnKjnmoTlr7nosaHvvIzogIzkuI3mmK/kvb/nlKjml7bmiYDlnKjnmoTlr7nosaHjgIJcclxuICogdmFyIHN1bSA9IChudW0xLCBudW0yKSA9PiBudW0xICsgbnVtMjtcclxuICog562J5ZCM5LqOXHJcbiAqIHZhciBzdW0gPSBmdW5jdGlvbihudW0xLCBudW0yKSB7XHJcbiAqIHJldHVybiBudW0xICsgbnVtMjtcclxuICogfTtcclxuICovXHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIndpbmRvdyBvbmxvYWRcIik7XHJcbiAgICBsZXQgc2l0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlJyk7XHJcbiAgICAvLyBXaW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSgpIOaWueazleS8muWcqOS4gOS4quWFg+e0oOW6lOeUqOWujOacieaViOagt+W8j+S4lOiuoeeul+WujOaJgOacieWxnuaAp+eahOWfuuacrOWAvOS5i+WQjue7meWHuuaJgOaciSBDU1Mg5bGe5oCn55qE5YC844CCXHJcbiAgICBsZXQge3dpZHRoLCBoZWlnaHQsIGxlZnQsIHRvcH0gPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNpdGUpO1xyXG4gICAgbGV0IHNpdGVTaXplID0ge1xyXG4gICAgICAgIHdpZHRoOiBwYXJzZUludCh3aWR0aCksXHJcbiAgICAgICAgaGVpZ2h0OiBwYXJzZUludChoZWlnaHQpLFxyXG4gICAgICAgIGxlZnQ6IHBhcnNlSW50KGxlZnQpLFxyXG4gICAgICAgIHRvcDogcGFyc2VJbnQodG9wKVxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFyciA9IFtbMSwgMF0sIFsxLCAwXSwgWzEsIDFdXTtcclxuICAgIGNvbnN0IEJMT0NLX1NJWkUgPSAyMDtcclxuICAgIGxldCBjdXJMZWZ0ID0gcGFyc2VJbnQoKHNpdGVTaXplLmxlZnQgKyBzaXRlU2l6ZS53aWR0aCAvIDIpIC8gQkxPQ0tfU0laRSk7XHJcbiAgICBsZXQgY3VyVG9wID0gcGFyc2VJbnQoc2l0ZVNpemUudG9wIC8gQkxPQ0tfU0laRSk7XHJcbiAgICB3aW5kb3cuX19hcnJfXyA9IGFycjtcclxuICAgIHdpbmRvdy5fX3NpdGVTaXplX18gPSBzaXRlU2l6ZTtcclxuICAgIHdpbmRvdy5fX0JMT0NLX1NJWkVfXyA9IEJMT0NLX1NJWkU7XHJcbiAgICB3aW5kb3cuX19jdXJMZWZ0X18gPSBjdXJMZWZ0O1xyXG4gICAgd2luZG93Ll9fY3VyVG9wX18gPSBjdXJUb3A7XHJcblxyXG4gICAgaW5pdCgpO1xyXG5cclxuXHJcbn07XHJcbiJdfQ==
