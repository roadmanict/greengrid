import * as restify from 'restify';
import * as Web3 from 'web3';
import {PowerExchangeContract} from './contracts/PowerContract';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var coinbase = web3.eth.coinbase;
web3.eth.defaultAccount = coinbase;

let server = restify.createServer();
server.use(restify.bodyParser());

server.use(restify.bodyParser());

let powerContract = new PowerExchangeContract(web3);

server.post('/create/', async (request: restify.Request, response: restify.Response, next: restify.Next) => {
  let result = await powerContract.new();

  if (!result.isValid) {
    return response.json(500, 'Error');
  }

  response.json(200, {address: result.contract.address});
});

server.get('/get/:address', async (request: restify.Request, response: restify.Response, next: restify.Next) => {
  let contract = await powerContract.get(request.params.address);

  if (!contract) {
    return response.json(400, 'No contract found at address');
  }

  response.json(200, {value: contract.get()});
});

server.post('/set/:address', async (request: restify.Request, response: restify.Response, next: restify.Next) => {
  let contract = await powerContract.get(request.params.address);

  if (!contract) {
    return response.json(400, 'No contract found at address');
  }

  response.json(200, {value: contract.set(request.body.new_value)});
});

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});
