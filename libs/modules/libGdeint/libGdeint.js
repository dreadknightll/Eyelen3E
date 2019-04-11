var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gdeint;
(function (gdeint) {
    var CPage = (function () {
        function CPage() {
        }
        CPage.prototype.show = function () {
        };
        CPage.prototype.hide = function () {
        };
        CPage.prototype.isVisible = function () {
            return true;
        };
        return CPage;
    }());
    gdeint.CPage = CPage;
    __reflect(CPage.prototype, "gdeint.CPage", ["gdeint.IPage", "gdeint.IHidable"]);
})(gdeint || (gdeint = {}));
var gdeint;
(function (gdeint) {
    var CPageJumper = (function () {
        function CPageJumper() {
            this.m_pages = {};
            this.m_curState = 0;
        }
        CPageJumper.prototype.setPage = function (pageName, page) {
            this.m_pages[pageName] = page;
        };
        CPageJumper.prototype.getPage = function (pageName) {
            return this.m_pages[pageName];
        };
        CPageJumper.prototype.isPageReady = function (pageName) {
            return false;
        };
        CPageJumper.prototype.gotoPage = function (pageName, readyListener) {
            this.m_targetPage = pageName;
            var curPage;
            curPage = this.m_pages[pageName];
            //		if(curPage.isReady()) {
            curPage.show();
            //	Hide other pages:
            for (var tmpKey in this.m_pages) {
                if (tmpKey != pageName) {
                    if (undefined != this.m_pages[tmpKey]) {
                        this.m_pages[tmpKey].hide();
                    }
                }
            }
            //		}
            //		else {
            //			add to action queue.
            //		}
        };
        /*	pubilc onPageLoadReady(pageName:string):void {
                pageName
            }*/
        CPageJumper.prototype.getState = function () {
            //1、Idle state 2、Jumping state(Target set and waiting to jump)
            return this.m_curState;
        };
        return CPageJumper;
    }());
    gdeint.CPageJumper = CPageJumper;
    __reflect(CPageJumper.prototype, "gdeint.CPageJumper", ["gdeint.IPageJumper"]);
})(gdeint || (gdeint = {}));
var gdeint;
(function (gdeint) {
    /**
     *  /src/components/EintParsers.ts
     * 聚集了自己写的解析器。
     */
    var EintParsers;
    (function (EintParsers) {
        var CaRatParser = (function () {
            function CaRatParser() {
            }
            CaRatParser.parseFloat = function (str) {
                //  Least result: 0.001
                var ret;
                ret = parseFloat(str);
                if (isNaN(ret) || ret < 0.001) {
                    ret = 0.001;
                }
                return ret;
            };
            return CaRatParser;
        }());
        EintParsers.CaRatParser = CaRatParser;
        __reflect(CaRatParser.prototype, "gdeint.EintParsers.CaRatParser");
    })(EintParsers = gdeint.EintParsers || (gdeint.EintParsers = {}));
})(gdeint || (gdeint = {}));
/*
 *  /src/components/ImgThumbModelV2.ts
 *
 * 图形与缩略图转换器。用于处理缩略图尺寸计算、原图与缩略图坐标映射等。
 * 注：本类仅用于计算，切勿用于存储数据。
 *
 * 缩略图尺寸的计算：
 *  缩略图应满足的条件：1、不超出指定的最大宽度和最大高度。 2、宽高比和原图一致。
 *  符合条件的最大尺寸为最终缩略图的尺寸。
 *
 */
