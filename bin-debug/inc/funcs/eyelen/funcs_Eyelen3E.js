/*
 * 函数杂烩（尺眼通3加强版专用函数）。
 */
function getImgResNameByPicTag(picTag) {
    var tmpResName;
    if (picTag < 10) {
        tmpResName = "img_00" + picTag;
    }
    else if (picTag < 100) {
        tmpResName = "img_0" + picTag;
    }
    else {
        tmpResName = "img_" + picTag;
    }
    return tmpResName;
}
function getHTTPSImgURLByPicTag(picTag) {
    var ret, strTag;
    ret = "https://www.gdeint.cn/wechatAppData/eyelen/eyelen3E/pics/getImgCrossDomain.php?tag=";
    if (picTag < 10) {
        strTag = "00" + picTag;
    }
    else if (picTag < 100) {
        strTag = "0" + picTag;
    }
    else {
        strTag = "" + picTag;
    }
    ret += strTag;
    return ret;
}
function getImgResNameByFileName(fileName) {
    return fileName.substr(0, 7);
}
/*function tag2PicResName_Eyelen(tag:number):string {
    function _isInteger(obj) {
        return obj%1 === 0;
    }
    var ret:string = "";

    if(!_isInteger(tag) || tag <= 0 || tag >= 1000) {
        ret = "";
    }
    else if(tag < 10) {
        ret = "pic00" + tag;
    }
    else if(tag <100) {
        ret = "pic0" + tag;
    }
    else {
        ret = "pic" + tag;
    }
    ret += "_json";

    return ret;
}*/
/*
function tag2HTTPSPicResUrl_Eyelen(tag:number):string {

    function _isInteger(obj) {
        return obj%1 === 0;
    }

    var strTag:string = "";
    var ret:string = "";

    if(!_isInteger(tag) || tag <= 0 || tag >= 1000) {
        ret = "";
    }
    else {
        if(tag < 10) {
            strTag = "00" + tag;
        }
        else if(tag <100) {
            strTag = "0" + tag;
        }
        else {
            strTag = "" + tag;
        }
        ret = "https://www.gdeint.cn/wechatAppData/eyelen/eyelen3E/pics/getPicCrossDomain.php?tag="+strTag;
    }
    return ret;
}
*/
//# sourceMappingURL=funcs_Eyelen3E.js.map