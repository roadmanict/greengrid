import * as restify from 'restify';
import * as Web3 from 'web3';
import {HelloWorldContract} from './contracts/HelloWorldContract';
import {HouseholdContract} from './contracts/HouseholdContract';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let coinbase = web3.eth.coinbase;
web3.eth.defaultAccount = coinbase;

let server = restify.createServer();
server.use(restify.bodyParser());

let helloWorldContract = new HelloWorldContract(web3);
let householdContract = new HouseholdContract(web3);

server.post('/hello/create', async (request: restify.Request, response: restify.Response, next: restify.Next) => {
  let result = await helloWorldContract.new();

  if (!result.isValid) {
    return response.json(500, 'Error');
  }

  return response.json(201, {address: result.contract.address});
});

server.post('/hello/:address', (request: restify.Request, response: restify.Response, next: restify.Next) => {
  console.log(request.body);
  console.log(request.params);

  let contract = helloWorldContract.get(request.params.address);

  console.log('contract', contract);

  if (!contract) {
    return response.json(400, 'No contract found at address');
  }

  let result = contract.set(request.body.hello);

  response.json(200, result);
});

server.get('/hello/:address', (request: restify.Request, response: restify.Response, next: restify.Next) => {
  let contract = helloWorldContract.get(request.params.address);

  if (!contract) {
    return response.json(400, 'No contract found at address');
  }

  response.json(200, {value: contract.get()});
});

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});