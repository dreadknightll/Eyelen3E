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
    var CPrivacyPanel = (function (_super) {
        __extends(CPrivacyPanel, _super);
        function CPrivacyPanel() {
            var _this = _super.call(this) || this;
            _this.s_PriText = "\n\
			    只需要使用修改当前设置权限让内容正确显示（修改分辨率、语言、字体等）。\n\
			    不需要其它权限，如：完全的互联网访问、存储、读取本机识别码、通讯录访问、读取位置信息等。如有申请，禁止即可。\n\
			    建议在权限管理中禁用除修改当前设置外的所有权限。\n\
			    本app不会向用户索取私人信息。";
            return _this;
        }
        //		m_content:Label;
        CPrivacyPanel.prototype.childrenCreated = function () {
            this.contentLabel.text = this.s_PriText;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTap, this);
        };
        CPrivacyPanel.prototype.onCloseBtnTap = function (e) {
            this.visible = false;
        };
        return CPrivacyPanel;
    }(eui.Component));
    eyelen3E.CPrivacyPanel = CPrivacyPanel;
    __reflect(CPrivacyPanel.prototype, "eyelen3E.CPrivacyPanel");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CPrivacyPanel.js.map