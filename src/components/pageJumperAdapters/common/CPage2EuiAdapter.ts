/**********************************************************
 * /src/components/pageJumperAdapters/common/CPage2EuiAdapter.ts
 * eui界面转CPage的adapter。
 * 使用方法：把要转的eui界面设置到m_adaptee。
 * 
 **********************************************************/

class CPage2EuiAdapter extends gdeint.CPage {
    public m_adaptee:eui.Component;

    public constructor() {
        super();
    }

    public show():void {
        super.show();
        this.m_adaptee.visible = true;
	}

	public hide():void {
        super.hide();
        this.m_adaptee.visible = false;
	}

};