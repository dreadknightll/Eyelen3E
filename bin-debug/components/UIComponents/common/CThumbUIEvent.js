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
var CThumbUIEvent = (function (_super) {
    __extends(CThumbUIEvent, _super);
    function CThumbUIEvent(type, bulle, cancel) {
        if (bulle === void 0) { bulle = false; }
        if (cancel === void 0) { cancel = false; }
        var _this = _super.call(this, type, bulle, cancel) || this;
        _this.m_tchX = 0;
        _this.m_tchY = 0;
        return _this;
    }
    CThumbUIEvent.EVT_THUMB_TAP = "EVT_THUMB_TAP";
    return CThumbUIEvent;
}(egret.Event));
__reflect(CThumbUIEvent.prototype, "CThumbUIEvent");
//# sourceMappingURL=CThumbUIEvent.js.map