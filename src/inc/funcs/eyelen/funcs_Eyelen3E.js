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
//# sourceMappingURL=funcs_Eyelen3E.js.map