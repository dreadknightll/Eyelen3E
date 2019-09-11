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
/**
 *
 * 底部区域的确定按钮。
 *
 */
var eyelen3E;
(function (eyelen3E) {
    var CPraOKBtn = (function (_super) {
        __extends(CPraOKBtn, _super);
        function CPraOKBtn() {
            return _super.call(this) || this;
        }
        CPraOKBtn.prototype.childrenCreated = function () {
        };
        return CPraOKBtn;
    }(eui.Button));
    eyelen3E.CPraOKBtn = CPraOKBtn;
    __reflect(CPraOKBtn.prototype, "eyelen3E.CPraOKBtn");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CPraOKBtn.js.map