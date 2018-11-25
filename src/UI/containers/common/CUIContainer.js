var CUIContainer = (function () {
    function CUIContainer() {
    }
    CUIContainer.prototype.setResLoader = function (r) {
        this.m_resLoader = r;
    };
    CUIContainer.prototype.setAlertDlg = function (ad) {
        this.m_alertDlg = ad;
        this.m_alertDlg._setParentContainer(this);
        this.m_alertDlg.setParent(this);
    };
    CUIContainer.prototype.setConfirmDlg = function (d) {
        this.m_confirmDlg = d;
        this.m_confirmDlg._setParentContainer(this);
        this.m_confirmDlg.setParent(this);
    };
    CUIContainer.prototype.setPreloaderUI = function (pui) {
        this.m_preloaderUI = pui;
        this.m_preloaderUI._setParentContainer(this);
    };
    CUIContainer.prototype._getResLoader = function () {
        return this.m_resLoader;
    };
    CUIContainer.prototype._getAlertDlg = function () {
        return this.m_alertDlg;
    };
    CUIContainer.prototype._getConfirmDlg = function () {
        return this.m_confirmDlg;
    };
    CUIContainer.prototype._getPreloaderUI = function () {
        return this.m_preloaderUI;
    };
    CUIContainer.prototype.getAllPlugins = function () {
        var ret = new Array();
        ret[0] = this.m_alertDlg;
        ret[1] = this.m_confirmDlg;
        ret[2] = this.m_preloaderUI;
        return ret;
    };
    CUIContainer.prototype.saveVisibleStates = function () {
        this.m_visibilityTempArr = new Array();
        var plugins = this.getAllPlugins();
        var i;
        for (i = 0; i < plugins.length; ++i) {
            this.m_visibilityTempArr[i] = plugins[i].isVisible();
        }
    };
    CUIContainer.prototype.getVisibleStates = function () {
        return this.m_visibilityTempArr;
    };
    CUIContainer.prototype.getDlgLayer = function () {
        return null;
    };
    CUIContainer.prototype.getNotiLayer = function () {
        return null;
    };
    CUIContainer.prototype.disableForNoti = function () {
    };
    CUIContainer.prototype.resumeAfterNoti = function () {
    };
    CUIContainer.prototype.showAlert = function (content, listener) {
        var visibleStates = this.getVisibleStates();
        var alertDlg = this._getAlertDlg();
        if (null != listener) {
            alertDlg.setCloseListener(listener);
        }
        alertDlg.setContent(content);
        alertDlg.showDlg();
    };
    CUIContainer.prototype.showConfirm = function (content, listener) {
        var pc = this._getConfirmDlg();
        pc.setCloseListener(listener);
        pc._setContent(content);
        this._getConfirmDlg().showDlg();
    };
    CUIContainer.prototype.setCaRat = function (cr) {
    };
    CUIContainer.prototype.getCaRat = function () {
        return 1;
    };
    CUIContainer.prototype.isVisible = function () {
        return true;
    };
    CUIContainer.prototype.show = function () {
        var parr = this.getAllPlugins();
        var i;
        for (i = 0; i < parr.length; ++i) {
            if (this.m_visibilityTempArr && this.m_visibilityTempArr[i]) {
                parr[i].show();
            }
            else {
                parr[i].hide();
            }
        }
    };
    CUIContainer.prototype.hide = function () {
        this.saveVisibleStates();
        var parr = this.getAllPlugins();
        var i;
        for (i = 0; i < parr.length; ++i) {
            parr[i].hide();
        }
    };
    CUIContainer.prototype.applyFunc = function (func, argArr) {
    };
    return CUIContainer;
}());
//# sourceMappingURL=CUIContainer.js.map