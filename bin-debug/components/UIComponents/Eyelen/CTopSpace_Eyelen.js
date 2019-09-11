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
 * 顶部空白条。当系统为iOS时可用来让当前时间和电池信息等得以显示。
 *
 * 使用方法：设置width —> 设置height —> setColor() —> draw() 。
 *
 */
var CTopSpace_Eyelen = (function (_super) {
    __extends(CTopSpace_Eyelen, _super);
    function CTopSpace_Eyelen() {
        var _this = _super.call(this) || this;
        _this.m_space = new egret.Shape();
        _this.m_space.x = 0;
        _this.m_space.y = 0;
        _this.addChild(_this.m_space);
        return _this;
    }
    CTopSpace_Eyelen.prototype.setColor = function (clr) {
        this.m_color = clr;
    };
    CTopSpace_Eyelen.prototype.draw = function () {
        this.m_space.graphics.clear();
        this.m_space.graphics.beginFill(this.m_color);
        this.m_space.graphics.drawRect(0, 0, this.width, this.height);
        this.m_space.graphics.endFill();
    };
    CTopSpace_Eyelen.prototype.redraw = function () {
        this.draw();
    };
    return CTopSpace_Eyelen;
}(egret.DisplayObjectContainer));
__reflect(CTopSpace_Eyelen.prototype, "CTopSpace_Eyelen");
//# sourceMappingURL=CTopSpace_Eyelen.js.map