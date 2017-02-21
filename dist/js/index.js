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
         * 判断是否可以移动
         */

    }, {
        key: 'canMove',
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
                                var _iteratorNormalCompletion2 = true;
                                var _didIteratorError2 = false;
                                var _iteratorError2 = undefined;

                                try {
                                    for (var _iterator2 = activeModel[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                        var v = _step2.value;

                                        v.style.left = parseInt(v.style.left) - _this.BLOCK_SIZE + 'px';
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
                                var _iteratorNormalCompletion3 = true;
                                var _didIteratorError3 = false;
                                var _iteratorError3 = undefined;

                                try {
                                    for (var _iterator3 = activeModel[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                        var _v = _step3.value;

                                        _v.style.left = parseInt(_v.style.left) + _this.BLOCK_SIZE + 'px';
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

                                _this.curLeft++;
                            } else {
                                console.log("can`t move right");
                            }
                            break;
                        case 32:
                            canMoveDown = _this.canMove(_this.arr, false, 2).canMoveDown;
                            if (canMoveDown) {
                                var _iteratorNormalCompletion4 = true;
                                var _didIteratorError4 = false;
                                var _iteratorError4 = undefined;

                                try {
                                    for (var _iterator4 = activeModel[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                        var _v2 = _step4.value;

                                        _v2.style.top = parseInt(_v2.style.top) + 2 * _this.BLOCK_SIZE + 'px';
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
                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = aciveModel[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var v = _step5.value;

                            v.style.top = parseInt(v.style.top) + this.BLOCK_SIZE + 'px';
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
                            var _iteratorNormalCompletion6 = true;
                            var _didIteratorError6 = false;
                            var _iteratorError6 = undefined;

                            try {
                                for (var _iterator6 = inactiveModels[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                    var _v3 = _step6.value;

                                    if (parseInt(_v3.style.top) < top) {
                                        _v3.style.top = parseInt(_v3.style.top) + this.BLOCK_SIZE + 'px';
                                    }
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
                        }
                    }
                    _init();
                    clearTimeout(fallDown);
                }
            }.bind(this), 600);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkJsb2NrIiwicGFyYW1zIiwic2l0ZVNpemUiLCJhcnIiLCJCTE9DS19TSVpFIiwiY3VyTGVmdCIsImN1clRvcCIsIm5ld0FyciIsImkiLCJsZW5ndGgiLCJ0ZW1BcnIiLCJqIiwicHVzaCIsImxlZnRzIiwidG9wcyIsImNoZWNrQXJyV2l0aDEiLCJjYWxsYmFjayIsImNhbGwiLCJhY3RpdmVNb2RlbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInN0eWxlIiwidG9wIiwibGVmdCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImluYWN0aXZlTW9kZWwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGlnaGVzdCIsImxlZnRtb3N0IiwicmlnaHRtb3N0IiwiaGVpZ2h0Iiwid2lkdGgiLCJyaWdodHMiLCJ2IiwicGFyc2VJbnQiLCJNYXRoIiwibWluIiwibWF4IiwicmVzIiwiaW5hY3RpdmVNb2RlbHMiLCJzb3J0IiwiYSIsImIiLCJjb3VudCIsIm1vZGVscyIsImRlZm9ybSIsImRpc3BhbGNlbWVudCIsIm1vdmUiLCJjYW5Nb3ZlUmlnaHQiLCJjYW5Nb3ZlRG93biIsImNhbk1vdmVMZWZ0IiwiZ2V0SW50ZXJ2YWwiLCJvbmtleWRvd24iLCJlIiwiY2FuTW92ZVRvcCIsImtleSIsImtleUNvZGUiLCJjYW5Nb3ZlIiwiY29uc29sZSIsImxvZyIsImNsb2Nrd2lzZSIsImRyYXciLCJhY2l2ZU1vZGVsIiwiZmFsbERvd24iLCJzZXRUaW1lb3V0IiwibG9vcCIsImJpbmQiLCJlbGltaW5hdGUiLCJyZW1vdmVDaGlsZCIsImluaXQiLCJjbGVhclRpbWVvdXQiLCJfX2Fycl9fIiwiX19zaXRlU2l6ZV9fIiwiX19CTE9DS19TSVpFX18iLCJfX2N1ckxlZnRfXyIsIl9fY3VyVG9wX18iLCJibG9jayIsIndpbmRvdyIsIm9ubG9hZCIsInNpdGUiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0Q29tcHV0ZWRTdHlsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUlBOzs7O0FBSUE7Ozs7Ozs7Ozs7Ozs7SUFhTUEsSztBQUNGLG1CQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2hCOzs7QUFHQSxhQUFLQyxRQUFMLEdBQWdCRCxPQUFPQyxRQUF2QjtBQUNBLGFBQUtDLEdBQUwsR0FBV0YsT0FBT0UsR0FBbEI7QUFDQSxhQUFLQyxVQUFMLEdBQWtCSCxPQUFPRyxVQUF6QjtBQUNBLGFBQUtDLE9BQUwsR0FBZUosT0FBT0ksT0FBdEI7QUFDQSxhQUFLQyxNQUFMLEdBQWNMLE9BQU9LLE1BQXJCO0FBQ0g7O0FBRUQ7Ozs7Ozs7a0NBR1VILEcsRUFBSztBQUNYLGdCQUFJSSxTQUFTLEVBQWI7QUFDQSxpQkFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLEtBQUtMLElBQUlNLE1BQUosR0FBYSxDQUFsQyxFQUFxQ0QsR0FBckMsRUFBMEM7QUFDdEMsb0JBQUlFLFNBQVMsRUFBYjtBQUNBLHFCQUFLLElBQUlDLElBQUlSLElBQUlNLE1BQUosR0FBYSxDQUExQixFQUE2QkUsS0FBSyxDQUFsQyxFQUFxQ0EsR0FBckMsRUFBMEM7QUFDdENELDJCQUFPRSxJQUFQLENBQVlULElBQUlRLENBQUosRUFBT0gsQ0FBUCxDQUFaO0FBQ0g7QUFDREQsdUJBQU9LLElBQVAsQ0FBWUYsTUFBWjtBQUNIO0FBQ0QsZ0JBQUlHLFFBQVEsRUFBWjtBQUNBLGdCQUFJQyxPQUFPLEVBQVg7O0FBRUEsaUJBQUtDLGFBQUwsQ0FBbUJSLE1BQW5CLEVBQTJCLFVBQVVDLENBQVYsRUFBYUcsQ0FBYixFQUFnQjtBQUN2Q0Usc0JBQU1ELElBQU4sQ0FBV0QsSUFBSSxLQUFLUCxVQUFwQjtBQUNBVSxxQkFBS0YsSUFBTCxDQUFVSixJQUFJLEtBQUtKLFVBQW5CO0FBQ0gsYUFIRDs7QUFLQSxtQkFBTztBQUNIRyx3QkFBUUEsTUFETDtBQUVITSx1QkFBT0EsS0FGSjtBQUdIQyxzQkFBTUE7QUFISCxhQUFQO0FBS0g7O0FBRUQ7Ozs7OztzQ0FJY1gsRyxFQUFLYSxRLEVBQVU7QUFDekIsaUJBQUssSUFBSVIsSUFBSSxDQUFiLEVBQWdCQSxLQUFLTCxJQUFJTSxNQUFKLEdBQWEsQ0FBbEMsRUFBcUNELEdBQXJDLEVBQTBDO0FBQ3RDLHFCQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsS0FBS1IsSUFBSU0sTUFBSixHQUFhLENBQWxDLEVBQXFDRSxHQUFyQyxFQUEwQztBQUN0Qyx3QkFBSVIsSUFBSUssQ0FBSixFQUFPRyxDQUFQLEtBQWEsQ0FBakIsRUFBb0I7QUFDaEJLLGlDQUFTQyxJQUFULENBQWMsSUFBZCxFQUFvQlQsSUFBSSxLQUFLRixNQUE3QixFQUFxQ0ssSUFBSSxLQUFLTixPQUE5QztBQUNIO0FBQ0o7QUFDSjtBQUNKOztBQUVEOzs7Ozs7NkJBR0tHLEMsRUFBR0csQyxFQUFHO0FBQ1AsZ0JBQUlPLGNBQWNDLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7QUFDQUYsd0JBQVlHLFNBQVosR0FBd0IsZUFBeEI7QUFDQUgsd0JBQVlJLEtBQVosQ0FBa0JDLEdBQWxCLEdBQTJCZixJQUFJLEtBQUtKLFVBQXBDO0FBQ0FjLHdCQUFZSSxLQUFaLENBQWtCRSxJQUFsQixHQUE0QmIsSUFBSSxLQUFLUCxVQUFyQztBQUNBZSxxQkFBU00sSUFBVCxDQUFjQyxXQUFkLENBQTBCUixXQUExQjtBQUNIOztBQUVEOzs7Ozs7b0NBR1liLE8sRUFBU0MsTSxFQUFRO0FBQ3pCLGdCQUFJcUIsZ0JBQWdCUixTQUFTUyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBcEI7QUFBQSxnQkFDSUMsVUFBVSxJQURkO0FBQUEsZ0JBRUlDLFdBQVcsSUFGZjtBQUFBLGdCQUdJQyxZQUFZLElBSGhCO0FBSUEsZ0JBQUlKLGNBQWNsQixNQUFkLEtBQXlCLENBQTdCLEVBQWdDO0FBQzVCb0IsMEJBQVUsS0FBSzNCLFFBQUwsQ0FBY3FCLEdBQWQsR0FBb0IsS0FBS3JCLFFBQUwsQ0FBYzhCLE1BQTVDO0FBQ0FGLDJCQUFXLEtBQUs1QixRQUFMLENBQWNzQixJQUFkLEdBQXFCLEtBQUtwQixVQUFyQztBQUNBMkIsNEJBQVksS0FBSzdCLFFBQUwsQ0FBY3NCLElBQWQsR0FBcUIsS0FBS3RCLFFBQUwsQ0FBYytCLEtBQS9DO0FBQ0gsYUFKRCxNQUlPO0FBQ0gsb0JBQUluQixPQUFPLEVBQVg7QUFBQSxvQkFDSUQsUUFBUSxFQURaO0FBQUEsb0JBRUlxQixTQUFTLEVBRmI7QUFERztBQUFBO0FBQUE7O0FBQUE7QUFJSCx5Q0FBY1AsYUFBZCw4SEFBNkI7QUFBQSw0QkFBcEJRLENBQW9COztBQUN6Qiw0QkFBSVgsT0FBT1ksU0FBU0QsRUFBRWIsS0FBRixDQUFRRSxJQUFqQixDQUFYO0FBQUEsNEJBQ0lELE1BQU1hLFNBQVNELEVBQUViLEtBQUYsQ0FBUUMsR0FBakIsQ0FEVjtBQUVBLDRCQUFJQyxTQUFTbkIsT0FBYixFQUFzQjtBQUNsQlMsaUNBQUtGLElBQUwsQ0FBVVcsR0FBVjtBQUNIO0FBQ0QsNEJBQUlBLFFBQVFqQixNQUFaLEVBQW9CO0FBQ2hCLGdDQUFJa0IsT0FBT25CLE9BQVgsRUFBb0I7QUFDaEJRLHNDQUFNRCxJQUFOLENBQVdZLElBQVg7QUFDSCw2QkFGRCxNQUVPLElBQUlBLE9BQU9uQixPQUFYLEVBQW9CO0FBQ3ZCNkIsdUNBQU90QixJQUFQLENBQVlZLElBQVo7QUFDSDtBQUNKO0FBQ0o7QUFqQkU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFrQkgsb0JBQUlWLEtBQUtMLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJvQiw4QkFBVSxLQUFLM0IsUUFBTCxDQUFjcUIsR0FBZCxHQUFvQixLQUFLckIsUUFBTCxDQUFjOEIsTUFBNUM7QUFDSCxpQkFGRCxNQUVPO0FBQ0hILDhCQUFVUSxLQUFLQyxHQUFMLGFBQVl4QixJQUFaLENBQVY7QUFDSDs7QUFFRCxvQkFBSUQsTUFBTUosTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUNwQnFCLCtCQUFXLEtBQUs1QixRQUFMLENBQWNzQixJQUFkLEdBQXFCLEtBQUtwQixVQUFyQztBQUNILGlCQUZELE1BRU87QUFDSDBCLCtCQUFXTyxLQUFLRSxHQUFMLGFBQVkxQixLQUFaLENBQVg7QUFDSDs7QUFFRCxvQkFBSXFCLE9BQU96QixNQUFQLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3JCc0IsZ0NBQVksS0FBSzdCLFFBQUwsQ0FBY3NCLElBQWQsR0FBcUIsS0FBS3RCLFFBQUwsQ0FBYytCLEtBQS9DO0FBQ0gsaUJBRkQsTUFFTztBQUNIRixnQ0FBWU0sS0FBS0MsR0FBTCxhQUFZSixNQUFaLENBQVo7QUFDSDtBQUNKOztBQUVELG1CQUFPO0FBQ0hMLHlCQUFTQSxPQUROO0FBRUhDLDBCQUFVQSxRQUZQO0FBR0hDLDJCQUFXQTtBQUhSLGFBQVA7QUFLSDs7QUFFRDs7Ozs7O29DQUdZO0FBQ1IsZ0JBQUlTLE1BQU0sRUFBVjtBQUFBLGdCQUNJQyw4Q0FBcUJ0QixTQUFTUyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBckIsRUFESjtBQUVBYSwyQkFBZUMsSUFBZixDQUFvQixVQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDaEMsdUJBQU9SLFNBQVNPLEVBQUVyQixLQUFGLENBQVFDLEdBQWpCLElBQXdCYSxTQUFTUSxFQUFFdEIsS0FBRixDQUFRQyxHQUFqQixDQUEvQjtBQUNILGFBRkQ7O0FBSUEsaUJBQUssSUFBSWYsSUFBSSxDQUFiLEVBQWdCQSxJQUFJaUMsZUFBZWhDLE1BQW5DLEdBQTRDO0FBQ3hDLG9CQUFJb0MsUUFBUSxDQUFaO0FBQUEsb0JBQ0lDLFNBQVMsRUFEYjtBQUVBLHFCQUFLLElBQUluQyxJQUFJLENBQWIsRUFBZ0JBLElBQUk4QixlQUFlaEMsTUFBbkMsRUFBMkNFLEdBQTNDLEVBQWdEO0FBQzVDLHdCQUFJOEIsZUFBZWpDLENBQWYsRUFBa0JjLEtBQWxCLENBQXdCQyxHQUF4QixLQUFnQ2tCLGVBQWU5QixDQUFmLEVBQWtCVyxLQUFsQixDQUF3QkMsR0FBNUQsRUFBaUU7QUFDN0RzQjtBQUNBQywrQkFBT2xDLElBQVAsQ0FBWTZCLGVBQWU5QixDQUFmLENBQVo7QUFDSDtBQUNKOztBQUVENkIsb0JBQUk1QixJQUFKLENBQVM7QUFDTGtDLDRCQUFRQSxNQURIO0FBRUxELDJCQUFPQSxLQUZGO0FBR0x0Qix5QkFBS2EsU0FBU0ssZUFBZWpDLENBQWYsRUFBa0JjLEtBQWxCLENBQXdCQyxHQUFqQztBQUhBLGlCQUFUO0FBS0E7QUFDQWYscUJBQUtxQyxLQUFMO0FBQ0g7QUFDRCxtQkFBT0wsR0FBUDtBQUVIOztBQUVEOzs7Ozs7Z0NBR1FyQyxHLEVBSUw7QUFBQSxnQkFKVTRDLE1BSVYsdUVBSm1CLEtBSW5CO0FBQUEsZ0JBSjBCQyxZQUkxQix1RUFKdUMsQ0FJdkM7QUFBQSxnQkFKeUNDLElBSXpDLHVFQUpnRDtBQUMvQ0MsOEJBQWMsSUFEaUM7QUFFL0NDLDZCQUFhLElBRmtDO0FBRy9DQyw2QkFBYTtBQUhrQyxhQUloRDs7QUFDQyxpQkFBS3JDLGFBQUwsQ0FBbUJaLEdBQW5CLEVBQXdCLFVBQVVLLENBQVYsRUFBYUcsQ0FBYixFQUFnQjtBQUFBLG1DQUNELEtBQUswQyxXQUFMLENBQWlCMUMsSUFBSSxLQUFLUCxVQUExQixFQUFzQ0ksSUFBSSxLQUFLSixVQUEvQyxDQURDO0FBQUEsb0JBQy9CeUIsT0FEK0IsZ0JBQy9CQSxPQUQrQjtBQUFBLG9CQUN0QkMsUUFEc0IsZ0JBQ3RCQSxRQURzQjtBQUFBLG9CQUNaQyxTQURZLGdCQUNaQSxTQURZOztBQUVwQyxvQkFBSWdCLE1BQUosRUFBWTtBQUNSLHdCQUFJLEtBQUszQyxVQUFMLElBQW1CTyxJQUFJLENBQXZCLElBQTRCb0IsU0FBaEMsRUFBMkM7QUFDdkNrQiw2QkFBS0MsWUFBTCxHQUFvQixLQUFwQjtBQUNIO0FBQ0Qsd0JBQUksS0FBSzlDLFVBQUwsSUFBbUJJLElBQUl3QyxZQUF2QixJQUF1Q25CLE9BQTNDLEVBQW9EO0FBQ2hEb0IsNkJBQUtFLFdBQUwsR0FBbUIsS0FBbkI7QUFDSDtBQUNELHdCQUFJLEtBQUsvQyxVQUFMLElBQW1CTyxJQUFJLENBQXZCLElBQTRCbUIsUUFBaEMsRUFBMEM7QUFDdENtQiw2QkFBS0csV0FBTCxHQUFtQixLQUFuQjtBQUNIO0FBQ0osaUJBVkQsTUFVTztBQUNILHdCQUFJLEtBQUtoRCxVQUFMLElBQW1CTyxJQUFJLENBQXZCLEtBQTZCb0IsU0FBakMsRUFBNEM7QUFDeENrQiw2QkFBS0MsWUFBTCxHQUFvQixLQUFwQjtBQUNIO0FBQ0Qsd0JBQUksS0FBSzlDLFVBQUwsSUFBbUJJLElBQUl3QyxZQUF2QixLQUF3Q25CLE9BQTVDLEVBQXFEO0FBQ2pEb0IsNkJBQUtFLFdBQUwsR0FBbUIsS0FBbkI7QUFDSDtBQUNELHdCQUFJLEtBQUsvQyxVQUFMLElBQW1CTyxJQUFJLENBQXZCLEtBQTZCbUIsUUFBakMsRUFBMkM7QUFDdkNtQiw2QkFBS0csV0FBTCxHQUFtQixLQUFuQjtBQUNIO0FBQ0o7QUFFSixhQXhCRDtBQXlCQSxtQkFBT0gsSUFBUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlDSDs7QUFFRDs7Ozs7OytCQUdPO0FBQUE7O0FBQ0g5QixxQkFBU21DLFNBQVQsR0FBcUIsVUFBQ0MsQ0FBRCxFQUFNO0FBQ3ZCLG9CQUFJckMsY0FBY0MsU0FBU1MsZ0JBQVQsQ0FBMEIsZ0JBQTFCLENBQWxCO0FBQUEsb0JBQ0lxQixhQURKO0FBQUEsb0JBRUlDLHFCQUZKO0FBQUEsb0JBR0lFLG9CQUhKO0FBQUEsb0JBSUlJLG1CQUpKO0FBQUEsb0JBS0lMLG9CQUxKO0FBTUEsb0JBQU1NLE1BQU1GLEVBQUVHLE9BQWQ7QUFDQSxvQkFBR3hDLFlBQVlULE1BQWYsRUFBc0I7QUFDbEIsNEJBQVFnRCxHQUFSO0FBQ0k7QUFDQSw2QkFBSyxFQUFMO0FBQ0lMLDBDQUFjLE1BQUtPLE9BQUwsQ0FBYSxNQUFLeEQsR0FBbEIsRUFBdUJpRCxXQUFyQztBQUNBLGdDQUFJQSxXQUFKLEVBQWlCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ2IsMERBQWNsQyxXQUFkLG1JQUEyQjtBQUFBLDRDQUFsQmlCLENBQWtCOztBQUN2QkEsMENBQUViLEtBQUYsQ0FBUUUsSUFBUixHQUFrQlksU0FBU0QsRUFBRWIsS0FBRixDQUFRRSxJQUFqQixJQUF5QixNQUFLcEIsVUFBaEQ7QUFDSDtBQUhZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBSWIsc0NBQUtDLE9BQUw7QUFFSCw2QkFORCxNQU1PO0FBQ0h1RCx3Q0FBUUMsR0FBUixDQUFZLGlCQUFaO0FBQ0g7O0FBRUQ7QUFDSjtBQUNBLDZCQUFLLEVBQUw7QUFBQSw2Q0FDOEIsTUFBS0MsU0FBTCxDQUFlLE1BQUszRCxHQUFwQixDQUQ5QjtBQUFBLGdDQUNTSSxNQURULGNBQ1NBLE1BRFQ7QUFBQSxnQ0FDaUJNLEtBRGpCLGNBQ2lCQSxLQURqQjtBQUFBLGdDQUN3QkMsSUFEeEIsY0FDd0JBLElBRHhCOztBQUVJbUMsbUNBQU8sTUFBS1UsT0FBTCxDQUFhcEQsTUFBYixFQUFxQixJQUFyQixDQUFQO0FBQ0E0QywwQ0FBY0YsS0FBS0UsV0FBbkI7QUFDQUQsMkNBQWVELEtBQUtDLFlBQXBCO0FBQ0FFLDBDQUFjSCxLQUFLRyxXQUFuQjtBQUNBLGdDQUFJRixnQkFBZ0JDLFdBQWhCLElBQStCQyxXQUFuQyxFQUFnRDtBQUM1QyxzQ0FBS2pELEdBQUwsR0FBV0ksTUFBWDtBQUNBLHFDQUFLLElBQUlDLENBQVQsSUFBY0ssS0FBZCxFQUFxQjtBQUNqQkssZ0RBQVlWLENBQVosRUFBZWMsS0FBZixDQUFxQkUsSUFBckIsR0FBK0JYLE1BQU1MLENBQU4sQ0FBL0I7QUFDQVUsZ0RBQVlWLENBQVosRUFBZWMsS0FBZixDQUFxQkMsR0FBckIsR0FBOEJULEtBQUtOLENBQUwsQ0FBOUI7QUFDSDtBQUNKO0FBQ0Q7QUFDSjtBQUNBLDZCQUFLLEVBQUw7QUFDSTBDLDJDQUFlLE1BQUtTLE9BQUwsQ0FBYSxNQUFLeEQsR0FBbEIsRUFBdUIrQyxZQUF0QztBQUNBLGdDQUFJQSxZQUFKLEVBQWtCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ2QsMERBQWNoQyxXQUFkLG1JQUEyQjtBQUFBLDRDQUFsQmlCLEVBQWtCOztBQUN2QkEsMkNBQUViLEtBQUYsQ0FBUUUsSUFBUixHQUFrQlksU0FBU0QsR0FBRWIsS0FBRixDQUFRRSxJQUFqQixJQUF5QixNQUFLcEIsVUFBaEQ7QUFDSDtBQUhhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBSWQsc0NBQUtDLE9BQUw7QUFDSCw2QkFMRCxNQUtPO0FBQ0h1RCx3Q0FBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0g7QUFDRDtBQUNKLDZCQUFLLEVBQUw7QUFDSVYsMENBQWMsTUFBS1EsT0FBTCxDQUFhLE1BQUt4RCxHQUFsQixFQUFzQixLQUF0QixFQUE0QixDQUE1QixFQUErQmdELFdBQTdDO0FBQ0EsZ0NBQUlBLFdBQUosRUFBaUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDYiwwREFBY2pDLFdBQWQsbUlBQTJCO0FBQUEsNENBQWxCaUIsR0FBa0I7O0FBQ3ZCQSw0Q0FBRWIsS0FBRixDQUFRQyxHQUFSLEdBQWlCYSxTQUFTRCxJQUFFYixLQUFGLENBQVFDLEdBQWpCLElBQXdCLElBQUUsTUFBS25CLFVBQWhEO0FBQ0g7QUFIWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUliLHNDQUFLRSxNQUFMLElBQWMsQ0FBZDtBQUNILDZCQUxELE1BS087QUFDSHNELHdDQUFRQyxHQUFSLENBQVksaUJBQVo7QUFDSDtBQUNEO0FBQ0o7QUFDSUQsb0NBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0E7QUF2RFI7QUF5REg7QUFDSixhQW5FRDtBQW9FSDs7QUFFRDs7Ozs7K0JBRU87QUFDSCxpQkFBSzlDLGFBQUwsQ0FBbUIsS0FBS1osR0FBeEIsRUFBNkIsS0FBSzRELElBQWxDO0FBQ0EsZ0JBQUlDLGFBQWE3QyxTQUFTUyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBakI7QUFDQSxnQkFBTXFDLFdBQVdDLFdBQVcsU0FBU0MsSUFBVCxHQUFnQjtBQUN4QztBQUNBLG9CQUFJaEIsY0FBYyxLQUFLUSxPQUFMLENBQWEsS0FBS3hELEdBQWxCLEVBQXVCZ0QsV0FBekM7QUFDQSxvQkFBSUEsV0FBSixFQUFpQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNiLDhDQUFjYSxVQUFkLG1JQUEwQjtBQUFBLGdDQUFqQjdCLENBQWlCOztBQUN0QkEsOEJBQUViLEtBQUYsQ0FBUUMsR0FBUixHQUFpQmEsU0FBU0QsRUFBRWIsS0FBRixDQUFRQyxHQUFqQixJQUF3QixLQUFLbkIsVUFBOUM7QUFDSDtBQUhZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBSWIseUJBQUtFLE1BQUw7QUFDQTRELCtCQUFXQyxLQUFLQyxJQUFMLENBQVUsSUFBVixDQUFYLEVBQTRCLEdBQTVCO0FBRUgsaUJBUEQsTUFPTztBQUNILHlCQUFLLElBQUk1RCxJQUFJLENBQWIsRUFBZ0JBLEtBQUt3RCxXQUFXdkQsTUFBWCxHQUFvQixDQUF6QyxFQUE0Q0QsR0FBNUMsRUFBaUQ7QUFDN0N3RCxtQ0FBV3hELENBQVgsRUFBY2EsU0FBZCxHQUEwQixlQUExQjtBQUNIOztBQUVELHdCQUFJbUIsTUFBTSxLQUFLNkIsU0FBTCxFQUFWO0FBQ0EseUJBQUssSUFBSTdELEtBQUksQ0FBYixFQUFnQkEsS0FBSWdDLElBQUkvQixNQUF4QixFQUFnQ0QsSUFBaEMsRUFBcUM7QUFBQSxzQ0FDUmdDLElBQUloQyxFQUFKLENBRFE7QUFBQSw0QkFDNUJxQyxLQUQ0QixXQUM1QkEsS0FENEI7QUFBQSw0QkFDckJDLE1BRHFCLFdBQ3JCQSxNQURxQjtBQUFBLDRCQUNidkIsR0FEYSxXQUNiQSxHQURhOztBQUVqQyw0QkFBSXNCLFVBQVVULFNBQVMsS0FBS2xDLFFBQUwsQ0FBYytCLEtBQWQsR0FBc0IsS0FBSzdCLFVBQXBDLENBQWQsRUFBK0Q7QUFDM0QsaUNBQUssSUFBSU8sSUFBSSxDQUFiLEVBQWdCQSxJQUFJbUMsT0FBT3JDLE1BQTNCLEVBQW1DRSxHQUFuQyxFQUF3QztBQUNwQ1EseUNBQVNNLElBQVQsQ0FBYzZDLFdBQWQsQ0FBMEJ4QixPQUFPbkMsQ0FBUCxDQUExQjtBQUNIO0FBQ0QsZ0NBQUk4QixpQkFBaUJ0QixTQUFTUyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBckI7QUFKMkQ7QUFBQTtBQUFBOztBQUFBO0FBSzNELHNEQUFjYSxjQUFkLG1JQUE4QjtBQUFBLHdDQUFyQk4sR0FBcUI7O0FBQzFCLHdDQUFJQyxTQUFTRCxJQUFFYixLQUFGLENBQVFDLEdBQWpCLElBQXdCQSxHQUE1QixFQUFpQztBQUM3QlksNENBQUViLEtBQUYsQ0FBUUMsR0FBUixHQUFpQmEsU0FBU0QsSUFBRWIsS0FBRixDQUFRQyxHQUFqQixJQUF3QixLQUFLbkIsVUFBOUM7QUFDSDtBQUNKO0FBVDBEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVOUQ7QUFDSjtBQUNEbUU7QUFDQUMsaUNBQWFQLFFBQWI7QUFDSDtBQUNKLGFBakMyQixDQWlDMUJHLElBakMwQixDQWlDckIsSUFqQ3FCLENBQVgsRUFpQ0gsR0FqQ0csQ0FBakI7QUFrQ0g7Ozs7O0FBRUw7Ozs7O0FBR0EsSUFBTUcsUUFBTyxTQUFQQSxLQUFPLEdBQUs7QUFDZCxRQUFNdEUsU0FBUztBQUNYRSxhQUFLc0UsT0FETTtBQUVYdkUsa0JBQVV3RSxZQUZDO0FBR1h0RSxvQkFBWXVFLGNBSEQ7QUFJWHRFLGlCQUFTdUUsV0FKRTtBQUtYdEUsZ0JBQVF1RTtBQUxHLEtBQWY7QUFPQSxRQUFJQyxRQUFRLElBQUk5RSxLQUFKLENBQVVDLE1BQVYsQ0FBWjtBQUNBNkUsVUFBTVAsSUFBTjtBQUNBTyxVQUFNN0IsSUFBTjtBQUNILENBWEQ7QUFZQTs7OztBQUlBOzs7Ozs7Ozs7QUFTQThCLE9BQU9DLE1BQVAsR0FBZ0IsWUFBTTtBQUNsQnBCLFlBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsUUFBSW9CLE9BQU85RCxTQUFTK0QsYUFBVCxDQUF1QixPQUF2QixDQUFYO0FBQ0E7O0FBSGtCLGdDQUljSCxPQUFPSSxnQkFBUCxDQUF3QkYsSUFBeEIsQ0FKZDtBQUFBLFFBSWJoRCxLQUphLHlCQUliQSxLQUphO0FBQUEsUUFJTkQsTUFKTSx5QkFJTkEsTUFKTTtBQUFBLFFBSUVSLElBSkYseUJBSUVBLElBSkY7QUFBQSxRQUlRRCxHQUpSLHlCQUlRQSxHQUpSOztBQUtsQixRQUFJckIsV0FBVztBQUNYK0IsZUFBT0csU0FBU0gsS0FBVCxDQURJO0FBRVhELGdCQUFRSSxTQUFTSixNQUFULENBRkc7QUFHWFIsY0FBTVksU0FBU1osSUFBVCxDQUhLO0FBSVhELGFBQUthLFNBQVNiLEdBQVQ7QUFKTSxLQUFmO0FBTUEsUUFBTXBCLE1BQU0sQ0FBQyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQVQsRUFBaUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFqQixDQUFaO0FBQ0EsUUFBTUMsYUFBYSxFQUFuQjtBQUNBLFFBQUlDLFVBQVUrQixTQUFTLENBQUNsQyxTQUFTc0IsSUFBVCxHQUFnQnRCLFNBQVMrQixLQUFULEdBQWlCLENBQWxDLElBQXVDN0IsVUFBaEQsQ0FBZDtBQUNBLFFBQUlFLFNBQVM4QixTQUFTbEMsU0FBU3FCLEdBQVQsR0FBZW5CLFVBQXhCLENBQWI7QUFDQTJFLFdBQU9OLE9BQVAsR0FBaUJ0RSxHQUFqQjtBQUNBNEUsV0FBT0wsWUFBUCxHQUFzQnhFLFFBQXRCO0FBQ0E2RSxXQUFPSixjQUFQLEdBQXdCdkUsVUFBeEI7QUFDQTJFLFdBQU9ILFdBQVAsR0FBcUJ2RSxPQUFyQjtBQUNBMEUsV0FBT0YsVUFBUCxHQUFvQnZFLE1BQXBCOztBQUVBaUU7QUFHSCxDQXhCRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFkbWluaXN0cmF0b3Igb24gMjAxNy8yLzIwLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiDlrprkuYnmlrnlnZdcclxuICovXHJcblxyXG4vKipcclxuICogRVM2IENsYXNzXHJcbiAqIENsYXNz5LiN5a2Y5Zyo5Y+Y6YeP5o+Q5Y2H77yIaG9pc3TvvInvvIzov5nkuIDngrnkuI5FUzXlrozlhajkuI3lkIzjgIJcclxuICogY2xhc3MgQmFyIHtcclxuICogICBjb25zdHJ1Y3Rvcigpe30gY29uc3RydWN0b3Lmlrnms5XmmK/nsbvnmoTpu5jorqTmlrnms5VcclxuICogICBkb1N0dWZmKCkge1xyXG4gKiAgICBjb25zb2xlLmxvZygnc3R1ZmYnKTtcclxuICogICB9XHJcbiAqIH1cclxuICog5L2/55So55qE5pe25YCZ77yM5Lmf5piv55u05o6l5a+557G75L2/55SobmV35ZG95Luk77yM6Lef5p6E6YCg5Ye95pWw55qE55So5rOV5a6M5YWo5LiA6Ie044CCXHJcbiAqIHZhciBiID0gbmV3IEJhcigpO1xyXG4gKiBiLmRvU3R1ZmYoKSAvLyBcInN0dWZmXCJcclxuICovXHJcbmNsYXNzIEJsb2NrIHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWwhm5ldyBCbG9jayhwYXJhbXMpIOWPguaVsOS8oOi/m3RoaXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNpdGVTaXplID0gcGFyYW1zLnNpdGVTaXplO1xyXG4gICAgICAgIHRoaXMuYXJyID0gcGFyYW1zLmFycjtcclxuICAgICAgICB0aGlzLkJMT0NLX1NJWkUgPSBwYXJhbXMuQkxPQ0tfU0laRTtcclxuICAgICAgICB0aGlzLmN1ckxlZnQgPSBwYXJhbXMuY3VyTGVmdDtcclxuICAgICAgICB0aGlzLmN1clRvcCA9IHBhcmFtcy5jdXJUb3A7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDnu4Tnn6npmLXpobrml7bpkojml4vovaxcclxuICAgICAqL1xyXG4gICAgY2xvY2t3aXNlKGFycikge1xyXG4gICAgICAgIGxldCBuZXdBcnIgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBhcnIubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1BcnIgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGFyci5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xyXG4gICAgICAgICAgICAgICAgdGVtQXJyLnB1c2goYXJyW2pdW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdBcnIucHVzaCh0ZW1BcnIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZWZ0cyA9IFtdO1xyXG4gICAgICAgIGxldCB0b3BzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuY2hlY2tBcnJXaXRoMShuZXdBcnIsIGZ1bmN0aW9uIChpLCBqKSB7XHJcbiAgICAgICAgICAgIGxlZnRzLnB1c2goaiAqIHRoaXMuQkxPQ0tfU0laRSk7XHJcbiAgICAgICAgICAgIHRvcHMucHVzaChpICogdGhpcy5CTE9DS19TSVpFKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmV3QXJyOiBuZXdBcnIsXHJcbiAgICAgICAgICAgIGxlZnRzOiBsZWZ0cyxcclxuICAgICAgICAgICAgdG9wczogdG9wc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreS6jOe7tOaVsOe7hOS4ujHnmoTkuIvmoIdcclxuICAgICAqL1xyXG5cclxuICAgIGNoZWNrQXJyV2l0aDEoYXJyLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGFyci5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gYXJyLmxlbmd0aCAtIDE7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycltpXVtqXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBpICsgdGhpcy5jdXJUb3AsIGogKyB0aGlzLmN1ckxlZnQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7mlbDnu4Tnn6npmLXnlLvlh7rlvZPliY3mlrnlnZdcclxuICAgICAqL1xyXG4gICAgZHJhdyhpLCBqKSB7XHJcbiAgICAgICAgbGV0IGFjdGl2ZU1vZGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYWN0aXZlTW9kZWwuY2xhc3NOYW1lID0gJ2FjdGl2aXR5TW9kZWwnO1xyXG4gICAgICAgIGFjdGl2ZU1vZGVsLnN0eWxlLnRvcCA9IGAke2kgKiB0aGlzLkJMT0NLX1NJWkV9cHhgO1xyXG4gICAgICAgIGFjdGl2ZU1vZGVsLnN0eWxlLmxlZnQgPSBgJHtqICogdGhpcy5CTE9DS19TSVpFfXB4YDtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFjdGl2ZU1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAq6I635Y+W5b2T5YmN5pa55Z2X5Y+v5Lul5Yiw6L6+55qE6L6555WMXHJcbiAgICAgKi9cclxuICAgIGdldEludGVydmFsKGN1ckxlZnQsIGN1clRvcCkge1xyXG4gICAgICAgIGxldCBpbmFjdGl2ZU1vZGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluYWN0aXZlTW9kZWwnKSxcclxuICAgICAgICAgICAgaGlnaGVzdCA9IG51bGwsXHJcbiAgICAgICAgICAgIGxlZnRtb3N0ID0gbnVsbCxcclxuICAgICAgICAgICAgcmlnaHRtb3N0ID0gbnVsbDtcclxuICAgICAgICBpZiAoaW5hY3RpdmVNb2RlbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgaGlnaGVzdCA9IHRoaXMuc2l0ZVNpemUudG9wICsgdGhpcy5zaXRlU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGxlZnRtb3N0ID0gdGhpcy5zaXRlU2l6ZS5sZWZ0IC0gdGhpcy5CTE9DS19TSVpFO1xyXG4gICAgICAgICAgICByaWdodG1vc3QgPSB0aGlzLnNpdGVTaXplLmxlZnQgKyB0aGlzLnNpdGVTaXplLndpZHRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB0b3BzID0gW10sXHJcbiAgICAgICAgICAgICAgICBsZWZ0cyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgcmlnaHRzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IHYgb2YgaW5hY3RpdmVNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlZnQgPSBwYXJzZUludCh2LnN0eWxlLmxlZnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IHBhcnNlSW50KHYuc3R5bGUudG9wKTtcclxuICAgICAgICAgICAgICAgIGlmIChsZWZ0ID09PSBjdXJMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wcy5wdXNoKHRvcClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0b3AgPT09IGN1clRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0IDwgY3VyTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0cy5wdXNoKGxlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsZWZ0ID4gY3VyTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodHMucHVzaChsZWZ0KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodG9wcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGhpZ2hlc3QgPSB0aGlzLnNpdGVTaXplLnRvcCArIHRoaXMuc2l0ZVNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGlnaGVzdCA9IE1hdGgubWluKC4uLnRvcHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGVmdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0bW9zdCA9IHRoaXMuc2l0ZVNpemUubGVmdCAtIHRoaXMuQkxPQ0tfU0laRTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxlZnRtb3N0ID0gTWF0aC5tYXgoLi4ubGVmdHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmlnaHRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRtb3N0ID0gdGhpcy5zaXRlU2l6ZS5sZWZ0ICsgdGhpcy5zaXRlU2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0bW9zdCA9IE1hdGgubWluKC4uLnJpZ2h0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhpZ2hlc3Q6IGhpZ2hlc3QsXHJcbiAgICAgICAgICAgIGxlZnRtb3N0OiBsZWZ0bW9zdCxcclxuICAgICAgICAgICAgcmlnaHRtb3N0OiByaWdodG1vc3RcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5raI6Zmk56CW5Z2XXHJcbiAgICAgKi9cclxuICAgIGVsaW1pbmF0ZSgpIHtcclxuICAgICAgICBsZXQgcmVzID0gW10sXHJcbiAgICAgICAgICAgIGluYWN0aXZlTW9kZWxzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbmFjdGl2ZU1vZGVsJyldO1xyXG4gICAgICAgIGluYWN0aXZlTW9kZWxzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEuc3R5bGUudG9wKSAtIHBhcnNlSW50KGIuc3R5bGUudG9wKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmFjdGl2ZU1vZGVscy5sZW5ndGg7KSB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDAsXHJcbiAgICAgICAgICAgICAgICBtb2RlbHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpbmFjdGl2ZU1vZGVscy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluYWN0aXZlTW9kZWxzW2ldLnN0eWxlLnRvcCA9PT0gaW5hY3RpdmVNb2RlbHNbal0uc3R5bGUudG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbHMucHVzaChpbmFjdGl2ZU1vZGVsc1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG1vZGVsczogbW9kZWxzLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IGNvdW50LFxyXG4gICAgICAgICAgICAgICAgdG9wOiBwYXJzZUludChpbmFjdGl2ZU1vZGVsc1tpXS5zdHlsZS50b3ApXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL2ZvciDlvqrnjq/nmoTmnIDlkI7kuIDkuKrlj4LmlbDlj6/ku6XmlL7lnKjlvqrnjq/kvZPlhoVcclxuICAgICAgICAgICAgaSArPSBjb3VudFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Y+v5Lul56e75YqoXHJcbiAgICAgKi9cclxuICAgIGNhbk1vdmUoYXJyLCBkZWZvcm0gPSBmYWxzZSwgZGlzcGFsY2VtZW50PTEsbW92ZSA9IHtcclxuICAgICAgICBjYW5Nb3ZlUmlnaHQ6IHRydWUsXHJcbiAgICAgICAgY2FuTW92ZURvd246IHRydWUsXHJcbiAgICAgICAgY2FuTW92ZUxlZnQ6IHRydWVcclxuICAgIH0pIHtcclxuICAgICAgICB0aGlzLmNoZWNrQXJyV2l0aDEoYXJyLCBmdW5jdGlvbiAoaSwgaikge1xyXG4gICAgICAgICAgICBsZXQge2hpZ2hlc3QsIGxlZnRtb3N0LCByaWdodG1vc3R9PXRoaXMuZ2V0SW50ZXJ2YWwoaiAqIHRoaXMuQkxPQ0tfU0laRSwgaSAqIHRoaXMuQkxPQ0tfU0laRSk7XHJcbiAgICAgICAgICAgIGlmIChkZWZvcm0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkJMT0NLX1NJWkUgKiAoaiArIDEpID4gcmlnaHRtb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkJMT0NLX1NJWkUgKiAoaSArIGRpc3BhbGNlbWVudCkgPiBoaWdoZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChqIC0gMSkgPCBsZWZ0bW9zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmUuY2FuTW92ZUxlZnQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChqICsgMSkgPj0gcmlnaHRtb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkJMT0NLX1NJWkUgKiAoaSArIGRpc3BhbGNlbWVudCkgPj0gaGlnaGVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmUuY2FuTW92ZURvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkJMT0NLX1NJWkUgKiAoaiAtIDEpIDw9IGxlZnRtb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlTGVmdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG1vdmU7XHJcbiAgICAgICAgLyogQXJyYXkuZnJvbeaWueazleeUqOS6juWwhuexu+aVsOe7hOi9rOS4uuecn+ato+eahOaVsOe7hFxyXG4gICAgICAgICBmb3IuLi5vZjogZm9yLi4uaW7lvqrnjq/or7vlj5bplK7lkI3vvIxmb3IuLi5vZuW+queOr+ivu+WPlumUruWAvFxyXG4gICAgICAgICBmb3IobGV0IHYgb2YgQXJyYXkuZnJvbShhY3RpdmVNb2RlbCkpe1xyXG4gICAgICAgICB0b3BzLnB1c2gocGFyc2VJbnQodi5zdHlsZS50b3ApKTtcclxuICAgICAgICAgbGVmdHMucHVzaChwYXJzZUludCh2LnN0eWxlLmxlZnQpKVxyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBtaW4oKSDmlrnms5Xlj6/ov5Tlm57mjIflrprnmoTmlbDlrZfkuK3luKbmnInmnIDkvY7lgLznmoTmlbDlrZfjgILlj4LmlbDkuLrnlKjpgJflj7fliIbpmpTnmoTlj4LmlbDluo/liJfvvIzkuI3mmK/mlbDnu4RcclxuICAgICAgICAgbWF4KCkg5pa55rOV5Y+v6L+U5Zue5oyH5a6a55qE5pWw5a2X5Lit5bim5pyJ5pyA5aSn5YC855qE5pWw5a2X44CCXHJcbiAgICAgICAgIC4uLiDmianlsZXov5DnrpfnrKbvvJrlsIbmlbDnu4TovazkuLrnlKjpgJflj7fliIbpmpTnmoTlj4LmlbDluo/liJdcclxuICAgICAgICAgLi4uIHJlc2V06L+Q566X56ym77ya5YW25Yqf6IO95LiO5omp5bGV6L+Q566X56ym5oGw5aW955u45Y+N77yM5oqK6YCX5Y+36ZqU5byA55qE5YC85bqP5YiX57uE5ZCI5oiQ5LiA5Liq5pWw57uEXHJcbiAgICAgICAgIGxldCB0b3AgPSBNYXRoLm1pbiguLi50b3BzKSxcclxuICAgICAgICAgbGVmdCA9IE1hdGgubWluKC4uLmxlZnRzKSxcclxuICAgICAgICAgcmlnaHQgPSBNYXRoLm1heCguLi5sZWZ0cyksXHJcbiAgICAgICAgIGRvd24gPSBNYXRoLm1heCguLi50b3BzKTtcclxuICAgICAgICAgaWYgKGRlZm9ybSkge1xyXG4gICAgICAgICBpZiAocmlnaHQgKyAyMCA+PSB0aGlzLnNpdGVTaXplLmxlZnQgKyB0aGlzLnNpdGVTaXplLndpZHRoKSB7XHJcbiAgICAgICAgIGNhbk1vdmVSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGlmIChyaWdodCArIDIwID49IHRoaXMuc2l0ZVNpemUubGVmdCArIHRoaXMuc2l0ZVNpemUud2lkdGgpIHtcclxuICAgICAgICAgY2FuTW92ZVJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgaWYgKGxlZnQgLSAyMCA8IHRoaXMuc2l0ZVNpemUubGVmdCkge1xyXG4gICAgICAgICBjYW5Nb3ZlTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGlmIChkb3duICsgMjAgPj0gdGhpcy5zaXRlU2l6ZS50b3AgKyB0aGlzLnNpdGVTaXplLmhlaWdodCkge1xyXG4gICAgICAgICBjYW5Nb3ZlRG93biA9IGZhbHNlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGlmICh0b3AgLSAyMCA8IHRoaXMuc2l0ZVNpemUudG9wKSB7XHJcbiAgICAgICAgIGNhbk1vdmVUb3AgPSBmYWxzZTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgY2FuTW92ZVJpZ2h0OiBjYW5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgIGNhbk1vdmVMZWZ0OiBjYW5Nb3ZlTGVmdCxcclxuICAgICAgICAgY2FuTW92ZVRvcDogY2FuTW92ZVRvcCxcclxuICAgICAgICAgY2FuTW92ZURvd246IGNhbk1vdmVEb3duXHJcbiAgICAgICAgIH0qL1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSu55uY5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIG1vdmUoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gKGUpPT4ge1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlTW9kZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZpdHlNb2RlbCcpLFxyXG4gICAgICAgICAgICAgICAgbW92ZSxcclxuICAgICAgICAgICAgICAgIGNhbk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgIGNhbk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZVRvcCxcclxuICAgICAgICAgICAgICAgIGNhbk1vdmVEb3duO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBlLmtleUNvZGU7XHJcbiAgICAgICAgICAgIGlmKGFjdGl2ZU1vZGVsLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVMZWZ0ID0gdGhpcy5jYW5Nb3ZlKHRoaXMuYXJyKS5jYW5Nb3ZlTGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbk1vdmVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFjdGl2ZU1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS5sZWZ0ID0gYCR7cGFyc2VJbnQodi5zdHlsZS5sZWZ0KSAtIHRoaXMuQkxPQ0tfU0laRX1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ckxlZnQtLTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbmB0IG1vdmUgbGVmdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL3VwXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHtuZXdBcnIsIGxlZnRzLCB0b3BzfT10aGlzLmNsb2Nrd2lzZSh0aGlzLmFycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmUgPSB0aGlzLmNhbk1vdmUobmV3QXJyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZURvd24gPSBtb3ZlLmNhbk1vdmVEb3duO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlUmlnaHQgPSBtb3ZlLmNhbk1vdmVSaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZUxlZnQgPSBtb3ZlLmNhbk1vdmVMZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuTW92ZVJpZ2h0ICYmIGNhbk1vdmVEb3duICYmIGNhbk1vdmVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFyciA9IG5ld0FycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gbGVmdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNb2RlbFtpXS5zdHlsZS5sZWZ0ID0gYCR7bGVmdHNbaV19cHhgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1vZGVsW2ldLnN0eWxlLnRvcCA9IGAke3RvcHNbaV19cHhgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVSaWdodCA9IHRoaXMuY2FuTW92ZSh0aGlzLmFycikuY2FuTW92ZVJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuTW92ZVJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFjdGl2ZU1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS5sZWZ0ID0gYCR7cGFyc2VJbnQodi5zdHlsZS5sZWZ0KSArIHRoaXMuQkxPQ0tfU0laRX1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ckxlZnQrK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW5gdCBtb3ZlIHJpZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZURvd24gPSB0aGlzLmNhbk1vdmUodGhpcy5hcnIsZmFsc2UsMikuY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYW5Nb3ZlRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBhY3RpdmVNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYuc3R5bGUudG9wID0gYCR7cGFyc2VJbnQodi5zdHlsZS50b3ApICsgMip0aGlzLkJMT0NLX1NJWkV9cHhgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJUb3AgKz0yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW5gdCBtb3ZlIGRvd25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLor7fpgInmi6nkuIrkuIvlt6blj7PmjInplK5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5pa55Z2XKi9cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5jaGVja0FycldpdGgxKHRoaXMuYXJyLCB0aGlzLmRyYXcpXHJcbiAgICAgICAgbGV0IGFjaXZlTW9kZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZpdHlNb2RlbCcpO1xyXG4gICAgICAgIGNvbnN0IGZhbGxEb3duID0gc2V0VGltZW91dChmdW5jdGlvbiBsb29wKCkge1xyXG4gICAgICAgICAgICAvL3NldFRpbWVvdXTkvJrmlLnlj5h0aGlz55qE5oyH5ZCR77yM5omA5Lul6ZyA6KaBYmluZCh0aGlzKVxyXG4gICAgICAgICAgICBsZXQgY2FuTW92ZURvd24gPSB0aGlzLmNhbk1vdmUodGhpcy5hcnIpLmNhbk1vdmVEb3duO1xyXG4gICAgICAgICAgICBpZiAoY2FuTW92ZURvd24pIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHYgb2YgYWNpdmVNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHYuc3R5bGUudG9wID0gYCR7cGFyc2VJbnQodi5zdHlsZS50b3ApICsgdGhpcy5CTE9DS19TSVpFfXB4YFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJUb3ArKztcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQobG9vcC5iaW5kKHRoaXMpLCA2MDApO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGFjaXZlTW9kZWwubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNpdmVNb2RlbFtpXS5jbGFzc05hbWUgPSAnaW5hY3RpdmVNb2RlbCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IHRoaXMuZWxpbWluYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB7Y291bnQsIG1vZGVscywgdG9wfT1yZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSBwYXJzZUludCh0aGlzLnNpdGVTaXplLndpZHRoIC8gdGhpcy5CTE9DS19TSVpFKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1vZGVscy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChtb2RlbHNbal0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmFjdGl2ZU1vZGVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbmFjdGl2ZU1vZGVsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHYgb2YgaW5hY3RpdmVNb2RlbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludCh2LnN0eWxlLnRvcCkgPCB0b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LnN0eWxlLnRvcCA9IGAke3BhcnNlSW50KHYuc3R5bGUudG9wKSArIHRoaXMuQkxPQ0tfU0laRX1weGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGluaXQoKTtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChmYWxsRG93bilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSwgNjAwKVxyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiDmlbDmja7liJ3lp4vljJZcclxuICovXHJcbmNvbnN0IGluaXQgPSAoKT0+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgICBhcnI6IF9fYXJyX18sXHJcbiAgICAgICAgc2l0ZVNpemU6IF9fc2l0ZVNpemVfXyxcclxuICAgICAgICBCTE9DS19TSVpFOiBfX0JMT0NLX1NJWkVfXyxcclxuICAgICAgICBjdXJMZWZ0OiBfX2N1ckxlZnRfXyxcclxuICAgICAgICBjdXJUb3A6IF9fY3VyVG9wX19cclxuICAgIH07XHJcbiAgICBsZXQgYmxvY2sgPSBuZXcgQmxvY2socGFyYW1zKTtcclxuICAgIGJsb2NrLmluaXQoKTtcclxuICAgIGJsb2NrLm1vdmUoKTtcclxufTtcclxuLyoqXHJcbiAq5rWP6KeI5Zmo5Yid5aeL5YyWXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEVTNueureWktOWHveaVsFxyXG4gKiDlh73mlbDkvZPlhoXnmoR0aGlz5a+56LGh77yM5bCx5piv5a6a5LmJ5pe25omA5Zyo55qE5a+56LGh77yM6ICM5LiN5piv5L2/55So5pe25omA5Zyo55qE5a+56LGh44CCXHJcbiAqIHZhciBzdW0gPSAobnVtMSwgbnVtMikgPT4gbnVtMSArIG51bTI7XHJcbiAqIOetieWQjOS6jlxyXG4gKiB2YXIgc3VtID0gZnVuY3Rpb24obnVtMSwgbnVtMikge1xyXG4gKiByZXR1cm4gbnVtMSArIG51bTI7XHJcbiAqIH07XHJcbiAqL1xyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJ3aW5kb3cgb25sb2FkXCIpO1xyXG4gICAgbGV0IHNpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZScpO1xyXG4gICAgLy8gV2luZG93LmdldENvbXB1dGVkU3R5bGUoKSDmlrnms5XkvJrlnKjkuIDkuKrlhYPntKDlupTnlKjlrozmnInmlYjmoLflvI/kuJTorqHnrpflrozmiYDmnInlsZ7mgKfnmoTln7rmnKzlgLzkuYvlkI7nu5nlh7rmiYDmnIkgQ1NTIOWxnuaAp+eahOWAvOOAglxyXG4gICAgbGV0IHt3aWR0aCwgaGVpZ2h0LCBsZWZ0LCB0b3B9ID13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzaXRlKTtcclxuICAgIGxldCBzaXRlU2l6ZSA9IHtcclxuICAgICAgICB3aWR0aDogcGFyc2VJbnQod2lkdGgpLFxyXG4gICAgICAgIGhlaWdodDogcGFyc2VJbnQoaGVpZ2h0KSxcclxuICAgICAgICBsZWZ0OiBwYXJzZUludChsZWZ0KSxcclxuICAgICAgICB0b3A6IHBhcnNlSW50KHRvcClcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnIgPSBbWzEsIDBdLCBbMSwgMF0sIFsxLCAxXV07XHJcbiAgICBjb25zdCBCTE9DS19TSVpFID0gMjA7XHJcbiAgICBsZXQgY3VyTGVmdCA9IHBhcnNlSW50KChzaXRlU2l6ZS5sZWZ0ICsgc2l0ZVNpemUud2lkdGggLyAyKSAvIEJMT0NLX1NJWkUpO1xyXG4gICAgbGV0IGN1clRvcCA9IHBhcnNlSW50KHNpdGVTaXplLnRvcCAvIEJMT0NLX1NJWkUpO1xyXG4gICAgd2luZG93Ll9fYXJyX18gPSBhcnI7XHJcbiAgICB3aW5kb3cuX19zaXRlU2l6ZV9fID0gc2l0ZVNpemU7XHJcbiAgICB3aW5kb3cuX19CTE9DS19TSVpFX18gPSBCTE9DS19TSVpFO1xyXG4gICAgd2luZG93Ll9fY3VyTGVmdF9fID0gY3VyTGVmdDtcclxuICAgIHdpbmRvdy5fX2N1clRvcF9fID0gY3VyVG9wO1xyXG5cclxuICAgIGluaXQoKTtcclxuXHJcblxyXG59O1xyXG4iXX0=
