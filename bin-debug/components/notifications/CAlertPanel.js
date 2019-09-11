/***********************************************************
* /src/components/notifications/CAlertPanel.ts
* 功能类似于 window.alert 。作为显示容器的插件使用。
*
************************************************************/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var eyelen3E;
(function (eyelen3E) {
    var CAlertPanel = (function (_super) {
        __extends(CAlertPanel, _super);
        function CAlertPanel() {
            var _this = _super.call(this) || this;
            _this.m_cc = false;
            _this.visible = false;
            _this.x = 0;
            _this.y = 0;
            return _this;
        }
        /*
            设置父窗体。
        */
        CAlertPanel.prototype.setParent = function (p) {
            this.m_parent = p;
        };
        CAlertPanel.prototype.getParent = function () {
            return this.m_parent;
        };
        CAlertPanel.prototype.setCloseListener = function (func) {
            this.m_closeListener = func;
        };
        /*
            设置要提示的内容。
        */
        CAlertPanel.prototype.setContent = function (con) {
            this.cc_content = con;
            if (this.m_cc) {
                this.content.text = this.cc_content;
            }
        };
        /*
            显示警告框。
        */
        CAlertPanel.prototype.showDlg = function () {
            this.getParent().getNotiLayer().addChild(CDispObj2EgretDOAdapter.from(this));
            this.getParent().getNotiLayer().show();
            this.visible = true;
            this.getParent().disableForNoti();
        };
        /*
            传入父场景的大小和坐标偏移量，以便根据父场景确定本框的显示位置。
        */
        CAlertPanel.prototype.setSceneRect = function (x, y, wid, hei) {
            this.x = x + (wid - 300) / 2;
            this.y = y + (hei - 300) / 5 * 2;
        };
        /*
            设置父容器。因实现多接口所以难以避免代码重复。
        */
        CAlertPanel.prototype._setParentContainer = function (pc) {
            this.m_parentContainer = pc;
        };
        CAlertPanel.prototype._getParentContainer = function () {
            window.alert("Don't use _getParentContainer() here. Use getParent() instead.");
            return this.m_parentContainer;
        };
        CAlertPanel.prototype.childrenCreated = function () {
            this.m_cc = true;
            this.content.text = this.cc_content;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        };
        CAlertPanel.prototype.onCloseBtn = function (evt) {
            this.visible = false;
            this.getParent().getNotiLayer().hide(); //.visible = false;
            this.getParent().applyFunc(this.m_closeListener, null);
            this.getParent().resumeAfterNoti();
        };
        CAlertPanel.prototype.show = function () {
            this.visible = true;
        };
        CAlertPanel.prototype.hide = function () {
            this.visible = false;
        };
        CAlertPanel.prototype.isVisible = function () {
            return this.visible;
        };
        return CAlertPanel;
    }(eui.Panel));
    eyelen3E.CAlertPanel = CAlertPanel;
    __reflect(CAlertPanel.prototype, "eyelen3E.CAlertPanel", ["IAlertDlg", "INotification", "IContainerPlugin", "gdeint.IHidable"]);
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CAlertPanel.js.map