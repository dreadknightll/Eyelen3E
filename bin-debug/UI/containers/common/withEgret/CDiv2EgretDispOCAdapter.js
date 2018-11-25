var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CDiv2EgretDispOCAdapter = (function () {
    function CDiv2EgretDispOCAdapter() {
    }
    CDiv2EgretDispOCAdapter.from = function (edoc) {
        var ret = new CDiv2EgretDispOCAdapter();
        ret.m_adaptee = edoc;
        return ret;
    };
    CDiv2EgretDispOCAdapter.prototype.addChild = function (c) {
        this.m_adaptee.addChild(c.m_adaptee);
    };
    CDiv2EgretDispOCAdapter.prototype.show = function () {
        this.m_adaptee.visible = true;
    };
    CDiv2EgretDispOCAdapter.prototype.hide = function () {
        this.m_adaptee.visible = false;
    };
    CDiv2EgretDispOCAdapter.prototype.toEgretDispObjContainer = function () {
        return this.m_adaptee;
    };
    return CDiv2EgretDispOCAdapter;
}());
__reflect(CDiv2EgretDispOCAdapter.prototype, "CDiv2EgretDispOCAdapter", ["IDivWithEgret", "IDiv", "IDispObj"]);