var gdeint;
(function (gdeint) {
    var ImgThumbModelV2 = (function () {
        function ImgThumbModelV2() {
            this.m_thMaxWidth = 0;
            this.m_thMaxHeight = 0;
            this.m_imgWidth = 0;
            this.m_imgHeight = 0;
            this.m_imgSelRect = new gdeint.CRect();
        }
        /*
        * 获取原图与缩略图的比例。
        */
        ImgThumbModelV2.prototype.getRat = function () {
            var rat1, rat2;
            rat1 = this.m_imgWidth / this.m_thMaxWidth;
            rat2 = this.m_imgHeight / this.m_thMaxHeight;
            return rat1 > rat2 ? rat1 : rat2;
        };
        /*
        * 设置缩略图区域的最大宽度。缩略图要维持原图的宽高比，同时不能超过此最大宽度。
        */
        ImgThumbModelV2.prototype.setThMaxWidth = function (thMaxWidth) {
            this.m_thMaxWidth = thMaxWidth;
        };
        /*
        * 设置缩略图区域的最大高度。缩略图要维持原图的宽高比，同时不能超过此最大高度。
        */
        ImgThumbModelV2.prototype.setThMaxHeight = function (thMaxHeight) {
            this.m_thMaxHeight = thMaxHeight;
        };
        /*
        * 计算并获取缩略图宽度。
        */
        ImgThumbModelV2.prototype.getThWidth = function () {
            return this.m_imgWidth / this.getRat();
        };
        /*
        * 计算并获取缩略图高度。
        */
        ImgThumbModelV2.prototype.getThHeight = function () {
            return this.m_imgHeight / this.getRat();
        };
        /*
        * 获取缩略图选区。
        */
        ImgThumbModelV2.prototype.getThSelRect = function () {
            var retRect = new gdeint.CRect();
            retRect.m_left = this.m_imgSelRect.m_left / this.getRat();
            retRect.m_top = this.m_imgSelRect.m_top / this.getRat();
            retRect.m_width = this.m_imgSelRect.m_width / this.getRat();
            retRect.m_height = this.m_imgSelRect.m_height / this.getRat();
            return retRect;
        };
        /*
        * 设置原图宽度。
        */
        ImgThumbModelV2.prototype.setImgWidth = function (imgWidth) {
            this.m_imgWidth = imgWidth;
        };
        /*
        * 设置原图高度。
        */
        ImgThumbModelV2.prototype.setImgHeight = function (imgHeight) {
            this.m_imgHeight = imgHeight;
        };
        ImgThumbModelV2.prototype.getImgSelRect = function () {
            return this.m_imgSelRect;
        };
        /*
        * 设置原图选取。
        */
        ImgThumbModelV2.prototype.setImgSelRect = function (imgSelRect) {
            this.m_imgSelRect = imgSelRect;
        };
        /*
        * 获取原图上某点对应缩略图上的点。
        */
        ImgThumbModelV2.prototype.ip2Tp = function (ip) {
            var ret = new gdeint.CPoint();
            ret.m_x = ip.m_x / this.getRat();
            ret.m_y = ip.m_y / this.getRat();
            return ret;
        };
        /*
        * 获取缩略图上某点对应原图上的点。
        */
        ImgThumbModelV2.prototype.tp2Ip = function (tp) {
            var ret = new gdeint.CPoint();
            ret.m_x = tp.m_x / this.getThWidth() * this.m_imgWidth;
            ret.m_y = tp.m_y / this.getThHeight() * this.m_imgHeight;
            return ret;
        };
        return ImgThumbModelV2;
    }());
    gdeint.ImgThumbModelV2 = ImgThumbModelV2;
    __reflect(ImgThumbModelV2.prototype, "gdeint.ImgThumbModelV2");
})(gdeint || (gdeint = {}));
var gdeint;
(function (gdeint) {
    /*
        使用方法：new -> setThisObj -> setTmpSavedDataCache -> setTaskList -> runTasks
    */
    var CTaskListRunner = (function () {
        function CTaskListRunner() {
            this.m_curTaskTag = 0;
            /* m_tmpSavedDataPointer 实际上是指向一维数组的指针。
               通过本指针可重新定义数组大小等。对m_tmpSavedDataPointer[0]进行new操作即可。
               m_tmpSavedDataPointer[1]不合法，请勿访问。*/
            this.m_tmpSavedDataPointer = null;
        }
        CTaskListRunner.prototype.setThisObj = function (o) {
            this.m_thisObj = o;
        };
        CTaskListRunner.prototype.setTmpSavedDataCache = function (dc) {
            this.m_tmpSavedDataPointer = dc;
        };
        CTaskListRunner.prototype.setTaskList = function (arr) {
            this.m_taskList = arr;
            this.m_curTaskTag = 0;
        };
        CTaskListRunner.prototype.runTasks = function () {
            this.runSomeTasks(0, this.m_taskList.length - 1);
        };
        CTaskListRunner.prototype.runSomeTasks = function (start, end) {
            this.m_curTaskTag = start;
            if (start > end) {
                return;
            }
            else {
                (this.m_taskList[start][0]).apply(this.m_thisObj, [this.m_taskList[start][1], this]);
            }
        };
        CTaskListRunner.prototype.postCmplEvt = function () {
            ++this.m_curTaskTag;
            this.runSomeTasks(this.m_curTaskTag, this.m_taskList.length - 1);
        };
        return CTaskListRunner;
    }());
    gdeint.CTaskListRunner = CTaskListRunner;
    __reflect(CTaskListRunner.prototype, "gdeint.CTaskListRunner");
})(gdeint || (gdeint = {}));
var gdeint;
(function (gdeint) {
    /**
     *  /src/components/EintValidators.ts
     * 聚集了自己写的检验器。例如：检验用户输入的文本是否符合要求。
     */
    var EintValidators;
    (function (EintValidators) {
        var CaRatValidator = (function () {
            function CaRatValidator() {
            }
            CaRatValidator.validate = function (str) {
                var ret;
                ret = true;
                var tmp = parseFloat(str);
                if (isNaN(tmp) || tmp < 0.00001) {
                    ret = false;
                }
                return ret;
            };
            return CaRatValidator;
        }());
        EintValidators.CaRatValidator = CaRatValidator;
        __reflect(CaRatValidator.prototype, "gdeint.EintValidators.CaRatValidator");
    })(EintValidators = gdeint.EintValidators || (gdeint.EintValidators = {}));
})(gdeint || (gdeint = {}));
/*
 *
 * 函数杂烩（不关联egret）。
 *
 */
