import { HardhatRuntimeEnvironment } from 'hardhat/types';

module.exports = async function (hre: HardhatRuntimeEnvironment) {
    const { ethers, deployments } = hre;
    const { deploy } = deployments

    const [account] = await ethers.getSigners()

    const contracts = [
        'FlashContract',
    ]

    for (const contract of contracts) {
        await deploy(contract, {
            args: [],
            from: account.address,
            log: true,
        });
    }
};

module.exports.tags = ["deploy"];