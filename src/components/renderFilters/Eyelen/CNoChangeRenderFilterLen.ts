/**
 *
 * 1、定义不做任何改变的RenderFilter。
 * 2、作为RenderFilter的基类简化代码。
 *
 */
class CNoChangeRenderFilter implements IEyelen3ERenderFilter {
	public constructor() {
	}

    public setCaRat(caRat: number): void {
    }
    
    public _getCaRat():number {
        return 1;
    }

    public xOConv(v: number): number {
        var ret: number;
        ret = v;
        return ret;
    }

    public xIConv(v: number): number {
        var ret: number;
        ret = v;
        return ret;
    }

    public yOConv(v:number) {
        return v;
    }

    public yIConv(v:number) {
        return v;
    }

    public ptOConv(pt: gdeint.CPoint): gdeint.CPoint {
        var ret:gdeint.CPoint;
        ret = pt;
        return ret;
    }

    public ptIConv(pt: gdeint.CPoint): gdeint.CPoint {
        var ret:gdeint.CPoint;
        ret = pt;
        return ret;
    }

    public rectOConv(rect: gdeint.CRect): gdeint.CRect {
        var ret:gdeint.CRect;
        ret = rect;
        return ret;
    }

    public rectIConv(rect: gdeint.CRect): gdeint.CRect {
        var ret:gdeint.CRect;
        ret = rect;
        return ret;
    }
};
