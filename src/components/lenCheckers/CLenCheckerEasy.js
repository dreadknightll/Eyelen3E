var CLenCheckerEasy = (function () {
    function CLenCheckerEasy() {
        this.m_renderFilter = new CEyelen3ERenderFilter();
    }
    CLenCheckerEasy.prototype.setRenderFilter = function (rf) {
        this.m_renderFilter = rf;
    };
    CLenCheckerEasy.prototype.setGridDispWidth = function (gw) {
        this.m_gridDispWidth = gw;
    };
    CLenCheckerEasy.prototype.getCorreGridCnt = function () {
        var correDispLen = this.m_renderFilter.xOConv(this.m_correOriLen);
        var ceilGCnt = Math.ceil(correDispLen / this.m_gridDispWidth);
        var floorGCnt = Math.floor(correDispLen / this.m_gridDispWidth);
        if (ceilGCnt == floorGCnt) {
            return ceilGCnt;
        }
        else {
            if (correDispLen / this.m_gridDispWidth > (ceilGCnt + floorGCnt)) {
                return ceilGCnt;
            }
            else {
                return floorGCnt;
            }
        }
    };
    CLenCheckerEasy.prototype.setCorreOriLen = function (len) {
        this.m_correOriLen = len;
    };
    CLenCheckerEasy.prototype.setInputGridCnt = function (igcnt) {
        this.m_gridCnt = igcnt;
    };
    CLenCheckerEasy.prototype.checkLen = function () {
        var correDispLen = this.m_renderFilter.xOConv(this.m_correOriLen);
        var gap = Math.abs(this.m_gridDispWidth * this.m_gridCnt - correDispLen);
        var correGCnt = this.getCorreGridCnt();
        var border1, border2;
        if (2 * gap <= this.m_gridDispWidth) {
            return 3;
        }
        if (correGCnt <= 2) {
            border1 = 7;
            border2 = 9;
        }
        else if (correGCnt <= 8) {
            border1 = 11;
            border2 = 17;
        }
        else {
            border1 = 17;
            border2 = 29;
        }
        if (gap * 10 <= border1 * this.m_gridDispWidth) {
            return 2;
        }
        else if (gap * 10 <= border2 * this.m_gridDispWidth) {
            return 1;
        }
        else {
            return 0;
        }
    };
    return CLenCheckerEasy;
}());
//# sourceMappingURL=CLenCheckerEasy.js.map