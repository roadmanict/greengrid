pragma solidity ^0.4.0;

contract Household {
    address private owner;

    function Household() {
        owner = msg.sender;
    }
}
