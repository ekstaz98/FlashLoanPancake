// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

/**
 * @title Pancake Flash Loan Interface
 **/
interface IPancakeV2Call {
    function pancakeCall(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external;
}