/***********************************************************
* /src/UI/scenes/other/loadingUI_Eint_V2.ts
* 程序启动时的资源加载界面。
* 使用方法：创建对象 —> setWinSize —> create 。
*
************************************************************/

class LoadingUI_Eint_V2 extends egret.Sprite implements RES.PromiseTaskReporter{

    public constructor() { 
    // 注意：new前要把全局变量g_winWidth和g_winHeight填写好，并且logo预加载完成。
        super();

    }

    //m_winWidth: 场景宽度。通过外部填入。由于本加载页面满屏显示，所以将会传给this.width。
    private m_winWidth: number;
    private m_winHeight: number;

    private m_bg: egret.Shape;
    private m_logo: egret.Bitmap;
    private m_procra: egret.TextField;
    private m_progress: egret.TextField;
    private m_p2c: egret.TextField;

    private m_tchTimer: egret.Timer;
    private m_flashTimer: egret.Timer;
    private m_flashCnt: number;

    public create(): void {
        this.width = this.m_winWidth;
        this.height = this.m_winHeight;
        this.createView();
        this.m_tchTimer = new egret.Timer(1000,1);
        this.m_tchTimer.addEventListener(egret.TimerEvent.TIMER,this.onTchTimer,this);

        this.m_flashCnt = 0;
        this.m_flashTimer = new egret.Timer(300,0);
        this.m_flashTimer.addEventListener(egret.TimerEvent.TIMER,this.onFlashTimer,this);

    }
    private createView(): void {
        this.m_bg = new egret.Shape();
        this.m_bg.width = this.width;
        this.m_bg.height = this.height;
        this.m_bg.graphics.beginFill(0xFFFFFF);
        this.m_bg.graphics.drawRect(0,0,this.m_bg.width,this.m_bg.height);
        this.m_bg.graphics.endFill();

        this.m_procra = new egret.TextField();
        this.m_procra.x = this.width / 2 - 200;
        this.m_procra.y = this.height * 0.2;
        this.m_procra.size = 56;
        this.m_procra.textColor = 0x000000;
        this.m_procra.text = "卓越是为了奉献";

        this.m_logo = new egret.Bitmap();

        this.m_logo.x = this.width / 2 - 60;
        this.m_logo.y = this.height * 0.3;
        this.m_logo.width = 240;
        this.m_logo.height = 128;
        this.m_logo.texture = RES.getRes("eint_logo_png");

        this.m_progress = new egret.TextField();
        this.m_progress.x = this.width / 2 - 90;
        this.m_progress.y = this.height * 0.6;
        this.m_progress.textColor = 0x000000;
        this.m_progress.textAlign = "center";

        this.m_p2c = new egret.TextField();
        this.m_p2c.x = this.width / 2 - 80;
        this.m_p2c.y = this.height * 0.7;
        this.m_p2c.textColor = 0x000000;
        this.m_p2c.text = "触摸屏幕继续";
        this.m_p2c.visible = false;

        this.addChild(this.m_bg);
        this.addChild(this.m_procra);
        this.addChild(this.m_logo);
        this.addChild(this.m_progress);
        this.addChild(this.m_p2c);

    }

    private onTchTimer(evt: egret.TimerEvent): void {
        this.m_p2c.visible = true;// and flash
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);

        this.m_flashTimer.start();
    }

    private onFlashTimer(evt: egret.TimerEvent): void {
        ++this.m_flashCnt;
        if(0 == this.m_flashCnt % 3) {
            this.m_p2c.visible = false;
        }
        else {
            this.m_p2c.visible = true;
        }
    }

    private onTouch(evt: egret.TouchEvent): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);

        this.m_flashTimer.stop();

        this.m_p2c.visible = true;
        this.visible = false;

    }

    private setProgress(current:number,total:number): void {
        this.m_progress.text = "准备中..." + (current / total * 100).toString().substr(0,4) + "%";
        if(current == total) {
            this.m_tchTimer.start();
        }
    }

    public setWinSize(wid: number,hei: number) {
        this.m_winWidth = wid;
        this.m_winHeight = hei;
    }

    /*
        接口方法。在加载进度增加时自动触发。
    */
    public onProgress(current: number, total: number): void {
//        this.textField.text = `Loading...${current}/${total}`;
        this.setProgress(current , total);
    }

}
