class CEyelen3EResNameFinder implements IEyelen3EResNameFinder {
	public constructor() {
	}

	private m_inpStr:string; // 输入的文件名。

	public setInp(inp:string) {
		//inp eg: 88 , "4" , "pic002.json" , "img_001.gif" , "img_001_gif"
		this.m_inpStr = inp;
	}

	public getResult():string { 
		//返回得到的资源名。
		var ret:string;
		var temp:number;

		if(this.m_inpStr.indexOf(".gif")>=0 || this.m_inpStr.indexOf("_gif")>=0 || this.m_inpStr.indexOf("img")>=0) {
			temp = parseInt(this.m_inpStr.substr(4,3));
			if(temp < 10) {
				ret = "img_00" + temp.toString();
			}
			else if(temp < 100) {
				ret = "img_0" + temp.toString();
			}
			else {
				ret = "img_" + temp.toString();
			}

			ret += "_gif";
		}
		else {
			if(this.m_inpStr.indexOf(".json") >= 0) {
				temp = parseInt(this.m_inpStr.substr(3,3));
			}
			else {
				temp = parseInt(this.m_inpStr);
			}

			if(temp < 10) {
				ret = "pic00" + temp.toString();
			}
			else if(temp < 100) {
				ret = "pic0" + temp.toString();
			}
			else {
				ret = "pic" + temp.toString();
			}
	        ret += "_json";
		}

		return ret;
	}
}
