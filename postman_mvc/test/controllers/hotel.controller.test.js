var mongoose = require('mongoose');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
//requiring Hotel model
var Hotel=require('../../mvc/model/hotels.model');
//assertion library for hitting api....URIs
//-----------------chaihttp---------------------
var chaiHttp = require('chai-http');
//my server checking server is running before testing ....
var server = require('../../postman');
var htroute= require('../../mvc/router/hotel.routes');
//chaiHttp into chai assertion Library
chai.use(chaiHttp);

describe('GET Hotels Controller Test',()=>{
    it('It should GET all hotels Data Happy Flow!',()=>{
        //chai object contain request 
       chai.request('http://127.0.0.1:3000/api/api')
       .get('/hotels')
       .end((error,res)=>{
           res.should.be.json;
           res.should.have.status(200);
        //    console.log(res.body);
        res.body.should.be.a('array');
        res.type.should.equal('application/json');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('stars');
        res.body[0].should.have.property('reviews');
        res.body[0].should.have.property('age');
       });
    });
       it('It Should GET One Hotel Record Happy Flow!',()=>{
           chai.request('http://127.0.0.1:3000/api/api')
           .get('/hotel/5bbd3b3519f31d285e560691')
           .end((error,res)=>{
               res.should.be.json;
               res.should.have.status(200);

            //    res.body.should.be.a('array');
               res.type.should.equal('application/json');
               res.body.should.have.property('_id');
               res.body.should.have.property('name');
               res.body.should.have.property('stars');
               res.body.should.have.property('reviews');
               res.body.should.have.property('age');
           });
       });
    });
    describe('POST/Modified Hotel! Happy Flow!',()=>{
        var hotelId;
        it('Add One Hotel! Happy Flow!',()=>{
            var hotel = {name:'5seasons',stars:6}
                chai.request('http://127.0.0.1:3000/api/api')
                .post('/hotel/new')
                .send(hotel)
                .end((error,res)=>{
                    console.log(res.body);
                    var hotelId = res.body._id;
                    should.not.exist(error);
                    res.should.be.json;
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.type.should.equal('application/json');
                    res.body.should.have.property('name');
                    res.body.should.have.property('stars');
                    res.body.should.have.property('location.address');
                    res.body.should.have.property('currency');
                    res.body.should.have.property('services');
                    expect(res.body).to.include({name:'5seasons',stars:6});
                   
                });
        });
        // it('GET/ Updated Hotel! Happy Flow!',()=>{
        //     var hotel= {name:'sam taj',stars:5,reviews:'Good'},
        // var hotelId;
        //     chai.request('http://127.0.0.1:3000/api/api')
        //     .put('/hotel/'+hotelId)
        //     .send(hotel)
        //     .end((error,res)=>{
        //         console.log(res.body);
        //         var hotelId = res.body._id;
        //         res.should.be.json;
        //         res.should.have.status(200);
        //         res.body.should.be.a('object');
        //         res.type.should.equal('application/json');
        //         expect(res.body).to.have.a.property(name).to.equal('sam taj');
        //         expect(res.body).to.have.a.property(stars).to.equal(5);
        //         expect(res.body).to.have.a.property(reviews).to.equal('Good');
        //     })
        // })
    });
