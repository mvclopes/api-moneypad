require("dotenv-safe").config();
const PROTO_PATH = './moneypad.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const BankInfo = require('./model/bankinfo');
const mongoose = require('mongoose');

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
    BankInfo.find((error, result) => {
        if (error) return callback(null, error);
        return callback(null, {banks: result});
    });
}

function getAllInvestorBanks(call, callback) {
    BankInfo.find({apikey: call.request.investorId}, (error, result) => {
        if (error) return callback(null, error);
        return callback(null, {banks: result});
    });
}

function getSpecificBankInfo(call, callback) {
    BankInfo.find(
        {bankname: call.request.bankname, apikey: call.request.apikey},
        (error, result) => {
            if (error) return callback(null, error);
            return callback(null, {banks: result});
    });
}

function insertBankInfo(call, callback) {
    BankInfo(call.request)
        .save()
        .then((result) => callback(null, result))
        .catch((err) => callback(null, err));
}

server.addService(moneyProto.MoneyPad.service, { getAllBanks, getAllInvestorBanks, getSpecificBankInfo, insertBankInfo });

server.bindAsync(
    "localhost:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running at http://localhost:50051");
        server.start();
      }
);