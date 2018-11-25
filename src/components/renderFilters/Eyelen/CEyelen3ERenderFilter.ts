/**********************************************************
 * /src/components/renderFilters/Eyelen/CEyelen3ERenderFilter.ts
 * 图像显示过滤器。用于调整图像输出。主要是应用横竖校准系数。可单元测试。
 *
 **********************************************************/

class CEyelen3ERenderFilter implements IEyelen3ERenderFilter {
	public constructor() {
        this.m_caRat = 1;
	}

	public m_caRat:number;

    public setCaRat(caRat: number): void {
        this.m_caRat = caRat;
    }

    public _getCaRat():number {
        return this.m_caRat;
    }

    /*
     * 计算某一横宽经过滤后在屏幕输出的宽度。除了适用于x坐标还适用于水平线段的长度。
     */ 
    public xOConv(v: number): number {
        var ret:number;
        ret = v*this.m_caRat;
        return ret;
    }

    public xIConv(v: number): number {
        var ret: number;
        ret = v / this.m_caRat;
        return ret;
    }

    public yOConv(v:number) {
        return v;
    }

    public yIConv(v:number) {
        return v;
    }

    /*
     * 计算某一点经过滤后在屏幕上的坐标。
     */ 
    public ptOConv(pt: gdeint.CPoint): gdeint.CPoint {
        var ret:gdeint.CPoint;
        ret = new gdeint.CPoint();

        ret.m_x = this.xOConv(pt.m_x);
        ret.m_y = pt.m_y;

        return ret;
    }

    /*
     * 计算某一屏幕点在过滤前的原始坐标。
     */ 
    public ptIConv(pt: gdeint.CPoint): gdeint.CPoint {
        var ret:gdeint.CPoint;
        ret = new gdeint.CPoint(); 
        ret.m_x = pt.m_x / this.m_caRat;
        ret.m_y = pt.m_y;
        return ret;
    }

    /*
     * 计算某一原始区域过滤输出后的屏幕区域。
     */ 
    public rectOConv(rect: gdeint.CRect): gdeint.CRect {
        var ret:gdeint.CRect;
        ret = new gdeint.CRect;
        ret.m_left = rect.m_left*this.m_caRat;
        ret.m_top = rect.m_top;
        ret.m_width = rect.m_width*this.m_caRat;
        ret.m_height = rect.m_height;
        return ret;
    }

    /*
     * 计算某一屏幕区域在过滤前的原始区域。
     */ 
    public rectIConv(rect: gdeint.CRect): gdeint.CRect {
        var ret:gdeint.CRect;
        ret = new gdeint.CRect();
        ret.m_left = rect.m_left / this.m_caRat;
        ret.m_top = rect.m_top;
        ret.m_width = rect.m_width / this.m_caRat;
        ret.m_height = rect.m_height;
        return ret;
    }
};
