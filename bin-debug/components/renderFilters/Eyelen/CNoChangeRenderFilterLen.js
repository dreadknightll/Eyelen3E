var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 1、定义不做任何改变的RenderFilter。
 * 2、作为RenderFilter的基类简化代码。
 *
 */
var CNoChangeRenderFilter = (function () {
    function CNoChangeRenderFilter() {
    }
    CNoChangeRenderFilter.prototype.setCaRat = function (caRat) {
    };
    CNoChangeRenderFilter.prototype._getCaRat = function () {
        return 1;
    };
    CNoChangeRenderFilter.prototype.xOConv = function (v) {
        var ret;
        ret = v;
        return ret;
    };
    CNoChangeRenderFilter.prototype.xIConv = function (v) {
        var ret;
        ret = v;
        return ret;
    };
    CNoChangeRenderFilter.prototype.yOConv = function (v) {
        return v;
    };
    CNoChangeRenderFilter.prototype.yIConv = function (v) {
        return v;
    };
    CNoChangeRenderFilter.prototype.ptOConv = function (pt) {
        var ret;
        ret = pt;
        return ret;
    };
    CNoChangeRenderFilter.prototype.ptIConv = function (pt) {
        var ret;
        ret = pt;
        return ret;
    };
    CNoChangeRenderFilter.prototype.rectOConv = function (rect) {
        var ret;
        ret = rect;
        return ret;
    };
    CNoChangeRenderFilter.prototype.rectIConv = function (rect) {
        var ret;
        ret = rect;
        return ret;
    };
    return CNoChangeRenderFilter;
}());
__reflect(CNoChangeRenderFilter.prototype, "CNoChangeRenderFilter", ["IEyelen3ERenderFilter", "gdeint.IRenderFilterWithCa", "gdeint.IRenderFilter", "gdeint.IRectRenderFilter"]);
;
//# sourceMappingURL=CNoChangeRenderFilterLen.js.map