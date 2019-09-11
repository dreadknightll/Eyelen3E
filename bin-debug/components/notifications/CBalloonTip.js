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
/**
 *
 * 功能类似 window.alert。区别在于提示的是消息气球而不是对话框。
 *
 */
var eyelen3E;
(function (eyelen3E) {
    var CBalloonTip = (function (_super) {
        __extends(CBalloonTip, _super);
        function CBalloonTip() {
            var _this = _super.call(this) || this;
            _this.m_cc = false;
            _this.x = 0;
            _this.y = 0;
            _this.m_evtClose = new CBalloonTipEvent(CBalloonTipEvent.EVT_CLOSE);
            return _this;
        }
        CBalloonTip.prototype.childrenCreated = function () {
            this.m_cc = true;
            this.content.text = this.cc_content;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
            var tw = egret.Tween.get(this.arrow, { loop: true });
            tw.to({ y: 355 }, 200).wait(300).to({ y: 345 }, 200).wait(100);
        };
        CBalloonTip.prototype.onCloseBtn = function (evt) {
            this.close();
            this.dispatchEvent(this.m_evtClose);
        };
        CBalloonTip.prototype.setContent = function (con) {
            this.cc_content = con;
            if (this.m_cc) {
                this.content.text = this.cc_content;
            }
        };
        return CBalloonTip;
    }(eui.Panel));
    eyelen3E.CBalloonTip = CBalloonTip;
    __reflect(CBalloonTip.prototype, "eyelen3E.CBalloonTip");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CBalloonTip.js.map