var CEyelen3EHTTPSResUrlFinder = (function () {
    function CEyelen3EHTTPSResUrlFinder() {
    }
    CEyelen3EHTTPSResUrlFinder.prototype.setInp = function (inp) {
        this.m_inpStr = inp;
    };
    CEyelen3EHTTPSResUrlFinder.prototype.getResult = function () {
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
//# sourceMappingURL=CEyelen3EHTTPSResUrlFinder.js.map