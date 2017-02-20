'use strict';

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
    function Block(siteSize) {
        _classCallCheck(this, Block);

        /**
         * 将new Block(siteSize) 参数传进this
         */
        this.siteSize = siteSize;
    }

    /**
     * 判断是否可以移动
     */


    _createClass(Block, [{
        key: 'canMove',
        value: function canMove() {
            var activeModel = document.querySelector('.activityModel'),
                top = parseInt(activeModel.style.top),
                left = parseInt(activeModel.style.left),
                canMoveRight = true,
                canMoveTop = true,
                canMoveDown = true,
                canMoveLeft = true;

            if (left + 20 >= this.siteSize.left + this.siteSize.width) {
                canMoveRight = false;
            }
            if (left - 20 < this.siteSize.left) {
                canMoveLeft = false;
            }
            if (top + 20 >= this.siteSize.top + this.siteSize.height) {
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
        key: 'move',
        value: function move() {
            var _this = this;

            document.onkeydown = function (e) {
                var activeModel = document.querySelector('.activityModel'),
                    left = parseInt(activeModel.style.left ? parseInt(activeModel.style.left) : 0),
                    top = parseInt(activeModel.style.top ? parseInt(activeModel.style.top) : 0),
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
                            activeModel.style.left = left - 20 + 'px';
                        } else {
                            console.log("can`t move left");
                        }

                        break;
                    //up
                    case 38:
                        canMoveTop = _this.canMove().canMoveTop;
                        if (canMoveTop) {
                            activeModel.style.top = top - 20 + 'px';
                        } else {
                            console.log("can`t move top");
                        }
                        break;
                    //right
                    case 39:
                        canMoveRight = _this.canMove().canMoveRight;
                        if (canMoveRight) {
                            activeModel.style.left = left + 20 + 'px';
                        } else {
                            console.log("can`t move right");
                        }
                        break;
                    case 40:
                        canMoveDown = _this.canMove().canMoveDown;
                        if (canMoveDown) {
                            activeModel.style.top = top + 20 + 'px';
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
            var activeModel = document.createElement('div');
            activeModel.className = 'activityModel';
            activeModel.style.top = this.siteSize.top + 'px';
            activeModel.style.left = this.siteSize.left + this.siteSize.width / 2 + 'px';
            document.body.appendChild(activeModel);
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
    var block = new Block(siteSize);
    block.init();
    block.move();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkJsb2NrIiwic2l0ZVNpemUiLCJhY3RpdmVNb2RlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRvcCIsInBhcnNlSW50Iiwic3R5bGUiLCJsZWZ0IiwiY2FuTW92ZVJpZ2h0IiwiY2FuTW92ZVRvcCIsImNhbk1vdmVEb3duIiwiY2FuTW92ZUxlZnQiLCJ3aWR0aCIsImhlaWdodCIsIm9ua2V5ZG93biIsImUiLCJrZXkiLCJrZXlDb2RlIiwiY29uc29sZSIsImxvZyIsImNhbk1vdmUiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYm9keSIsImFwcGVuZENoaWxkIiwid2luZG93Iiwib25sb2FkIiwic2l0ZSIsImdldENvbXB1dGVkU3R5bGUiLCJibG9jayIsImluaXQiLCJtb3ZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUlBOzs7O0FBSUE7Ozs7Ozs7Ozs7Ozs7SUFhTUEsSztBQUNGLG1CQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQ2xCOzs7QUFHQSxhQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNIOztBQUVEOzs7Ozs7O2tDQUdVO0FBQ04sZ0JBQUlDLGNBQWNDLFNBQVNDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQWxCO0FBQUEsZ0JBQ0lDLE1BQU1DLFNBQVNKLFlBQVlLLEtBQVosQ0FBa0JGLEdBQTNCLENBRFY7QUFBQSxnQkFFSUcsT0FBT0YsU0FBU0osWUFBWUssS0FBWixDQUFrQkMsSUFBM0IsQ0FGWDtBQUFBLGdCQUdJQyxlQUFlLElBSG5CO0FBQUEsZ0JBSUlDLGFBQWEsSUFKakI7QUFBQSxnQkFLSUMsY0FBYyxJQUxsQjtBQUFBLGdCQU1JQyxjQUFZLElBTmhCOztBQVFBLGdCQUFHSixPQUFLLEVBQUwsSUFBVSxLQUFLUCxRQUFMLENBQWNPLElBQWQsR0FBbUIsS0FBS1AsUUFBTCxDQUFjWSxLQUE5QyxFQUFvRDtBQUNoREosK0JBQWEsS0FBYjtBQUNIO0FBQ0QsZ0JBQUdELE9B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QkMsSUFBbEIsR0FBMEIsS0FBS1AsUUFBTCxDQUFjTyxJQUFkLEdBQW1CLEtBQUtQLFFBQUwsQ0FBY1ksS0FBZCxHQUFvQixDQUFqRTtBQUNBVixxQkFBU3FCLElBQVQsQ0FBY0MsV0FBZCxDQUEwQnZCLFdBQTFCO0FBQ0g7Ozs7OztBQUdMOzs7O0FBSUE7Ozs7Ozs7Ozs7O0FBU0F3QixPQUFPQyxNQUFQLEdBQWdCLFlBQU07QUFDbEJSLFlBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsUUFBSVEsT0FBT3pCLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWDtBQUNBOztBQUhrQixnQ0FJY3NCLE9BQU9HLGdCQUFQLENBQXdCRCxJQUF4QixDQUpkO0FBQUEsUUFJYmYsS0FKYSx5QkFJYkEsS0FKYTtBQUFBLFFBSU5DLE1BSk0seUJBSU5BLE1BSk07QUFBQSxRQUlFTixJQUpGLHlCQUlFQSxJQUpGO0FBQUEsUUFJUUgsR0FKUix5QkFJUUEsR0FKUjs7QUFLbEIsUUFBSUosV0FBVztBQUNYWSxlQUFPUCxTQUFTTyxLQUFULENBREk7QUFFWEMsZ0JBQVFSLFNBQVNRLE1BQVQsQ0FGRztBQUdYTixjQUFNRixTQUFTRSxJQUFULENBSEs7QUFJWEgsYUFBS0MsU0FBU0QsR0FBVDtBQUpNLEtBQWY7QUFNQSxRQUFJeUIsUUFBUSxJQUFJOUIsS0FBSixDQUFVQyxRQUFWLENBQVo7QUFDQTZCLFVBQU1DLElBQU47QUFDQUQsVUFBTUUsSUFBTjtBQUVILENBZkQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBBZG1pbmlzdHJhdG9yIG9uIDIwMTcvMi8yMC5cclxuICovXHJcblxyXG4vKipcclxuICog5a6a5LmJ5pa55Z2XXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEVTNiBDbGFzc1xyXG4gKiBDbGFzc+S4jeWtmOWcqOWPmOmHj+aPkOWNh++8iGhvaXN077yJ77yM6L+Z5LiA54K55LiORVM15a6M5YWo5LiN5ZCM44CCXHJcbiAqIGNsYXNzIEJhciB7XHJcbiAqICAgY29uc3RydWN0b3IoKXt9IGNvbnN0cnVjdG9y5pa55rOV5piv57G755qE6buY6K6k5pa55rOVXHJcbiAqICAgZG9TdHVmZigpIHtcclxuICogICAgY29uc29sZS5sb2coJ3N0dWZmJyk7XHJcbiAqICAgfVxyXG4gKiB9XHJcbiAqIOS9v+eUqOeahOaXtuWAme+8jOS5n+aYr+ebtOaOpeWvueexu+S9v+eUqG5ld+WRveS7pO+8jOi3n+aehOmAoOWHveaVsOeahOeUqOazleWujOWFqOS4gOiHtOOAglxyXG4gKiB2YXIgYiA9IG5ldyBCYXIoKTtcclxuICogYi5kb1N0dWZmKCkgLy8gXCJzdHVmZlwiXHJcbiAqL1xyXG5jbGFzcyBCbG9jayB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaXRlU2l6ZSkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWwhm5ldyBCbG9jayhzaXRlU2l6ZSkg5Y+C5pWw5Lyg6L+bdGhpc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2l0ZVNpemUgPSBzaXRlU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuWPr+S7peenu+WKqFxyXG4gICAgICovXHJcbiAgICBjYW5Nb3ZlKCkge1xyXG4gICAgICAgIGxldCBhY3RpdmVNb2RlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3Rpdml0eU1vZGVsJyksXHJcbiAgICAgICAgICAgIHRvcCA9IHBhcnNlSW50KGFjdGl2ZU1vZGVsLnN0eWxlLnRvcCksXHJcbiAgICAgICAgICAgIGxlZnQgPSBwYXJzZUludChhY3RpdmVNb2RlbC5zdHlsZS5sZWZ0KSxcclxuICAgICAgICAgICAgY2FuTW92ZVJpZ2h0ID0gdHJ1ZSxcclxuICAgICAgICAgICAgY2FuTW92ZVRvcCA9IHRydWUsXHJcbiAgICAgICAgICAgIGNhbk1vdmVEb3duID0gdHJ1ZSxcclxuICAgICAgICAgICAgY2FuTW92ZUxlZnQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgaWYobGVmdCsyMD49IHRoaXMuc2l0ZVNpemUubGVmdCt0aGlzLnNpdGVTaXplLndpZHRoKXtcclxuICAgICAgICAgICAgY2FuTW92ZVJpZ2h0PWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihsZWZ0LTIwPHRoaXMuc2l0ZVNpemUubGVmdCl7XHJcbiAgICAgICAgICAgIGNhbk1vdmVMZWZ0PWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0b3ArMjA+PXRoaXMuc2l0ZVNpemUudG9wK3RoaXMuc2l0ZVNpemUuaGVpZ2h0KXtcclxuICAgICAgICAgICAgY2FuTW92ZURvd249ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRvcC0yMDx0aGlzLnNpdGVTaXplLnRvcCl7XHJcbiAgICAgICAgICAgIGNhbk1vdmVUb3A9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgIGNhbk1vdmVSaWdodDpjYW5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgIGNhbk1vdmVMZWZ0OmNhbk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICBjYW5Nb3ZlVG9wOmNhbk1vdmVUb3AsXHJcbiAgICAgICAgICAgIGNhbk1vdmVEb3duOmNhbk1vdmVEb3duXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSu55uY5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIG1vdmUoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gKGUpPT4ge1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlTW9kZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZpdHlNb2RlbCcpLFxyXG4gICAgICAgICAgICAgICAgbGVmdCA9IHBhcnNlSW50KGFjdGl2ZU1vZGVsLnN0eWxlLmxlZnQgPyBwYXJzZUludChhY3RpdmVNb2RlbC5zdHlsZS5sZWZ0KSA6IDApLFxyXG4gICAgICAgICAgICAgICAgdG9wID0gcGFyc2VJbnQoYWN0aXZlTW9kZWwuc3R5bGUudG9wID8gcGFyc2VJbnQoYWN0aXZlTW9kZWwuc3R5bGUudG9wKSA6IDApLFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlVG9wLFxyXG4gICAgICAgICAgICAgICAgY2FuTW92ZURvd247XHJcblxyXG5cclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gZS5rZXlDb2RlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImtleVwiLCBrZXkpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICAgICAgLy9sZWZ0XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM3OlxyXG4gICAgICAgICAgICAgICAgICAgIGNhbk1vdmVMZWZ0PXRoaXMuY2FuTW92ZSgpLmNhbk1vdmVMZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNhbk1vdmVMZWZ0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTW9kZWwuc3R5bGUubGVmdCA9IGAke2xlZnQgLSAyMH1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSBsZWZ0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vdXBcclxuICAgICAgICAgICAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuTW92ZVRvcD10aGlzLmNhbk1vdmUoKS5jYW5Nb3ZlVG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNhbk1vdmVUb3Ape1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNb2RlbC5zdHlsZS50b3AgPSBgJHt0b3AgLSAyMH1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSB0b3BcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvL3JpZ2h0XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM5OlxyXG4gICAgICAgICAgICAgICAgICAgIGNhbk1vdmVSaWdodD10aGlzLmNhbk1vdmUoKS5jYW5Nb3ZlUmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2FuTW92ZVJpZ2h0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTW9kZWwuc3R5bGUubGVmdCA9IGAke2xlZnQgKyAyMH1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSByaWdodFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDA6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuTW92ZURvd249dGhpcy5jYW5Nb3ZlKCkuY2FuTW92ZURvd247XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2FuTW92ZURvd24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNb2RlbC5zdHlsZS50b3AgPSBgJHt0b3AgKyAyMH1weGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuYHQgbW92ZSBkb3duXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLor7fpgInmi6nkuIrkuIvlt6blj7PmjInplK5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbmlrnlnZcqL1xyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBsZXQgYWN0aXZlTW9kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBhY3RpdmVNb2RlbC5jbGFzc05hbWUgPSAnYWN0aXZpdHlNb2RlbCc7XHJcbiAgICAgICAgYWN0aXZlTW9kZWwuc3R5bGUudG9wPWAke3RoaXMuc2l0ZVNpemUudG9wfXB4YDtcclxuICAgICAgICBhY3RpdmVNb2RlbC5zdHlsZS5sZWZ0PWAke3RoaXMuc2l0ZVNpemUubGVmdCt0aGlzLnNpdGVTaXplLndpZHRoLzJ9cHhgXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhY3RpdmVNb2RlbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKua1j+iniOWZqOWIneWni+WMllxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBFUzbnrq3lpLTlh73mlbBcclxuICog5Ye95pWw5L2T5YaF55qEdGhpc+Wvueixoe+8jOWwseaYr+WumuS5ieaXtuaJgOWcqOeahOWvueixoe+8jOiAjOS4jeaYr+S9v+eUqOaXtuaJgOWcqOeahOWvueixoeOAglxyXG4gKiB2YXIgc3VtID0gKG51bTEsIG51bTIpID0+IG51bTEgKyBudW0yO1xyXG4gKiDnrYnlkIzkuo5cclxuICogdmFyIHN1bSA9IGZ1bmN0aW9uKG51bTEsIG51bTIpIHtcclxuICogcmV0dXJuIG51bTEgKyBudW0yO1xyXG4gKiB9O1xyXG4gKi9cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwid2luZG93IG9ubG9hZFwiKTtcclxuICAgIGxldCBzaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUnKTtcclxuICAgIC8vIFdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCkg5pa55rOV5Lya5Zyo5LiA5Liq5YWD57Sg5bqU55So5a6M5pyJ5pWI5qC35byP5LiU6K6h566X5a6M5omA5pyJ5bGe5oCn55qE5Z+65pys5YC85LmL5ZCO57uZ5Ye65omA5pyJIENTUyDlsZ7mgKfnmoTlgLzjgIJcclxuICAgIGxldCB7d2lkdGgsIGhlaWdodCwgbGVmdCwgdG9wfSA9d2luZG93LmdldENvbXB1dGVkU3R5bGUoc2l0ZSk7XHJcbiAgICBsZXQgc2l0ZVNpemUgPSB7XHJcbiAgICAgICAgd2lkdGg6IHBhcnNlSW50KHdpZHRoKSxcclxuICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KGhlaWdodCksXHJcbiAgICAgICAgbGVmdDogcGFyc2VJbnQobGVmdCksXHJcbiAgICAgICAgdG9wOiBwYXJzZUludCh0b3ApXHJcbiAgICB9XHJcbiAgICBsZXQgYmxvY2sgPSBuZXcgQmxvY2soc2l0ZVNpemUpO1xyXG4gICAgYmxvY2suaW5pdCgpO1xyXG4gICAgYmxvY2subW92ZSgpO1xyXG5cclxufTtcclxuIl19
