/*
 * 长度比较器。比较用户长度和正确长度，返回准确度评定。
 */
class CLenCheckerDifficult implements ILenCheckerDifficult {
    private m_correOriLen:number;
//    private m_correHor:boolean;
    private m_inputDispLen:number;
    private m_renderFilter:gdeint.IRenderFilterWithCa;

    constructor() {
        this.m_renderFilter = new CEyelen3ERenderFilter();
    }

    public setRenderFilter(rf:gdeint.IRenderFilterWithCa) {
        this.m_renderFilter = rf;
    }

    public setCorreOriLen(len:number):void //输入未校准的原始长度。
    {
        this.m_correOriLen = len;
    }

/*    public setCorreHor(ch:boolean) {
        this.m_correHor = ch;
    }*/

    public setInputDispLen(len:number) //输入校准后的
    {
        this.m_inputDispLen = len;
    }

    public checkLen(): number {
        var ret; // 1: 2: 3:

        ret = 0;

        var corre:number , inp:number , diff:number;
//        if(this.m_correHor) {
            corre = this.m_renderFilter.xOConv(this.m_correOriLen);
//        }
//        else {
//            corre = this.m_renderFilter.xOConv(this.m_correOriLen);
//        }
        inp = this.m_inputDispLen;
        diff = Math.abs(corre - inp);

        if(corre < 30) {
            if(diff < 2) {
                ret = 3;
            }
            else if(diff < 4) {
                ret = 2;
            }
            else if(diff < 8) {
                ret = 1;
            }
            else {
                ret = 0;
            }
        }
        else if(corre < 100) {
            if(diff < 5) {
                ret = 3;
            }
            else if(diff < 10) {
                ret = 2;
            }
            else if(diff < 18) {
                ret = 1;
            }
            else {
                ret = 0;
            }
        }
        else {
            if(diff < 8) {
                ret = 3;
            }
            else if(diff < 15) {
                ret = 2;
            }
            else if(diff < 25) {
                ret = 1;
            }
            else {
                ret = 0;
            }
        }

        return ret;

    }
}