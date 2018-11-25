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
    CEyelen3ERenderFilter.prototype.ptOConv = function (pt) {
        var ret;
        ret = new gdeint.CPoint();
        ret.m_x = this.xOConv(pt.m_x);
        ret.m_y = pt.m_y;
        return ret;
    };
    CEyelen3ERenderFilter.prototype.ptIConv = function (pt) {
        var ret;
        ret = new gdeint.CPoint();
        ret.m_x = pt.m_x / this.m_caRat;
        ret.m_y = pt.m_y;
        return ret;
    };
    CEyelen3ERenderFilter.prototype.rectOConv = function (rect) {
        var ret;
        ret = new gdeint.CRect;
        ret.m_left = rect.m_left * this.m_caRat;
        ret.m_top = rect.m_top;
        ret.m_width = rect.m_width * this.m_caRat;
        ret.m_height = rect.m_height;
        return ret;
    };
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
;
//# sourceMappingURL=CEyelen3ERenderFilter.js.map