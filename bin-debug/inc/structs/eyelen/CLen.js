var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * 长度结构体。
 */
var CLen = (function () {
    function CLen() {
    }
    /*
        单元测试需要from方法。请勿删除。
    */
    CLen.from = function (length, isHor, position, imgPath, imgResName, className) {
        if (imgPath === void 0) { imgPath = ""; }
        if (imgResName === void 0) { imgResName = ""; }
        if (className === void 0) { className = ""; }
        var ret = new CLen();
        ret.m_length = length;
        ret.m_isHor = isHor;
        ret.m_x = position[0];
        ret.m_y = position[1];
        ret.m_imgPath = imgPath;
        ret.m2_imgResName = imgResName;
        ret.m_className = className;
        return ret;
    };
    return CLen;
}());
__reflect(CLen.prototype, "CLen");
;
