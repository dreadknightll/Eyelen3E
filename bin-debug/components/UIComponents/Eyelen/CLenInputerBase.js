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
 * 长度输入器基类。
 *
 */
var CLenInputerBase = (function (_super) {
    __extends(CLenInputerBase, _super);
    function CLenInputerBase() {
        return _super.call(this) || this;
    }
    CLenInputerBase.prototype.setWidth = function (wid) {
        g_console.text += "Error!!Abstract class's func called!!'\n";
    };
    CLenInputerBase.prototype.getLen = function () {
        g_console.text += "Error!!Abstract class's func called!!'\n";
        return 0;
    };
    CLenInputerBase.prototype.clearLen = function () {
        g_console.text += "Error!!Abstract class's func called!!'\n";
    };
    CLenInputerBase.prototype.lock = function () {
        g_console.text += "Error!!Abstract class's func called!!'\n";
    };
    CLenInputerBase.prototype.unlock = function () {
        g_console.text += "Error!!Abstract class's func called!!'\n";
    };
    return CLenInputerBase;
}(eui.Component));
__reflect(CLenInputerBase.prototype, "CLenInputerBase");
