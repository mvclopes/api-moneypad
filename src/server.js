require("dotenv-safe").config();
const PROTO_PATH = './moneypad.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const BankInfo = require('./model/bankinfo');
const mongoose = require('mongoose');
const hasInvestorToken = require("./middleware/hasinvestortoken");

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const moneyProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const urldb = process.env.URLDB;

mongoose.connect(urldb, {useNewUrlParser: true, useUnifiedTopology: true});

function getAllBanks(_, callback) {
    if (hasInvestorToken(call)) {
        BankInfo.find((error, result) => {
            if (error) return callback(null, error);
            return callback(null, {banks: result});
        });
    } else {
        return callback(new Error('No authorization token was found'), null);
    }
    
}

function getAllInvestorBanks(call, callback) {
    if (hasInvestorToken(call)) {
        BankInfo.find({apikey: call.request.investorId}, (error, result) => {
            if (error) return callback(error, null);
            return callback(null, {banks: result});
        });
    } else {
        return callback(new Error('No authorization token was found'), null);
    }
    
}

function getSpecificBankInfo(call, callback) {
    if (hasInvestorToken(call)) {
        BankInfo.find(
            {bankname: call.request.bankname, apikey: call.request.apikey},
            (error, result) => {
                if (error) return callback(null, error);
                return callback(null, {banks: result});
        });
    } else {
        return callback(new Error('No authorization token was found'), null);
    }
}

function insertBankInfo(call, callback) {
    if (hasInvestorToken(call)) {
        BankInfo(call.request)
        .save()
        .then((result) => callback(null, result))
        .catch((err) => callback(null, err));
    } else {
        return callback(new Error('No authorization token was found'), null);
    }
}

function updateBankInfo(call, callback) {
    if (hasInvestorToken(call)) {
        BankInfo.findByIdAndUpdate(call.request.id, call.request.bankInfo, {new: true})
        .then((result) => callback(null, result))
        .catch((err) => callback(err, null));
    } else {
        return callback(new Error('No authorization token was found'), null);
    }
}

const grpcFunctions = { 
    getAllBanks, 
    getAllInvestorBanks,
    getSpecificBankInfo,
    insertBankInfo,
    updateBankInfo
}

server.addService(moneyProto.MoneyPad.service, grpcFunctions);

server.bindAsync(
    "localhost:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
        console.log("Server running at http://localhost:50051");
        server.start();
      }
);