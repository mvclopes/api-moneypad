require("dotenv-safe").config();
const grpc = require('@grpc/grpc-js');
const mongoose = require('mongoose');
const moneyPadService = require("./grpc/configserver");
const grpcFunctions = require("./routes/bankinfocontroller");

const server = new grpc.Server();

const urldb = process.env.URLDB;

mongoose.connect(urldb, {useNewUrlParser: true, useUnifiedTopology: true});

server.addService(moneyPadService, grpcFunctions);

server.bindAsync(
    "localhost:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
        console.log("Server running at http://localhost:50051");
        server.start();
      }
);