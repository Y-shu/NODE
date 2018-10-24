var assert = require('chai').should();
var valid = require('../mvc/utils/validation.util');

describe("Validation with should: ",()=>{
    it("Value Hello Should be a String Happy Flow!",()=>{
        // expect(valid.getData('Hello')).to.be.string;
        valid.getData('Hello').should.be.a('string');

    });
    it("Value 26 should be a number Happy Flow!",()=>{
        valid.getData(26).should.be.a('number');
    });
    it("Value 26 should be a number Happy Flow!",()=>{
        valid.getData({names:['john','sam','rohn']}).should.be.a('object');
        valid.getData({names:['john','sam','rohn']}).should.have.property('names');
        valid.getData({names:['john','sam','rohn']}).should.not.have.property('ages');
        valid.getData({names:['john','sam','rohn']}).should.have.property('names').that.contains('john');



    });
});
