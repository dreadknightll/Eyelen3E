var CLen = (function () {
    function CLen() {
    }
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
;
//# sourceMappingURL=CLen.js.map