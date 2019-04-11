declare namespace gdeint {
    interface IRenderFilter {
        xOConv(x: number): number;
        xIConv(x: number): number;
        yOConv(y: number): number;
        yIConv(y: number): number;
        ptOConv(pt: gdeint.CPoint): gdeint.CPoint;
        ptIConv(pt: gdeint.CPoint): gdeint.CPoint;
    }
}
declare namespace gdeint {
    interface IHidable {
        show(): void;
        hide(): void;
        isVisible(): boolean;
    }
}
declare namespace gdeint {
    class CPage implements IPage {
        constructor();
        show(): void;
        hide(): void;
        isVisible(): boolean;
    }
}
declare namespace gdeint {
    class CPageJumper implements IPageJumper {
        constructor();
        setPage(pageName: string, page: IPage): void;
        getPage(pageName: string): IPage;
        isPageReady(pageName: string): boolean;
        gotoPage(pageName: string, readyListener: Function): void;
        getState(): number;
        m_pages: any;
        m_targetPage: string;
        m_curState: number;
    }
}
declare namespace gdeint {
    interface IPage extends IHidable {
    }
}
declare namespace gdeint {
    interface IPageJumper {
        setPage(pageName: string, page: IPage): any;
        isPageReady(pageName: string): boolean;
        gotoPage(pageName: string, readyListener: Function): void;
        getState(): number;
    }
}
declare namespace gdeint {
    /**
     *  /src/components/EintParsers.ts
     * 聚集了自己写的解析器。
     */
    module EintParsers {
        class CaRatParser {
            static parseFloat(str: string): number;
        }
    }
}
declare namespace gdeint {
    interface IRectRenderFilter extends IRenderFilter {
        rectOConv(rect: gdeint.CRect): gdeint.CRect;
        rectIConv(rect: gdeint.CRect): gdeint.CRect;
    }
}
declare namespace gdeint {
    class ImgThumbModelV2 {
        private m_thMaxWidth;
        private m_thMaxHeight;
        private m_imgWidth;
        private m_imgHeight;
        private m_imgSelRect;
        constructor();
        getRat(): number;
        setThMaxWidth(thMaxWidth: any): void;
        setThMaxHeight(thMaxHeight: any): void;
        getThWidth(): number;
        getThHeight(): number;
        getThSelRect(): gdeint.CRect;
        setImgWidth(imgWidth: any): void;
        setImgHeight(imgHeight: any): void;
        getImgSelRect(): gdeint.CRect;
        setImgSelRect(imgSelRect: any): void;
        ip2Tp(ip: any): gdeint.CPoint;
        tp2Ip(tp: any): gdeint.CPoint;
    }
}
declare namespace gdeint {
    interface IRenderFilterWithCa extends IRenderFilter {
        setCaRat(caRat: number): void;
        _getCaRat(): number;
        rectOConv(rect: gdeint.CRect): gdeint.CRect;
        rectIConv(rect: gdeint.CRect): gdeint.CRect;
    }
}
declare namespace gdeint {
    class CTaskListRunner {
        constructor();
        private m_thisObj;
        private m_taskList;
        private m_curTaskTag;
        m_tmpSavedDataPointer: Array<Array<any>>;
        setThisObj(o: any): void;
        setTmpSavedDataCache(dc: Array<Array<any>>): void;
        setTaskList(arr: Array<Array<any>>): void;
        runTasks(): void;
        private runSomeTasks(start, end);
        postCmplEvt(): void;
    }
}
declare namespace gdeint {
    /**
     *  /src/components/EintValidators.ts
     * 聚集了自己写的检验器。例如：检验用户输入的文本是否符合要求。
     */
    module EintValidators {
        class CaRatValidator {
            static validate(str: string): boolean;
        }
    }
}
declare namespace gdeint {
    function randomNums(maxNum: any, cnt: any): any;
    function randomNums_ts(maxNum: number, cnt: number): Array<number>;
    function tailContain(str1: any, str2: any): boolean;
    function objectSize(the_object: any): number;
    function objectValues(the_object: any): string;
}
declare namespace gdeint {
    /**
     *
     * 点结构体。描述点。
     *
     */
    class CPoint {
        m_x: number;
        m_y: number;
        constructor();
    }
}
/**
 *
 * 练习基本元素结构体。尺眼通实现为长度，角眼通实现为角度。
 *
 */
declare namespace gdeint {
    class CPraElemBase {
        constructor();
        m_className: string;
    }
}
/**
 *
 * @author
 *
 */
declare namespace gdeint {
    class ResStruct {
        m_resName: string;
        m_givenSize: number;
    }
    class CPreloadTask {
        m_taskName: string;
        m_resList: Array<ResStruct>;
        m_proportion: number;
    }
}
/**
 *
 * 矩形区域结构体。
 *
 */
declare namespace gdeint {
    class CRect {
        m_left: number;
        m_top: number;
        m_width: number;
        m_height: number;
    }
}
