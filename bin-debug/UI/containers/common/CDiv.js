var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CDiv = (function () {
    function CDiv() {
    }
    CDiv.prototype.show = function () {
    };
    CDiv.prototype.hide = function () {
    };
    CDiv.prototype.addChild = function (IDispObj) {
    };
    return CDiv;
}());
__reflect(CDiv.prototype, "CDiv", ["IDiv", "IDispObj"]);
