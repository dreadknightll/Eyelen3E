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
// UI/scenes/Eyelen/CCommonEyelenPraScene.ts
/**
 *
 * 通用练习场景。简单难度练习场景和困难难度练习场景都从本类派生。
 *
 */
var CCommonEyelenPraScene = (function (_super) {
    __extends(CCommonEyelenPraScene, _super);
    function CCommonEyelenPraScene() {
        var _this = _super.call(this) || this;
        _this.m_NoImgMode = false;
        _this.m_scrMask = new egret.Rectangle();
        _this.m_dlgLayer = new egret.DisplayObjectContainer();
        _this.m_notiLayer = new egret.DisplayObjectContainer();
        _this.m_notiLayerBg = new egret.Shape();
        _this.recoverNotiLayerBg();
        _this.m_notiLayer.visible = false;
        _this.m_notiLayer.addChild(_this.m_notiLayerBg);
        return _this;
    }
    /*
     * 资源加载完成时触发。
     * 正常情况应当调用子类的同名函数。若本类的本函数被调用，则表明子类实现有误。
     */
    /*    public onPraResLoadComplete(evt: CPIPreloaderEvent): void {
        }*/
    /*
     * 开始一轮新的练习。
     */
    CCommonEyelenPraScene.prototype.startNewPra = function () {
        window.alert("startNewPra run terribly!");
    };
    CCommonEyelenPraScene.prototype.setWinWidth = function (w) {
        this.m_winWidth = w;
    };
    CCommonEyelenPraScene.prototype.setWinHeight = function (h) {
        this.m_winHeight = h;
    };
    /*
     * 第一轮练习资源加载完成后创建场景。
     */
    CCommonEyelenPraScene.prototype.createScene = function () {
        this.m_scrMask.x = 0;
        this.m_scrMask.y = 0;
        this.m_scrMask.width = this.m_winWidth;
        this.m_scrMask.height = this.m_winHeight;
        this.mask = this.m_scrMask;
    };
    CCommonEyelenPraScene.prototype.getPM = function () {
        return null;
    };
    CCommonEyelenPraScene.prototype.setLenArr = function (la) {
        window.alert("Len arr set terribly!!Length:" + la.length);
    };
    CCommonEyelenPraScene.prototype.getCurPicTag = function () {
        return -1;
    };
    CCommonEyelenPraScene.prototype.show = function () {
        this.visible = true;
    };
    CCommonEyelenPraScene.prototype.hide = function () {
        this.visible = false;
    };
    CCommonEyelenPraScene.prototype.isVisible = function () {
        return this.visible;
    };
    CCommonEyelenPraScene.prototype.disableScene = function () {
        this.m_notiLayer.visible = true;
        this.enabled = false;
    };
    CCommonEyelenPraScene.prototype.enableScene = function () {
        this.m_notiLayer.visible = false;
        this.enabled = true;
    };
    CCommonEyelenPraScene.prototype._setParentContainer = function (c) {
        this.m_parentContainer = c;
    };
    CCommonEyelenPraScene.prototype._getParentContainer = function () {
        return this.m_parentContainer;
    };
    CCommonEyelenPraScene.prototype.disableForNoti = function () {
        this.disableScene();
    };
    CCommonEyelenPraScene.prototype.resumeAfterNoti = function () {
        this.enableScene();
    };
    CCommonEyelenPraScene.prototype.applyFunc = function (func, argArr) {
        window.alert("applying func!");
    };
    CCommonEyelenPraScene.prototype.getDlgLayer = function () {
        return CDiv2EgretDispOCAdapter.from(this.m_dlgLayer);
    };
    CCommonEyelenPraScene.prototype.getNotiLayer = function () {
        return CDiv2EgretDispOCAdapter.from(this.m_notiLayer);
    };
    CCommonEyelenPraScene.prototype.getParentContainer = function () {
        window.alert("Error! Illegal way to get parent container!!");
        return null;
    };
    CCommonEyelenPraScene.prototype.brightenNotiLayerBgRect = function (r) {
        // Only 1 rect can be rightened at one time.
        this.m_notiLayerBg.graphics.clear();
        this.m_notiLayerBg.graphics.beginFill(0xaaaaaa, 0.6);
        this.m_notiLayerBg.graphics.drawRect(0, 0, g_winWidth, r.m_top);
        this.m_notiLayerBg.graphics.drawRect(0, r.m_top, r.m_left, r.m_height);
        this.m_notiLayerBg.graphics.drawRect(r.m_left + r.m_width, r.m_top, g_winWidth - (r.m_left + r.m_width), r.m_height);
        this.m_notiLayerBg.graphics.drawRect(0, r.m_top + r.m_height, g_winWidth, g_winHeight - (r.m_top + r.m_height));
        this.m_notiLayerBg.graphics.endFill();
    };
    CCommonEyelenPraScene.prototype.recoverNotiLayerBg = function () {
        this.m_notiLayerBg.graphics.clear();
        this.m_notiLayerBg.graphics.beginFill(0xaaaaaa, 0.4);
        this.m_notiLayerBg.graphics.drawRect(0, 0, g_winWidth, g_winHeight);
        this.m_notiLayerBg.graphics.endFill();
    };
    return CCommonEyelenPraScene;
}(eui.Component));
__reflect(CCommonEyelenPraScene.prototype, "CCommonEyelenPraScene", ["IEyelenPraScene", "IScene", "gdeint.IHidable", "INotiParent", "IContainerPlugin"]);
//# sourceMappingURL=CCommonEyelenPraScene.js.map