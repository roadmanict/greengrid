import * as restify from 'restify';
import * as Web3 from 'web3';
import {PowerExchangeContract} from './contracts/PowerContract';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let coinbase = web3.eth.coinbase;
web3.eth.defaultAccount = coinbase;

let server = restify.createServer();
server.use(restify.bodyParser());

let powerContract = new PowerExchangeContract(web3);
let powerContractAddress = '0xdc7825891cf45d305e67f370a8cb17e79f0862a1';
let powerContractInstance = powerContract.get(powerContractAddress);

server.post('/init', async (request: restify.Request, response: restify.Response, next: restify.Next) => {
  let result = await powerContract.new();

  if (!result.isValid) {
    return response.json(500, 'Error');
  }

  response.json(200, {address: result.contract.address});
});

server.get('/households', (request: restify.Request, response: restify.Response, next: restify.Next) => {
  response.json(200, powerContractInstance.getHouseholdAddresses());
});

server.get('/households/:address/exists', (request: restify.Request, response: restify.Response, next: restify.Next) => {
  response.json(200, powerContractInstance.exists(request.params.address));
});

server.get('/households/:address/logs', (request: restify.Request, response: restify.Response, next: restify.Next) => {
  let count = powerContractInstance.getLogCount(request.params.address);

  let transfers = [] as any[];

  for (let i = 0; i < count; i++) {
    let transferResult = powerContractInstance.get(request.params.address, i);

    let transfer = {
      produced: parseInt(transferResult[0]),
      consumed: parseInt(transferResult[1]),
      timestamp: parseInt(transferResult[2])
    };

    transfers.push(transfer);
  }

  response.json(200, transfers);
});

server.post('/log', (request: restify.Request, response: restify.Response, next: restify.Next) => {
  let result = powerContractInstance.newLog(request.body.produced, request.body.consumed, Date.now(), {gas: 1000000});

  response.json(200, result);
});

// server.get('/get/:address', async (request: restify.Request, response: restify.Response, next: restify.Next) => {
//   let contract = await powerContract.get(request.params.address);
//
//   if (!contract) {
//     return response.json(400, 'No contract found at address');
//   }
//
//   response.json(200, {value: contract.get()});
// });
//
// server.post('/set/:address', async (request: restify.Request, response: restify.Response, next: restify.Next) => {
//   let contract = await powerContract.get(request.params.address);
//
//   if (!contract) {
//     return response.json(400, 'No contract found at address');
//   }
//
//   response.json(200, {value: contract.set(request.body.new_value)});
// });

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});
