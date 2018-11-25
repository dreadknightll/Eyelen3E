/**
 * /src/components/resLoaders/CEgretDefaultResLoader.ts 
 * 本资源读取器获取程序默认资源配置文件里描述的资源。
 * 需要和egret关联。
 *
 */

class CEgretDefaultResLoader implements IResWithEgret {
	public constructor() {
	}

	public getRes(resName:string):any {
		return RES.getRes(resName);
	}
}
