pragma solidity ^0.4.0;

contract HelloWorld {
   uint storedData;

   function set(uint x) {
       storedData = x;
   }

   function get() constant returns (uint) {
       return storedData;
   }
}