var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CNetResLoaderWithEgret = (function () {
    function CNetResLoaderWithEgret() {
    }
    CNetResLoaderWithEgret.prototype.getRes = function (resName) {
        var resStru;
        resStru = g_resCache[resName];
        if (resStru.m_isInCache) {
            return resStru.m_resCache;
        }
        else {
            return null;
        }
    };
    return CNetResLoaderWithEgret;
}());
__reflect(CNetResLoaderWithEgret.prototype, "CNetResLoaderWithEgret", ["IResWithEgret", "IResFetcher"]);
//# sourceMappingURL=CNetResLoaderWithEgret.js.map