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
    })
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
           })
       })
    
})
