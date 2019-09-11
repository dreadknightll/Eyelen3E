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
 * 最终得分显示对话框事件。
 *
 */
var CFinalScoreDlgEvent = (function (_super) {
    __extends(CFinalScoreDlgEvent, _super);
    function CFinalScoreDlgEvent(type, bulle, cancel) {
        if (bulle === void 0) { bulle = false; }
        if (cancel === void 0) { cancel = false; }
        return _super.call(this, type, bulle, cancel) || this;
    }
    CFinalScoreDlgEvent.EVT_REPLAY_BTN_TAP = "EVT_REPLAY_BTN_TAP";
    return CFinalScoreDlgEvent;
}(egret.Event));
__reflect(CFinalScoreDlgEvent.prototype, "CFinalScoreDlgEvent");
//# sourceMappingURL=CFinalScoreDlgEvent.js.map