class CNetResLoaderWithEgret implements IResWithEgret {
	public constructor() {
	}

	public getRes(resName:string):any {
		var resStru:CHTTPSResStru;
		resStru = g_resCache[resName];

		if(resStru.m_isInCache) {
			return  resStru.m_resCache;
		}
		else {
			return null;
		}
	}
}
