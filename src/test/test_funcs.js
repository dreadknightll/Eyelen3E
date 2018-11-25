//  src/test/test_funcs.js //////////////////////////////////////
/*  
  测试全局函数。
***************************************************************/


QUnit.test( "test_funcs", function( assert ) {
  {
    //getImgResNameByPicTag
    var tag = 20;
    var res;
    res = getImgResNameByPicTag(tag);
    assert.equal(res , "img_020"); //不带扩展名。方便维护。
    tag = 3;
    res = getImgResNameByPicTag(tag);
    assert.equal(res , "img_003");

  }
  {
    //getImgResNameByFileName
    var res = getImgResNameByFileName("img_012.gif");
    assert.equal(res , "img_012");
  }
});

