var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CDispObj = (function () {
    function CDispObj() {
        this.m_visible = true;
    }
    CDispObj.prototype.show = function () {
        this.m_visible = true;
    };
    CDispObj.prototype.hide = function () {
        this.m_visible = false;
    };
    CDispObj.prototype.visible = function () {
        return this.m_visible;
    };
    return CDispObj;
}());
__reflect(CDispObj.prototype, "CDispObj", ["IDispObj"]);
;
