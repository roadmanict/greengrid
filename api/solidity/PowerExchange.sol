pragma solidity ^0.4.0;

contract PowerExchange {
    struct Transfer {
        int kwh;
        uint timeStamp;
    }

    struct Household {
        uint numTransfers;
        mapping(uint => Transfer) transfers;
    }

    mapping (address => Household) public testing;


    function PowerExchange() payable {
    
    }

    function newTransfer(int kwh) {
        Household blaat = testing[msg.sender];
        blaat.transfers[blaat.numTransfers] = Transfer({kwh: kwh, timeStamp: 0});
        blaat.numTransfers = blaat.numTransfers++;
    }

    function get(address household) returns (int kwh) {
        return testing[household].transfers[testing[household].numTransfers--].kwh;
    }
}
