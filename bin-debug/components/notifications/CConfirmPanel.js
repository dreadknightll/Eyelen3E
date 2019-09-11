/***********************************************************
* /src/components/notifications/CConfirmPanel.ts
* 功能类似于 window.confirm 。作为显示容器的插件使用。
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
    var CConfirmPanel = (function (_super) {
        __extends(CConfirmPanel, _super);
        function CConfirmPanel() {
            var _this = _super.call(this) || this;
            _this.m_cc = false;
            _this.m_ret = false;
            _this.x = 0;
            _this.y = 0;
            return _this;
        }
        CConfirmPanel.prototype.setParent = function (p) {
            this.m_parent = p;
        };
        CConfirmPanel.prototype.getParent = function () {
            return this.m_parent;
        };
        CConfirmPanel.prototype.setCloseListener = function (func) {
            this.m_closeListener = func;
        };
        CConfirmPanel.prototype._setContent = function (content) {
            this.m_content = content;
            if (this.m_cc) {
                this.content.text = this.m_content;
            }
        };
        CConfirmPanel.prototype.showDlg = function () {
            this.title = "确认";
            var ret;
            this.getParent().getNotiLayer().addChild(CDispObj2EgretDOAdapter.from(this));
            this.getParent().getNotiLayer().show();
            this.show();
            this.getParent().disableForNoti();
            this.addEventListener(CConfirmPanelEvent.EVT_CLOSE, this.m_closeListener, this.getParent());
        };
        CConfirmPanel.prototype._getParentContainer = function () {
            window.alert("Don't use _getParentContainer() here. Use getParent() instead.");
            return this.m_parentContainer;
        };
        CConfirmPanel.prototype._setParentContainer = function (c) {
            this.m_parentContainer = c;
        };
        CConfirmPanel.prototype.getResult = function () {
            return false;
        };
        CConfirmPanel.prototype.setSceneRect = function (x, y, wid, hei) {
            this.x = x + (wid - 400) / 2;
            this.y = y + (hei - 280) / 5 * 2;
        };
        CConfirmPanel.prototype.childrenCreated = function () {
            this.m_cc = true;
            this.content.text = this.m_content;
            this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
            this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNoBtn, this);
            this.m_bg = new egret.Shape();
            this.m_bg.graphics.beginFill(0xaaaaFF);
            this.m_bg.graphics.drawRect(0, 0, this.width, this.height);
            this.m_bg.graphics.endFill();
            this.bgGrp.addChild(this.m_bg);
        };
        CConfirmPanel.prototype.onYesBtn = function (evt) {
            this.m_ret = true;
            this.getParent().getNotiLayer().hide();
            this.close();
            var params = new Array();
            params[0] = this.m_ret;
            this.getParent().applyFunc(this.m_closeListener, params);
            this.getParent().resumeAfterNoti();
        };
        CConfirmPanel.prototype.onNoBtn = function (evt) {
            this.m_ret = false;
            this.getParent().getNotiLayer().hide();
            this.close();
            var params = new Array();
            params[0] = this.m_ret;
            this.getParent().applyFunc(this.m_closeListener, params);
            this.getParent().resumeAfterNoti();
        };
        CConfirmPanel.prototype.getRet = function () {
            return this.m_ret;
        };
        CConfirmPanel.prototype.show = function () {
            this.visible = true;
        };
        CConfirmPanel.prototype.hide = function () {
            this.visible = false;
        };
        CConfirmPanel.prototype.isVisible = function () {
            return this.visible;
        };
        return CConfirmPanel;
    }(eui.Panel));
    eyelen3E.CConfirmPanel = CConfirmPanel;
    __reflect(CConfirmPanel.prototype, "eyelen3E.CConfirmPanel", ["IConfirmDlg", "INotification", "IContainerPlugin", "gdeint.IHidable"]);
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CConfirmPanel.js.map