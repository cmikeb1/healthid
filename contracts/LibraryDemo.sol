pragma solidity ^0.5.0;


library LibraryDemo {
    function minus(uint x, uint y) public pure returns (uint) {
        assert(y <= x);
        return x - y;
    }
}