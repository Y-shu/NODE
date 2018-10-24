var op = require('./add');
var assert = require('assert');
// describe(message,callback);
describe("Addtion Test Block Happy Flow",()=>{
    // it(message,callback)
    it("Test result 30 Happy Flow",()=>{
        assert.equal(30,op.addition(10,20));
    });
    it("Test result 30 NE 40 Happy Flow",()=>{
        assert.notEqual(40,op.addition(10,20));
    });
    it("Test add -10 and 20 Equal to 10 Happy Flow",()=>{
        assert.equal(10,op.addition(-10,20));
    });
    it("Test add -10 and -20 Equal to -30 Happy Flow",()=>{
        assert.equal(-30,op.addition(-10,-20));
    });
});
describe("Substration Test Block Happy Flow",()=>{
    // it(message,callback)
    it("Test substration 30-10 result 20 Happy Flow",()=>{
        assert.equal(20,op.substraction(30,10));
    });
    it("Test substration 40-10 result 20 NE Happy Flow",()=>{
        assert.notEqual(20,op.substraction(40,10));
    });
    it("Test substration -40-10 result -50 E Happy Flow",()=>{
        assert.equal(-50,op.substraction(-40,10));
    });
    it("Test substration -40-(-10) result -30 E Happy Flow",()=>{
        assert.equal(-30,op.substraction(-40,-10));
    });
});


// assert.equal(30,op.addition(20,20),"Test result 30 Happy Flow");