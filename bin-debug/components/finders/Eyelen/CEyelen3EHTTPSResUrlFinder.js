var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CEyelen3EHTTPSResUrlFinder = (function () {
    function CEyelen3EHTTPSResUrlFinder() {
    }
    CEyelen3EHTTPSResUrlFinder.prototype.setInp = function (inp) {
        //inp eg: 88 , "4" , "pic002.json" , "img_001.gif" , "img_001_gif"
        this.m_inpStr = inp;
    };
    CEyelen3EHTTPSResUrlFinder.prototype.getResult = function () {
        /*		//返回得到的资源名。
                var ret:string;
                ret = "https://www.gdeint.cn/wechatAppData/eyelen/eyelen3E/pics/getImgCrossDomain.php?tag="
        //		var temp:number = parseInt(this.m_inpStr.substr(4,3));
                var temp:number = parseInt(this.m_inpStr);
                if(temp < 10) {
                    ret += ("00" + temp.toString());
                }
                else if(temp < 100) {
                    ret += ("0" + temp.toString());
                }
                else {
                    ret += temp.toString();
                }
        
                return ret;
        */
        //返回得到的资源URL。
        var ret;
        var strTmpTag;
        var temp;
        if (this.m_inpStr.indexOf(".gif") >= 0 || this.m_inpStr.indexOf("_gif") >= 0 || this.m_inpStr.indexOf("img") >= 0) {
            temp = parseInt(this.m_inpStr.substr(4, 3));
            strTmpTag = "";
            if (temp < 10) {
                strTmpTag = "00" + temp.toString();
            }
            else if (temp < 100) {
                strTmpTag = "0" + temp.toString();
            }
            else {
                strTmpTag = "" + temp.toString();
            }
            ret = "https://www.gdeint.cn/wechatAppData/eyelen/eyelen3E/pics/getImgCrossDomain.php?tag=";
            ret += strTmpTag;
        }
        else {
            if (this.m_inpStr.indexOf(".json") >= 0) {
                temp = parseInt(this.m_inpStr.substr(3, 3));
            }
            else {
                temp = parseInt(this.m_inpStr);
            }
            strTmpTag = "";
            if (temp < 10) {
                strTmpTag = "00" + temp.toString();
            }
            else if (temp < 100) {
                strTmpTag = "0" + temp.toString();
            }
            else {
                strTmpTag = "" + temp.toString();
            }
            ret = "https://www.gdeint.cn/wechatAppData/eyelen/eyelen3E/pics/getPicCrossDomain.php?tag=";
            ret += strTmpTag;
        }
        return ret;
    };
    return CEyelen3EHTTPSResUrlFinder;
}());
__reflect(CEyelen3EHTTPSResUrlFinder.prototype, "CEyelen3EHTTPSResUrlFinder", ["IEyelen3EResNameFinder", "IFinder"]);
