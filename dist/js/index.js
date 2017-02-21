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

                                    v.style.left = parseInt(v.style.left) - 20 + 'px';
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

                                    _v.style.left = parseInt(_v.style.left) + 20 + 'px';
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

                                    _v2.style.top = parseInt(_v2.style.top) + 20 + 'px';
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkJsb2NrIiwicGFyYW1zIiwic2l0ZVNpemUiLCJhcnIiLCJCTE9DS19TSVpFIiwiY3VyTGVmdCIsImN1clRvcCIsIm5ld0FyciIsImkiLCJsZW5ndGgiLCJ0ZW1BcnIiLCJqIiwicHVzaCIsImxlZnRzIiwidG9wcyIsImNoZWNrQXJyV2l0aDEiLCJjYWxsYmFjayIsImNhbGwiLCJhY3RpdmVNb2RlbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInN0eWxlIiwidG9wIiwibGVmdCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImluYWN0aXZlTW9kZWwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGlnaGVzdCIsImxlZnRtb3N0IiwicmlnaHRtb3N0IiwiaGVpZ2h0Iiwid2lkdGgiLCJyaWdodHMiLCJ2IiwicGFyc2VJbnQiLCJNYXRoIiwibWluIiwibWF4IiwicmVzIiwiaW5hY3RpdmVNb2RlbHMiLCJzb3J0IiwiYSIsImIiLCJjb3VudCIsIm1vZGVscyIsImRlZm9ybSIsIm1vdmUiLCJjYW5Nb3ZlUmlnaHQiLCJjYW5Nb3ZlRG93biIsImNhbk1vdmVMZWZ0IiwiZ2V0SW50ZXJ2YWwiLCJvbmtleWRvd24iLCJlIiwiY2FuTW92ZVRvcCIsImtleSIsImtleUNvZGUiLCJjYW5Nb3ZlIiwiY29uc29sZSIsImxvZyIsImNsb2Nrd2lzZSIsImRyYXciLCJhY2l2ZU1vZGVsIiwiZmFsbERvd24iLCJzZXRUaW1lb3V0IiwibG9vcCIsImJpbmQiLCJlbGltaW5hdGUiLCJyZW1vdmVDaGlsZCIsImluaXQiLCJjbGVhclRpbWVvdXQiLCJfX2Fycl9fIiwiX19zaXRlU2l6ZV9fIiwiX19CTE9DS19TSVpFX18iLCJfX2N1ckxlZnRfXyIsIl9fY3VyVG9wX18iLCJibG9jayIsIndpbmRvdyIsIm9ubG9hZCIsInNpdGUiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0Q29tcHV0ZWRTdHlsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUlBOzs7O0FBSUE7Ozs7Ozs7Ozs7Ozs7SUFhTUEsSztBQUNGLG1CQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2hCOzs7QUFHQSxhQUFLQyxRQUFMLEdBQWdCRCxPQUFPQyxRQUF2QjtBQUNBLGFBQUtDLEdBQUwsR0FBV0YsT0FBT0UsR0FBbEI7QUFDQSxhQUFLQyxVQUFMLEdBQWtCSCxPQUFPRyxVQUF6QjtBQUNBLGFBQUtDLE9BQUwsR0FBZUosT0FBT0ksT0FBdEI7QUFDQSxhQUFLQyxNQUFMLEdBQWNMLE9BQU9LLE1BQXJCO0FBQ0g7O0FBRUQ7Ozs7Ozs7a0NBR1VILEcsRUFBSztBQUNYLGdCQUFJSSxTQUFTLEVBQWI7QUFDQSxpQkFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLEtBQUtMLElBQUlNLE1BQUosR0FBYSxDQUFsQyxFQUFxQ0QsR0FBckMsRUFBMEM7QUFDdEMsb0JBQUlFLFNBQVMsRUFBYjtBQUNBLHFCQUFLLElBQUlDLElBQUlSLElBQUlNLE1BQUosR0FBYSxDQUExQixFQUE2QkUsS0FBSyxDQUFsQyxFQUFxQ0EsR0FBckMsRUFBMEM7QUFDdENELDJCQUFPRSxJQUFQLENBQVlULElBQUlRLENBQUosRUFBT0gsQ0FBUCxDQUFaO0FBQ0g7QUFDREQsdUJBQU9LLElBQVAsQ0FBWUYsTUFBWjtBQUNIO0FBQ0QsZ0JBQUlHLFFBQVEsRUFBWjtBQUNBLGdCQUFJQyxPQUFPLEVBQVg7O0FBRUEsaUJBQUtDLGFBQUwsQ0FBbUJSLE1BQW5CLEVBQTJCLFVBQVVDLENBQVYsRUFBYUcsQ0FBYixFQUFnQjtBQUN2Q0Usc0JBQU1ELElBQU4sQ0FBV0QsSUFBSSxLQUFLUCxVQUFwQjtBQUNBVSxxQkFBS0YsSUFBTCxDQUFVSixJQUFJLEtBQUtKLFVBQW5CO0FBQ0gsYUFIRDs7QUFLQSxtQkFBTztBQUNIRyx3QkFBUUEsTUFETDtBQUVITSx1QkFBT0EsS0FGSjtBQUdIQyxzQkFBTUE7QUFISCxhQUFQO0FBS0g7O0FBRUQ7Ozs7OztzQ0FJY1gsRyxFQUFLYSxRLEVBQVU7QUFDekIsaUJBQUssSUFBSVIsSUFBSSxDQUFiLEVBQWdCQSxLQUFLTCxJQUFJTSxNQUFKLEdBQWEsQ0FBbEMsRUFBcUNELEdBQXJDLEVBQTBDO0FBQ3RDLHFCQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsS0FBS1IsSUFBSU0sTUFBSixHQUFhLENBQWxDLEVBQXFDRSxHQUFyQyxFQUEwQztBQUN0Qyx3QkFBSVIsSUFBSUssQ0FBSixFQUFPRyxDQUFQLEtBQWEsQ0FBakIsRUFBb0I7QUFDaEJLLGlDQUFTQyxJQUFULENBQWMsSUFBZCxFQUFvQlQsSUFBSSxLQUFLRixNQUE3QixFQUFxQ0ssSUFBSSxLQUFLTixPQUE5QztBQUNIO0FBQ0o7QUFDSjtBQUNKOztBQUVEOzs7Ozs7NkJBR0tHLEMsRUFBR0csQyxFQUFHO0FBQ1AsZ0JBQUlPLGNBQWNDLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7QUFDQUYsd0JBQVlHLFNBQVosR0FBd0IsZUFBeEI7QUFDQUgsd0JBQVlJLEtBQVosQ0FBa0JDLEdBQWxCLEdBQTJCZixJQUFJLEtBQUtKLFVBQXBDO0FBQ0FjLHdCQUFZSSxLQUFaLENBQWtCRSxJQUFsQixHQUE0QmIsSUFBSSxLQUFLUCxVQUFyQztBQUNBZSxxQkFBU00sSUFBVCxDQUFjQyxXQUFkLENBQTBCUixXQUExQjtBQUNIOztBQUVEOzs7Ozs7b0NBR1liLE8sRUFBU0MsTSxFQUFRO0FBQ3pCLGdCQUFJcUIsZ0JBQWdCUixTQUFTUyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBcEI7QUFBQSxnQkFDSUMsVUFBVSxJQURkO0FBQUEsZ0JBRUlDLFdBQVcsSUFGZjtBQUFBLGdCQUdJQyxZQUFZLElBSGhCO0FBSUEsZ0JBQUlKLGNBQWNsQixNQUFkLEtBQXlCLENBQTdCLEVBQWdDO0FBQzVCb0IsMEJBQVUsS0FBSzNCLFFBQUwsQ0FBY3FCLEdBQWQsR0FBb0IsS0FBS3JCLFFBQUwsQ0FBYzhCLE1BQTVDO0FBQ0FGLDJCQUFXLEtBQUs1QixRQUFMLENBQWNzQixJQUFkLEdBQXFCLEtBQUtwQixVQUFyQztBQUNBMkIsNEJBQVksS0FBSzdCLFFBQUwsQ0FBY3NCLElBQWQsR0FBcUIsS0FBS3RCLFFBQUwsQ0FBYytCLEtBQS9DO0FBQ0gsYUFKRCxNQUlPO0FBQ0gsb0JBQUluQixPQUFPLEVBQVg7QUFBQSxvQkFDSUQsUUFBUSxFQURaO0FBQUEsb0JBRUlxQixTQUFTLEVBRmI7QUFERztBQUFBO0FBQUE7O0FBQUE7QUFJSCx5Q0FBY1AsYUFBZCw4SEFBNkI7QUFBQSw0QkFBcEJRLENBQW9COztBQUN6Qiw0QkFBSVgsT0FBT1ksU0FBU0QsRUFBRWIsS0FBRixDQUFRRSxJQUFqQixDQUFYO0FBQUEsNEJBQ0lELE1BQU1hLFNBQVNELEVBQUViLEtBQUYsQ0FBUUMsR0FBakIsQ0FEVjtBQUVBLDRCQUFJQyxTQUFTbkIsT0FBYixFQUFzQjtBQUNsQlMsaUNBQUtGLElBQUwsQ0FBVVcsR0FBVjtBQUNIO0FBQ0QsNEJBQUlBLFFBQVFqQixNQUFaLEVBQW9CO0FBQ2hCLGdDQUFJa0IsT0FBT25CLE9BQVgsRUFBb0I7QUFDaEJRLHNDQUFNRCxJQUFOLENBQVdZLElBQVg7QUFDSCw2QkFGRCxNQUVPLElBQUlBLE9BQU9uQixPQUFYLEVBQW9CO0FBQ3ZCNkIsdUNBQU90QixJQUFQLENBQVlZLElBQVo7QUFDSDtBQUNKO0FBQ0o7QUFqQkU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFrQkgsb0JBQUlWLEtBQUtMLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJvQiw4QkFBVSxLQUFLM0IsUUFBTCxDQUFjcUIsR0FBZCxHQUFvQixLQUFLckIsUUFBTCxDQUFjOEIsTUFBNUM7QUFDSCxpQkFGRCxNQUVPO0FBQ0hILDhCQUFVUSxLQUFLQyxHQUFMLGFBQVl4QixJQUFaLENBQVY7QUFDSDs7QUFFRCxvQkFBSUQsTUFBTUosTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUNwQnFCLCtCQUFXLEtBQUs1QixRQUFMLENBQWNzQixJQUFkLEdBQXFCLEtBQUtwQixVQUFyQztBQUNILGlCQUZELE1BRU87QUFDSDBCLCtCQUFXTyxLQUFLRSxHQUFMLGFBQVkxQixLQUFaLENBQVg7QUFDSDs7QUFFRCxvQkFBSXFCLE9BQU96QixNQUFQLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3JCc0IsZ0NBQVksS0FBSzdCLFFBQUwsQ0FBY3NCLElBQWQsR0FBcUIsS0FBS3RCLFFBQUwsQ0FBYytCLEtBQS9DO0FBQ0gsaUJBRkQsTUFFTztBQUNIRixnQ0FBWU0sS0FBS0MsR0FBTCxhQUFZSixNQUFaLENBQVo7QUFDSDtBQUNKOztBQUVELG1CQUFPO0FBQ0hMLHlCQUFTQSxPQUROO0FBRUhDLDBCQUFVQSxRQUZQO0FBR0hDLDJCQUFXQTtBQUhSLGFBQVA7QUFLSDs7QUFFRDs7Ozs7O29DQUdZO0FBQ1IsZ0JBQUlTLE1BQU0sRUFBVjtBQUFBLGdCQUNJQyw4Q0FBcUJ0QixTQUFTUyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBckIsRUFESjtBQUVBYSwyQkFBZUMsSUFBZixDQUFvQixVQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDaEMsdUJBQU9SLFNBQVNPLEVBQUVyQixLQUFGLENBQVFDLEdBQWpCLElBQXdCYSxTQUFTUSxFQUFFdEIsS0FBRixDQUFRQyxHQUFqQixDQUEvQjtBQUNILGFBRkQ7O0FBSUEsaUJBQUssSUFBSWYsSUFBSSxDQUFiLEVBQWdCQSxJQUFJaUMsZUFBZWhDLE1BQW5DLEdBQTRDO0FBQ3hDLG9CQUFJb0MsUUFBUSxDQUFaO0FBQUEsb0JBQ0lDLFNBQVMsRUFEYjtBQUVBLHFCQUFLLElBQUluQyxJQUFJLENBQWIsRUFBZ0JBLElBQUk4QixlQUFlaEMsTUFBbkMsRUFBMkNFLEdBQTNDLEVBQWdEO0FBQzVDLHdCQUFJOEIsZUFBZWpDLENBQWYsRUFBa0JjLEtBQWxCLENBQXdCQyxHQUF4QixLQUFnQ2tCLGVBQWU5QixDQUFmLEVBQWtCVyxLQUFsQixDQUF3QkMsR0FBNUQsRUFBaUU7QUFDN0RzQjtBQUNBQywrQkFBT2xDLElBQVAsQ0FBWTZCLGVBQWU5QixDQUFmLENBQVo7QUFDSDtBQUNKOztBQUVENkIsb0JBQUk1QixJQUFKLENBQVM7QUFDTGtDLDRCQUFRQSxNQURIO0FBRUxELDJCQUFPQSxLQUZGO0FBR0x0Qix5QkFBS2EsU0FBU0ssZUFBZWpDLENBQWYsRUFBa0JjLEtBQWxCLENBQXdCQyxHQUFqQztBQUhBLGlCQUFUO0FBS0E7QUFDQWYscUJBQUtxQyxLQUFMO0FBQ0g7QUFDRCxtQkFBT0wsR0FBUDtBQUVIOztBQUVEOzs7Ozs7Z0NBR1FyQyxHLEVBSUw7QUFBQSxnQkFKVTRDLE1BSVYsdUVBSm1CLEtBSW5CO0FBQUEsZ0JBSjBCQyxJQUkxQix1RUFKaUM7QUFDaENDLDhCQUFjLElBRGtCO0FBRWhDQyw2QkFBYSxJQUZtQjtBQUdoQ0MsNkJBQWE7QUFIbUIsYUFJakM7O0FBQ0MsaUJBQUtwQyxhQUFMLENBQW1CWixHQUFuQixFQUF3QixVQUFVSyxDQUFWLEVBQWFHLENBQWIsRUFBZ0I7QUFBQSxtQ0FDRCxLQUFLeUMsV0FBTCxDQUFpQnpDLElBQUksS0FBS1AsVUFBMUIsRUFBc0NJLElBQUksS0FBS0osVUFBL0MsQ0FEQztBQUFBLG9CQUMvQnlCLE9BRCtCLGdCQUMvQkEsT0FEK0I7QUFBQSxvQkFDdEJDLFFBRHNCLGdCQUN0QkEsUUFEc0I7QUFBQSxvQkFDWkMsU0FEWSxnQkFDWkEsU0FEWTs7QUFFcEMsb0JBQUlnQixNQUFKLEVBQVk7QUFDUix3QkFBSSxLQUFLM0MsVUFBTCxJQUFtQk8sSUFBSSxDQUF2QixJQUE0Qm9CLFNBQWhDLEVBQTJDO0FBQ3ZDaUIsNkJBQUtDLFlBQUwsR0FBb0IsS0FBcEI7QUFDSDtBQUNELHdCQUFJLEtBQUs3QyxVQUFMLElBQW1CSSxJQUFJLENBQXZCLElBQTRCcUIsT0FBaEMsRUFBeUM7QUFDckNtQiw2QkFBS0UsV0FBTCxHQUFtQixLQUFuQjtBQUNIO0FBQ0Qsd0JBQUksS0FBSzlDLFVBQUwsSUFBbUJPLElBQUksQ0FBdkIsSUFBNEJtQixRQUFoQyxFQUEwQztBQUN0Q2tCLDZCQUFLRyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0g7QUFDSixpQkFWRCxNQVVPO0FBQ0gsd0JBQUksS0FBSy9DLFVBQUwsSUFBbUJPLElBQUksQ0FBdkIsS0FBNkJvQixTQUFqQyxFQUE0QztBQUN4Q2lCLDZCQUFLQyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0g7QUFDRCx3QkFBSSxLQUFLN0MsVUFBTCxJQUFtQkksSUFBSSxDQUF2QixLQUE2QnFCLE9BQWpDLEVBQTBDO0FBQ3RDbUIsNkJBQUtFLFdBQUwsR0FBbUIsS0FBbkI7QUFDSDtBQUNELHdCQUFJLEtBQUs5QyxVQUFMLElBQW1CTyxJQUFJLENBQXZCLEtBQTZCbUIsUUFBakMsRUFBMkM7QUFDdkNrQiw2QkFBS0csV0FBTCxHQUFtQixLQUFuQjtBQUNIO0FBQ0o7QUFFSixhQXhCRDtBQXlCQSxtQkFBT0gsSUFBUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlDSDs7QUFFRDs7Ozs7OytCQUdPO0FBQUE7O0FBQ0g3QixxQkFBU2tDLFNBQVQsR0FBcUIsVUFBQ0MsQ0FBRCxFQUFNO0FBQ3ZCLG9CQUFJcEMsY0FBY0MsU0FBU1MsZ0JBQVQsQ0FBMEIsZ0JBQTFCLENBQWxCO0FBQUEsb0JBQ0lvQixhQURKO0FBQUEsb0JBRUlDLHFCQUZKO0FBQUEsb0JBR0lFLG9CQUhKO0FBQUEsb0JBSUlJLG1CQUpKO0FBQUEsb0JBS0lMLG9CQUxKO0FBTUEsb0JBQU1NLE1BQU1GLEVBQUVHLE9BQWQ7QUFDQSx3QkFBUUQsR0FBUjtBQUNJO0FBQ0EseUJBQUssRUFBTDtBQUNJTCxzQ0FBYyxNQUFLTyxPQUFMLENBQWEsTUFBS3ZELEdBQWxCLEVBQXVCZ0QsV0FBckM7QUFDQSw0QkFBSUEsV0FBSixFQUFpQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNiLHNEQUFjakMsV0FBZCxtSUFBMkI7QUFBQSx3Q0FBbEJpQixDQUFrQjs7QUFDdkJBLHNDQUFFYixLQUFGLENBQVFFLElBQVIsR0FBa0JZLFNBQVNELEVBQUViLEtBQUYsQ0FBUUUsSUFBakIsSUFBeUIsRUFBM0M7QUFDSDtBQUhZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBSWIsa0NBQUtuQixPQUFMO0FBRUgseUJBTkQsTUFNTztBQUNIc0Qsb0NBQVFDLEdBQVIsQ0FBWSxpQkFBWjtBQUNIOztBQUVEO0FBQ0o7QUFDQSx5QkFBSyxFQUFMO0FBQUEseUNBQzhCLE1BQUtDLFNBQUwsQ0FBZSxNQUFLMUQsR0FBcEIsQ0FEOUI7QUFBQSw0QkFDU0ksTUFEVCxjQUNTQSxNQURUO0FBQUEsNEJBQ2lCTSxLQURqQixjQUNpQkEsS0FEakI7QUFBQSw0QkFDd0JDLElBRHhCLGNBQ3dCQSxJQUR4Qjs7QUFFSWtDLCtCQUFPLE1BQUtVLE9BQUwsQ0FBYW5ELE1BQWIsRUFBcUIsSUFBckIsQ0FBUDtBQUNBMkMsc0NBQWNGLEtBQUtFLFdBQW5CO0FBQ0FELHVDQUFlRCxLQUFLQyxZQUFwQjtBQUNBRSxzQ0FBY0gsS0FBS0csV0FBbkI7QUFDQSw0QkFBSUYsZ0JBQWdCQyxXQUFoQixJQUErQkMsV0FBbkMsRUFBZ0Q7QUFDNUMsa0NBQUtoRCxHQUFMLEdBQVdJLE1BQVg7QUFDQSxpQ0FBSyxJQUFJQyxDQUFULElBQWNLLEtBQWQsRUFBcUI7QUFDakJLLDRDQUFZVixDQUFaLEVBQWVjLEtBQWYsQ0FBcUJFLElBQXJCLEdBQStCWCxNQUFNTCxDQUFOLENBQS9CO0FBQ0FVLDRDQUFZVixDQUFaLEVBQWVjLEtBQWYsQ0FBcUJDLEdBQXJCLEdBQThCVCxLQUFLTixDQUFMLENBQTlCO0FBQ0g7QUFDSjtBQUNEO0FBQ0o7QUFDQSx5QkFBSyxFQUFMO0FBQ0l5Qyx1Q0FBZSxNQUFLUyxPQUFMLENBQWEsTUFBS3ZELEdBQWxCLEVBQXVCOEMsWUFBdEM7QUFDQSw0QkFBSUEsWUFBSixFQUFrQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNkLHNEQUFjL0IsV0FBZCxtSUFBMkI7QUFBQSx3Q0FBbEJpQixFQUFrQjs7QUFDdkJBLHVDQUFFYixLQUFGLENBQVFFLElBQVIsR0FBa0JZLFNBQVNELEdBQUViLEtBQUYsQ0FBUUUsSUFBakIsSUFBeUIsRUFBM0M7QUFDSDtBQUhhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBSWQsa0NBQUtuQixPQUFMO0FBQ0gseUJBTEQsTUFLTztBQUNIc0Qsb0NBQVFDLEdBQVIsQ0FBWSxrQkFBWjtBQUNIO0FBQ0Q7QUFDSix5QkFBSyxFQUFMO0FBQ0lWLHNDQUFjLE1BQUtRLE9BQUwsQ0FBYSxNQUFLdkQsR0FBbEIsRUFBdUIrQyxXQUFyQztBQUNBLDRCQUFJQSxXQUFKLEVBQWlCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ2Isc0RBQWNoQyxXQUFkLG1JQUEyQjtBQUFBLHdDQUFsQmlCLEdBQWtCOztBQUN2QkEsd0NBQUViLEtBQUYsQ0FBUUMsR0FBUixHQUFpQmEsU0FBU0QsSUFBRWIsS0FBRixDQUFRQyxHQUFqQixJQUF3QixFQUF6QztBQUNIO0FBSFk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFJYixrQ0FBS2pCLE1BQUw7QUFDSCx5QkFMRCxNQUtPO0FBQ0hxRCxvQ0FBUUMsR0FBUixDQUFZLGlCQUFaO0FBQ0g7QUFDRDtBQUNKO0FBQ0lELGdDQUFRQyxHQUFSLENBQVksV0FBWjtBQUNBO0FBdkRSO0FBeURILGFBakVEO0FBa0VIOztBQUVEOzs7OzsrQkFFTztBQUNILGlCQUFLN0MsYUFBTCxDQUFtQixLQUFLWixHQUF4QixFQUE2QixLQUFLMkQsSUFBbEM7QUFDQSxnQkFBSUMsYUFBYTVDLFNBQVNTLGdCQUFULENBQTBCLGdCQUExQixDQUFqQjtBQUNBLGdCQUFNb0MsV0FBV0MsV0FBVyxTQUFTQyxJQUFULEdBQWdCO0FBQ3hDO0FBQ0Esb0JBQUloQixjQUFjLEtBQUtRLE9BQUwsQ0FBYSxLQUFLdkQsR0FBbEIsRUFBdUIrQyxXQUF6QztBQUNBLG9CQUFJQSxXQUFKLEVBQWlCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ2IsOENBQWNhLFVBQWQsbUlBQTBCO0FBQUEsZ0NBQWpCNUIsQ0FBaUI7O0FBQ3RCQSw4QkFBRWIsS0FBRixDQUFRQyxHQUFSLEdBQWlCYSxTQUFTRCxFQUFFYixLQUFGLENBQVFDLEdBQWpCLElBQXdCLEtBQUtuQixVQUE5QztBQUNIO0FBSFk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFJYix5QkFBS0UsTUFBTDtBQUNBMkQsK0JBQVdDLEtBQUtDLElBQUwsQ0FBVSxJQUFWLENBQVgsRUFBNEIsR0FBNUI7QUFFSCxpQkFQRCxNQU9PO0FBQ0gseUJBQUssSUFBSTNELElBQUksQ0FBYixFQUFnQkEsS0FBS3VELFdBQVd0RCxNQUFYLEdBQW9CLENBQXpDLEVBQTRDRCxHQUE1QyxFQUFpRDtBQUM3Q3VELG1DQUFXdkQsQ0FBWCxFQUFjYSxTQUFkLEdBQTBCLGVBQTFCO0FBQ0g7O0FBRUQsd0JBQUltQixNQUFNLEtBQUs0QixTQUFMLEVBQVY7QUFDQSx5QkFBSyxJQUFJNUQsS0FBSSxDQUFiLEVBQWdCQSxLQUFJZ0MsSUFBSS9CLE1BQXhCLEVBQWdDRCxJQUFoQyxFQUFxQztBQUFBLHNDQUNSZ0MsSUFBSWhDLEVBQUosQ0FEUTtBQUFBLDRCQUM1QnFDLEtBRDRCLFdBQzVCQSxLQUQ0QjtBQUFBLDRCQUNyQkMsTUFEcUIsV0FDckJBLE1BRHFCO0FBQUEsNEJBQ2J2QixHQURhLFdBQ2JBLEdBRGE7O0FBRWpDLDRCQUFJc0IsVUFBVVQsU0FBUyxLQUFLbEMsUUFBTCxDQUFjK0IsS0FBZCxHQUFzQixLQUFLN0IsVUFBcEMsQ0FBZCxFQUErRDtBQUMzRCxpQ0FBSyxJQUFJTyxJQUFJLENBQWIsRUFBZ0JBLElBQUltQyxPQUFPckMsTUFBM0IsRUFBbUNFLEdBQW5DLEVBQXdDO0FBQ3BDUSx5Q0FBU00sSUFBVCxDQUFjNEMsV0FBZCxDQUEwQnZCLE9BQU9uQyxDQUFQLENBQTFCO0FBQ0g7QUFDRCxnQ0FBSThCLGlCQUFpQnRCLFNBQVNTLGdCQUFULENBQTBCLGdCQUExQixDQUFyQjtBQUoyRDtBQUFBO0FBQUE7O0FBQUE7QUFLM0Qsc0RBQWNhLGNBQWQsbUlBQThCO0FBQUEsd0NBQXJCTixHQUFxQjs7QUFDMUIsd0NBQUlDLFNBQVNELElBQUViLEtBQUYsQ0FBUUMsR0FBakIsSUFBd0JBLEdBQTVCLEVBQWlDO0FBQzdCWSw0Q0FBRWIsS0FBRixDQUFRQyxHQUFSLEdBQWlCYSxTQUFTRCxJQUFFYixLQUFGLENBQVFDLEdBQWpCLElBQXdCLEtBQUtuQixVQUE5QztBQUNIO0FBQ0o7QUFUMEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVU5RDtBQUNKO0FBQ0RrRTtBQUNBQyxpQ0FBYVAsUUFBYjtBQUNIO0FBQ0osYUFqQzJCLENBaUMxQkcsSUFqQzBCLENBaUNyQixJQWpDcUIsQ0FBWCxFQWlDSCxHQWpDRyxDQUFqQjtBQWtDSDs7Ozs7QUFFTDs7Ozs7QUFHQSxJQUFNRyxRQUFPLFNBQVBBLEtBQU8sR0FBSztBQUNkLFFBQU1yRSxTQUFTO0FBQ1hFLGFBQUtxRSxPQURNO0FBRVh0RSxrQkFBVXVFLFlBRkM7QUFHWHJFLG9CQUFZc0UsY0FIRDtBQUlYckUsaUJBQVNzRSxXQUpFO0FBS1hyRSxnQkFBUXNFO0FBTEcsS0FBZjtBQU9BLFFBQUlDLFFBQVEsSUFBSTdFLEtBQUosQ0FBVUMsTUFBVixDQUFaO0FBQ0E0RSxVQUFNUCxJQUFOO0FBQ0FPLFVBQU03QixJQUFOO0FBQ0gsQ0FYRDtBQVlBOzs7O0FBSUE7Ozs7Ozs7OztBQVNBOEIsT0FBT0MsTUFBUCxHQUFnQixZQUFNO0FBQ2xCcEIsWUFBUUMsR0FBUixDQUFZLGVBQVo7QUFDQSxRQUFJb0IsT0FBTzdELFNBQVM4RCxhQUFULENBQXVCLE9BQXZCLENBQVg7QUFDQTs7QUFIa0IsZ0NBSWNILE9BQU9JLGdCQUFQLENBQXdCRixJQUF4QixDQUpkO0FBQUEsUUFJYi9DLEtBSmEseUJBSWJBLEtBSmE7QUFBQSxRQUlORCxNQUpNLHlCQUlOQSxNQUpNO0FBQUEsUUFJRVIsSUFKRix5QkFJRUEsSUFKRjtBQUFBLFFBSVFELEdBSlIseUJBSVFBLEdBSlI7O0FBS2xCLFFBQUlyQixXQUFXO0FBQ1grQixlQUFPRyxTQUFTSCxLQUFULENBREk7QUFFWEQsZ0JBQVFJLFNBQVNKLE1BQVQsQ0FGRztBQUdYUixjQUFNWSxTQUFTWixJQUFULENBSEs7QUFJWEQsYUFBS2EsU0FBU2IsR0FBVDtBQUpNLEtBQWY7QUFNQSxRQUFNcEIsTUFBTSxDQUFDLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBRCxFQUFTLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBVCxFQUFpQixDQUFDLENBQUQsRUFBSSxDQUFKLENBQWpCLENBQVo7QUFDQSxRQUFNQyxhQUFhLEVBQW5CO0FBQ0EsUUFBSUMsVUFBVStCLFNBQVMsQ0FBQ2xDLFNBQVNzQixJQUFULEdBQWdCdEIsU0FBUytCLEtBQVQsR0FBaUIsQ0FBbEMsSUFBdUM3QixVQUFoRCxDQUFkO0FBQ0EsUUFBSUUsU0FBUzhCLFNBQVNsQyxTQUFTcUIsR0FBVCxHQUFlbkIsVUFBeEIsQ0FBYjtBQUNBMEUsV0FBT04sT0FBUCxHQUFpQnJFLEdBQWpCO0FBQ0EyRSxXQUFPTCxZQUFQLEdBQXNCdkUsUUFBdEI7QUFDQTRFLFdBQU9KLGNBQVAsR0FBd0J0RSxVQUF4QjtBQUNBMEUsV0FBT0gsV0FBUCxHQUFxQnRFLE9BQXJCO0FBQ0F5RSxXQUFPRixVQUFQLEdBQW9CdEUsTUFBcEI7O0FBRUFnRTtBQUdILENBeEJEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQWRtaW5pc3RyYXRvciBvbiAyMDE3LzIvMjAuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIOWumuS5ieaWueWdl1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBFUzYgQ2xhc3NcclxuICogQ2xhc3PkuI3lrZjlnKjlj5jph4/mj5DljYfvvIhob2lzdO+8ie+8jOi/meS4gOeCueS4jkVTNeWujOWFqOS4jeWQjOOAglxyXG4gKiBjbGFzcyBCYXIge1xyXG4gKiAgIGNvbnN0cnVjdG9yKCl7fSBjb25zdHJ1Y3RvcuaWueazleaYr+exu+eahOm7mOiupOaWueazlVxyXG4gKiAgIGRvU3R1ZmYoKSB7XHJcbiAqICAgIGNvbnNvbGUubG9nKCdzdHVmZicpO1xyXG4gKiAgIH1cclxuICogfVxyXG4gKiDkvb/nlKjnmoTml7blgJnvvIzkuZ/mmK/nm7TmjqXlr7nnsbvkvb/nlKhuZXflkb3ku6TvvIzot5/mnoTpgKDlh73mlbDnmoTnlKjms5XlrozlhajkuIDoh7TjgIJcclxuICogdmFyIGIgPSBuZXcgQmFyKCk7XHJcbiAqIGIuZG9TdHVmZigpIC8vIFwic3R1ZmZcIlxyXG4gKi9cclxuY2xhc3MgQmxvY2sge1xyXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5bCGbmV3IEJsb2NrKHBhcmFtcykg5Y+C5pWw5Lyg6L+bdGhpc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2l0ZVNpemUgPSBwYXJhbXMuc2l0ZVNpemU7XHJcbiAgICAgICAgdGhpcy5hcnIgPSBwYXJhbXMuYXJyO1xyXG4gICAgICAgIHRoaXMuQkxPQ0tfU0laRSA9IHBhcmFtcy5CTE9DS19TSVpFO1xyXG4gICAgICAgIHRoaXMuY3VyTGVmdCA9IHBhcmFtcy5jdXJMZWZ0O1xyXG4gICAgICAgIHRoaXMuY3VyVG9wID0gcGFyYW1zLmN1clRvcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaVsOe7hOefqemYtemhuuaXtumSiOaXi+i9rFxyXG4gICAgICovXHJcbiAgICBjbG9ja3dpc2UoYXJyKSB7XHJcbiAgICAgICAgbGV0IG5ld0FyciA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGFyci5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRlbUFyciA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gYXJyLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1BcnIucHVzaChhcnJbal1baV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld0Fyci5wdXNoKHRlbUFycilcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlZnRzID0gW107XHJcbiAgICAgICAgbGV0IHRvcHMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja0FycldpdGgxKG5ld0FyciwgZnVuY3Rpb24gKGksIGopIHtcclxuICAgICAgICAgICAgbGVmdHMucHVzaChqICogdGhpcy5CTE9DS19TSVpFKTtcclxuICAgICAgICAgICAgdG9wcy5wdXNoKGkgKiB0aGlzLkJMT0NLX1NJWkUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZXdBcnI6IG5ld0FycixcclxuICAgICAgICAgICAgbGVmdHM6IGxlZnRzLFxyXG4gICAgICAgICAgICB0b3BzOiB0b3BzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5LqM57u05pWw57uE5Li6MeeahOS4i+agh1xyXG4gICAgICovXHJcblxyXG4gICAgY2hlY2tBcnJXaXRoMShhcnIsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gYXJyLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBhcnIubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2ldW2pdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGkgKyB0aGlzLmN1clRvcCwgaiArIHRoaXMuY3VyTGVmdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruaVsOe7hOefqemYteeUu+WHuuW9k+WJjeaWueWdl1xyXG4gICAgICovXHJcbiAgICBkcmF3KGksIGopIHtcclxuICAgICAgICBsZXQgYWN0aXZlTW9kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBhY3RpdmVNb2RlbC5jbGFzc05hbWUgPSAnYWN0aXZpdHlNb2RlbCc7XHJcbiAgICAgICAgYWN0aXZlTW9kZWwuc3R5bGUudG9wID0gYCR7aSAqIHRoaXMuQkxPQ0tfU0laRX1weGA7XHJcbiAgICAgICAgYWN0aXZlTW9kZWwuc3R5bGUubGVmdCA9IGAke2ogKiB0aGlzLkJMT0NLX1NJWkV9cHhgO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYWN0aXZlTW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICrojrflj5blvZPliY3mlrnlnZflj6/ku6XliLDovr7nmoTovrnnlYxcclxuICAgICAqL1xyXG4gICAgZ2V0SW50ZXJ2YWwoY3VyTGVmdCwgY3VyVG9wKSB7XHJcbiAgICAgICAgbGV0IGluYWN0aXZlTW9kZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5hY3RpdmVNb2RlbCcpLFxyXG4gICAgICAgICAgICBoaWdoZXN0ID0gbnVsbCxcclxuICAgICAgICAgICAgbGVmdG1vc3QgPSBudWxsLFxyXG4gICAgICAgICAgICByaWdodG1vc3QgPSBudWxsO1xyXG4gICAgICAgIGlmIChpbmFjdGl2ZU1vZGVsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBoaWdoZXN0ID0gdGhpcy5zaXRlU2l6ZS50b3AgKyB0aGlzLnNpdGVTaXplLmhlaWdodDtcclxuICAgICAgICAgICAgbGVmdG1vc3QgPSB0aGlzLnNpdGVTaXplLmxlZnQgLSB0aGlzLkJMT0NLX1NJWkU7XHJcbiAgICAgICAgICAgIHJpZ2h0bW9zdCA9IHRoaXMuc2l0ZVNpemUubGVmdCArIHRoaXMuc2l0ZVNpemUud2lkdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHRvcHMgPSBbXSxcclxuICAgICAgICAgICAgICAgIGxlZnRzID0gW10sXHJcbiAgICAgICAgICAgICAgICByaWdodHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBpbmFjdGl2ZU1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVmdCA9IHBhcnNlSW50KHYuc3R5bGUubGVmdCksXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gcGFyc2VJbnQodi5zdHlsZS50b3ApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlZnQgPT09IGN1ckxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3BzLnB1c2godG9wKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRvcCA9PT0gY3VyVG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgPCBjdXJMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRzLnB1c2gobGVmdClcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxlZnQgPiBjdXJMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0cy5wdXNoKGxlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0b3BzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaGlnaGVzdCA9IHRoaXMuc2l0ZVNpemUudG9wICsgdGhpcy5zaXRlU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoaWdoZXN0ID0gTWF0aC5taW4oLi4udG9wcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsZWZ0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGxlZnRtb3N0ID0gdGhpcy5zaXRlU2l6ZS5sZWZ0IC0gdGhpcy5CTE9DS19TSVpFO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGVmdG1vc3QgPSBNYXRoLm1heCguLi5sZWZ0cyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyaWdodHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByaWdodG1vc3QgPSB0aGlzLnNpdGVTaXplLmxlZnQgKyB0aGlzLnNpdGVTaXplLndpZHRoO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRtb3N0ID0gTWF0aC5taW4oLi4ucmlnaHRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGlnaGVzdDogaGlnaGVzdCxcclxuICAgICAgICAgICAgbGVmdG1vc3Q6IGxlZnRtb3N0LFxyXG4gICAgICAgICAgICByaWdodG1vc3Q6IHJpZ2h0bW9zdFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmtojpmaTnoJblnZdcclxuICAgICAqL1xyXG4gICAgZWxpbWluYXRlKCkge1xyXG4gICAgICAgIGxldCByZXMgPSBbXSxcclxuICAgICAgICAgICAgaW5hY3RpdmVNb2RlbHMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluYWN0aXZlTW9kZWwnKV07XHJcbiAgICAgICAgaW5hY3RpdmVNb2RlbHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoYS5zdHlsZS50b3ApIC0gcGFyc2VJbnQoYi5zdHlsZS50b3ApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluYWN0aXZlTW9kZWxzLmxlbmd0aDspIHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMCxcclxuICAgICAgICAgICAgICAgIG1vZGVscyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGluYWN0aXZlTW9kZWxzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5hY3RpdmVNb2RlbHNbaV0uc3R5bGUudG9wID09PSBpbmFjdGl2ZU1vZGVsc1tqXS5zdHlsZS50b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVscy5wdXNoKGluYWN0aXZlTW9kZWxzW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbW9kZWxzOiBtb2RlbHMsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogY291bnQsXHJcbiAgICAgICAgICAgICAgICB0b3A6IHBhcnNlSW50KGluYWN0aXZlTW9kZWxzW2ldLnN0eWxlLnRvcClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vZm9yIOW+queOr+eahOacgOWQjuS4gOS4quWPguaVsOWPr+S7peaUvuWcqOW+queOr+S9k+WGhVxyXG4gICAgICAgICAgICBpICs9IGNvdW50XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKblj6/ku6Xnp7vliqhcclxuICAgICAqL1xyXG4gICAgY2FuTW92ZShhcnIsIGRlZm9ybSA9IGZhbHNlLCBtb3ZlID0ge1xyXG4gICAgICAgIGNhbk1vdmVSaWdodDogdHJ1ZSxcclxuICAgICAgICBjYW5Nb3ZlRG93bjogdHJ1ZSxcclxuICAgICAgICBjYW5Nb3ZlTGVmdDogdHJ1ZVxyXG4gICAgfSkge1xyXG4gICAgICAgIHRoaXMuY2hlY2tBcnJXaXRoMShhcnIsIGZ1bmN0aW9uIChpLCBqKSB7XHJcbiAgICAgICAgICAgIGxldCB7aGlnaGVzdCwgbGVmdG1vc3QsIHJpZ2h0bW9zdH09dGhpcy5nZXRJbnRlcnZhbChqICogdGhpcy5CTE9DS19TSVpFLCBpICogdGhpcy5CTE9DS19TSVpFKTtcclxuICAgICAgICAgICAgaWYgKGRlZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChqICsgMSkgPiByaWdodG1vc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlLmNhbk1vdmVSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChpICsgMSkgPiBoaWdoZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChqIC0gMSkgPCBsZWZ0bW9zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmUuY2FuTW92ZUxlZnQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQkxPQ0tfU0laRSAqIChqICsgMSkgPj0gcmlnaHRtb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZS5jYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkJMT0NLX1NJWkUgKiAoaSArIDEpID49IGhpZ2hlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlLmNhbk1vdmVEb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5CTE9DS19TSVpFICogKGogLSAxKSA8PSBsZWZ0bW9zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmUuY2FuTW92ZUxlZnQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBtb3ZlO1xyXG4gICAgICAgIC8qIEFycmF5LmZyb23mlrnms5XnlKjkuo7lsIbnsbvmlbDnu4TovazkuLrnnJ/mraPnmoTmlbDnu4RcclxuICAgICAgICAgZm9yLi4ub2Y6IGZvci4uLmlu5b6q546v6K+75Y+W6ZSu5ZCN77yMZm9yLi4ub2blvqrnjq/or7vlj5bplK7lgLxcclxuICAgICAgICAgZm9yKGxldCB2IG9mIEFycmF5LmZyb20oYWN0aXZlTW9kZWwpKXtcclxuICAgICAgICAgdG9wcy5wdXNoKHBhcnNlSW50KHYuc3R5bGUudG9wKSk7XHJcbiAgICAgICAgIGxlZnRzLnB1c2gocGFyc2VJbnQodi5zdHlsZS5sZWZ0KSlcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgbWluKCkg5pa55rOV5Y+v6L+U5Zue5oyH5a6a55qE5pWw5a2X5Lit5bim5pyJ5pyA5L2O5YC855qE5pWw5a2X44CC5Y+C5pWw5Li655So6YCX5Y+35YiG6ZqU55qE5Y+C5pWw5bqP5YiX77yM5LiN5piv5pWw57uEXHJcbiAgICAgICAgIG1heCgpIOaWueazleWPr+i/lOWbnuaMh+WumueahOaVsOWtl+S4reW4puacieacgOWkp+WAvOeahOaVsOWtl+OAglxyXG4gICAgICAgICAuLi4g5omp5bGV6L+Q566X56ym77ya5bCG5pWw57uE6L2s5Li655So6YCX5Y+35YiG6ZqU55qE5Y+C5pWw5bqP5YiXXHJcbiAgICAgICAgIC4uLiByZXNldOi/kOeul+espu+8muWFtuWKn+iDveS4juaJqeWxlei/kOeul+espuaBsOWlveebuOWPje+8jOaKiumAl+WPt+malOW8gOeahOWAvOW6j+WIl+e7hOWQiOaIkOS4gOS4quaVsOe7hFxyXG4gICAgICAgICBsZXQgdG9wID0gTWF0aC5taW4oLi4udG9wcyksXHJcbiAgICAgICAgIGxlZnQgPSBNYXRoLm1pbiguLi5sZWZ0cyksXHJcbiAgICAgICAgIHJpZ2h0ID0gTWF0aC5tYXgoLi4ubGVmdHMpLFxyXG4gICAgICAgICBkb3duID0gTWF0aC5tYXgoLi4udG9wcyk7XHJcbiAgICAgICAgIGlmIChkZWZvcm0pIHtcclxuICAgICAgICAgaWYgKHJpZ2h0ICsgMjAgPj0gdGhpcy5zaXRlU2l6ZS5sZWZ0ICsgdGhpcy5zaXRlU2l6ZS53aWR0aCkge1xyXG4gICAgICAgICBjYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBpZiAocmlnaHQgKyAyMCA+PSB0aGlzLnNpdGVTaXplLmxlZnQgKyB0aGlzLnNpdGVTaXplLndpZHRoKSB7XHJcbiAgICAgICAgIGNhbk1vdmVSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmIChsZWZ0IC0gMjAgPCB0aGlzLnNpdGVTaXplLmxlZnQpIHtcclxuICAgICAgICAgY2FuTW92ZUxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBpZiAoZG93biArIDIwID49IHRoaXMuc2l0ZVNpemUudG9wICsgdGhpcy5zaXRlU2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgY2FuTW92ZURvd24gPSBmYWxzZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBpZiAodG9wIC0gMjAgPCB0aGlzLnNpdGVTaXplLnRvcCkge1xyXG4gICAgICAgICBjYW5Nb3ZlVG9wID0gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgIGNhbk1vdmVSaWdodDogY2FuTW92ZVJpZ2h0LFxyXG4gICAgICAgICBjYW5Nb3ZlTGVmdDogY2FuTW92ZUxlZnQsXHJcbiAgICAgICAgIGNhbk1vdmVUb3A6IGNhbk1vdmVUb3AsXHJcbiAgICAgICAgIGNhbk1vdmVEb3duOiBjYW5Nb3ZlRG93blxyXG4gICAgICAgICB9Ki9cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUruebmOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBtb3ZlKCkge1xyXG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IChlKT0+IHtcclxuICAgICAgICAgICAgbGV0IGFjdGl2ZU1vZGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2aXR5TW9kZWwnKSxcclxuICAgICAgICAgICAgICAgIG1vdmUsXHJcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgIGNhbk1vdmVUb3AsXHJcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlRG93bjtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gZS5rZXlDb2RlO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICAgICAgLy9sZWZ0XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM3OlxyXG4gICAgICAgICAgICAgICAgICAgIGNhbk1vdmVMZWZ0ID0gdGhpcy5jYW5Nb3ZlKHRoaXMuYXJyKS5jYW5Nb3ZlTGVmdDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FuTW92ZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBhY3RpdmVNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS5sZWZ0ID0gYCR7cGFyc2VJbnQodi5zdHlsZS5sZWZ0KSAtIDIwfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ckxlZnQtLTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW5gdCBtb3ZlIGxlZnRcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy91cFxyXG4gICAgICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgICAgICBsZXQge25ld0FyciwgbGVmdHMsIHRvcHN9PXRoaXMuY2xvY2t3aXNlKHRoaXMuYXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlID0gdGhpcy5jYW5Nb3ZlKG5ld0FyciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuTW92ZURvd24gPSBtb3ZlLmNhbk1vdmVEb3duO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbk1vdmVSaWdodCA9IG1vdmUuY2FuTW92ZVJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbk1vdmVMZWZ0ID0gbW92ZS5jYW5Nb3ZlTGVmdDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FuTW92ZVJpZ2h0ICYmIGNhbk1vdmVEb3duICYmIGNhbk1vdmVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyID0gbmV3QXJyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIGxlZnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNb2RlbFtpXS5zdHlsZS5sZWZ0ID0gYCR7bGVmdHNbaV19cHhgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTW9kZWxbaV0uc3R5bGUudG9wID0gYCR7dG9wc1tpXX1weGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vcmlnaHRcclxuICAgICAgICAgICAgICAgIGNhc2UgMzk6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuTW92ZVJpZ2h0ID0gdGhpcy5jYW5Nb3ZlKHRoaXMuYXJyKS5jYW5Nb3ZlUmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbk1vdmVSaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFjdGl2ZU1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LnN0eWxlLmxlZnQgPSBgJHtwYXJzZUludCh2LnN0eWxlLmxlZnQpICsgMjB9cHhgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyTGVmdCsrXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW5gdCBtb3ZlIHJpZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0MDpcclxuICAgICAgICAgICAgICAgICAgICBjYW5Nb3ZlRG93biA9IHRoaXMuY2FuTW92ZSh0aGlzLmFycikuY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbk1vdmVEb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHYgb2YgYWN0aXZlTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYuc3R5bGUudG9wID0gYCR7cGFyc2VJbnQodi5zdHlsZS50b3ApICsgMjB9cHhgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyVG9wKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW5gdCBtb3ZlIGRvd25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuivt+mAieaLqeS4iuS4i+W3puWPs+aMiemUrlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluaWueWdlyovXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuY2hlY2tBcnJXaXRoMSh0aGlzLmFyciwgdGhpcy5kcmF3KVxyXG4gICAgICAgIGxldCBhY2l2ZU1vZGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2aXR5TW9kZWwnKTtcclxuICAgICAgICBjb25zdCBmYWxsRG93biA9IHNldFRpbWVvdXQoZnVuY3Rpb24gbG9vcCgpIHtcclxuICAgICAgICAgICAgLy9zZXRUaW1lb3V05Lya5pS55Y+YdGhpc+eahOaMh+WQke+8jOaJgOS7pemcgOimgWJpbmQodGhpcylcclxuICAgICAgICAgICAgbGV0IGNhbk1vdmVEb3duID0gdGhpcy5jYW5Nb3ZlKHRoaXMuYXJyKS5jYW5Nb3ZlRG93bjtcclxuICAgICAgICAgICAgaWYgKGNhbk1vdmVEb3duKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFjaXZlTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2LnN0eWxlLnRvcCA9IGAke3BhcnNlSW50KHYuc3R5bGUudG9wKSArIHRoaXMuQkxPQ0tfU0laRX1weGBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyVG9wKys7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3AuYmluZCh0aGlzKSwgNjAwKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBhY2l2ZU1vZGVsLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjaXZlTW9kZWxbaV0uY2xhc3NOYW1lID0gJ2luYWN0aXZlTW9kZWwnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLmVsaW1pbmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQge2NvdW50LCBtb2RlbHMsIHRvcH09cmVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gcGFyc2VJbnQodGhpcy5zaXRlU2l6ZS53aWR0aCAvIHRoaXMuQkxPQ0tfU0laRSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtb2RlbHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobW9kZWxzW2pdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5hY3RpdmVNb2RlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5hY3RpdmVNb2RlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIGluYWN0aXZlTW9kZWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodi5zdHlsZS50b3ApIDwgdG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5zdHlsZS50b3AgPSBgJHtwYXJzZUludCh2LnN0eWxlLnRvcCkgKyB0aGlzLkJMT0NLX1NJWkV9cHhgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbml0KCk7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZmFsbERvd24pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyksIDYwMClcclxuICAgIH1cclxufVxyXG4vKipcclxuICog5pWw5o2u5Yid5aeL5YyWXHJcbiAqL1xyXG5jb25zdCBpbml0ID0gKCk9PiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgICAgYXJyOiBfX2Fycl9fLFxyXG4gICAgICAgIHNpdGVTaXplOiBfX3NpdGVTaXplX18sXHJcbiAgICAgICAgQkxPQ0tfU0laRTogX19CTE9DS19TSVpFX18sXHJcbiAgICAgICAgY3VyTGVmdDogX19jdXJMZWZ0X18sXHJcbiAgICAgICAgY3VyVG9wOiBfX2N1clRvcF9fXHJcbiAgICB9O1xyXG4gICAgbGV0IGJsb2NrID0gbmV3IEJsb2NrKHBhcmFtcyk7XHJcbiAgICBibG9jay5pbml0KCk7XHJcbiAgICBibG9jay5tb3ZlKCk7XHJcbn07XHJcbi8qKlxyXG4gKua1j+iniOWZqOWIneWni+WMllxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBFUzbnrq3lpLTlh73mlbBcclxuICog5Ye95pWw5L2T5YaF55qEdGhpc+Wvueixoe+8jOWwseaYr+WumuS5ieaXtuaJgOWcqOeahOWvueixoe+8jOiAjOS4jeaYr+S9v+eUqOaXtuaJgOWcqOeahOWvueixoeOAglxyXG4gKiB2YXIgc3VtID0gKG51bTEsIG51bTIpID0+IG51bTEgKyBudW0yO1xyXG4gKiDnrYnlkIzkuo5cclxuICogdmFyIHN1bSA9IGZ1bmN0aW9uKG51bTEsIG51bTIpIHtcclxuICogcmV0dXJuIG51bTEgKyBudW0yO1xyXG4gKiB9O1xyXG4gKi9cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwid2luZG93IG9ubG9hZFwiKTtcclxuICAgIGxldCBzaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUnKTtcclxuICAgIC8vIFdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCkg5pa55rOV5Lya5Zyo5LiA5Liq5YWD57Sg5bqU55So5a6M5pyJ5pWI5qC35byP5LiU6K6h566X5a6M5omA5pyJ5bGe5oCn55qE5Z+65pys5YC85LmL5ZCO57uZ5Ye65omA5pyJIENTUyDlsZ7mgKfnmoTlgLzjgIJcclxuICAgIGxldCB7d2lkdGgsIGhlaWdodCwgbGVmdCwgdG9wfSA9d2luZG93LmdldENvbXB1dGVkU3R5bGUoc2l0ZSk7XHJcbiAgICBsZXQgc2l0ZVNpemUgPSB7XHJcbiAgICAgICAgd2lkdGg6IHBhcnNlSW50KHdpZHRoKSxcclxuICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KGhlaWdodCksXHJcbiAgICAgICAgbGVmdDogcGFyc2VJbnQobGVmdCksXHJcbiAgICAgICAgdG9wOiBwYXJzZUludCh0b3ApXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyID0gW1sxLCAwXSwgWzEsIDBdLCBbMSwgMV1dO1xyXG4gICAgY29uc3QgQkxPQ0tfU0laRSA9IDIwO1xyXG4gICAgbGV0IGN1ckxlZnQgPSBwYXJzZUludCgoc2l0ZVNpemUubGVmdCArIHNpdGVTaXplLndpZHRoIC8gMikgLyBCTE9DS19TSVpFKTtcclxuICAgIGxldCBjdXJUb3AgPSBwYXJzZUludChzaXRlU2l6ZS50b3AgLyBCTE9DS19TSVpFKTtcclxuICAgIHdpbmRvdy5fX2Fycl9fID0gYXJyO1xyXG4gICAgd2luZG93Ll9fc2l0ZVNpemVfXyA9IHNpdGVTaXplO1xyXG4gICAgd2luZG93Ll9fQkxPQ0tfU0laRV9fID0gQkxPQ0tfU0laRTtcclxuICAgIHdpbmRvdy5fX2N1ckxlZnRfXyA9IGN1ckxlZnQ7XHJcbiAgICB3aW5kb3cuX19jdXJUb3BfXyA9IGN1clRvcDtcclxuXHJcbiAgICBpbml0KCk7XHJcblxyXG5cclxufTtcclxuIl19
