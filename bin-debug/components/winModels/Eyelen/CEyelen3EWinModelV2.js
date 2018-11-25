// src/components/winModels/Eyelen/CEyelen3EWinModelV2.ts
/**
 *
 * 画面布局模型。用来确定画面上各大部分的位置和大小。
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CEyelen3EWinModelV2 = (function () {
    function CEyelen3EWinModelV2() {
        this.m_topSpaceHeight = 50; // 顶端空白高度。
        this.m_topHeight1 = 55; //顶部区域收起时的顶部高度（不含顶端空白）。
        this.m_topHeight2 = 255; //顶区打开时的顶部高度（不含顶端空白）。
        this.m_showTop = true; //顶区是否处于打开状态。
        this.m_bottomHeight = 250; //底部区域的高度。
        this.m_winWidth = 0; //场景宽度。
        this.m_winHeight = 0; //场景高度。
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
    /*
        获取中部区域的高度。需要通过计算。部分被顶区遮挡的区域也属于中区范围。
    */
    CEyelen3EWinModelV2.prototype.getMidHeight = function () {
        return this.getWinHeight() - this.getTopSpaceHeight() - this.getTopHeight1() - this.getBottomHeight();
    };
    /*
        获取中部可见区域的纵坐标。需要通过计算。
    */
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
__reflect(CEyelen3EWinModelV2.prototype, "CEyelen3EWinModelV2", ["IEyelen3EWinModelV2", "ITMBWinModel", "IWinModel"]);
