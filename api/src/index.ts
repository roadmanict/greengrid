import * as restify from 'restify';
import * as Web3 from 'web3';
import {PowerExchangeContract} from './contracts/PowerContract';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let coinbase = web3.eth.coinbase;
web3.eth.defaultAccount = coinbase;

let server = restify.createServer();
server.use(restify.bodyParser());

let powerContract = new PowerExchangeContract(web3);
let powerContractAddress = '0xeb6a49f16f976833a4f5d123b76b4f8b6db5edd9';
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

server.get('/households/:address/transfers', (request: restify.Request, response: restify.Response, next: restify.Next) => {
  let count = powerContractInstance.getTransferCount(request.params.address);

  let transfers = [] as any[];

  for (let i = 0; i < count; i++) {
    let transferResult = powerContractInstance.get(request.params.address, i);

    let transfer = {
      kwh: parseInt(transferResult[0]),
      timestamp: parseInt(transferResult[1])
    };

    transfers.push(transfer);
  }

  response.json(200, transfers);
});

server.post('/addTransfer', (request: restify.Request, response: restify.Response, next: restify.Next) => {
  let result = powerContractInstance.newTransfer(request.body.kwh, Date.now(), {gas: 1000000});

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
