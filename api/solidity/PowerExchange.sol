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

    mapping(address => Household) households;
    address[] householdAddresses;

    function newTransfer(int kwh, uint timestamp) {
        var transfer = Transfer(kwh, timestamp);

        if (exists(msg.sender) == false) {
            householdAddresses.push(msg.sender);
            households[msg.sender].exists = true;
        }
        households[msg.sender].transfers.push(transfer);
    }

    function getHouseholdAddresses() constant returns(address[] addresses) {
        addresses = householdAddresses;
    }

    function exists(address house) constant returns(bool exists) {
        exists = false;
        
        for (uint i = 0; i < householdAddresses.length; i++) {
            if (householdAddresses[i] == house) {
                exists = true;
                break;
            }
        }
    }
    
    function getTransferCount(address household) constant returns (uint length) {
        length = households[household].transfers.length;
    }

    function get(address household, uint index) constant returns (int kwh, uint timestamp) {
        kwh = households[household].transfers[index].kwh;
        timestamp = households[household].transfers[index].timestamp;
    }
}
