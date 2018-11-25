/*********************************************************************
 * /src/components/calibrate/CCaliPresenterAdapter.ts
 * 横竖校准对话框对应的 presenter 。用于处理横竖校准对话框的工作逻辑。 
 *
 *********************************************************************/
class CCaliPresenterAdapter implements ICaliPresenter {
    private m_icp;

	public constructor() {
        this.m_icp = new Basic_CaliPresenter();
	}

	/*
	 * 设置初始校准系数。若对话框取消保存并退出，则下次打开时系数仍为该初始值。
	 */ 
	public setInitA1(ia1):void {
        this.m_icp.setInitA1(ia1);
	}

	/*
	 * 锁定输入。
	 */ 
	public lock():void {
        this.m_icp.lock();
	}

	public unlock():void {
        this.m_icp.unlock();
	}

	/*
	 * 获取当前校准系数。
	 */ 
	public getA1():number {
        return this.m_icp.getA1();
	}
	
	/*
	 * 输入新的校准系数。
	 */ 
	public inputA1(a1:number):void {
        this.m_icp.inputA1(a1);
	}

	/*
	 * 撤销一步操作。
	 */ 
	public undoA1():void {
        this.m_icp.undoA1();
	}

	/*
	 * 重做一步操作。
	 */ 
	public redoA1():void {
        this.m_icp.redoA1();
	}
	
	/*
	 * 当前系数入栈。撤销操作只能回滚到已入栈的系数值。
	 */ 
    public recA1(): void {
        this.m_icp.recA1();
    }
}