var gdeint;
(function (gdeint) {
    function randomNums(maxNum, cnt) {
        var ret;
        ret = new Array();
        var i;
        for (i = 0; i < cnt; ++i) {
            var tmp;
            tmp = Math.round(1 + ((maxNum - 1) * Math.random()));
            var j = 0;
            for (j = 0; j < i; ++j) {
                if (ret[j] == tmp) {
                    tmp = Math.round(1 + ((maxNum - 1) * Math.random()));
                    j = -1; // 重新查找是否有重复。
                }
            }
            ret.push(tmp);
        }
        return ret;
    }
    gdeint.randomNums = randomNums;
    function randomNums_ts(maxNum, cnt) {
        var ret;
        ret = [];
        var tmp = randomNums(maxNum, cnt);
        var i;
        for (i = 0; i < tmp.length; ++i) {
            ret[i] = tmp[i];
        }
        return ret;
    }
    gdeint.randomNums_ts = randomNums_ts;
    function tailContain(str1, str2) {
        if (null == str2) {
            return true;
        }
        if (null == str1) {
            return false;
        }
        if (str1.length < str2.length) {
            return false;
        }
        var strStart = str1.length - str2.length;
        var strLen = str2.length;
        if (str1.substr(strStart, strLen) == str2) {
            return true;
        }
        return false;
    }
    gdeint.tailContain = tailContain;
    // 对Date的扩展，将 Date 转化为指定格式的String   
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
    // 例子：   
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    (Date.prototype).Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    /*
     * 函数杂烩（通用函数）。
     */
    function objectSize(the_object) {
        /* function to validate the existence of each key in the object to get the number of valid keys. */
        var object_size = 0;
        var key;
        for (key in the_object) {
            if (the_object.hasOwnProperty(key)) {
                object_size++;
            }
        }
        return object_size;
    }
    gdeint.objectSize = objectSize;
    function objectValues(the_object) {
        /* function to validate the existence of each key in the object to get the number of valid keys. */
        var ret = "";
        var key;
        for (key in the_object) {
            if (the_object.hasOwnProperty(key)) {
                ret += "" + key + "=>" + eval("the_object." + key);
                ret += "\n";
            }
        }
        return ret;
    }
    gdeint.objectValues = objectValues;
})(gdeint || (gdeint = {}));
var gdeint;
(function (gdeint) {
    /**
     *
     * 点结构体。描述点。
     *
     */
    var CPoint = (function () {
        function CPoint() {
        }
        return CPoint;
    }());
    gdeint.CPoint = CPoint;
    __reflect(CPoint.prototype, "gdeint.CPoint");
})(gdeint || (gdeint = {}));
/**
 *
 * 练习基本元素结构体。尺眼通实现为长度，角眼通实现为角度。
 *
 */
var gdeint;
(function (gdeint) {
    var CPraElemBase = (function () {
        function CPraElemBase() {
            this.m_className = "CPraElemBase";
        }
        return CPraElemBase;
    }());
    gdeint.CPraElemBase = CPraElemBase;
    __reflect(CPraElemBase.prototype, "gdeint.CPraElemBase");
})(gdeint || (gdeint = {}));
/**
 *
 * @author
 *
 */
var gdeint;
(function (gdeint) {
    var ResStruct = (function () {
        function ResStruct() {
        }
        return ResStruct;
    }());
    gdeint.ResStruct = ResStruct;
    __reflect(ResStruct.prototype, "gdeint.ResStruct");
    ;
    var CPreloadTask = (function () {
        function CPreloadTask() {
        }
        return CPreloadTask;
    }());
    gdeint.CPreloadTask = CPreloadTask;
    __reflect(CPreloadTask.prototype, "gdeint.CPreloadTask");
    ;
})(gdeint || (gdeint = {}));
/**
 *
 * 矩形区域结构体。
 *
 */
var gdeint;
(function (gdeint) {
    var CRect = (function () {
        function CRect() {
        }
        return CRect;
    }());
    gdeint.CRect = CRect;
    __reflect(CRect.prototype, "gdeint.CRect");
})(gdeint || (gdeint = {}));
