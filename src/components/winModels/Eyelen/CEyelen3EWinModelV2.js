var CEyelen3EWinModelV2 = (function () {
    function CEyelen3EWinModelV2() {
        this.m_topSpaceHeight = 50;
        this.m_topHeight1 = 55;
        this.m_topHeight2 = 255;
        this.m_showTop = true;
        this.m_bottomHeight = 250;
        this.m_winWidth = 0;
        this.m_winHeight = 0;
    }
    CEyelen3EWinModelV2.prototype.setTopSpaceHeight = function (h) {
        this.m_topSpaceHeight = h;
    };
    CEyelen3EWinModelV2.prototype.getTopSpaceHeight = function () {
        return this.m_topSpaceHeight;
    };
    CEyelen3EWinModelV2.prototype.getTopY = function () {
        return this.getTopSpaceHeight();
    };
    CEyelen3EWinModelV2.prototype.setTopHeight1 = function (h) {
        this.m_topHeight1 = h;
    };
    CEyelen3EWinModelV2.prototype.getTopHeight1 = function () {
        return this.m_topHeight1;
    };
    CEyelen3EWinModelV2.prototype.setTopHeight2 = function (h) {
        this.m_topHeight2 = h;
    };
    CEyelen3EWinModelV2.prototype.getTopHeight2 = function () {
        return this.m_topHeight2;
    };
    CEyelen3EWinModelV2.prototype.showTop = function () {
        this.m_showTop = true;
    };
    CEyelen3EWinModelV2.prototype.hideTop = function () {
        this.m_showTop = false;
    };
    CEyelen3EWinModelV2.prototype.getTopHeight = function () {
        if (this.m_showTop) {
            return this.m_topHeight2;
        }
        else {
            return this.m_topHeight1;
        }
    };
    CEyelen3EWinModelV2.prototype.getMidY = function () {
        return this.getTopY() + this.m_topHeight1;
    };
    CEyelen3EWinModelV2.prototype.getMidHeight = function () {
        return this.getWinHeight() - this.getTopSpaceHeight() - this.getTopHeight1() - this.getBottomHeight();
    };
    CEyelen3EWinModelV2.prototype.getMidVisibleY = function () {
        return this.getTopY() + this.getTopHeight();
    };
    CEyelen3EWinModelV2.prototype.getMidVisibleHeight = function () {
        return this.getWinHeight() - this.getTopSpaceHeight() - this.getTopHeight() - this.getBottomHeight();
    };
    CEyelen3EWinModelV2.prototype.getBottomY = function () {
        return this.m_winHeight - this.getBottomHeight();
    };
    CEyelen3EWinModelV2.prototype.setBottomHeight = function (h) {
        this.m_bottomHeight = h;
    };
    CEyelen3EWinModelV2.prototype.getBottomHeight = function () {
        return this.m_bottomHeight;
    };
    CEyelen3EWinModelV2.prototype.setWinWidth = function (w) {
        this.m_winWidth = w;
    };
    CEyelen3EWinModelV2.prototype.getWinWidth = function () {
        return this.m_winWidth;
    };
    CEyelen3EWinModelV2.prototype.setWinHeight = function (h) {
        this.m_winHeight = h;
    };
    CEyelen3EWinModelV2.prototype.getWinHeight = function () {
        return this.m_winHeight;
    };
    CEyelen3EWinModelV2.prototype.rearrange = function () {
    };
    return CEyelen3EWinModelV2;
}());
//# sourceMappingURL=CEyelen3EWinModelV2.js.map