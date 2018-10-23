
var valid = require('../mvc/utils/validation.util');
// var assert = require('assert');
//now assertion library are from chai...
var assert = require('chai').assert;


describe("Validation for Empty",()=>{
   it("Is Empty Validation Happy Flow",()=>{
       assert.equal(true,valid.isEmpty(''));
   });
   it("Is Empty Validation Sad Flow",()=>{
    assert.equal(false,valid.isEmpty());
});
});

describe("Validation for Null Value", ()=>{
    it("Null Value Validation Happy Flow",()=>{
        assert.equal(true,valid.isNull());
    });
    it("Null Value Validation Sad Flow",()=>{
        assert.equal(false,valid.isNull(1));
    })
})

describe("Validation for Range",()=>{
    it("Range Value Validation Happy Flow",()=>{
        assert.equal(true,valid.isRange(120));
    });
    it("Range Value Validation Sad Flow",()=>{
        assert.equal(false,valid.isRange(50));
    });
});
describe("Validation for Undefined",()=>{
    it("Undefined Value Validation Happy Flow",()=>{
        assert.equal(true,valid.isUndefined( ));
    });
    it("Undefined Value Validation Sad Flow",()=>{
        assert.equal(false,valid.isUndefined('xyz'));
    });
});

describe("Validation for String",()=>{
    // it("String Value Validation Happy Flow",()=>{
    //     assert.equal(true,valid.isString("yashuy"));
    // });
    it("String Value Validation Happy Flow",()=>{
        assert.notEqual(true,valid.toString("shu"));
    });
    it("String Value Validation Sad Flow",()=>{
        assert.equal(false,valid.isString(1234));
    });
});


