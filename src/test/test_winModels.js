/*
 * /src/test/test_winModels.js
 * 
 * 测试窗口模型。
 * 
 */ 
QUnit.test("CEyelen3E_winModel" , function(assert) {
	var ww , wh , th , my , mvy , mh , mvh , by;

	var wm = new CEyelen3EWinModelV2();

	wm.setTopSpaceHeight(5);
	wm.setTopHeight1(105);
	wm.setTopHeight2(305);
    wm.s_bottomHeight = 250;

	wm.setWinWidth(680);
	wm.setWinHeight(950);

	wm.showTop();

	ww = wm.getWinWidth();
	wh = wm.getWinHeight();
	th = wm.getTopHeight();
	my = wm.getMidY();
	mvy = wm.getMidVisibleY();
	mh = wm.getMidHeight();
	mvh = wm.getMidVisibleHeight();
	by = wm.getBottomY();

	assert.equal(ww , 680);
	assert.equal(wh , 950);
	assert.equal(th , 305);
	assert.equal(my , 110); //无论收起还是打开，midY都从同一位置算起。
	assert.equal(mvy , 310);
	assert.equal(mh , 590); //950 - 5 - 105 - 250 = 590;
	assert.equal(mvh , 390); //950 - 5 - 305 - 250 = 390;
	assert.equal(by , 700); //950 - 250 = 700;

	wm.hideTop();
	
	ww = wm.getWinWidth();
	wh = wm.getWinHeight();
	th = wm.getTopHeight();
	my = wm.getMidY();
	mvy = wm.getMidVisibleY();
	mh = wm.getMidHeight();
	mvh = wm.getMidVisibleHeight();
	by = wm.getBottomY();

	assert.equal(ww , 680);
	assert.equal(wh , 950);
	assert.equal(th , 105);
	assert.equal(my , 110);
	assert.equal(mvy , 110);
	assert.equal(mh , 590); //950 - 5 - 105 - 250 = 590;
	assert.equal(mvh , 590); //950 - 5 - 105 - 250 = 590;
	assert.equal(by , 700); //950 - 250 = 700;

	wm.showTop();

	ww = wm.getWinWidth();
	wh = wm.getWinHeight();
	th = wm.getTopHeight();
	my = wm.getMidY();
	mh = wm.getMidHeight();
	mvh = wm.getMidVisibleHeight();
	by = wm.getBottomY();

	assert.equal(ww , 680);
	assert.equal(wh , 950);
	assert.equal(th , 305);
	assert.equal(my , 110);
	assert.equal(mvy , 110);
	assert.equal(mh , 590); //950 - 5 - 105 - 250 = 590;
	assert.equal(mvh , 390); //950 - 5 - 305 - 250 = 390;
	assert.equal(by , 700); //950 - 250 = 700;

});

