var chai = require('chai');
var expect = chai.expect;
var Hotel=require('../../mvc/model/hotels.model');

describe('Hotels Model Happy Test Flow!',()=>{
            //generating hotel object for model

    var hotel = new Hotel({
        name:"Hotel Grand Casino",
        stars:5,
        description:"Best Hotel In BanjaraHills",
        currancy:"$200",
        reviews:[{
            name:"String",
            id:"102920",
            review:"Costly",
            rating:5
        }]

   });
        it('Test For Hotel Model Data',()=>{
                expect(hotel).to.have.property('name').to.equal('Hotel Grand Casino');
                expect(hotel).to.have.property('stars').to.equal(5);
                expect(hotel).to.have.property('description').to.equal('Best Hotel In BanjaraHills');
                expect(hotel).to.have.property('currancy').to.equal("$200");
                //passing one one object inside array so it is of length of 1
                expect(hotel).to.have.property('reviews').with.lengthOf(1);
                expect(hotel.reviews[0]).to.have.property('rating');

             });
             it('Test for Total Model Data Type Evaluation',()=>{
                expect(hotel).to.have.property('name').to.be.a('string');
                expect(hotel).to.have.property('stars').to.be.a('number');
                expect(hotel).to.have.property('description').to.be.a('string');
                expect(hotel).to.have.property('currancy').to.be.a('string');
                expect(hotel).to.have.property('reviews').to.be.a('array');
            });
});