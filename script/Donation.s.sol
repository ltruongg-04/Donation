// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/Donation.sol";

contract DonationScript is Script {
    function run() external {
        vm.startBroadcast();
        new Donation(); // deploy contract chính
        vm.stopBroadcast();
    }
}
