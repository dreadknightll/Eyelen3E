/**
 * /src/myts/CPraMachine2.ts 
 * 练习机器模型。是整个程序的中心。用来处理练习相关的数据和逻辑。计分、进入下一长度、练习结束判断等的内部数据处理都在这里进行。
 * setLenArr -> startPra -> ......
 *
 */
class CEyelen3EPraMachineEasy implements IGridLenPraMachine {
//    public m_pm; // 旧版练习机器模型。本类是在依赖旧版的基础上进行扩充实现的。

    private m2_lastLenRank: number; // 最近一次输入的准确度评定。
    public m2_lastLenScore: number; // 最近一次输入的得分。

    public m_lenArr: Array<CLen>; // 练习使用的长度的集合。
    public m_imgPathList: Array<String>; // 保存本次练习所使用的各图片的路径。

    public m_lenChecker: ILenCheckerEasy; // 长度比较器。比较用户输入的长度和正确的长度，返回准确度评定结果。

    public m_curLenTag: number; // 当前长度的下标。
    public m_curScore: number; // 当前得分。

    public m_lenInputted: boolean; // 用户是否已输入长度。
    public m_finished: boolean; // 练习结束标记。

    public constructor() {
        this.m2_lastLenScore = 0;

        this.m_lenArr = [];
        this.m_lenChecker = new CLenCheckerEasy();
        this.m_lenChecker.setGridDispWidth(30);

        this.m_imgPathList = [];

        this.m_curLenTag = 0;
        this.m_curScore = 0;

        this.m_lenInputted = false;
        this.m_finished = false;

    }

    /*
     * 清空数据。重新开始练习等情况下调用。
     */ 
    public clearPra(): void {
        this.m_lenArr = [];
        this.m_imgPathList = [];

        this.rePra();
    }

    /*
     * 设置练习所使用的长度列表。
     */ 
    public setLenArr(lenArr: Array<CLen>): void {
        this.m_lenArr = lenArr;
        this.m_curLenTag = 0; //Reset it because the whole len array has been changed.
    }

    public setGridDispWidth(w:number):void {
        this.m_lenChecker.setGridDispWidth(w);
    }

    public getLenChecker():ILenCheckerEasy {
        return this.m_lenChecker;
    }

    /*
     * 根据练习所使用的长度列表刷新所需图片路径列表。
     */ 
    public refreshImgPathList()
    {
        var i,j;
        for(i = 0;i < this.m_lenArr.length;++i) {
            var newPath = this.m_lenArr[i].m_imgPath;
            for(j = 0;j < this.m_imgPathList.length;++j) {
                if(this.m_imgPathList[j] == newPath) {
                    break;
                }
            }
            if(this.m_imgPathList.length == j) {
                this.m_imgPathList.push(this.m_lenArr[i].m_imgPath);
            }
        }
    }

    /*
     * 输入长度并处理。（DispLen）
     */ 
    public inpGridCnt(gcnt:number): void {
        if(this.m_curLenTag >= this.m_lenArr.length) // Already over , do not input.
        {
            return;
        }

        this.m_lenInputted = true;

        var expLen:number = this.m_lenArr[this.m_curLenTag].m_length;
//        var expIsHor:boolean = this.m_lenArr[this.m_curLenTag].m_isHor;
        var rank:number;
//        this.m_lenChecker.setInputDispLen(len);
        this.m_lenChecker.setInputGridCnt(gcnt);
        this.m_lenChecker.setCorreOriLen(expLen);
//        this.m_lenChecker.setCorreHor(expIsHor);
        rank = this.m_lenChecker.checkLen();

        switch(rank) {
            case 0: // 评定为 0旗子，不加分。
                break;

            case 1:
                this.m_curScore += 10; // 评定为 1旗子，加10分。
                break;

            case 2:
                this.m_curScore += 20; // 评定为 2旗子，加20分。
                break;

            case 3:
                this.m_curScore += 30; // 评定为 3旗子，加30分。
                break;
        }

        this.m2_lastLenRank = (this.getCurScore() - this.m2_lastLenScore) / 10;
        this.m2_lastLenScore = this.getCurScore();
    }

    /*
     * 进入下一长度。
     */ 
    public nextLen(): void {
        this.m_lenInputted = false;
        if(this.m_curLenTag < this.m_lenArr.length) // this.m_curLenTag == this.m_lenArr.length means finished!!
        {
            ++this.m_curLenTag;
            if(this.m_curLenTag >= this.m_lenArr.length) {
                this.m_finished = true;
            }
        }
    }

    public startPra():void {
        this.rePra();
    }

    /*
     * 重新开始练习。
     */ 
    public rePra(): void {

        this.m_curLenTag = 0;
        this.m_curScore = 0;

        this.m_lenInputted = false;
        this.m_finished = false;

        this.m2_lastLenScore = 0;
    }

    /*
     * 获取当前长度下标。
     */ 
    public getCurElemTag(): number {
        return this.m_curLenTag;
    }

    public getCmplProgress(): number {
        if(this.m_lenInputted) {
            return this.m_curLenTag+1;
        }
        else {
            return this.m_curLenTag;
        }
    }

    /*
     * 获取当前长度。
     */ 
    public getCurLen(): CLen {
        return this.m_lenArr[this.m_curLenTag];
    }

    /*
     * 获取当前得分。
     */ 
    public getCurScore(): number {
        return this.m_curScore;
    }

/*    public getCurProgress():number {
        return this.getCurLenTag();
    }
*/

    /*
     * 获取当前图片下标。
     */ 
    public getCurImgTag(): number {

        var i;
        if(this.m_finished) {
            return -1;
        }

        if(this.m_curLenTag < 0) {
            return -1;
        }

        for(i = 0;i < this.m_imgPathList.length;++i) {
            if(gdeint.tailContain(this.m_imgPathList[i],this.m_lenArr[this.m_curLenTag].m_imgPath)) {
                return i;
            }
        }

        return -1;
    }

    /*
     * 获取最近一次输入的评定。
     */ 
    public getLastLenRank(): number {
        return this.m2_lastLenRank;
    }
}
