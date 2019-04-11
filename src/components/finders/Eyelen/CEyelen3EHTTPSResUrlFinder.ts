class CEyelen3EHTTPSResUrlFinder implements IEyelen3EResNameFinder {
	public constructor() {
	}

	private m_inpStr:string; // 输入的文件名。

	public setInp(inp:string) {
		//inp eg: 88 , "4" , "pic002.json" , "img_001.gif" , "img_001_gif"

		this.m_inpStr = inp;
	}

	public getResult():string { 
/*		//返回得到的资源名。
		var ret:string;
		ret = "https://www.gdeint.cn/wechatAppData/eyelen/eyelen3E/pics/getImgCrossDomain.php?tag="
//		var temp:number = parseInt(this.m_inpStr.substr(4,3));
		var temp:number = parseInt(this.m_inpStr);
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
*/


		//返回得到的资源URL。
		var ret:string;
		var strTmpTag;
		var temp:number;

		if(this.m_inpStr.indexOf(".gif")>=0 || this.m_inpStr.indexOf("_gif")>=0 || this.m_inpStr.indexOf("img")>=0) {
			temp = parseInt(this.m_inpStr.substr(4,3));
			strTmpTag = "";
			if(temp < 10) {
				strTmpTag = "00" + temp.toString();
			}
			else if(temp < 100) {
				strTmpTag = "0" + temp.toString();
			}
			else {
				strTmpTag = "" + temp.toString();
			}
			ret = "https://www.gdeint.cn/wechatAppData/eyelen/eyelen3E/pics/getImgCrossDomain.php?tag=";
			ret += strTmpTag;
		}
		else {
			if(this.m_inpStr.indexOf(".json") >= 0) {
				temp = parseInt(this.m_inpStr.substr(3,3));
			}
			else {
				temp = parseInt(this.m_inpStr);
			}

			strTmpTag = "";
			if(temp < 10) {
				strTmpTag = "00" + temp.toString();
			}
			else if(temp < 100) {
				strTmpTag = "0" + temp.toString();
			}
			else {
				strTmpTag = "" + temp.toString();
			}
			ret = "https://www.gdeint.cn/wechatAppData/eyelen/eyelen3E/pics/getPicCrossDomain.php?tag=";
			ret += strTmpTag;
		}

		return ret;
	}
}
