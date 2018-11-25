var CMockAlertDlg = (function () {
    function CMockAlertDlg() {
        this.m_visible = false;
    }
    CMockAlertDlg.prototype.setParent = function (p) {
        this.m_parent = p;
    };
    CMockAlertDlg.prototype._setParentContainer = function (pc) {
        this.m_parentContainer = pc;
    };
    CMockAlertDlg.prototype._getParentContainer = function () {
        return this.m_parentContainer;
    };
    CMockAlertDlg.prototype.getParent = function () {
        return this.m_parent;
    };
    CMockAlertDlg.prototype.setCloseListener = function (func) {
    };
    CMockAlertDlg.prototype.setContent = function (con) {
        this.m_strOnShow = con;
    };
    CMockAlertDlg.prototype.showDlg = function () {
        this.m_visible = true;
        this.getParent().disableForNoti();
    };
    CMockAlertDlg.prototype.show = function () {
        this.m_visible = true;
    };
    CMockAlertDlg.prototype.hide = function () {
        this.m_visible = false;
    };
    CMockAlertDlg.prototype.isVisible = function () {
        return this.m_visible;
    };
    CMockAlertDlg.prototype.setSceneRect = function (x, y, wid, hei) {
    };
    return CMockAlertDlg;
}());
//# sourceMappingURL=CMockAlertDlg.js.map