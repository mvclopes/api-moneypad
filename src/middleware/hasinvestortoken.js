const hasInvestorToken = (call) => {
    const token = call.metadata.internalRepr.get('token');
    return token !== undefined ? true : false;
};

module.exports = hasInvestorToken;