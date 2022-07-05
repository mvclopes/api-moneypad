const BankInfo = require('../model/bankinfo');
const hasInvestorToken = require("../middleware/hasinvestortoken");

function getAllBanks(call, callback) {
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

module.exports = grpcFunctions;