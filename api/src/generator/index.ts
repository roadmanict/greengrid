import * as Web3 from 'web3';
import * as crypto from 'crypto';
import {PowerExchangeContract} from '../contracts/PowerContract';
import * as moment from 'moment';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let coinbase = web3.eth.coinbase;
web3.eth.defaultAccount = coinbase;

let powerContract = new PowerExchangeContract(web3);
let powerContractAddress = '0xdc7825891cf45d305e67f370a8cb17e79f0862a1';
let powerContractInstance = powerContract.get(powerContractAddress);

let households = {} as {[houseID: string]: any};

let produced = [
  400,
  500,
  600
];

let consumed = [
  -10,
  0,
  10
];

for (let i = 0; i < 50; i++) {
  households[i] = {
    random: Math.floor((Math.random() * 10) + 1)
  };
}

let startMoment = moment().subtract(1, 'day');
let now = moment();

while (startMoment.isBefore(now)) {
  let keys = Object.keys(households);

  for (let i = 0; i < keys.length; i++) {
    let household = households[keys[i]];
    let wh = produced[i % produced.length];
    let csWH = consumed[i % Math.floor((Math.random() * 3) + 1)];

    powerContractInstance.newLog(keys[i], wh + household.random, wh + csWH, startMoment.valueOf(), {gas: 1000000});
  }

  startMoment.add('1', 'hour');
}