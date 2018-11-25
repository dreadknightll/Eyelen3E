class CDispObj2EgretDOAdapter extends CDispObj{
	public m_adaptee:egret.DisplayObject;
	public static from(o:egret.DisplayObject):CDispObj2EgretDOAdapter {
		var ret = new CDispObj2EgretDOAdapter();
		ret.m_adaptee = o;
		return ret;
	}
};