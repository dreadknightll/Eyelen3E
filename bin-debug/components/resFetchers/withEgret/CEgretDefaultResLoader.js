/**
 * /src/components/resLoaders/CEgretDefaultResLoader.ts
 * 本资源读取器获取程序默认资源配置文件里描述的资源。
 * 需要和egret关联。
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CEgretDefaultResLoader = (function () {
    function CEgretDefaultResLoader() {
    }
    CEgretDefaultResLoader.prototype.getRes = function (resName) {
        return RES.getRes(resName);
    };
    return CEgretDefaultResLoader;
}());
__reflect(CEgretDefaultResLoader.prototype, "CEgretDefaultResLoader", ["IResWithEgret", "IResFetcher"]);
