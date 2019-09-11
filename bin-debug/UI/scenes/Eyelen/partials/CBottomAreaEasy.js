var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var eyelen3E;
(function (eyelen3E) {
    var CBottomAreaEasy = (function (_super) {
        __extends(CBottomAreaEasy, _super);
        function CBottomAreaEasy() {
            var _this = _super.call(this) || this;
            _this.m2_cc = false;
            _this.m_trueWidth = 480;
            _this.m_trueHeight = 210;
            return _this;
        }
        CBottomAreaEasy.prototype.childrenCreated = function () {
            this.m2_cc = true;
            this.rearrange();
        };
        CBottomAreaEasy.prototype.setTrueWidth = function (tw) {
            this.m_trueWidth = tw;
            if (this.width < this.m_trueWidth) {
                this.width = this.m_trueWidth;
            }
            if (this.m2_cc) {
                this.rearrange();
            }
        };
        CBottomAreaEasy.prototype.setTrueHeight = function (th) {
            this.m_trueHeight = th;
            if (this.height < this.m_trueHeight) {
                this.height = this.m_trueHeight;
            }
            if (this.m2_cc) {
                this.rearrange();
            }
        };
        CBottomAreaEasy.prototype.rearrange = function () {
            this.lenInputer.setWidth(this.m_trueWidth - this.lenInputer.x - 10);
            this.lenInputer.scaleY = 1.2;
            this.menuGroup.y = this.m_trueHeight * 0.6;
            //		adjust the size of the buttons
            var scale;
            scale = 0.32 * this.m_trueHeight / this.backBtn.height;
            //		this.scaleX = scale;
            this.menuGroup.scaleY = scale;
            this.menuGroup.scaleX = scale;
        };
        return CBottomAreaEasy;
    }(eui.Component));
    eyelen3E.CBottomAreaEasy = CBottomAreaEasy;
    __reflect(CBottomAreaEasy.prototype, "eyelen3E.CBottomAreaEasy");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CBottomAreaEasy.js.map