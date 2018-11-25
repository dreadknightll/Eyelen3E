// src/test/test_CCaliPresenter.js /////////////////////////////
/*
	测试横竖校准界面的Presenter。
	目前测试代码和产品代码均引自旧版本尺眼通3，仍为Javascript编写。
	本组用例测试充分，相关代码适合大量重用。
***************************************************************/

QUnit.test("test_BasicCaliPresenter" , function(assert) {

	function testSetgetA1()
	{
		function test1()
		{
			var icp = new Basic_CaliPresenter();
			icp.setInitA1(1.5);
			assert.equal(icp.getA1() , 1.5);
			icp.inputA1(2.2);
			assert.equal(icp.getA1() , 2.2);
		}

		function test2()
		{
			var icp = new Basic_CaliPresenter();
			icp.inputA1(2.2);
			assert.ok(icp.m_a1Set);
			assert.equal(icp.getA1() , 2.2);
			icp.setInitA1(1.5);
			assert.equal(icp.getA1() , 2.2);
		}

		function test3()
		{
			var icp = new Basic_CaliPresenter();
			icp.setInitA1("444");
			assert.equal(icp.getA1() , 0);
		}

		test1();
		test2();
		test3();
	}

	function testSetgetA2()
	{
		function test1()
		{
			var icp = new Basic_CaliPresenter();

			assert.ok(!icp.m_a1Set);
			assert.ok(!icp.m_a2Set);

			icp.setInitA1(1.5);
			assert.ok(icp.m_a1Set);

			icp.enableA2();
			icp.inputA2(5.1);
			icp.disableA2();

			assert.ok(icp.m_a2Set);

			icp.setInitA2(1.2);

			assert.equal(icp.getA1() , 1.5);
			assert.equal(icp.a2Enabled() , false);
			assert.equal(icp.getA2() , 1.5); //A2 disabled , return A1.

			icp.inputA1(2.2);
			assert.equal(icp.getA1() , 2.2);
			assert.equal(icp.getA2() , 2.2);

			icp.enableA2();
			assert.equal(icp.getA2() , 5.1);
			icp.inputA2(3.8);
			assert.equal(icp.getA2() , 3.8);

			icp.disableA2();
			assert.equal(icp.getA2() , 2.2);

			icp.inputA2(4.4); //Declined because a2 is disabled.
			icp.enableA2();
			assert.equal(icp.getA2() , 3.8);
		}

		function test2()
		{
			var icp = new Basic_CaliPresenter();

			icp.setInitA1(1.5);
			icp.setInitA2(3.2);

			icp.inputA2(5.5);
			assert.equal(icp.getA2() , 1.5);
			icp.enableA2();
			assert.equal(icp.getA2() , 3.2);

			icp.inputA2("jj");
			assert.equal(icp.getA2() , 3.2);
		}

		function test3()
		{
			var icp = new Basic_CaliPresenter();
			icp.setInitA2("999");
			assert.equal(icp.getA2() , 0);

		}

		test1();
		test2();
		test3();

	}

	function testLock()
	{
		var icp = new Basic_CaliPresenter();

		icp.enableA2();

		icp.setInitA1(6.4);
		icp.setInitA2(8.2);

		assert.ok(!icp.m_locked);
		icp.lock();
		assert.ok(icp.m_locked);

		icp.inputA1(3.3); //Declined
		icp.inputA2(2.2); //Declined

		icp.unlock();

		assert.ok(!icp.m_locked);
		assert.equal(icp.getA1() , 6.4);
		assert.equal(icp.getA2() , 8.2);

		icp.inputA1(3.3);
		icp.inputA2(2.2);

		assert.equal(icp.getA1() , 3.3);
		assert.equal(icp.getA2() , 2.2);
	}

	function testUndo()
	{
		function test1() //With init value. No redo.
		{
			var icp = new Basic_CaliPresenter();

			icp.setInitA1(1.23);
			
			icp.inputA1("abc");
			assert.equal(icp.getA1() , 1.23);
			
			icp.inputA1(2.4);
			icp.recA1();
			icp.inputA1(3.3);
			
			icp.undoA1();
			assert.equal(icp.getA1() , 2.4); //Last recorded value!!
			icp.inputA1(2.4);
			icp.undoA1();
			assert.equal(icp.getA1() , 2.4);
			icp.undoA1();
			assert.equal(icp.getA1() , 1.23);
			
			icp.inputA1(1.7);
			icp.recA1();
			icp.inputA1(1.1);
			icp.undoA1();
			assert.equal(icp.getA1() , 1.7);
			icp.undoA1();
			assert.equal(icp.getA1() , 1.23);

			icp.undoA1();
			assert.equal(icp.getA1() , 1.23);
		}

		function test2() //No init value. No redo.
		{
			var icp = new Basic_CaliPresenter();
			icp.inputA1(2.3);
			icp.undoA1();
			assert.equal(icp.getA1() , 2.3);

			icp.inputA1(3.4);
			icp.undoA1();
			assert.equal(icp.getA1() , 2.3);
			icp.undoA1();
			icp.undoA1();
			assert.equal(icp.getA1() , 2.3);

			icp.inputA1(4.5);
			icp.recA1();
			icp.inputA1(8.6);

			icp.undoA1();
			assert.equal(icp.getA1() , 4.5);
			icp.undoA1();
			assert.equal(icp.getA1() , 2.3);
		}

		function test3() //With redo.
		{
			var icp = new Basic_CaliPresenter();
			icp.redoA1();
			icp.inputA1(3.3);
			icp.inputA1(5.1);
			icp.recA1();
			icp.inputA1(2.2);
			icp.recA1();
			icp.undoA1();
			icp.undoA1();
			icp.undoA1();
			icp.undoA1();
			icp.redoA1();
			assert.equal(icp.getA1() , 5.1);
			icp.redoA1();
			assert.equal(icp.getA1() , 2.2);
			icp.inputA1(4.4);
			icp.redoA1(); //New a1 arrived. No way to redo.
			assert.equal(icp.getA1() , 4.4);

		}

		function test4() //Redo and reundo,reinput , redo again.
		{
			var icp = new Basic_CaliPresenter();
			icp.setInitA1(2.1);
			icp.inputA1(4.3);
			icp.recA1();
			icp.inputA1(7.2);
			icp.recA1();
			icp.inputA1(1.2);
			icp.recA1();
			icp.inputA1(2.5);
			icp.undoA1();
			icp.undoA1();
			assert.equal(icp.getA1() , 7.2);

			icp.redoA1();
			assert.equal(icp.getA1() , 1.2);

			icp.undoA1();
			icp.inputA1(2.3);
			icp.recA1();
			icp.undoA1();
			assert.equal(icp.getA1() , 7.2);
			icp.redoA1(); //New redo result.
			assert.equal(icp.getA1() , 2.3);

			icp.undoA1();
			icp.undoA1();
			icp.undoA1();
			icp.undoA1();
			icp.undoA1();
			assert.equal(icp.getA1() , 2.1);
			icp.inputA1(4.5);
			icp.inputA1(1.3);
			icp.recA1();
			icp.undoA1();
			icp.undoA1();
			assert.equal(icp.getA1() , 2.1);
			icp.redoA1();
			assert.equal(icp.getA1() , 1.3);
			icp.redoA1(); //Already newest.
			assert.equal(icp.getA1() , 1.3);

		}

		function test5() // Redo route recovery.
		{
			var icp = new Basic_CaliPresenter();
			icp.setInitA1(1.1);
			icp.inputA1(1.2);
			icp.recA1();
			icp.inputA1(1.3);
			icp.recA1();
			icp.inputA1(1.4);
			icp.recA1();
			icp.undoA1();
			icp.undoA1();
			icp.inputA1(2.3);
			icp.undoA1();
			icp.redoA1();
			icp.redoA1();
			assert.equal(icp.getA1() , 1.4);
		}

		test1();
		test2();
		test3();
		test4();
		test5();
	}

	function testReset()
	{
		var icp = new Basic_CaliPresenter();
		icp.setInitA1(2.2);
		icp.setInitA2(1.2);
		icp.enableA2();
		assert.equal(icp.getA1() , 2.2);
		assert.equal(icp.getA2() , 1.2);
		assert.equal(icp.m_a2Enabled , true);
		icp.lock();
		assert.equal(icp.m_locked , true);

		icp.resetValues();
		assert.equal(icp.getA1() , 2.2);
		assert.equal(icp.m_locked , false);
		assert.equal(icp.m_a2Enabled , false);
		assert.equal(icp.getA2() , 2.2);
		assert.equal(icp.m_a1Set , false);
		assert.equal(icp.m_a2Set , false);
	}

	function testValidateInput()
	{
		var icp = new Basic_CaliPresenter();

		assert.ok(icp.validateInput(2.32));
		assert.ok(icp.validateInput(77));
		assert.ok(!icp.validateInput("ab1.21"));
		assert.ok(!icp.validateInput("3.88"));
		assert.ok(!icp.validateInput(-8.3));
		assert.ok(!icp.validateInput(0));
		assert.ok(!icp.validateInput(true));
		assert.ok(!icp.validateInput(new Object()));
		assert.ok(!icp.validateInput(NaN));

	}

	testSetgetA1();
	testSetgetA2();
	testLock();
	testUndo();
	testReset();
	testValidateInput();
});
