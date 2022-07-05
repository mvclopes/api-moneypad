const PROTO_PATH = './moneypad.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const moneyPadService = grpc.loadPackageDefinition(packageDefinition).MoneyPad.service;

module.exports = moneyPadService;