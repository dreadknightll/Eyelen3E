class CEyelen3EHTTPSResUrlFinder implements IEyelen3EResNameFinder {
	public constructor() {
	}

	private m_inpStr:string; // 输入的文件名。

	public setInp(inp:string) {
		this.m_inpStr = inp;
	}

	public getResult():string { 
		//返回得到的资源名。
		var ret:string;
		ret = "https://www.gdeint.cn/wechatAppData/eyelen/eyelen3E/pics/getImgCrossDomain.php?tag="
		var temp:number = parseInt(this.m_inpStr.substr(4,3));
        if(temp < 10) {
			ret += ("00" + temp.toString());
        }
        else if(temp < 100) {
			ret += ("0" + temp.toString());
        }
        else {
			ret += temp.toString();
        }

		return ret;
	}
}
