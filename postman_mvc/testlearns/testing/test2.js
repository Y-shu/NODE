var expect = require('chai').expect;
var assert = require('chai').assert;
var valid = require('../../mvc/utils/validation.util');

describe("Validation Using Expect Happy Flow!",()=>{

    it('Yashu is a string! Happy Flow!',()=>{
       expect(valid.getData('yashu')).to.be.string;
         });
    it('Hello is also a string! Happy flow',()=>{
        expect(valid.getData('hello')).to.be.a('string');
    });
    it('Value 40 is a Number! Happy Flow!',()=>{
        expect(valid.isNumber(40)).equal(true);
    });
    
});

var name = 'yashu';
var arr = {color:['black','royalblue','cherryred']};
describe('Validations Successful!Happy Flow!',()=>{
    it('Name is a String! Happy Flow!',()=>{
              expect(name).to.be.a('string');
     });
     it('Name is Yashu!Happy Flow!',()=>{
              expect(name).to.equal('yashu');
         
     });
     it('Name of length 5!Happy Flow!',()=>{
            expect(name).to.have.lengthOf(5);
            
     });
     it('arr of color property is having length 3! Happy Flow!',()=>{
            expect(arr).to.have.property('color').with.lengthOf(3);

     });
});