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

    mapping (address => Household) public households;

    function newTransfer(int kwh) {
        households[msg.sender][households[msg.sender].numTransfers] = Transfer({kwh: kwh, timeStamp: 0});
        households[msg.sender].numTransfers = households[msg.sender].numTransfers++;
    }

    function get(address household) returns (Household test) {
        return households[household];
    }
}
