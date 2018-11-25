var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CEyelen3EHTTPSResUrlFinder = (function () {
    function CEyelen3EHTTPSResUrlFinder() {
    }
    CEyelen3EHTTPSResUrlFinder.prototype.setInp = function (inp) {
        this.m_inpStr = inp;
    };
    CEyelen3EHTTPSResUrlFinder.prototype.getResult = function () {
        //返回得到的资源名。
        var ret;
        ret = "https://www.gdeint.cn/wechatAppData/eyelen/eyelen3E/pics/getImgCrossDomain.php?tag=";
        var temp = parseInt(this.m_inpStr.substr(4, 3));
        if (temp < 10) {
            ret += ("00" + temp.toString());
        }
        else if (temp < 100) {
            ret += ("0" + temp.toString());
        }
        else {
            ret += temp.toString();
        }
        return ret;
    };
    return CEyelen3EHTTPSResUrlFinder;
}());
__reflect(CEyelen3EHTTPSResUrlFinder.prototype, "CEyelen3EHTTPSResUrlFinder", ["IEyelen3EResNameFinder", "IFinder"]);
