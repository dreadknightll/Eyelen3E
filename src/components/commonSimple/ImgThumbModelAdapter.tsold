/**
 *
 * /src/components/ImgThumbModelAdapter.ts
 * 
 * ImgThumbModel 的转接器。把 ImgThumbModel 转接成 Typescript 以便调用。
 *
 * 使用方法：setImgWidth/setImgHeight —> setThMaxWidth/setThMaxHeight —> getThWidth/getThHeight —> ……
 * 
 */ 
class ImgThumbModelAdapter {
    private m_itm;
	public constructor() {
        this.m_itm = new ImgThumbModel();
	}
	
	/*
	 * 获取原图与缩略图的比例。
	 */ 
	public getRat():number
	{
        return this.m_itm.getRat();
    }
    
    /*
     * 设置缩略图区域的最大宽度。缩略图要维持原图的宽高比，同时不能超过此最大宽度。
     */ 
    public setThMaxWidth(thMaxWidth):void
    {
        this.m_itm.setThMaxWidth(thMaxWidth);
    }
    
    /*
     * 设置缩略图区域的最大高度。缩略图要维持原图的宽高比，同时不能超过此最大高度。
     */ 
    public setThMaxHeight(thMaxHeight):void
    {
        this.m_itm.setThMaxHeight(thMaxHeight);
    }
    
    /*
     * 计算并获取缩略图宽度。
     */ 
    public getThWidth():number
    {
        return this.m_itm.getThWidth();

    }
    
    /*
     * 计算并获取缩略图高度。
     */ 
    public getThHeight():number
    {
        return this.m_itm.getThHeight();
    }
    
    /*
     * 获取缩略图选区。
     */ 
    public getThSelRect():gdeint.CRect
    {
        var ret: any = this.m_itm.getThSelRect();
        return ret;
    }
    
    /*
     * 设置原图宽度。
     */ 
    public setImgWidth(imgWidth):void
    {
        this.m_itm.setImgWidth(imgWidth);
    }
    
    /*
     * 设置原图高度。
     */ 
    public setImgHeight(imgHeight):void
    {
        this.m_itm.setImgHeight(imgHeight);
    }

    public getImgSelRect():gdeint.CRect
    {
        return this.m_itm.getImgSelRect();
    }

    /*
     * 设置原图选取。
     */ 
    public setImgSelRect(imgSelRect):void
    {
        this.m_itm.setImgSelRect(imgSelRect);
    }

    /*
     * 获取原图上某点对应缩略图上的点。
     */ 
    public ip2Tp(ip):gdeint.CPoint
    {
        return this.m_itm.ip2Tp(ip);
    }

    /*
     * 获取缩略图上某点对应原图上的点。
     */ 
    public tp2Ip(tp):gdeint.CPoint
    {
        return this.m_itm.tp2Ip(tp);
    }
}
