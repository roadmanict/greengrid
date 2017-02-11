import * as restify from 'restify';
import * as Web3 from 'web3';
import {HelloWorldContract} from './contracts/HelloWorldContract';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var coinbase = web3.eth.coinbase;
console.log(coinbase);
// web3.personal.unlockAccount(coinbase, 'password');
web3.eth.defaultAccount = coinbase;

let server = restify.createServer();

let helloWorldContract = new HelloWorldContract(web3);

server.post('/hello/:number', async (request: restify.Request, response: restify.Response, next: restify.Next) => {
  let result = await helloWorldContract.new();

  if (!result.isValid) {
    return response.json(400, 'Error');
  }

  result.contract.set(parseInt(request.params.number));

  response.json(200, {address: result.contract.address});
});

server.get('/hello/:address', async (request: restify.Request, response: restify.Response, next: restify.Next) => {
  let contract = await helloWorldContract.get(request.params.address);

  response.json(200, {value: contract.get()});
});

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});