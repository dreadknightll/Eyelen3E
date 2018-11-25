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
;
//# sourceMappingURL=CDispObj.js.map