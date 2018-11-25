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
 * 简单难度尺带的格子。
 *
 */
var CRulerEasyBodyCell = (function (_super) {
    __extends(CRulerEasyBodyCell, _super);
    function CRulerEasyBodyCell() {
        var _this = _super.call(this) || this;
        _this.m_tag = -1;
        _this.m_checked = false;
        return _this;
    }
    /*
     * 选中。
     */
    CRulerEasyBodyCell.prototype.check = function () {
        this.m_checked = true;
    };
    /*
     * 取消选中。
     */
    CRulerEasyBodyCell.prototype.uncheck = function () {
        this.m_checked = false;
    };
    /*
     * 判断是否选中。
     */
    CRulerEasyBodyCell.prototype.checked = function () {
        return this.m_checked;
    };
    return CRulerEasyBodyCell;
}(egret.Bitmap));
__reflect(CRulerEasyBodyCell.prototype, "CRulerEasyBodyCell");
