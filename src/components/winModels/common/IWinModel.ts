// TypeScript file
interface IWinModel {
    setWinWidth(ww:number):void;
    getWinWidth():number;

	setWinHeight(wh:number):void; //TopSpace 也包含在内。
	getWinHeight():number;

    setTopSpaceHeight(h:number):void; // 空间在 WinHeight 范围内。
    getTopSpaceHeight():number;

    rearrange():void;
}