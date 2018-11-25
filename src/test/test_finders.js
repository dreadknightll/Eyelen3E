//  src/test/test_finders.js
/*
  测试字符串查找器。
*****************************************************************/

QUnit.test( "test_finders", function( assert ) {
    var finder,res;
    finder = new CEyelen3EResNameFinder();

/*    finder.setInp(88);
    res = finder.getResult();
    assert.equal(res , "pic088_json");*/

    finder.setInp("4");
    res = finder.getResult();
    assert.equal(res , "pic004_json");

    finder.setInp("pic002.json");
    res = finder.getResult();
    assert.equal(res , "pic002_json");

    finder.setInp("img_013.gif");
    res = finder.getResult();
    assert.equal(res , "img_013_gif");    

});