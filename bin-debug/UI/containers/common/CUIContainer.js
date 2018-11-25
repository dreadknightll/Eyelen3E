/***********************************************************
* /src/UI/containers/common/CUIContainer.ts
* 本类实现了显示容器。用于管理练习场景以及提示框、功能对话框等插件的显示。
* 使用容器显示比起不使用能让测试更充分，代码重用更方便。
* 不转移到 libGdeint。因为本类要编写派生类才适合使用。
*
************************************************************/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
    /*
        以数组形式返回已注入容器的插件（不包括练习场景）。
    */
    CUIContainer.prototype.getAllPlugins = function () {
        var ret = new Array();
        ret[0] = this.m_alertDlg;
        ret[1] = this.m_confirmDlg;
        ret[2] = this.m_preloaderUI;
        return ret;
    };
    /*
        把容器元素visible状态入栈以便还原。
    */
    CUIContainer.prototype.saveVisibleStates = function () {
        this.m_visibilityTempArr = new Array();
        var plugins = this.getAllPlugins();
        var i;
        for (i = 0; i < plugins.length; ++i) {
            this.m_visibilityTempArr[i] = plugins[i].isVisible();
        }
    };
    /*
        获取保存在栈顶的visible状态。
    */
    CUIContainer.prototype.getVisibleStates = function () {
        return this.m_visibilityTempArr;
    };
    /*
        获取功能对话框显示层。本类此方法返回null，功能实现在子类进行。
    */
    CUIContainer.prototype.getDlgLayer = function () {
        return null;
    };
    CUIContainer.prototype.getNotiLayer = function () {
        return null;
    };
    /*
        显示各种提示框时需要调用以下方法把其它元素锁定和变暗。
        功能实现在子类进行。
    */
    CUIContainer.prototype.disableForNoti = function () {
    };
    /*
        提示框关闭后需要调用以下方法恢复其它元素的状态。
    */
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
    /*
        设置容器的横竖校准系数。横竖校准后把系数填入容器即可，无需在场景和提示框等多处重复填入。
    */
    CUIContainer.prototype.setCaRat = function (cr) {
    };
    CUIContainer.prototype.getCaRat = function () {
        return 1;
    };
    CUIContainer.prototype.isVisible = function () {
        return true;
    };
    /*
        显示容器。
    */
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
    /*
        隐藏容器。
    */
    CUIContainer.prototype.hide = function () {
        this.saveVisibleStates();
        var parr = this.getAllPlugins();
        var i;
        for (i = 0; i < parr.length; ++i) {
            parr[i].hide();
        }
    };
    /*
        让容器执行命令。
    */
    CUIContainer.prototype.applyFunc = function (func, argArr) {
    };
    return CUIContainer;
}());
__reflect(CUIContainer.prototype, "CUIContainer", ["IUIContainer", "INotiParent", "gdeint.IHidable"]);
