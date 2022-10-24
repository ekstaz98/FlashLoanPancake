/*
 SPDX-License-Identifier: MIT
*/
pragma solidity = 0.8.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IPancakeV2Call.sol";
import "./interfaces/pancake/IPancakeFactory.sol";
import "./interfaces/pancake/IPancakePair.sol";

contract FlashContract is IPancakeV2Call {
    address private constant WETH = 0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd; // bsc testnet
    address private constant PancakeFactory = 0x6725F303b657a9451d8BA641348b6761A6CC7a17; // bsc testnet

    function runSwap(
        address tokenSwap0,
        address tokenSwap1,
        uint256 tokenAmount,
        bytes calldata _data
    ) external {
        address pair = IPancakeFactory(PancakeFactory).getPair(tokenSwap0, tokenSwap1);
        require(pair != address(0), "!pair");

        address token0 = IPancakePair(pair).token0();
        address token1 = IPancakePair(pair).token1();

        uint256 amount0Out = tokenSwap0 == token0 ? tokenAmount : 0;
        uint256 amount1Out = tokenSwap0 == token1 ? tokenAmount : 0;

        bytes memory data = abi.encode(tokenSwap0, tokenAmount);

        IPancakePair(pair).swap(amount0Out, amount1Out, address(this), data);
    }

    function pancakeCall(
        address _sender,
        uint256 _amount0,
        uint256 _amount1,
        bytes calldata _data
    ) external override {
        require(_sender == address(this), "!sender");
        address token0 = IPancakePair(msg.sender).token0();
        address token1 = IPancakePair(msg.sender).token1();
        address pair = IPancakeFactory(PancakeFactory).getPair(token0, token1);
        require(msg.sender == pair, "!pair");
        
        (address tokenSwap0, uint256 tokenAmount) = abi.decode(_data, (address, uint256));

        // 0.25% fees
        uint256 fee = ((tokenAmount * 25) / 9975) + 1;
        uint256 amountToRepay = tokenAmount + fee;

        IERC20(tokenSwap0).transfer(pair, amountToRepay);
    }
}