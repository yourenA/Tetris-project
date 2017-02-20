"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
        key: "clockwise",
        value: function clockwise(arr) {
            var newArr = [];
            for (var i = 0; i <= arr.length - 1; i++) {
                var temArr = [];
                for (var j = arr.length - 1; j >= 0; j--) {
                    temArr.push(arr[j][i]);
                }
                newArr.push(temArr);
            }
            console.log(newArr);
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
        key: "checkArrWith1",
        value: function checkArrWith1(arr, callback) {
            for (var i = 0; i <= arr.length - 1; i++) {
                console.log(arr[i]);
                for (var j = 0; j <= arr.length - 1; j++) {
                    if (arr[i][j] == 1) {
                        console.log("i:", i, " j:", j);
                        callback.call(this, i + this.curTop, j + this.curLeft);
                    }
                }
            }
        }

        /**
         * 根据数组矩阵画出当前方块
         */

    }, {
        key: "draw",
        value: function draw(i, j) {
            var activeModel = document.createElement('div');
            activeModel.className = 'activityModel';
            activeModel.style.top = i * this.BLOCK_SIZE + "px";
            activeModel.style.left = j * this.BLOCK_SIZE + "px";
            document.body.appendChild(activeModel);
        }

        /**
         *获取当前方块可以到达的边界
         */

    }, {
        key: "getInterval",
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
                            rightmost = this.siteSize + this.siteSize.width;
                        } else {
                            rightmost = Math.min.apply(Math, rights);
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
            }

            return {
                highest: highest,
                leftmost: leftmost,
                rightmost: rightmost
            };
        }

        /**
         * 判断是否可以移动
         */

    }, {
        key: "canMove",
        value: function canMove(arr) {
            var deform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var move = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
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
                    if (this.BLOCK_SIZE * (i + 1) > highest) {
                        move.canMoveDown = false;
                    }
                    if (this.BLOCK_SIZE * (j - 1) < leftmost) {
                        move.canMoveLeft = false;
                    }
                } else {
                    if (this.BLOCK_SIZE * (j + 1) >= rightmost) {
                        move.canMoveRight = false;
                    }
                    if (this.BLOCK_SIZE * (i + 1) >= highest) {
                        move.canMoveDown = false;
                    }
                    if (this.BLOCK_SIZE * (j - 1) <= leftmost) {
                        move.canMoveLeft = false;
                    }
                }
            });
            return move;
            //Array.from方法用于将类数组转为真正的数组
            //for...of: for...in循环读取键名，for...of循环读取键值
            // for(let v of Array.from(activeModel)){
            //     tops.push(parseInt(v.style.top));
            //     lefts.push(parseInt(v.style.left))
            // }

            //min() 方法可返回指定的数字中带有最低值的数字。参数为用逗号分隔的参数序列，不是数组
            //max() 方法可返回指定的数字中带有最大值的数字。
            //... 扩展运算符：将数组转为用逗号分隔的参数序列
            //... reset运算符：其功能与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组
            // let top = Math.min(...tops),
            //     left = Math.min(...lefts),
            //     right = Math.max(...lefts),
            //     down = Math.max(...tops);
            // if (deform) {
            //     if (right + 20 >= this.siteSize.left + this.siteSize.width) {
            //         canMoveRight = false;
            //     }
            // } else {
            //     if (right + 20 >= this.siteSize.left + this.siteSize.width) {
            //         canMoveRight = false;
            //     }
            // }
            //
            // if (left - 20 < this.siteSize.left) {
            //     canMoveLeft = false;
            // }
            // if (down + 20 >= this.siteSize.top + this.siteSize.height) {
            //     canMoveDown = false;
            // }
            // if (top - 20 < this.siteSize.top) {
            //     canMoveTop = false;
            // }
            //
            // return {
            //     canMoveRight: canMoveRight,
            //     canMoveLeft: canMoveLeft,
            //     canMoveTop: canMoveTop,
            //     canMoveDown: canMoveDown
            // }
        }

        /**
         * 键盘事件
         */

    }, {
        key: "move",
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
                console.log("key", key);
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

                                    v.style.left = parseInt(v.style.left) - 20 + "px";
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
                        if (canMoveRight && canMoveRight) {
                            _this.arr = newArr;
                            for (var i in lefts) {
                                activeModel[i].style.left = lefts[i] + "px";
                                activeModel[i].style.top = tops[i] + "px";
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

                                    _v.style.left = parseInt(_v.style.left) + 20 + "px";
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
                    case 40:
                        canMoveDown = _this.canMove(_this.arr).canMoveDown;
                        if (canMoveDown) {
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = activeModel[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var _v2 = _step4.value;

                                    _v2.style.top = parseInt(_v2.style.top) + 20 + "px";
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

                            _this.curTop++;
                        } else {
                            console.log("can`t move down");
                        }
                        break;
                    default:
                        console.log("请选择上下左右按键");
                        break;
                }
            };
        }

        /**
         * 初始化方块*/

    }, {
        key: "init",
        value: function init() {
            this.checkArrWith1(this.arr, this.draw);
            var aciveModel = document.querySelectorAll('.activityModel');
            var fallDown = setTimeout(function loop() {
                var canMoveDown = this.canMove(this.arr).canMoveDown;
                if (canMoveDown) {
                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = aciveModel[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var v = _step5.value;

                            v.style.top = parseInt(v.style.top) + this.BLOCK_SIZE + "px";
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
                    console.log("can`t move down");
                    for (var i = 0; i <= aciveModel.length - 1; i++) {
                        aciveModel[i].className = 'inactiveModel';
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
    console.log("curLeft", curLeft);
    console.log("curTop", curTop);
    window.__arr__ = arr;
    window.__siteSize__ = siteSize;
    window.__BLOCK_SIZE__ = BLOCK_SIZE;
    window.__curLeft__ = curLeft;
    window.__curTop__ = curTop;

    _init();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkJsb2NrIiwicGFyYW1zIiwic2l0ZVNpemUiLCJhcnIiLCJCTE9DS19TSVpFIiwiY3VyTGVmdCIsImN1clRvcCIsIm5ld0FyciIsImkiLCJsZW5ndGgiLCJ0ZW1BcnIiLCJqIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJsZWZ0cyIsInRvcHMiLCJjaGVja0FycldpdGgxIiwiY2FsbGJhY2siLCJjYWxsIiwiYWN0aXZlTW9kZWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJzdHlsZSIsInRvcCIsImxlZnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJpbmFjdGl2ZU1vZGVsIiwicXVlcnlTZWxlY3RvckFsbCIsImhpZ2hlc3QiLCJsZWZ0bW9zdCIsInJpZ2h0bW9zdCIsImhlaWdodCIsIndpZHRoIiwicmlnaHRzIiwidiIsInBhcnNlSW50IiwiTWF0aCIsIm1pbiIsIm1heCIsImRlZm9ybSIsIm1vdmUiLCJjYW5Nb3ZlUmlnaHQiLCJjYW5Nb3ZlRG93biIsImNhbk1vdmVMZWZ0IiwiZ2V0SW50ZXJ2YWwiLCJvbmtleWRvd24iLCJlIiwiY2FuTW92ZVRvcCIsImtleSIsImtleUNvZGUiLCJjYW5Nb3ZlIiwiY2xvY2t3aXNlIiwiZHJhdyIsImFjaXZlTW9kZWwiLCJmYWxsRG93biIsInNldFRpbWVvdXQiLCJsb29wIiwiYmluZCIsImluaXQiLCJjbGVhclRpbWVvdXQiLCJfX2Fycl9fIiwiX19zaXRlU2l6ZV9fIiwiX19CTE9DS19TSVpFX18iLCJfX2N1ckxlZnRfXyIsIl9fY3VyVG9wX18iLCJibG9jayIsIndpbmRvdyIsIm9ubG9hZCIsInNpdGUiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0Q29tcHV0ZWRTdHlsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFJQTs7OztBQUlBOzs7Ozs7Ozs7Ozs7O0lBYU1BLEs7QUFDRixtQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNoQjs7O0FBR0Es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LFNBQVN1QixHQUFULEdBQWVyQixVQUF4QixDQUFiO0FBQ0FTLFlBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCVCxPQUF2QjtBQUNBUSxZQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQlIsTUFBdEI7QUFDQStELFdBQU9OLE9BQVAsR0FBaUI1RCxHQUFqQjtBQUNBa0UsV0FBT0wsWUFBUCxHQUFzQjlELFFBQXRCO0FBQ0FtRSxXQUFPSixjQUFQLEdBQXdCN0QsVUFBeEI7QUFDQWlFLFdBQU9ILFdBQVAsR0FBcUI3RCxPQUFyQjtBQUNBZ0UsV0FBT0YsVUFBUCxHQUFvQjdELE1BQXBCOztBQUVBdUQ7QUFHSCxDQTFCRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFkbWluaXN0cmF0b3Igb24gMjAxNy8yLzIwLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiDlrprkuYnmlrnlnZdcclxuICovXHJcblxyXG4vKipcclxuICogRVM2IENsYXNzXHJcbiAqIENsYXNz5LiN5a2Y5Zyo5Y+Y6YeP5o+Q5Y2H77yIaG9pc3TvvInvvIzov5nkuIDngrnkuI5FUzXlrozlhajkuI3lkIzjgIJcclxuICogY2xhc3MgQmFyIHtcclxuICogICBjb25zdHJ1Y3Rvcigpe30gY29uc3RydWN0b3Lmlrnms5XmmK/nsbvnmoTpu5jorqTmlrnms5VcclxuICogICBkb1N0dWZmKCkge1xyXG4gKiAgICBjb25zb2xlLmxvZygnc3R1ZmYnKTtcclxuICogICB9XHJcbiAqIH1cclxuICog5L2/55So55qE5pe25YCZ77yM5Lmf5piv55u05o6l5a+557G75L2/55SobmV35ZG95Luk77yM6Lef5p6E6YCg5Ye95pWw55qE55So5rOV5a6M5YWo5LiA6Ie044CCXHJcbiAqIHZhciBiID0gbmV3IEJhcigpO1xyXG4gKiBiLmRvU3R1ZmYoKSAvLyBcInN0dWZmXCJcclxuICovXHJcbmNsYXNzIEJsb2NrIHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWwhm5ldyBCbG9jayhwYXJhbXMpIOWPguaVsOS8oOi/m3RoaXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNpdGVTaXplID0gcGFyYW1zLnNpdGVTaXplO1xyXG4gICAgICAgIHRoaXMuYXJyID0gcGFyYW1zLmFycjtcclxuICAgICAgICB0aGlzLkJMT0NLX1NJWkUgPSBwYXJhbXMuQkxPQ0tfU0laRTtcclxuICAgICAgICB0aGlzLmN1ckxlZnQgPSBwYXJhbXMuY3VyTGVmdDtcclxuICAgICAgICB0aGlzLmN1clRvcCA9IHBhcmFtcy5jdXJUb3A7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDnu4Tnn6npmLXpobrml7bpkojml4vovaxcclxuICAgICAqL1xyXG4gICAgY2xvY2t3aXNlKGFycikge1xyXG4gICAgICAgIGxldCBuZXdBcnIgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBhcnIubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1BcnIgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGFyci5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xyXG4gICAgICAgICAgICAgICAgdGVtQXJyLnB1c2goYXJyW2pdW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdBcnIucHVzaCh0ZW1BcnIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ld0Fycik7XHJcbiAgICAgICAgbGV0IGxlZnRzID0gW107XHJcbiAgICAgICAgbGV0IHRvcHMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja0FycldpdGgxKG5ld0FyciwgZnVuY3Rpb24gKGksIGopIHtcclxuICAgICAgICAgICAgbGVmdHMucHVzaChqICogdGhpcy5CTE9DS19TSVpFKTtcclxuICAgICAgICAgICAgdG9wcy5wdXNoKGkgKiB0aGlzLkJMT0NLX1NJWkUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZXdBcnI6IG5ld0FycixcclxuICAgICAgICAgICAgbGVmdHM6IGxlZnRzLFxyXG4gICAgICAgICAgICB0b3BzOiB0b3BzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5LqM57u05pWw57uE5Li6MeeahOS4i+agh1xyXG4gICAgICovXHJcblxyXG4gICAgY2hlY2tBcnJXaXRoMShhcnIsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gYXJyLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcnJbaV0pXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGFyci5sZW5ndGggLSAxOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJbaV1bal0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaTpcIiwgaSwgXCIgajpcIiwgaik7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBpICsgdGhpcy5jdXJUb3AsIGogKyB0aGlzLmN1ckxlZnQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7mlbDnu4Tnn6npmLXnlLvlh7rlvZPliY3mlrnlnZdcclxuICAgICAqL1xyXG4gICAgZHJhdyhpLCBqKSB7XHJcbiAgICAgICAgbGV0IGFjdGl2ZU1vZGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYWN0aXZlTW9kZWwuY2xhc3NOYW1lID0gJ2FjdGl2aXR5TW9kZWwnO1xyXG4gICAgICAgIGFjdGl2ZU1vZGVsLnN0eWxlLnRvcCA9IGAke2kgKiB0aGlzLkJMT0NLX1NJWkV9cHhgO1xyXG4gICAgICAgIGFjdGl2ZU1vZGVsLnN0eWxlLmxlZnQgPSBgJHtqICogdGhpcy5CTE9DS19TSVpFfXB4YDtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFjdGl2ZU1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAq6I635Y+W5b2T5YmN5pa55Z2X5Y+v5Lul5Yiw6L6+55qE6L6555WMXHJcbiAgICAgKi9cclxuICAgIGdldEludGVydmFsKGN1ckxlZnQsY3VyVG9wKXtcclxuICAgICAgICBsZXQgaW5hY3RpdmVNb2RlbD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5hY3RpdmVNb2RlbCcpLFxyXG4gICAgICAgICAgICBoaWdoZXN0PW51bGwsXHJcbiAgICAgICAgICAgIGxlZnRtb3N0PW51bGwsXHJcbiAgICAgICAgICAgIHJpZ2h0bW9zdD1udWxsO1xyXG4gICAgICAgIGlmKGluYWN0aXZlTW9kZWwubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgaGlnaGVzdCA9IHRoaXMuc2l0ZVNpemUudG9wICsgdGhpcy5zaXRlU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGxlZnRtb3N0ID0gdGhpcy5zaXRlU2l6ZS5sZWZ0IC0gdGhpcy5CTE9DS19TSVpFO1xyXG4gICAgICAgICAgICByaWdodG1vc3QgPSB0aGlzLnNpdGVTaXplLmxlZnQgKyB0aGlzLnNpdGVTaXplLndpZHRoO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgdG9wcz1bXSxcclxuICAgICAgICAgICAgICAgIGxlZnRzPVtdLFxyXG4gICAgICAgICAgICAgICAgcmlnaHRzPVtdO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCB2IG9mIGluYWN0aXZlTW9kZWwpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlZnQ9cGFyc2VJbnQodi5zdHlsZS5sZWZ0KSxcclxuICAgICAgICAgICAgICAgICAgICB0b3A9cGFyc2VJbnQodi5zdHlsZS50b3ApO1xyXG4gICAgICAgICAgICAgICAgaWYobGVmdCA9PT0gY3VyTGVmdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wcy5wdXNoKHRvcClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRvcCA9PT0gY3VyVG9wKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihsZWZ0PGN1ckxlZnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0cy5wdXNoKGxlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGVmdCA+IGN1ckxlZnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodHMucHVzaChsZWZ0KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRvcHMubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBoaWdoZXN0PXRoaXMuc2l0ZVNpemUudG9wK3RoaXMuc2l0ZVNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlnaGVzdD1NYXRoLm1pbiguLi50b3BzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihsZWZ0cy5sZW5ndGg9PT0wKXtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0bW9zdD10aGlzLnNpdGVTaXplLmxlZnQtdGhpcy5CTE9DS19TSVpFO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdG1vc3Q9TWF0aC5tYXgoLi4ubGVmdHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHJpZ2h0cy5sZW5ndGg9PT0wKXtcclxuICAgICAgICAgICAgICAgICAgICByaWdodG1vc3Q9dGhpcy5zaXRlU2l6ZSt0aGlzLnNpdGVTaXplLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRtb3N0PU1hdGgubWluKC4uLnJpZ2h0cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICBoaWdoZXN0OmhpZ2hlc3QsXHJcbiAgICAgICAgICAgIGxlZnRtb3N0OmxlZnRtb3N0LFxyXG4gICAgICAgICAgICByaWdodG1vc3Q6cmlnaHRtb3N0XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKblj6/ku6Xnp7vliqhcclxuICAgICAqL1xyXG4gICAgY2FuTW92ZShhcnIsIGRlZm9ybSA9IGZhbHNlLG1vdmU9e1xyXG4gICAgICAgIGNhbk1vdmVSaWdodDp0cnVlLFxyXG4gICAgICAgIGNhbk1vdmVEb3duOnRydWUsXHJcbiAgICAgICAgY2FuTW92ZUxlZnQ6dHJ1ZVxyXG4gICAgfSkge1xyXG4gICAgICAgIHRoaXMuY2hlY2tBcnJXaXRoMShhcnIsIGZ1bmN0aW9uIChpLCBqKSB7XHJcbiAgICAgICAgICAgIGxldCB7aGlnaGVzdCxsZWZ0bW9zdCxyaWdodG1vc3R9PXRoaXMuZ2V0SW50ZXJ2YWwoaip0aGlzLkJMT0NLX1NJWkUsaSp0aGlzLkJMT0NLX1NJWkUpO1xyXG4gICAgICAgICAgICBpZihkZWZvcm0pe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5CTE9DS19TSVpFKihqKzEpPnJpZ2h0bW9zdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlUmlnaHQ9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLkJMT0NLX1NJWkUqKGkrMSk+aGlnaGVzdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlRG93bj1mYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuQkxPQ0tfU0laRSooai0xKTxsZWZ0bW9zdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlTGVmdD1mYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuQkxPQ0tfU0laRSooaisxKT49cmlnaHRtb3N0KXtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlLmNhbk1vdmVSaWdodD1mYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuQkxPQ0tfU0laRSooaSsxKT49aGlnaGVzdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlRG93bj1mYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuQkxPQ0tfU0laRSooai0xKTw9bGVmdG1vc3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmUuY2FuTW92ZUxlZnQ9ZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbW92ZVxyXG4gICAgICAgIC8vQXJyYXkuZnJvbeaWueazleeUqOS6juWwhuexu+aVsOe7hOi9rOS4uuecn+ato+eahOaVsOe7hFxyXG4gICAgICAgIC8vZm9yLi4ub2Y6IGZvci4uLmlu5b6q546v6K+75Y+W6ZSu5ZCN77yMZm9yLi4ub2blvqrnjq/or7vlj5bplK7lgLxcclxuICAgICAgICAvLyBmb3IobGV0IHYgb2YgQXJyYXkuZnJvbShhY3RpdmVNb2RlbCkpe1xyXG4gICAgICAgIC8vICAgICB0b3BzLnB1c2gocGFyc2VJbnQodi5zdHlsZS50b3ApKTtcclxuICAgICAgICAvLyAgICAgbGVmdHMucHVzaChwYXJzZUludCh2LnN0eWxlLmxlZnQpKVxyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy9taW4oKSDmlrnms5Xlj6/ov5Tlm57mjIflrprnmoTmlbDlrZfkuK3luKbmnInmnIDkvY7lgLznmoTmlbDlrZfjgILlj4LmlbDkuLrnlKjpgJflj7fliIbpmpTnmoTlj4LmlbDluo/liJfvvIzkuI3mmK/mlbDnu4RcclxuICAgICAgICAvL21heCgpIOaWueazleWPr+i/lOWbnuaMh+WumueahOaVsOWtl+S4reW4puacieacgOWkp+WAvOeahOaVsOWtl+OAglxyXG4gICAgICAgIC8vLi4uIOaJqeWxlei/kOeul+espu+8muWwhuaVsOe7hOi9rOS4uueUqOmAl+WPt+WIhumalOeahOWPguaVsOW6j+WIl1xyXG4gICAgICAgIC8vLi4uIHJlc2V06L+Q566X56ym77ya5YW25Yqf6IO95LiO5omp5bGV6L+Q566X56ym5oGw5aW955u45Y+N77yM5oqK6YCX5Y+36ZqU5byA55qE5YC85bqP5YiX57uE5ZCI5oiQ5LiA5Liq5pWw57uEXHJcbiAgICAgICAgLy8gbGV0IHRvcCA9IE1hdGgubWluKC4uLnRvcHMpLFxyXG4gICAgICAgIC8vICAgICBsZWZ0ID0gTWF0aC5taW4oLi4ubGVmdHMpLFxyXG4gICAgICAgIC8vICAgICByaWdodCA9IE1hdGgubWF4KC4uLmxlZnRzKSxcclxuICAgICAgICAvLyAgICAgZG93biA9IE1hdGgubWF4KC4uLnRvcHMpO1xyXG4gICAgICAgIC8vIGlmIChkZWZvcm0pIHtcclxuICAgICAgICAvLyAgICAgaWYgKHJpZ2h0ICsgMjAgPj0gdGhpcy5zaXRlU2l6ZS5sZWZ0ICsgdGhpcy5zaXRlU2l6ZS53aWR0aCkge1xyXG4gICAgICAgIC8vICAgICAgICAgY2FuTW92ZVJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICBpZiAocmlnaHQgKyAyMCA+PSB0aGlzLnNpdGVTaXplLmxlZnQgKyB0aGlzLnNpdGVTaXplLndpZHRoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBjYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIGlmIChsZWZ0IC0gMjAgPCB0aGlzLnNpdGVTaXplLmxlZnQpIHtcclxuICAgICAgICAvLyAgICAgY2FuTW92ZUxlZnQgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYgKGRvd24gKyAyMCA+PSB0aGlzLnNpdGVTaXplLnRvcCArIHRoaXMuc2l0ZVNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgLy8gICAgIGNhbk1vdmVEb3duID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmICh0b3AgLSAyMCA8IHRoaXMuc2l0ZVNpemUudG9wKSB7XHJcbiAgICAgICAgLy8gICAgIGNhbk1vdmVUb3AgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyByZXR1cm4ge1xyXG4gICAgICAgIC8vICAgICBjYW5Nb3ZlUmlnaHQ6IGNhbk1vdmVSaWdodCxcclxuICAgICAgICAvLyAgICAgY2FuTW92ZUxlZnQ6IGNhbk1vdmVMZWZ0LFxyXG4gICAgICAgIC8vICAgICBjYW5Nb3ZlVG9wOiBjYW5Nb3ZlVG9wLFxyXG4gICAgICAgIC8vICAgICBjYW5Nb3ZlRG93bjogY2FuTW92ZURvd25cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplK7nm5jkuovku7ZcclxuICAgICAqL1xyXG4gICAgbW92ZSgpIHtcclxuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSAoZSk9PiB7XHJcbiAgICAgICAgICAgIGxldCBhY3RpdmVNb2RlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpdml0eU1vZGVsJyksXHJcbiAgICAgICAgICAgICAgICBtb3ZlLFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlVG9wLFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGUua2V5Q29kZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJrZXlcIiwga2V5KTtcclxuICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIC8vbGVmdFxyXG4gICAgICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlTGVmdCA9IHRoaXMuY2FuTW92ZSh0aGlzLmFycikuY2FuTW92ZUxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbk1vdmVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHYgb2YgYWN0aXZlTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYuc3R5bGUubGVmdCA9IGAke3BhcnNlSW50KHYuc3R5bGUubGVmdCkgLSAyMH1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJMZWZ0LS07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSBsZWZ0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vdXBcclxuICAgICAgICAgICAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHtuZXdBcnIsIGxlZnRzLCB0b3BzfT10aGlzLmNsb2Nrd2lzZSh0aGlzLmFycik7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZSA9IHRoaXMuY2FuTW92ZShuZXdBcnIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbk1vdmVEb3duID0gbW92ZS5jYW5Nb3ZlRG93bjtcclxuICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlUmlnaHQgPSBtb3ZlLmNhbk1vdmVSaWdodDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FuTW92ZVJpZ2h0ICYmIGNhbk1vdmVSaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFyciA9IG5ld0FycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBsZWZ0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTW9kZWxbaV0uc3R5bGUubGVmdCA9IGAke2xlZnRzW2ldfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1vZGVsW2ldLnN0eWxlLnRvcCA9IGAke3RvcHNbaV19cHhgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvL3JpZ2h0XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM5OlxyXG4gICAgICAgICAgICAgICAgICAgIGNhbk1vdmVSaWdodCA9IHRoaXMuY2FuTW92ZSh0aGlzLmFycikuY2FuTW92ZVJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYW5Nb3ZlUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBhY3RpdmVNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS5sZWZ0ID0gYCR7cGFyc2VJbnQodi5zdHlsZS5sZWZ0KSArIDIwfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ckxlZnQrK1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSByaWdodFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDA6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuTW92ZURvd24gPSB0aGlzLmNhbk1vdmUodGhpcy5hcnIpLmNhbk1vdmVEb3duO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYW5Nb3ZlRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFjdGl2ZU1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LnN0eWxlLnRvcCA9IGAke3BhcnNlSW50KHYuc3R5bGUudG9wKSArIDIwfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1clRvcCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSBkb3duXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLor7fpgInmi6nkuIrkuIvlt6blj7PmjInplK5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbmlrnlnZcqL1xyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNoZWNrQXJyV2l0aDEodGhpcy5hcnIsIHRoaXMuZHJhdylcclxuICAgICAgICBsZXQgYWNpdmVNb2RlbD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZpdHlNb2RlbCcpO1xyXG4gICAgICAgIGNvbnN0IGZhbGxEb3duPXNldFRpbWVvdXQoZnVuY3Rpb24gbG9vcCgpIHtcclxuICAgICAgICAgICAgbGV0IGNhbk1vdmVEb3duPXRoaXMuY2FuTW92ZSh0aGlzLmFycikuY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgIGlmKGNhbk1vdmVEb3duKXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgdiBvZiBhY2l2ZU1vZGVsKXtcclxuICAgICAgICAgICAgICAgICAgICB2LnN0eWxlLnRvcD1gJHtwYXJzZUludCh2LnN0eWxlLnRvcCkrdGhpcy5CTE9DS19TSVpFfXB4YFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJUb3ArKztcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQobG9vcC5iaW5kKHRoaXMpLDYwMCk7XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSBkb3duXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTAgO2k8PWFjaXZlTW9kZWwubGVuZ3RoLTE7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBhY2l2ZU1vZGVsW2ldLmNsYXNzTmFtZT0naW5hY3RpdmVNb2RlbCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbml0KCk7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZmFsbERvd24pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyksNjAwKVxyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiDmlbDmja7liJ3lp4vljJZcclxuICovXHJcbmNvbnN0IGluaXQgPSAoKT0+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgICBhcnI6IF9fYXJyX18sXHJcbiAgICAgICAgc2l0ZVNpemU6IF9fc2l0ZVNpemVfXyxcclxuICAgICAgICBCTE9DS19TSVpFOiBfX0JMT0NLX1NJWkVfXyxcclxuICAgICAgICBjdXJMZWZ0OiBfX2N1ckxlZnRfXyxcclxuICAgICAgICBjdXJUb3A6IF9fY3VyVG9wX19cclxuICAgIH07XHJcbiAgICBsZXQgYmxvY2sgPSBuZXcgQmxvY2socGFyYW1zKTtcclxuICAgIGJsb2NrLmluaXQoKTtcclxuICAgIGJsb2NrLm1vdmUoKTtcclxufTtcclxuLyoqXHJcbiAq5rWP6KeI5Zmo5Yid5aeL5YyWXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEVTNueureWktOWHveaVsFxyXG4gKiDlh73mlbDkvZPlhoXnmoR0aGlz5a+56LGh77yM5bCx5piv5a6a5LmJ5pe25omA5Zyo55qE5a+56LGh77yM6ICM5LiN5piv5L2/55So5pe25omA5Zyo55qE5a+56LGh44CCXHJcbiAqIHZhciBzdW0gPSAobnVtMSwgbnVtMikgPT4gbnVtMSArIG51bTI7XHJcbiAqIOetieWQjOS6jlxyXG4gKiB2YXIgc3VtID0gZnVuY3Rpb24obnVtMSwgbnVtMikge1xyXG4gKiByZXR1cm4gbnVtMSArIG51bTI7XHJcbiAqIH07XHJcbiAqL1xyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJ3aW5kb3cgb25sb2FkXCIpO1xyXG4gICAgbGV0IHNpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZScpO1xyXG4gICAgLy8gV2luZG93LmdldENvbXB1dGVkU3R5bGUoKSDmlrnms5XkvJrlnKjkuIDkuKrlhYPntKDlupTnlKjlrozmnInmlYjmoLflvI/kuJTorqHnrpflrozmiYDmnInlsZ7mgKfnmoTln7rmnKzlgLzkuYvlkI7nu5nlh7rmiYDmnIkgQ1NTIOWxnuaAp+eahOWAvOOAglxyXG4gICAgbGV0IHt3aWR0aCwgaGVpZ2h0LCBsZWZ0LCB0b3B9ID13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzaXRlKTtcclxuICAgIGxldCBzaXRlU2l6ZSA9IHtcclxuICAgICAgICB3aWR0aDogcGFyc2VJbnQod2lkdGgpLFxyXG4gICAgICAgIGhlaWdodDogcGFyc2VJbnQoaGVpZ2h0KSxcclxuICAgICAgICBsZWZ0OiBwYXJzZUludChsZWZ0KSxcclxuICAgICAgICB0b3A6IHBhcnNlSW50KHRvcClcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnIgPSBbWzEsIDBdLCBbMSwgMF0sIFsxLCAxXV07XHJcbiAgICBjb25zdCBCTE9DS19TSVpFID0gMjA7XHJcbiAgICBsZXQgY3VyTGVmdCA9IHBhcnNlSW50KChzaXRlU2l6ZS5sZWZ0ICsgc2l0ZVNpemUud2lkdGggLyAyKSAvIEJMT0NLX1NJWkUpO1xyXG4gICAgbGV0IGN1clRvcCA9IHBhcnNlSW50KHNpdGVTaXplLnRvcCAvIEJMT0NLX1NJWkUpO1xyXG4gICAgY29uc29sZS5sb2coXCJjdXJMZWZ0XCIsIGN1ckxlZnQpO1xyXG4gICAgY29uc29sZS5sb2coXCJjdXJUb3BcIiwgY3VyVG9wKTtcclxuICAgIHdpbmRvdy5fX2Fycl9fID0gYXJyO1xyXG4gICAgd2luZG93Ll9fc2l0ZVNpemVfXyA9IHNpdGVTaXplO1xyXG4gICAgd2luZG93Ll9fQkxPQ0tfU0laRV9fID0gQkxPQ0tfU0laRTtcclxuICAgIHdpbmRvdy5fX2N1ckxlZnRfXyA9IGN1ckxlZnQ7XHJcbiAgICB3aW5kb3cuX19jdXJUb3BfXyA9IGN1clRvcDtcclxuXHJcbiAgICBpbml0KCk7XHJcblxyXG5cclxufTtcclxuIl19
