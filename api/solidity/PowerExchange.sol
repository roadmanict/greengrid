pragma solidity ^0.4.0;

contract PowerExchange {
    struct Transfer {
        int kwh;
        uint timestamp;
    }

    struct Household {
        bool exists;
        Transfer[] transfers;
    }

    mapping(address => Household) public households;
    address[] householdAddresses;

    function newTransfer(int kwh, uint timestamp) {
        var house = households[msg.sender];

        if (house.exists) {
            house.exists = true;
            householdAddresses[householdAddresses.length] = msg.sender;
        }
        
        house.transfers[house.transfers.length] = Transfer({kwh: kwh, timestamp: timestamp});
    }

    function getHouseholdAddresses() returns(address[]) {
        return householdAddresses;
    }
    
    // function getTransferCount(address household) returns (uint) {
    //     return households[household].transfers.length;
    // }

    // function get(address household, uint index) returns (transfers) {
    //     transfers = households[household].transfers;
    // }
}
