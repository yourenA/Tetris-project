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
    }

    /**
     * 判断二维数组为1的下标
     */

    _createClass(Block, [{
        key: "checkArrWith1",
        value: function checkArrWith1(arr, callback) {
            for (var i = 0; i <= arr.length - 1; i++) {
                console.log(arr[i]);
                for (var j = 0; j <= arr.length - 1; j++) {
                    if (arr[i][j] == 1) {
                        console.log("i:", i, " j:", j);
                        callback.call(this, i, j);
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
            activeModel.style.top = this.siteSize.top + i * this.BLOCK_SIZE + "px";
            activeModel.style.left = this.siteSize.left + this.siteSize.width / 2 + j * this.BLOCK_SIZE + "px";
            document.body.appendChild(activeModel);
        }

        /**
         * 判断是否可以移动
         */

    }, {
        key: "canMove",
        value: function canMove() {
            var activeModel = document.querySelectorAll('.activityModel'),
                tops = [],
                lefts = [],
                canMoveRight = true,
                canMoveTop = true,
                canMoveDown = true,
                canMoveLeft = true;

            //Array.from方法用于将类数组转为真正的数组
            //for...of: for...in循环读取键名，for...of循环读取键值
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Array.from(activeModel)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var v = _step.value;

                    tops.push(parseInt(v.style.top));
                    lefts.push(parseInt(v.style.left));
                }

                //min() 方法可返回指定的数字中带有最低值的数字。参数为用逗号分隔的参数序列，不是数组
                //max() 方法可返回指定的数字中带有最大值的数字。
                //... 扩展运算符：将数组转为用逗号分隔的参数序列
                //... reset运算符：其功能与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组
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

            var top = Math.min.apply(Math, tops),
                left = Math.min.apply(Math, lefts),
                right = Math.max.apply(Math, lefts),
                down = Math.max.apply(Math, tops);
            if (right + 20 >= this.siteSize.left + this.siteSize.width) {
                canMoveRight = false;
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
                    canMoveRight = void 0,
                    canMoveLeft = void 0,
                    canMoveTop = void 0,
                    canMoveDown = void 0;
                var key = e.keyCode;
                console.log("key", key);
                switch (key) {
                    //left
                    case 37:
                        canMoveLeft = _this.canMove().canMoveLeft;
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
                        } else {
                            console.log("can`t move left");
                        }

                        break;
                    //up
                    case 38:
                        canMoveTop = _this.canMove().canMoveTop;
                        if (canMoveTop) {
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = activeModel[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var _v = _step3.value;

                                    _v.style.top = parseInt(_v.style.top) - 20 + "px";
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
                        } else {
                            console.log("can`t move top");
                        }
                        break;
                    //right
                    case 39:
                        canMoveRight = _this.canMove().canMoveRight;
                        if (canMoveRight) {
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = activeModel[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var _v2 = _step4.value;

                                    _v2.style.left = parseInt(_v2.style.left) + 20 + "px";
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
                        } else {
                            console.log("can`t move right");
                        }
                        break;
                    case 40:
                        canMoveDown = _this.canMove().canMoveDown;
                        if (canMoveDown) {
                            var _iteratorNormalCompletion5 = true;
                            var _didIteratorError5 = false;
                            var _iteratorError5 = undefined;

                            try {
                                for (var _iterator5 = activeModel[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    var _v3 = _step5.value;

                                    _v3.style.top = parseInt(_v3.style.top) + 20 + "px";
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
    var params = {
        arr: arr,
        siteSize: siteSize,
        BLOCK_SIZE: BLOCK_SIZE
    };
    var block = new Block(params);
    block.init();
    block.move();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkJsb2NrIiwicGFyYW1zIiwic2l0ZVNpemUiLCJhcnIiLCJCTE9DS19TSVpFIiwiY2FsbGJhY2siLCJpIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImoiLCJjYWxsIiwiYWN0aXZlTW9kZWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJzdHlsZSIsInRvcCIsImxlZnQiLCJ3aWR0aCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0b3BzIiwibGVmdHMiLCJjYW5Nb3ZlUmlnaHQiLCJjYW5Nb3ZlVG9wIiwiY2FuTW92ZURvd24iLCJjYW5Nb3ZlTGVmdCIsIkFycmF5IiwiZnJvbSIsInYiLCJwdXNoIiwicGFyc2VJbnQiLCJNYXRoIiwibWluIiwicmlnaHQiLCJtYXgiLCJkb3duIiwiaGVpZ2h0Iiwib25rZXlkb3duIiwiZSIsImtleSIsImtleUNvZGUiLCJjYW5Nb3ZlIiwiY2hlY2tBcnJXaXRoMSIsImRyYXciLCJ3aW5kb3ciLCJvbmxvYWQiLCJzaXRlIiwicXVlcnlTZWxlY3RvciIsImdldENvbXB1dGVkU3R5bGUiLCJibG9jayIsImluaXQiLCJtb3ZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUlBOzs7O0FBSUE7Ozs7Ozs7Ozs7Ozs7SUFhTUEsSztBQUNGLG1CQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2hCOzs7QUFHQSxhQUFLQyxRQUFMLEdBQWdCRCxPQUFPQyxRQUF2QjtBQUNBLGFBQUtDLEdBQUwsR0FBU0YsT0FBT0UsR0FBaEI7QUFDQSxhQUFLQyxVQUFMLEdBQWdCSCxPQUFPRyxVQUF2QjtBQUNIOztBQUVEOzs7Ozs7c0NBSWVELEcsRUFBSUUsUSxFQUFTO0FBQ3hCLGlCQUFJLElBQUlDLElBQUUsQ0FBVixFQUFZQSxLQUFHSCxJQUFJSSxNQUFKLEdBQVcsQ0FBMUIsRUFBNEJELEdBQTVCLEVBQWdDO0FBQzVCRSx3QkFBUUMsR0FB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Ozs7K0JBRU87QUFDSCxpQkFBS29DLGFBQUwsQ0FBbUIsS0FBSzFDLEdBQXhCLEVBQTRCLEtBQUsyQyxJQUFqQztBQUNIOzs7Ozs7QUFHTDs7OztBQUlBOzs7Ozs7Ozs7OztBQVNBQyxPQUFPQyxNQUFQLEdBQWdCLFlBQU07QUFDbEJ4QyxZQUFRQyxHQUFSLENBQVksZUFBWjtBQUNBLFFBQUl3QyxPQUFPcEMsU0FBU3FDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWDtBQUNBOztBQUhrQixnQ0FJY0gsT0FBT0ksZ0JBQVAsQ0FBd0JGLElBQXhCLENBSmQ7QUFBQSxRQUliOUIsS0FKYSx5QkFJYkEsS0FKYTtBQUFBLFFBSU5vQixNQUpNLHlCQUlOQSxNQUpNO0FBQUEsUUFJRXJCLElBSkYseUJBSUVBLElBSkY7QUFBQSxRQUlRRCxHQUpSLHlCQUlRQSxHQUpSOztBQUtsQixRQUFJZixXQUFXO0FBQ1hpQixlQUFPYyxTQUFTZCxLQUFULENBREk7QUFFWG9CLGdCQUFRTixTQUFTTSxNQUFULENBRkc7QUFHWHJCLGNBQU1lLFNBQVNmLElBQVQsQ0FISztBQUlYRCxhQUFLZ0IsU0FBU2hCLEdBQVQ7QUFKTSxLQUFmO0FBTUEsUUFBTWQsTUFBSSxDQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBRCxFQUFPLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBUCxFQUFhLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBYixDQUFWO0FBQ0EsUUFBTUMsYUFBVyxFQUFqQjtBQUNBLFFBQU1ILFNBQU87QUFDVEUsYUFBSUEsR0FESztBQUVURCxrQkFBU0EsUUFGQTtBQUdURSxvQkFBV0E7QUFIRixLQUFiO0FBS0EsUUFBSWdELFFBQVEsSUFBSXBELEtBQUosQ0FBVUMsTUFBVixDQUFaO0FBQ0FtRCxVQUFNQyxJQUFOO0FBQ0FELFVBQU1FLElBQU47QUFFSCxDQXRCRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFkbWluaXN0cmF0b3Igb24gMjAxNy8yLzIwLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiDlrprkuYnmlrnlnZdcclxuICovXHJcblxyXG4vKipcclxuICogRVM2IENsYXNzXHJcbiAqIENsYXNz5LiN5a2Y5Zyo5Y+Y6YeP5o+Q5Y2H77yIaG9pc3TvvInvvIzov5nkuIDngrnkuI5FUzXlrozlhajkuI3lkIzjgIJcclxuICogY2xhc3MgQmFyIHtcclxuICogICBjb25zdHJ1Y3Rvcigpe30gY29uc3RydWN0b3Lmlrnms5XmmK/nsbvnmoTpu5jorqTmlrnms5VcclxuICogICBkb1N0dWZmKCkge1xyXG4gKiAgICBjb25zb2xlLmxvZygnc3R1ZmYnKTtcclxuICogICB9XHJcbiAqIH1cclxuICog5L2/55So55qE5pe25YCZ77yM5Lmf5piv55u05o6l5a+557G75L2/55SobmV35ZG95Luk77yM6Lef5p6E6YCg5Ye95pWw55qE55So5rOV5a6M5YWo5LiA6Ie044CCXHJcbiAqIHZhciBiID0gbmV3IEJhcigpO1xyXG4gKiBiLmRvU3R1ZmYoKSAvLyBcInN0dWZmXCJcclxuICovXHJcbmNsYXNzIEJsb2NrIHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWwhm5ldyBCbG9jayhwYXJhbXMpIOWPguaVsOS8oOi/m3RoaXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNpdGVTaXplID0gcGFyYW1zLnNpdGVTaXplO1xyXG4gICAgICAgIHRoaXMuYXJyPXBhcmFtcy5hcnI7XHJcbiAgICAgICAgdGhpcy5CTE9DS19TSVpFPXBhcmFtcy5CTE9DS19TSVpFXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3kuoznu7TmlbDnu4TkuLox55qE5LiL5qCHXHJcbiAgICAgKi9cclxuXHJcbiAgICAgY2hlY2tBcnJXaXRoMShhcnIsY2FsbGJhY2spe1xyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8PWFyci5sZW5ndGgtMTtpKyspe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcnJbaV0pXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8PWFyci5sZW5ndGgtMTtqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoYXJyW2ldW2pdPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImk6XCIsaSxcIiBqOlwiLGopXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLGksailcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7mlbDnu4Tnn6npmLXnlLvlh7rlvZPliY3mlrnlnZdcclxuICAgICAqL1xyXG4gICAgZHJhdyhpLGope1xyXG4gICAgICAgIGxldCBhY3RpdmVNb2RlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGFjdGl2ZU1vZGVsLmNsYXNzTmFtZSA9ICdhY3Rpdml0eU1vZGVsJztcclxuICAgICAgICBhY3RpdmVNb2RlbC5zdHlsZS50b3A9YCR7dGhpcy5zaXRlU2l6ZS50b3AraSp0aGlzLkJMT0NLX1NJWkV9cHhgO1xyXG4gICAgICAgIGFjdGl2ZU1vZGVsLnN0eWxlLmxlZnQ9YCR7dGhpcy5zaXRlU2l6ZS5sZWZ0K3RoaXMuc2l0ZVNpemUud2lkdGgvMitqKnRoaXMuQkxPQ0tfU0laRX1weGA7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhY3RpdmVNb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKblj6/ku6Xnp7vliqhcclxuICAgICAqL1xyXG4gICAgY2FuTW92ZSgpIHtcclxuICAgICAgICBsZXQgYWN0aXZlTW9kZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZpdHlNb2RlbCcpLFxyXG4gICAgICAgICAgICB0b3BzID0gW10sXHJcbiAgICAgICAgICAgIGxlZnRzID0gW10sXHJcbiAgICAgICAgICAgIGNhbk1vdmVSaWdodCA9IHRydWUsXHJcbiAgICAgICAgICAgIGNhbk1vdmVUb3AgPSB0cnVlLFxyXG4gICAgICAgICAgICBjYW5Nb3ZlRG93biA9IHRydWUsXHJcbiAgICAgICAgICAgIGNhbk1vdmVMZWZ0PXRydWU7XHJcblxyXG4gICAgICAgIC8vQXJyYXkuZnJvbeaWueazleeUqOS6juWwhuexu+aVsOe7hOi9rOS4uuecn+ato+eahOaVsOe7hFxyXG4gICAgICAgIC8vZm9yLi4ub2Y6IGZvci4uLmlu5b6q546v6K+75Y+W6ZSu5ZCN77yMZm9yLi4ub2blvqrnjq/or7vlj5bplK7lgLxcclxuICAgICAgICBmb3IobGV0IHYgb2YgQXJyYXkuZnJvbShhY3RpdmVNb2RlbCkpe1xyXG4gICAgICAgICAgICB0b3BzLnB1c2gocGFyc2VJbnQodi5zdHlsZS50b3ApKTtcclxuICAgICAgICAgICAgbGVmdHMucHVzaChwYXJzZUludCh2LnN0eWxlLmxlZnQpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9taW4oKSDmlrnms5Xlj6/ov5Tlm57mjIflrprnmoTmlbDlrZfkuK3luKbmnInmnIDkvY7lgLznmoTmlbDlrZfjgILlj4LmlbDkuLrnlKjpgJflj7fliIbpmpTnmoTlj4LmlbDluo/liJfvvIzkuI3mmK/mlbDnu4RcclxuICAgICAgICAvL21heCgpIOaWueazleWPr+i/lOWbnuaMh+WumueahOaVsOWtl+S4reW4puacieacgOWkp+WAvOeahOaVsOWtl+OAglxyXG4gICAgICAgIC8vLi4uIOaJqeWxlei/kOeul+espu+8muWwhuaVsOe7hOi9rOS4uueUqOmAl+WPt+WIhumalOeahOWPguaVsOW6j+WIl1xyXG4gICAgICAgIC8vLi4uIHJlc2V06L+Q566X56ym77ya5YW25Yqf6IO95LiO5omp5bGV6L+Q566X56ym5oGw5aW955u45Y+N77yM5oqK6YCX5Y+36ZqU5byA55qE5YC85bqP5YiX57uE5ZCI5oiQ5LiA5Liq5pWw57uEXHJcbiAgICAgICAgbGV0IHRvcD1NYXRoLm1pbiguLi50b3BzKSxcclxuICAgICAgICAgICAgbGVmdD1NYXRoLm1pbiguLi5sZWZ0cyksXHJcbiAgICAgICAgICAgIHJpZ2h0PU1hdGgubWF4KC4uLmxlZnRzKSxcclxuICAgICAgICAgICAgZG93bj1NYXRoLm1heCguLi50b3BzKTtcclxuICAgICAgICBpZihyaWdodCsyMD49IHRoaXMuc2l0ZVNpemUubGVmdCt0aGlzLnNpdGVTaXplLndpZHRoKXtcclxuICAgICAgICAgICAgY2FuTW92ZVJpZ2h0PWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihsZWZ0LTIwPHRoaXMuc2l0ZVNpemUubGVmdCl7XHJcbiAgICAgICAgICAgIGNhbk1vdmVMZWZ0PWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkb3duKzIwPj10aGlzLnNpdGVTaXplLnRvcCt0aGlzLnNpdGVTaXplLmhlaWdodCl7XHJcbiAgICAgICAgICAgIGNhbk1vdmVEb3duPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0b3AtMjA8dGhpcy5zaXRlU2l6ZS50b3Ape1xyXG4gICAgICAgICAgICBjYW5Nb3ZlVG9wPWZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICBjYW5Nb3ZlUmlnaHQ6Y2FuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICBjYW5Nb3ZlTGVmdDpjYW5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgY2FuTW92ZVRvcDpjYW5Nb3ZlVG9wLFxyXG4gICAgICAgICAgICBjYW5Nb3ZlRG93bjpjYW5Nb3ZlRG93blxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUruebmOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBtb3ZlKCkge1xyXG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IChlKT0+IHtcclxuICAgICAgICAgICAgbGV0IGFjdGl2ZU1vZGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2aXR5TW9kZWwnKSxcclxuICAgICAgICAgICAgICAgIGNhbk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgIGNhbk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZVRvcCxcclxuICAgICAgICAgICAgICAgIGNhbk1vdmVEb3duO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBlLmtleUNvZGU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwia2V5XCIsIGtleSk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAvL2xlZnRcclxuICAgICAgICAgICAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuTW92ZUxlZnQ9dGhpcy5jYW5Nb3ZlKCkuY2FuTW92ZUxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2FuTW92ZUxlZnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHYgb2YgYWN0aXZlTW9kZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS5sZWZ0ID0gYCR7cGFyc2VJbnQodi5zdHlsZS5sZWZ0KSAtIDIwfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW5gdCBtb3ZlIGxlZnRcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy91cFxyXG4gICAgICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlVG9wPXRoaXMuY2FuTW92ZSgpLmNhbk1vdmVUb3A7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2FuTW92ZVRvcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdiBvZiBhY3RpdmVNb2RlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LnN0eWxlLnRvcCA9IGAke3BhcnNlSW50KHYuc3R5bGUudG9wKSAtIDIwfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbmB0IG1vdmUgdG9wXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy9yaWdodFxyXG4gICAgICAgICAgICAgICAgY2FzZSAzOTpcclxuICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlUmlnaHQ9dGhpcy5jYW5Nb3ZlKCkuY2FuTW92ZVJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNhbk1vdmVSaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdiBvZiBhY3RpdmVNb2RlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LnN0eWxlLmxlZnQgPSBgJHtwYXJzZUludCh2LnN0eWxlLmxlZnQpICsgMjB9cHhgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSByaWdodFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDA6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuTW92ZURvd249dGhpcy5jYW5Nb3ZlKCkuY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2FuTW92ZURvd24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHYgb2YgYWN0aXZlTW9kZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS50b3AgPSBgJHtwYXJzZUludCh2LnN0eWxlLnRvcCkgKyAyMH1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW5gdCBtb3ZlIGRvd25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuivt+mAieaLqeS4iuS4i+W3puWPs+aMiemUrlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluaWueWdlyovXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuY2hlY2tBcnJXaXRoMSh0aGlzLmFycix0aGlzLmRyYXcpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKua1j+iniOWZqOWIneWni+WMllxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBFUzbnrq3lpLTlh73mlbBcclxuICog5Ye95pWw5L2T5YaF55qEdGhpc+Wvueixoe+8jOWwseaYr+WumuS5ieaXtuaJgOWcqOeahOWvueixoe+8jOiAjOS4jeaYr+S9v+eUqOaXtuaJgOWcqOeahOWvueixoeOAglxyXG4gKiB2YXIgc3VtID0gKG51bTEsIG51bTIpID0+IG51bTEgKyBudW0yO1xyXG4gKiDnrYnlkIzkuo5cclxuICogdmFyIHN1bSA9IGZ1bmN0aW9uKG51bTEsIG51bTIpIHtcclxuICogcmV0dXJuIG51bTEgKyBudW0yO1xyXG4gKiB9O1xyXG4gKi9cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwid2luZG93IG9ubG9hZFwiKTtcclxuICAgIGxldCBzaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUnKTtcclxuICAgIC8vIFdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCkg5pa55rOV5Lya5Zyo5LiA5Liq5YWD57Sg5bqU55So5a6M5pyJ5pWI5qC35byP5LiU6K6h566X5a6M5omA5pyJ5bGe5oCn55qE5Z+65pys5YC85LmL5ZCO57uZ5Ye65omA5pyJIENTUyDlsZ7mgKfnmoTlgLzjgIJcclxuICAgIGxldCB7d2lkdGgsIGhlaWdodCwgbGVmdCwgdG9wfSA9d2luZG93LmdldENvbXB1dGVkU3R5bGUoc2l0ZSk7XHJcbiAgICBsZXQgc2l0ZVNpemUgPSB7XHJcbiAgICAgICAgd2lkdGg6IHBhcnNlSW50KHdpZHRoKSxcclxuICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KGhlaWdodCksXHJcbiAgICAgICAgbGVmdDogcGFyc2VJbnQobGVmdCksXHJcbiAgICAgICAgdG9wOiBwYXJzZUludCh0b3ApXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyPVtbMSwwXSxbMSwwXSxbMSwxXV07XHJcbiAgICBjb25zdCBCTE9DS19TSVpFPTIwO1xyXG4gICAgY29uc3QgcGFyYW1zPXtcclxuICAgICAgICBhcnI6YXJyLFxyXG4gICAgICAgIHNpdGVTaXplOnNpdGVTaXplLFxyXG4gICAgICAgIEJMT0NLX1NJWkU6QkxPQ0tfU0laRVxyXG4gICAgfVxyXG4gICAgbGV0IGJsb2NrID0gbmV3IEJsb2NrKHBhcmFtcyk7XHJcbiAgICBibG9jay5pbml0KCk7XHJcbiAgICBibG9jay5tb3ZlKCk7XHJcblxyXG59O1xyXG4iXX0=
