var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CEyelenPraContainer = (function (_super) {
    __extends(CEyelenPraContainer, _super);
    function CEyelenPraContainer() {
        var _this = _super.call(this) || this;
        _this.m_NoImgMode = false;
        _this.m_visibilityTempScene = false;
        _this.m_resNameFinder = new CEyelen3EResNameFinder();
        _this.m_renderFilter = new CEyelen3ERenderFilter();
        _this.m_renderFilter.setCaRat(1);
        return _this;
    }
    CEyelenPraContainer.prototype.setResNameFinder = function (rnf) {
        this.m_resNameFinder = rnf;
    };
    CEyelenPraContainer.prototype.getResNameFinder = function () {
        return this.m_resNameFinder;
    };
    CEyelenPraContainer.prototype.disableForNoti = function () {
        this._getPraScene().disableForNoti();
    };
    CEyelenPraContainer.prototype.resumeAfterNoti = function () {
        this._getPraScene().resumeAfterNoti();
    };
    CEyelenPraContainer.prototype.applyFunc = function (func, argArr) {
        if (null != func) {
            func.apply(this._getPraScene(), argArr);
        }
    };
    CEyelenPraContainer.prototype.setPraScene = function (s) {
        this.m_praScene = s;
        this.m_praScene._setParentContainer(this);
    };
    CEyelenPraContainer.prototype.setCaliDlg = function (d) {
        this.m_caliDlg = d;
        this.m_caliDlg._setParentContainer(this);
    };
    CEyelenPraContainer.prototype.setRenderFilter = function (rf) {
        this.m_renderFilter = rf;
    };
    CEyelenPraContainer.prototype.setPreloaderUI = function (pui) {
        this.m_preloaderUI = pui;
        this.m_preloaderUI._setParentContainer(this);
    };
    CEyelenPraContainer.prototype.setCaRat = function (cr) {
        this.m_renderFilter.setCaRat(cr);
    };
    CEyelenPraContainer.prototype.getCaRat = function () {
        return this.m_renderFilter._getCaRat();
    };
    CEyelenPraContainer.prototype.getDlgLayer = function () {
        return this._getPraScene().getDlgLayer();
    };
    CEyelenPraContainer.prototype.getNotiLayer = function () {
        return this._getPraScene().getNotiLayer();
    };
    CEyelenPraContainer.prototype._getPraScene = function () {
        return this.m_praScene;
    };
    CEyelenPraContainer.prototype._getCaliDlg = function () {
        return this.m_caliDlg;
    };
    CEyelenPraContainer.prototype._getRenderFilter = function () {
        return this.m_renderFilter;
    };
    CEyelenPraContainer.prototype._getPreloaderUI = function () {
        return this.m_preloaderUI;
    };
    CEyelenPraContainer.prototype.show = function () {
        if (this.m_visibilityTempScene) {
            this.m_praScene.show();
        }
        var parr = this.getAllPluginsThis();
        var i;
        for (i = 0; i < parr.length; ++i) {
            if (this.m_visibilityTempArrThis && this.m_visibilityTempArrThis[i]) {
                parr[i].show();
            }
        }
    };
    CEyelenPraContainer.prototype.hide = function () {
        this.m_praScene.hide();
        this.saveVisibleStates();
        var parr = this.getAllPluginsThis();
        var i;
        for (i = 0; i < parr.length; ++i) {
            if (null != parr[i]) {
                parr[i].hide();
            }
        }
    };
    CEyelenPraContainer.prototype.isVisible = function () {
        return true;
    };
    CEyelenPraContainer.prototype.showCaliDlg = function (listener) {
        var caliDlg = this._getCaliDlg();
        caliDlg._setCloseListener(listener);
        caliDlg.show();
    };
    CEyelenPraContainer.prototype.startNewPra = function () {
        this._getPraScene().hide();
        var preloaderUI = this._getPreloaderUI();
        preloaderUI.show();
        preloaderUI.setCompleteListener(this.onPicXMLLoadComplete, this);
        var picXMLTask = new gdeint.CPreloadTask();
        var resListPicXML = new Array();
        this.m_seledPicTagArr = gdeint.randomNums_ts(10, 4);
        var i;
        for (i = 0; i < this.m_seledPicTagArr.length; ++i) {
            resListPicXML[i] = new gdeint.ResStruct();
            this.m_resNameFinder.setInp(this.m_seledPicTagArr[i].toString());
            resListPicXML[i].m_resName = this.m_resNameFinder.getResult();
            resListPicXML[i].m_givenSize = 500;
        }
        picXMLTask.m_resList = resListPicXML;
        if (this.m_NoImgMode) {
            picXMLTask.m_proportion = 101;
        }
        else {
            picXMLTask.m_proportion = 30;
        }
        picXMLTask.m_taskName = "picXMLs";
        preloaderUI.addTask(picXMLTask);
        preloaderUI.setNoTaskLeft(true);
        preloaderUI.startPreload();
    };
    CEyelenPraContainer.prototype.onPicXMLLoadComplete = function () {
        var tmpLens = new Array();
        var curTag;
        for (curTag = 0; curTag < this.m_seledPicTagArr.length; ++curTag) {
            var strResName;
            this.m_resNameFinder.setInp(this.m_seledPicTagArr[curTag].toString());
            strResName = this.m_resNameFinder.getResult();
            var picJsn;
            picJsn = this.m_resLoader.getRes(strResName);
            console.log(picJsn);
            var len = picJsn.pics.pic.lens.len.length;
            var i;
            for (i = 0; i < len; ++i) {
                var tmpLen = new CLen();
                tmpLen.m_className = "CLen";
                tmpLen.m_x = parseFloat(picJsn.pics.pic.lens.len[i].x);
                tmpLen.m_y = parseFloat(picJsn.pics.pic.lens.len[i].y);
                tmpLen.m_length = parseFloat(picJsn.pics.pic.lens.len[i].length);
                var tmpHorStr;
                tmpHorStr = picJsn.pics.pic.lens.len[i].hor;
                if ("1" == tmpHorStr) {
                    tmpLen.m_isHor = true;
                }
                else {
                    tmpLen.m_isHor = false;
                }
                tmpLen.m_imgPath = picJsn.pics.pic.imgPath;
                this.m_resNameFinder.setInp(tmpLen.m_imgPath);
                tmpLen.m2_imgResName = this.m_resNameFinder.getResult();
                tmpLens.push(tmpLen);
            }
        }
        this.m_praScene.setLenArr(tmpLens);
        if (this.m_NoImgMode) {
            this.onPicImgLoadComplete();
        }
        else {
            var preloaderUI = this.m_praScene._getParentContainer()._getPreloaderUI();
            preloaderUI.setNoTaskLeft(false);
            preloaderUI.setCompleteListener(this.onPicImgLoadComplete, this);
            var picImgTask = new gdeint.CPreloadTask();
            var resListPicImg = new Array();
            var i;
            for (i = 0; i < this.m_seledPicTagArr.length; ++i) {
                var tmpImgFileName = "", tmpImgResName = "";
                resListPicImg[i] = new gdeint.ResStruct();
                var resName;
                this.m_resNameFinder.setInp(this.m_seledPicTagArr[i].toString());
                resName = this.m_resNameFinder.getResult();
                var picJsn = this.m_resLoader.getRes(resName);
                tmpImgFileName = picJsn.pics.pic.imgPath;
                this.m_resNameFinder.setInp(tmpImgFileName);
                tmpImgResName = this.m_resNameFinder.getResult();
                resListPicImg[i].m_resName = tmpImgResName;
                resListPicImg[i].m_givenSize = 500;
            }
            picImgTask.m_resList = resListPicImg;
            picImgTask.m_proportion = 72;
            picImgTask.m_taskName = "picImgs";
            preloaderUI.addTask(picImgTask);
            preloaderUI.setNoTaskLeft(true);
            preloaderUI.startPreload();
        }
    };
    CEyelenPraContainer.prototype.onPicImgLoadComplete = function () {
        this.m_preloaderUI.setNextActListener(this.startRunPra, this);
    };
    CEyelenPraContainer.prototype.startRunPra = function () {
        this.m_preloaderUI.clearProgress();
        this._getPreloaderUI().hide();
        this.m_praScene.startNewPra();
        this._getPraScene().show();
    };
    CEyelenPraContainer.prototype._quitPra = function () {
    };
    CEyelenPraContainer.prototype.setQuitHandler = function (func) {
    };
    CEyelenPraContainer.prototype.getAllPluginsThis = function () {
        var ret = new Array();
        ret[0] = (this._getAlertDlg());
        ret[1] = this._getConfirmDlg();
        ret[2] = this.m_caliDlg;
        ret[3] = this.m_preloaderUI;
        return ret;
    };
    CEyelenPraContainer.prototype.saveVisibleStates = function () {
        this.m_visibilityTempArrThis = new Array();
        this.m_visibilityTempScene = this.m_praScene.isVisible();
        var plugins = this.getAllPluginsThis();
        var i;
        for (i = 0; i < plugins.length; ++i) {
            if (null != plugins[i]) {
                this.m_visibilityTempArrThis[i] = plugins[i].isVisible();
            }
        }
    };
    CEyelenPraContainer.prototype.getVisibleStates = function () {
        return this.m_visibilityTempArrThis;
    };
    return CEyelenPraContainer;
}(CUIContainer));
//# sourceMappingURL=CEyelenPraContainer.js.map