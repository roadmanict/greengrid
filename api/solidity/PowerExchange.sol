pragma solidity ^0.4.0;

contract PowerExchange {
    struct EnergyLog {
        uint produced;
        uint consumed;
        uint timestamp;
    }

    struct Household {
        bool exists;
        EnergyLog[] logs;
    }

    mapping(uint => Household) households;
    uint[] householdAddresses;

    function newLog(uint houseID, uint produced, uint consumed, uint timestamp) {
        var log = EnergyLog(produced, consumed, timestamp);

        if (exists(houseID) == false) {
            householdAddresses.push(houseID);
            households[houseID].exists = true;
        }
        
        households[houseID].logs.push(log);
    }

    function getHouseholdAddresses() constant returns(uint[] addresses) {
        addresses = householdAddresses;
    }

    function exists(uint house) constant returns(bool exists) {
        exists = false;
        
        for (uint i = 0; i < householdAddresses.length; i++) {
            if (householdAddresses[i] == house) {
                exists = true;
                break;
            }
        }
    }
    
    function getLogCount(uint household) constant returns (uint length) {
        length = households[household].logs.length;
    }

    function get(uint household, uint index) constant returns (uint produced, uint consumed, uint timestamp) {
        var log = households[household].logs[index];
        produced = log.produced;
        consumed = log.consumed;
        timestamp = log.timestamp;
    }
}
