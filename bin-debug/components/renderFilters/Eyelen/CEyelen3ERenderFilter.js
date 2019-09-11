/**********************************************************
 * /src/components/renderFilters/Eyelen/CEyelen3ERenderFilter.ts
 * 图像显示过滤器。用于调整图像输出。主要是应用横竖校准系数。可单元测试。
 *
 **********************************************************/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CEyelen3ERenderFilter = (function () {
    function CEyelen3ERenderFilter() {
        this.m_caRat = 1;
    }
    CEyelen3ERenderFilter.prototype.setCaRat = function (caRat) {
        this.m_caRat = caRat;
    };
    CEyelen3ERenderFilter.prototype._getCaRat = function () {
        return this.m_caRat;
    };
    /*
     * 计算某一横宽经过滤后在屏幕输出的宽度。除了适用于x坐标还适用于水平线段的长度。
     */
    CEyelen3ERenderFilter.prototype.xOConv = function (v) {
        var ret;
        ret = v * this.m_caRat;
        return ret;
    };
    CEyelen3ERenderFilter.prototype.xIConv = function (v) {
        var ret;
        ret = v / this.m_caRat;
        return ret;
    };
    CEyelen3ERenderFilter.prototype.yOConv = function (v) {
        return v;
    };
    CEyelen3ERenderFilter.prototype.yIConv = function (v) {
        return v;
    };
    /*
     * 计算某一点经过滤后在屏幕上的坐标。
     */
    CEyelen3ERenderFilter.prototype.ptOConv = function (pt) {
        var ret;
        ret = new gdeint.CPoint();
        ret.m_x = this.xOConv(pt.m_x);
        ret.m_y = pt.m_y;
        return ret;
    };
    /*
     * 计算某一屏幕点在过滤前的原始坐标。
     */
    CEyelen3ERenderFilter.prototype.ptIConv = function (pt) {
        var ret;
        ret = new gdeint.CPoint();
        ret.m_x = pt.m_x / this.m_caRat;
        ret.m_y = pt.m_y;
        return ret;
    };
    /*
     * 计算某一原始区域过滤输出后的屏幕区域。
     */
    CEyelen3ERenderFilter.prototype.rectOConv = function (rect) {
        var ret;
        ret = new gdeint.CRect;
        ret.m_left = rect.m_left * this.m_caRat;
        ret.m_top = rect.m_top;
        ret.m_width = rect.m_width * this.m_caRat;
        ret.m_height = rect.m_height;
        return ret;
    };
    /*
     * 计算某一屏幕区域在过滤前的原始区域。
     */
    CEyelen3ERenderFilter.prototype.rectIConv = function (rect) {
        var ret;
        ret = new gdeint.CRect();
        ret.m_left = rect.m_left / this.m_caRat;
        ret.m_top = rect.m_top;
        ret.m_width = rect.m_width / this.m_caRat;
        ret.m_height = rect.m_height;
        return ret;
    };
    return CEyelen3ERenderFilter;
}());
__reflect(CEyelen3ERenderFilter.prototype, "CEyelen3ERenderFilter", ["IEyelen3ERenderFilter", "gdeint.IRenderFilterWithCa", "gdeint.IRenderFilter", "gdeint.IRectRenderFilter"]);
;
//# sourceMappingURL=CEyelen3ERenderFilter.js.map