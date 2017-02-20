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
         * 判断是否可以移动
         */

    }, {
        key: "canMove",
        value: function canMove(arr) {
            var deform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var activeModel = document.querySelectorAll('.activityModel'),
                tops = [],
                lefts = [],
                canMoveRight = true,
                canMoveTop = true,
                canMoveDown = true,
                canMoveLeft = true;
            this.checkArrWith1(arr, function (i, j) {
                tops.push(parseInt(i * this.BLOCK_SIZE));
                lefts.push(parseInt(j * this.BLOCK_SIZE));
            });
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
            var top = Math.min.apply(Math, tops),
                left = Math.min.apply(Math, lefts),
                right = Math.max.apply(Math, lefts),
                down = Math.max.apply(Math, tops);
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
            };
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
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = activeModel[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var v = _step.value;

                                    v.style.left = parseInt(v.style.left) - 20 + "px";
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
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = activeModel[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var _v = _step2.value;

                                    _v.style.left = parseInt(_v.style.left) + 20 + "px";
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

                            _this.curLeft++;
                        } else {
                            console.log("can`t move right");
                        }
                        break;
                    case 40:
                        canMoveDown = _this.canMove(_this.arr).canMoveDown;
                        if (canMoveDown) {
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = activeModel[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var _v2 = _step3.value;

                                    _v2.style.top = parseInt(_v2.style.top) + 20 + "px";
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
        }
    }]);

    return Block;
}();

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
    var params = {
        arr: arr,
        siteSize: siteSize,
        BLOCK_SIZE: BLOCK_SIZE,
        curLeft: curLeft,
        curTop: curTop
    };
    var block = new Block(params);
    block.init();
    block.move();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkJsb2NrIiwicGFyYW1zIiwic2l0ZVNpemUiLCJhcnIiLCJCTE9DS19TSVpFIiwiY3VyTGVmdCIsImN1clRvcCIsIm5ld0FyciIsImkiLCJsZW5ndGgiLCJ0ZW1BcnIiLCJqIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJsZWZ0cyIsInRvcHMiLCJjaGVja0FycldpdGgxIiwiY2FsbGJhY2siLCJjYWxsIiwiYWN0aXZlTW9kZWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJzdHlsZSIsInRvcCIsImxlZnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJkZWZvcm0iLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2FuTW92ZVJpZ2h0IiwiY2FuTW92ZVRvcCIsImNhbk1vdmVEb3duIiwiY2FuTW92ZUxlZnQiLCJwYXJzZUludCIsIk1hdGgiLCJtaW4iLCJyaWdodCIsIm1heCIsImRvd24iLCJ3aWR0aCIsImhlaWdodCIsIm9ua2V5ZG93biIsImUiLCJtb3ZlIiwia2V5Iiwia2V5Q29kZSIsImNhbk1vdmUiLCJ2IiwiY2xvY2t3aXNlIiwiZHJhdyIsIndpbmRvdyIsIm9ubG9hZCIsInNpdGUiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImJsb2NrIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFJQTs7OztBQUlBOzs7Ozs7Ozs7Ozs7O0lBYU1BLEs7QUFDRixtQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNoQjs7O0FBR0EsYUFBS0MsUUFBTCxHQUFnQkQsT0FBT0MsUUFBdkI7QUFDQSxhQUFLQyxHQUFMLEdBQVNGLE9BQU9FLEdBQWhCO0FBQ0EsYUFBS0MsVUFBTCxHQUFnQkgsT0FBT0csVUFBdkI7QUFDQSxhQUFLQyxPQUFMLEdBQWFKLE9BQU9JLE9BQXBCO0FBQ0EsYUFBS0MsTUFBTCxHQUFZTCxPQUFPSyxNQUFuQjtBQUNIOztBQUVEOzs7Ozs7O2tDQUdVSCxH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QTFDLENBQVo7QUFDQSxRQUFJRSxTQUFPNkIsU0FBU2pDLFNBQVN1QixHQUFULEdBQWFyQixVQUF0QixDQUFYO0FBQ0FTLFlBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXNCVCxPQUF0QjtBQUNBUSxZQUFRQyxHQUFSLENBQVksUUFBWixFQUFxQlIsTUFBckI7QUFDQSxRQUFNTCxTQUFPO0FBQ1RFLGFBQUlBLEdBREs7QUFFVEQsa0JBQVNBLFFBRkE7QUFHVEUsb0JBQVdBLFVBSEY7QUFJVEMsaUJBQVFBLE9BSkM7QUFLVEMsZ0JBQU9BO0FBTEUsS0FBYjtBQU9BLFFBQUltRCxRQUFRLElBQUl6RCxLQUFKLENBQVVDLE1BQVYsQ0FBWjtBQUNBd0QsVUFBTUMsSUFBTjtBQUNBRCxVQUFNWixJQUFOO0FBRUgsQ0E1QkQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBBZG1pbmlzdHJhdG9yIG9uIDIwMTcvMi8yMC5cclxuICovXHJcblxyXG4vKipcclxuICog5a6a5LmJ5pa55Z2XXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEVTNiBDbGFzc1xyXG4gKiBDbGFzc+S4jeWtmOWcqOWPmOmHj+aPkOWNh++8iGhvaXN077yJ77yM6L+Z5LiA54K55LiORVM15a6M5YWo5LiN5ZCM44CCXHJcbiAqIGNsYXNzIEJhciB7XHJcbiAqICAgY29uc3RydWN0b3IoKXt9IGNvbnN0cnVjdG9y5pa55rOV5piv57G755qE6buY6K6k5pa55rOVXHJcbiAqICAgZG9TdHVmZigpIHtcclxuICogICAgY29uc29sZS5sb2coJ3N0dWZmJyk7XHJcbiAqICAgfVxyXG4gKiB9XHJcbiAqIOS9v+eUqOeahOaXtuWAme+8jOS5n+aYr+ebtOaOpeWvueexu+S9v+eUqG5ld+WRveS7pO+8jOi3n+aehOmAoOWHveaVsOeahOeUqOazleWujOWFqOS4gOiHtOOAglxyXG4gKiB2YXIgYiA9IG5ldyBCYXIoKTtcclxuICogYi5kb1N0dWZmKCkgLy8gXCJzdHVmZlwiXHJcbiAqL1xyXG5jbGFzcyBCbG9jayB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlsIZuZXcgQmxvY2socGFyYW1zKSDlj4LmlbDkvKDov5t0aGlzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zaXRlU2l6ZSA9IHBhcmFtcy5zaXRlU2l6ZTtcclxuICAgICAgICB0aGlzLmFycj1wYXJhbXMuYXJyO1xyXG4gICAgICAgIHRoaXMuQkxPQ0tfU0laRT1wYXJhbXMuQkxPQ0tfU0laRTtcclxuICAgICAgICB0aGlzLmN1ckxlZnQ9cGFyYW1zLmN1ckxlZnQ7XHJcbiAgICAgICAgdGhpcy5jdXJUb3A9cGFyYW1zLmN1clRvcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaVsOe7hOefqemYtemhuuaXtumSiOaXi+i9rFxyXG4gICAgICovXHJcbiAgICBjbG9ja3dpc2UoYXJyKXtcclxuICAgICAgICBsZXQgbmV3QXJyPVtdO1xyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8PWFyci5sZW5ndGgtMTtpKyspe1xyXG4gICAgICAgICAgICBsZXQgdGVtQXJyPVtdO1xyXG4gICAgICAgICAgICBmb3IobGV0IGo9YXJyLmxlbmd0aC0xO2o+PTA7ai0tKXtcclxuICAgICAgICAgICAgICAgIHRlbUFyci5wdXNoKGFycltqXVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3QXJyLnB1c2godGVtQXJyKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhuZXdBcnIpXHJcbiAgICAgICAgbGV0IGxlZnRzPVtdO1xyXG4gICAgICAgIGxldCB0b3BzID1bXTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja0FycldpdGgxKG5ld0FycixmdW5jdGlvbiAoaSxqKSB7XHJcbiAgICAgICAgICAgIGxlZnRzLnB1c2goIGogKiB0aGlzLkJMT0NLX1NJWkUpO1xyXG4gICAgICAgICAgICB0b3BzLnB1c2goaSp0aGlzLkJMT0NLX1NJWkUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZXdBcnI6bmV3QXJyLFxyXG4gICAgICAgICAgICBsZWZ0czpsZWZ0cyxcclxuICAgICAgICAgICAgdG9wczp0b3BzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5LqM57u05pWw57uE5Li6MeeahOS4i+agh1xyXG4gICAgICovXHJcblxyXG4gICAgIGNoZWNrQXJyV2l0aDEoYXJyLGNhbGxiYWNrKXtcclxuICAgICAgICBmb3IobGV0IGk9MDtpPD1hcnIubGVuZ3RoLTE7aSsrKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJyW2ldKVxyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDtqPD1hcnIubGVuZ3RoLTE7aisrKXtcclxuICAgICAgICAgICAgICAgIGlmKGFycltpXVtqXT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpOlwiLGksXCIgajpcIixqKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsaSt0aGlzLmN1clRvcCxqK3RoaXMuY3VyTGVmdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7mlbDnu4Tnn6npmLXnlLvlh7rlvZPliY3mlrnlnZdcclxuICAgICAqL1xyXG4gICAgZHJhdyhpLGope1xyXG4gICAgICAgIGxldCBhY3RpdmVNb2RlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGFjdGl2ZU1vZGVsLmNsYXNzTmFtZSA9ICdhY3Rpdml0eU1vZGVsJztcclxuICAgICAgICBhY3RpdmVNb2RlbC5zdHlsZS50b3A9YCR7aSp0aGlzLkJMT0NLX1NJWkV9cHhgO1xyXG4gICAgICAgIGFjdGl2ZU1vZGVsLnN0eWxlLmxlZnQ9YCR7aip0aGlzLkJMT0NLX1NJWkV9cHhgO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYWN0aXZlTW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Y+v5Lul56e75YqoXHJcbiAgICAgKi9cclxuICAgIGNhbk1vdmUoYXJyLGRlZm9ybT1mYWxzZSkge1xyXG4gICAgICAgIGxldCBhY3RpdmVNb2RlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpdml0eU1vZGVsJyksXHJcbiAgICAgICAgICAgIHRvcHMgPSBbXSxcclxuICAgICAgICAgICAgbGVmdHMgPSBbXSxcclxuICAgICAgICAgICAgY2FuTW92ZVJpZ2h0ID0gdHJ1ZSxcclxuICAgICAgICAgICAgY2FuTW92ZVRvcCA9IHRydWUsXHJcbiAgICAgICAgICAgIGNhbk1vdmVEb3duID0gdHJ1ZSxcclxuICAgICAgICAgICAgY2FuTW92ZUxlZnQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrQXJyV2l0aDEoYXJyLGZ1bmN0aW9uIChpLGopIHtcclxuICAgICAgICAgICAgdG9wcy5wdXNoKHBhcnNlSW50KGkgKiB0aGlzLkJMT0NLX1NJWkUpKTtcclxuICAgICAgICAgICAgbGVmdHMucHVzaChwYXJzZUludChqICogdGhpcy5CTE9DS19TSVpFKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9BcnJheS5mcm9t5pa55rOV55So5LqO5bCG57G75pWw57uE6L2s5Li655yf5q2j55qE5pWw57uEXHJcbiAgICAgICAgLy9mb3IuLi5vZjogZm9yLi4uaW7lvqrnjq/or7vlj5bplK7lkI3vvIxmb3IuLi5vZuW+queOr+ivu+WPlumUruWAvFxyXG4gICAgICAgIC8vIGZvcihsZXQgdiBvZiBBcnJheS5mcm9tKGFjdGl2ZU1vZGVsKSl7XHJcbiAgICAgICAgLy8gICAgIHRvcHMucHVzaChwYXJzZUludCh2LnN0eWxlLnRvcCkpO1xyXG4gICAgICAgIC8vICAgICBsZWZ0cy5wdXNoKHBhcnNlSW50KHYuc3R5bGUubGVmdCkpXHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvL21pbigpIOaWueazleWPr+i/lOWbnuaMh+WumueahOaVsOWtl+S4reW4puacieacgOS9juWAvOeahOaVsOWtl+OAguWPguaVsOS4uueUqOmAl+WPt+WIhumalOeahOWPguaVsOW6j+WIl++8jOS4jeaYr+aVsOe7hFxyXG4gICAgICAgIC8vbWF4KCkg5pa55rOV5Y+v6L+U5Zue5oyH5a6a55qE5pWw5a2X5Lit5bim5pyJ5pyA5aSn5YC855qE5pWw5a2X44CCXHJcbiAgICAgICAgLy8uLi4g5omp5bGV6L+Q566X56ym77ya5bCG5pWw57uE6L2s5Li655So6YCX5Y+35YiG6ZqU55qE5Y+C5pWw5bqP5YiXXHJcbiAgICAgICAgLy8uLi4gcmVzZXTov5DnrpfnrKbvvJrlhbblip/og73kuI7mianlsZXov5DnrpfnrKbmgbDlpb3nm7jlj43vvIzmiorpgJflj7fpmpTlvIDnmoTlgLzluo/liJfnu4TlkIjmiJDkuIDkuKrmlbDnu4RcclxuICAgICAgICBsZXQgdG9wPU1hdGgubWluKC4uLnRvcHMpLFxyXG4gICAgICAgICAgICBsZWZ0PU1hdGgubWluKC4uLmxlZnRzKSxcclxuICAgICAgICAgICAgcmlnaHQ9TWF0aC5tYXgoLi4ubGVmdHMpLFxyXG4gICAgICAgICAgICBkb3duPU1hdGgubWF4KC4uLnRvcHMpO1xyXG4gICAgICAgIGlmKGRlZm9ybSl7XHJcbiAgICAgICAgICAgIGlmKHJpZ2h0KzIwPj0gdGhpcy5zaXRlU2l6ZS5sZWZ0K3RoaXMuc2l0ZVNpemUud2lkdGgpe1xyXG4gICAgICAgICAgICAgICAgY2FuTW92ZVJpZ2h0PWZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHJpZ2h0KzIwPj0gdGhpcy5zaXRlU2l6ZS5sZWZ0K3RoaXMuc2l0ZVNpemUud2lkdGgpe1xyXG4gICAgICAgICAgICAgICAgY2FuTW92ZVJpZ2h0PWZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihsZWZ0LTIwPHRoaXMuc2l0ZVNpemUubGVmdCl7XHJcbiAgICAgICAgICAgIGNhbk1vdmVMZWZ0PWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkb3duKzIwPj10aGlzLnNpdGVTaXplLnRvcCt0aGlzLnNpdGVTaXplLmhlaWdodCl7XHJcbiAgICAgICAgICAgIGNhbk1vdmVEb3duPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0b3AtMjA8dGhpcy5zaXRlU2l6ZS50b3Ape1xyXG4gICAgICAgICAgICBjYW5Nb3ZlVG9wPWZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICBjYW5Nb3ZlUmlnaHQ6Y2FuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICBjYW5Nb3ZlTGVmdDpjYW5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgY2FuTW92ZVRvcDpjYW5Nb3ZlVG9wLFxyXG4gICAgICAgICAgICBjYW5Nb3ZlRG93bjpjYW5Nb3ZlRG93blxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUruebmOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBtb3ZlKCkge1xyXG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IChlKT0+IHtcclxuICAgICAgICAgICAgbGV0IGFjdGl2ZU1vZGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2aXR5TW9kZWwnKSxcclxuICAgICAgICAgICAgICAgIG1vdmUsXHJcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgIGNhbk1vdmVUb3AsXHJcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlRG93bjtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gZS5rZXlDb2RlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImtleVwiLCBrZXkpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICAgICAgLy9sZWZ0XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM3OlxyXG4gICAgICAgICAgICAgICAgICAgIGNhbk1vdmVMZWZ0PXRoaXMuY2FuTW92ZSh0aGlzLmFycikuY2FuTW92ZUxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2FuTW92ZUxlZnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHYgb2YgYWN0aXZlTW9kZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS5sZWZ0ID0gYCR7cGFyc2VJbnQodi5zdHlsZS5sZWZ0KSAtIDIwfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ckxlZnQtLTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSBsZWZ0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vdXBcclxuICAgICAgICAgICAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHtuZXdBcnIgLGxlZnRzLHRvcHN9PXRoaXMuY2xvY2t3aXNlKHRoaXMuYXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlPXRoaXMuY2FuTW92ZShuZXdBcnIsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuTW92ZURvd249bW92ZS5jYW5Nb3ZlRG93bjtcclxuICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlUmlnaHQ9bW92ZS5jYW5Nb3ZlUmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2FuTW92ZVJpZ2h0ICYmIGNhbk1vdmVSaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyPW5ld0FycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpIGluIGxlZnRzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1vZGVsW2ldLnN0eWxlLmxlZnQ9YCR7bGVmdHNbaV19cHhgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTW9kZWxbaV0uc3R5bGUudG9wPWAke3RvcHNbaV19cHhgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvL3JpZ2h0XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM5OlxyXG4gICAgICAgICAgICAgICAgICAgIGNhbk1vdmVSaWdodD10aGlzLmNhbk1vdmUodGhpcy5hcnIpLmNhbk1vdmVSaWdodDtcclxuICAgICAgICAgICAgICAgICAgICBpZihjYW5Nb3ZlUmlnaHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHYgb2YgYWN0aXZlTW9kZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS5sZWZ0ID0gYCR7cGFyc2VJbnQodi5zdHlsZS5sZWZ0KSArIDIwfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ckxlZnQrK1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbmB0IG1vdmUgcmlnaHRcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhbk1vdmVEb3duPXRoaXMuY2FuTW92ZSh0aGlzLmFycikuY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2FuTW92ZURvd24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHYgb2YgYWN0aXZlTW9kZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS50b3AgPSBgJHtwYXJzZUludCh2LnN0eWxlLnRvcCkgKyAyMH1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJUb3ArKztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW5gdCBtb3ZlIGRvd25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuivt+mAieaLqeS4iuS4i+W3puWPs+aMiemUrlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluaWueWdlyovXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuY2hlY2tBcnJXaXRoMSh0aGlzLmFycix0aGlzLmRyYXcpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKua1j+iniOWZqOWIneWni+WMllxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBFUzbnrq3lpLTlh73mlbBcclxuICog5Ye95pWw5L2T5YaF55qEdGhpc+Wvueixoe+8jOWwseaYr+WumuS5ieaXtuaJgOWcqOeahOWvueixoe+8jOiAjOS4jeaYr+S9v+eUqOaXtuaJgOWcqOeahOWvueixoeOAglxyXG4gKiB2YXIgc3VtID0gKG51bTEsIG51bTIpID0+IG51bTEgKyBudW0yO1xyXG4gKiDnrYnlkIzkuo5cclxuICogdmFyIHN1bSA9IGZ1bmN0aW9uKG51bTEsIG51bTIpIHtcclxuICogcmV0dXJuIG51bTEgKyBudW0yO1xyXG4gKiB9O1xyXG4gKi9cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwid2luZG93IG9ubG9hZFwiKTtcclxuICAgIGxldCBzaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUnKTtcclxuICAgIC8vIFdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCkg5pa55rOV5Lya5Zyo5LiA5Liq5YWD57Sg5bqU55So5a6M5pyJ5pWI5qC35byP5LiU6K6h566X5a6M5omA5pyJ5bGe5oCn55qE5Z+65pys5YC85LmL5ZCO57uZ5Ye65omA5pyJIENTUyDlsZ7mgKfnmoTlgLzjgIJcclxuICAgIGxldCB7d2lkdGgsIGhlaWdodCwgbGVmdCwgdG9wfSA9d2luZG93LmdldENvbXB1dGVkU3R5bGUoc2l0ZSk7XHJcbiAgICBsZXQgc2l0ZVNpemUgPSB7XHJcbiAgICAgICAgd2lkdGg6IHBhcnNlSW50KHdpZHRoKSxcclxuICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KGhlaWdodCksXHJcbiAgICAgICAgbGVmdDogcGFyc2VJbnQobGVmdCksXHJcbiAgICAgICAgdG9wOiBwYXJzZUludCh0b3ApXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyPVtbMSwwXSxbMSwwXSxbMSwxXV07XHJcbiAgICBjb25zdCBCTE9DS19TSVpFPTIwO1xyXG4gICAgbGV0IGN1ckxlZnQ9cGFyc2VJbnQoKHNpdGVTaXplLmxlZnQrc2l0ZVNpemUud2lkdGgvMikvQkxPQ0tfU0laRSk7XHJcbiAgICBsZXQgY3VyVG9wPXBhcnNlSW50KHNpdGVTaXplLnRvcC9CTE9DS19TSVpFKTtcclxuICAgIGNvbnNvbGUubG9nKFwiY3VyTGVmdFwiLGN1ckxlZnQpO1xyXG4gICAgY29uc29sZS5sb2coXCJjdXJUb3BcIixjdXJUb3ApO1xyXG4gICAgY29uc3QgcGFyYW1zPXtcclxuICAgICAgICBhcnI6YXJyLFxyXG4gICAgICAgIHNpdGVTaXplOnNpdGVTaXplLFxyXG4gICAgICAgIEJMT0NLX1NJWkU6QkxPQ0tfU0laRSxcclxuICAgICAgICBjdXJMZWZ0OmN1ckxlZnQsXHJcbiAgICAgICAgY3VyVG9wOmN1clRvcFxyXG4gICAgfTtcclxuICAgIGxldCBibG9jayA9IG5ldyBCbG9jayhwYXJhbXMpO1xyXG4gICAgYmxvY2suaW5pdCgpO1xyXG4gICAgYmxvY2subW92ZSgpO1xyXG5cclxufTtcclxuIl19
