/**
 *
 * 长度输入器基类。
 *
 */
class CLenInputerBase extends eui.Component {
	public constructor() {
        super();
	}

	public setWidth(wid: number): void {
        g_console.text += "Error!!Abstract class's func called!!'\n";
    }

    public getLen(): number {
        g_console.text += "Error!!Abstract class's func called!!'\n";
        return 0;
    }

    public clearLen(): void {
        g_console.text += "Error!!Abstract class's func called!!'\n";
    }

    public lock(): void {
        g_console.text += "Error!!Abstract class's func called!!'\n";
    }

    public unlock(): void {
        g_console.text += "Error!!Abstract class's func called!!'\n";
    }
}
