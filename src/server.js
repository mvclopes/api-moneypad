require("dotenv-safe").config();
const PROTO_PATH = './moneypad.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const grpcFunctions = require("./routes/bankinfocontroller");

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

server.addService(moneyProto.MoneyPad.service, grpcFunctions);

server.bindAsync(
    "localhost:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
        console.log("Server running at http://localhost:50051");
        server.start();
      }
);