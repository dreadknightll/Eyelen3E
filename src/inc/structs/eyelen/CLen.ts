/*
 * 长度结构体。
 */ 
class CLen
{
    public m_length:number;
    public m_isHor:boolean;
    public m_x:number;
    public m_y:number;
    public m_imgPath:string; // 图片路径。从pic文件获取。通常为相对路径。也可以支持绝对路径或URL。
    public m2_imgResName: string; // 图片资源名。获得m_imgPath后通过finder组件获得。
    public m_className: string;

    /*
        单元测试需要from方法。请勿删除。
    */
    static from(length:number,isHor:boolean,position:Array<number>,
        imgPath:string="",imgResName:string="",className:string=""):CLen
    {
        var ret:CLen = new CLen();
        ret.m_length = length;
        ret.m_isHor = isHor;
        ret.m_x = position[0];
        ret.m_y = position[1];
        ret.m_imgPath = imgPath;
        ret.m2_imgResName = imgResName;
        ret.m_className = className;
        return ret;
    }
};
