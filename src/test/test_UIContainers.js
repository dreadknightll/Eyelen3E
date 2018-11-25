/*
 * /src/test/test_UIPresenter.js
 * 测试各个 presenter。
 */ 
QUnit.test("test_UIContainers",function( assert ) {
// 测试 container 能否带动 scene隐藏。
    var uic = new CEyelenPraContainer();
    var mps = new CMockEyelenPraScene();
    assert.equal(mps.isVisible() , true);
    uic.setPraScene(mps);
    uic.hide();
    assert.equal(mps.isVisible() , false);

// 测试通知显示。
    var mad = new CMockAlertDlg();
    uic.setAlertDlg(mad);
    uic.showAlert("abc" , null);
    assert.equal(mad.m_strOnShow , "abc"); // 通知能否正确显示。
    assert.equal(mad.m_visible , true);
    assert.equal(mps.m_disabled , true); // 通知显示时其它内容是否正确锁定。

});
