/**
 *
 * @author 
 *
 */
interface IPresenterWithCa {
    setRenderFilter(rf:gdeint.IRenderFilterWithCa): void;
    getRenderFilter():gdeint.IRenderFilterWithCa;
    setCaRat(caRat:number): void;
}