// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter("Hello");
    }

    function test_Increment() public {
        assertEq(counter.message(), "Hello");
    }

    function testFuzz_SetNumber(uint256 x) public {
        counter.setMessage("Xin chao Celo");
        assertEq(counter.message(), "Xin chao Celo");
    }
}
