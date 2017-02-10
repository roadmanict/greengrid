"use strict";
var fs = require('fs');
var ContractLoader = (function () {
    function ContractLoader(web3) {
        this.load = function () {
            var self = this;
            for (var i = 0; i < self.availableContracts.length; i++) {
                var contract = self.availableContracts[i];
                var contractSource = fs.readFileSync('./contracts/' + contract + '.sol');
                var contractCompiled = this.web3.eth.compile.solidity(contractSource);
                self.contracts[contract] = {
                    abi: contractCompiled.info.abiDefinition,
                    code: contractCompiled.code
                };
            }
        };
        this.web3 = web3;
        this.availableContracts = [
            'hello-world'
        ];
        this.contracts = {};
        this.load();
    }
    return ContractLoader;
}());
exports.ContractLoader = ContractLoader;
