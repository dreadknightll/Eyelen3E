/**
 *
 * @author 
 *
 */
interface IEyelen3EPraEasyPresenter extends IPraPresenter,IPresenterWithThumb,IPresenterWithCa {

    showLen(len: CLen): void;
//    setLenArr(lenArr: Array<CLen>): void;

    getLen(): CLen;

    setImgWidth(w:number): void;
    setImgHeight(h: number): void;
    getImgWidth(): number;
    getImgHeight(): number;
    setCaRat(caRat:number): void;

    setUserGridCnt(gcnt: number): void;
    submitLen(): void;
    nextLen(): void;
    getCurRank(): number;

    getImgRect(): gdeint.CRect;
    getThumbRect(): gdeint.CRect;
    getThumbSelRect(): gdeint.CRect;

    getLenEdge1DispRect():gdeint.CRect;
    getLenQuestionerDispPt():gdeint.CPoint;
    getLenQuestionerFontSize():number;
    getLenEdge2DispRect():gdeint.CRect;

}
