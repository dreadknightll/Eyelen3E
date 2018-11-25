var CMockEyelenPraScene = (function () {
    function CMockEyelenPraScene() {
        this.m_disabled = false;
        this.m_visible = true;
    }
    CMockEyelenPraScene.prototype.setLenArr = function (aa) {
    };
    CMockEyelenPraScene.prototype.startNewPra = function () {
    };
    CMockEyelenPraScene.prototype.disableScene = function () {
        this.m_disabled = true;
    };
    CMockEyelenPraScene.prototype.enableScene = function () {
        this.m_disabled = false;
    };
    CMockEyelenPraScene.prototype.getDlgLayer = function () {
        return null;
    };
    CMockEyelenPraScene.prototype.show = function () {
        this.m_visible = true;
    };
    CMockEyelenPraScene.prototype.hide = function () {
        this.m_visible = false;
    };
    CMockEyelenPraScene.prototype.isVisible = function () {
        return this.m_visible;
    };
    CMockEyelenPraScene.prototype.disableForNoti = function () {
        this.m_disabled = true;
    };
    CMockEyelenPraScene.prototype.resumeAfterNoti = function () {
        this.m_disabled = false;
    };
    CMockEyelenPraScene.prototype.applyFunc = function (func, argArr) {
        this.m_lastFuncArgArr = argArr;
    };
    CMockEyelenPraScene.prototype.getNotiLayer = function () {
        return null;
    };
    CMockEyelenPraScene.prototype._setParentContainer = function (c) {
    };
    CMockEyelenPraScene.prototype._getParentContainer = function () {
        return null;
    };
    return CMockEyelenPraScene;
}());
//# sourceMappingURL=CMockEyelenPraScene.js.map