var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CEyelen3EResNameFinder = (function () {
    function CEyelen3EResNameFinder() {
    }
    CEyelen3EResNameFinder.prototype.setInp = function (inp) {
        //inp eg: 88 , "4" , "pic002.json" , "img_001.gif" , "img_001_gif"
        this.m_inpStr = inp;
    };
    CEyelen3EResNameFinder.prototype.getResult = function () {
        //返回得到的资源名。
        var ret;
        var temp;
        if (this.m_inpStr.indexOf(".gif") >= 0 || this.m_inpStr.indexOf("_gif") >= 0 || this.m_inpStr.indexOf("img") >= 0) {
            temp = parseInt(this.m_inpStr.substr(4, 3));
            if (temp < 10) {
                ret = "img_00" + temp.toString();
            }
            else if (temp < 100) {
                ret = "img_0" + temp.toString();
            }
            else {
                ret = "img_" + temp.toString();
            }
            ret += "_gif";
        }
        else {
            if (this.m_inpStr.indexOf(".json") >= 0) {
                temp = parseInt(this.m_inpStr.substr(3, 3));
            }
            else {
                temp = parseInt(this.m_inpStr);
            }
            if (temp < 10) {
                ret = "pic00" + temp.toString();
            }
            else if (temp < 100) {
                ret = "pic0" + temp.toString();
            }
            else {
                ret = "pic" + temp.toString();
            }
            ret += "_json";
        }
        return ret;
    };
    return CEyelen3EResNameFinder;
}());
__reflect(CEyelen3EResNameFinder.prototype, "CEyelen3EResNameFinder", ["IEyelen3EResNameFinder", "IFinder"]);
//# sourceMappingURL=CEyelen3EResNameFinder.js.map