import * as restify from 'restify';
import * as Web3 from 'web3';
import {HelloWorldContract} from './contracts/HelloWorldContract';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
console.log(web3.eth.accounts);
web3.personal.unlockAccount(web3.eth.accounts[0], 'password');
web3.eth.defaultAccount = web3.eth.accounts[0];

let server = restify.createServer();

let helloWorldContract = new HelloWorldContract(web3);

helloWorldContract.new();

server.post('/hello/:name', (request: restify.Request, response: restify.Response, next: restify.Next) => {

});

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});