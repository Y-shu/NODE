const HOST = '127.0.0.1';
const PORT = 3000;
//this is to connect with help of mongodb.everytime ip will change.
//const DBURL = 'mongodb://rootUser:password@192.168.1.17:27017/myHotel';

//this is to connect with help of mongoose.
const DBURL = 'mongodb://ds245150.mlab.com:45150/myhotel'; //mlab connection
const authSource = 'myhotel'; //database
const DbUsr = 'racer';
const DbPwd = 'racer1234';
const secretKey = 'Y-shu';

module.exports = {
  HOST:HOST,
  PORT:PORT,
  DBURL:DBURL,
  AUTHSRC:authSource,
  DBUSR:DbUsr,
  DBPWD:DbPwd,
  SECRETKEY:secretKey
  }