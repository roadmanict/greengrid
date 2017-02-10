"use strict";
var restify = require("restify");
var Web3 = require("web3");
var ContractLoader_1 = require("./ContractLoader");
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var server = restify.createServer();
var contractLoader = new ContractLoader_1.ContractLoader(web3);
server.post('/hello/:name', function (request, response, next) {
});
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
