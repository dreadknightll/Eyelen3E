// src/test/test_praMachines.js ////////////////////////////////
/*
	测试练习机器。
***************************************************************/

QUnit.test( "test_praMachines_easy", function( assert ) {
	// 测试简单难度练习机器：
	{ // 基本的数据输入、计分、下一长度：
		var pme = new CEyelen3EPraMachineEasy();
		var lenArr = [CLen.from(50,false,[5,11]) , CLen.from(70,true,[2,2]) ,
		CLen.from(90,true,[2,21]) , CLen.from(140,true,[8,2])];
		pme.setLenArr(lenArr);
		pme.startPra();
		assert.equal(pme.getCurElemTag() , 0);
		pme.setGridDispWidth(25); //每格宽25。
		pme.inpGridCnt(2); //输入为2格。
		assert.equal(pme.getCurScore() , 30); //1个三旗评定，30分。
		pme.nextLen();
		assert.equal(pme.getCurElemTag() , 1); //nextLen后序号成了1。
		pme.nextLen();
		assert.equal(pme.getCurElemTag() , 2);
		pme.inpGridCnt(3);
		assert.equal(pme.getCurScore() , 50);
		pme.nextLen();
		pme.nextLen();
		pme.nextLen();
		pme.nextLen();
		assert.equal(pme.getCurElemTag() , 4); //没长度了。序号为最后一个长度的下标+1。
	}
	{ // 重新开始练习、设置新长度集进行练习：
		var pme = new CEyelen3EPraMachineEasy();
		var lenArr = [CLen.from(50,false,[5,11]) , CLen.from(70,true,[2,2]) ,
		CLen.from(90,true,[2,21]) , CLen.from(140,true,[8,2])];
		pme.setLenArr(lenArr);
		pme.setGridDispWidth(25);
		pme.inpGridCnt(2);
		assert.equal(pme.getCurScore() , 30);
		pme.nextLen();
		assert.equal(pme.getCurElemTag() , 1);
		pme.rePra();
		assert.equal(pme.getCurElemTag() , 0);
		assert.equal(pme.getCurScore() , 0);
		pme.nextLen();
		assert.equal(pme.getCurElemTag() , 1);
		pme.clearPra();
		assert.equal(pme.getCurElemTag() , 0);
		pme.nextLen();
		assert.equal(pme.getCurElemTag() , 0);
	}
});


QUnit.test( "test_praMachines_difficult", function( assert ) {
	// 测试困难难度练习机器：
	{
		// 基本的数据输入、计分、下一长度：
		var pme = new CEyelen3EPraMachineDifficult();
		var lenArr = [CLen.from(50,false,[5,11]) , CLen.from(70,true,[2,2]) ,
		CLen.from(90,true,[2,21]) , CLen.from(140,true,[8,2])];
		pme.setLenArr(lenArr);
		pme.startPra();
		assert.equal(pme.getCurElemTag() , 0);
		pme.inpLen(43);
		assert.equal(pme.getCurScore() , 20);
		pme.nextLen();
		assert.equal(pme.getCurElemTag() , 1);
		pme.nextLen();
		assert.equal(pme.getCurElemTag() , 2);
		pme.nextLen();
		pme.nextLen();
		pme.nextLen();
		pme.nextLen();
		assert.equal(pme.getCurElemTag() , 4);
	}
	{
		// 重新开始练习、清空长度重新练习：
		var pme = new CEyelen3EPraMachineDifficult();
		var lenArr = [CLen.from(50,false,[5,11]) , CLen.from(70,true,[2,2]) ,
		CLen.from(90,true,[2,21]) , CLen.from(140,true,[8,2])];
		pme.setLenArr(lenArr);
		pme.startPra();
		assert.equal(pme.getCurElemTag() , 0);
		pme.inpLen(50);
		assert.equal(pme.getCurScore() , 30);
		pme.nextLen();
		assert.equal(pme.getCurElemTag() , 1);
		pme.rePra();
		assert.equal(pme.getCurElemTag() , 0);
		assert.equal(pme.getCurScore() , 0);
		pme.nextLen();
		pme.nextLen();
		assert.equal(pme.getCurElemTag() , 2);
		pme.clearPra();
		assert.equal(pme.getCurElemTag() , 0);
		assert.equal(pme.getCurScore() , 0);
		pme.nextLen();
		pme.nextLen();
		assert.equal(pme.getCurElemTag() , 0);
		assert.equal(pme.getCurScore() , 0);
	}
});