import * as restify from 'restify';
import * as Web3 from 'web3';
import {ContractLoader} from './ContractLoader';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

let server = restify.createServer();

let contractLoader = new ContractLoader(web3);

server.post('/hello/:name', function(request, response, next) {

});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});