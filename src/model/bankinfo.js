const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    bankname: {type:String, required:true},
    accounttype: {type:String, required:true},
    holdername: {type:String, required:true},
    limitcard: {type:String, required:true},
    apikey: {type:String, required:true}, 
});

module.exports = mongoose.model('BankInfo', schema);
