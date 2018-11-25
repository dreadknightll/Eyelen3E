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
 * @author
 *
 */
var CAlertPanelEvent = (function (_super) {
    __extends(CAlertPanelEvent, _super);
    function CAlertPanelEvent(type, bulle, cancel) {
        if (bulle === void 0) { bulle = false; }
        if (cancel === void 0) { cancel = false; }
        return _super.call(this, type, bulle, cancel) || this;
    }
    CAlertPanelEvent.EVT_CLOSE = "EVT_CLOSE";
    return CAlertPanelEvent;
}(egret.Event));
__reflect(CAlertPanelEvent.prototype, "CAlertPanelEvent");
