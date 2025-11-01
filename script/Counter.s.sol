// script/Counter.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/Counter.sol";

contract CounterScript is Script {
    function run() external {
        vm.startBroadcast();
        new Counter("Hello Celo!"); // ✅ Truyền tham số vào constructor
        vm.stopBroadcast();
    }
}
