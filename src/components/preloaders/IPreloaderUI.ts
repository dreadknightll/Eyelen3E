/**
 *
 * @author 
 *
 */
interface IPreloaderUI extends IContainerPlugin {
    setPreloader(preloader:IPreloader);
    setCompleteListener(listener:(taskName:string)=>void,thisObj:any):void; // Called when total proportion reaches 100 or all tasks are added and completed.
    setNextActListener(listener:Function , thisObj:any);

    addTask(task: gdeint.CPreloadTask):void;
    setNoTaskLeft(ntl:boolean); // Set whether all tasks are added.

    startPreload():void;
    clearProgress():void; // Set progress to 0%.
    setSceneRect(x:number , y:number , wid:number , hei:number); //设置父场景大小和坐标偏移量，以便确定本框的显示位置。
}
