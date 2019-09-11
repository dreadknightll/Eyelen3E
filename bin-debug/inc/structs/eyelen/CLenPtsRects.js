var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CLenPtsRects = (function () {
    function CLenPtsRects() {
        this.m_lenEdge1DispRect = new gdeint.CRect();
        this.m_lenQuestionerDispPt = new gdeint.CPoint();
        this.m_lenQuestionerFontSize = -1;
        this.m_lenEdge2DispRect = new gdeint.CRect();
    }
    return CLenPtsRects;
}());
__reflect(CLenPtsRects.prototype, "CLenPtsRects");
//# sourceMappingURL=CLenPtsRects.js.map