import { task } from "hardhat/config"

task("flash", async (taskArgs, hre) => {
    const [account] = await hre.ethers.getSigners()
    const address = '0x16c2cC5d02464945Ef97162C0B9a4d07587f4D7e'

    const contract = await hre.ethers.getContractAt('FlashContract', address);
   
    const weth ='0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'
    const corn = '0xCeb8987b6F99f36156C85F1e23eea0B8e776c1bB'
    const amount = hre.ethers.BigNumber.from('100000000000000000000')
    const answer = await contract.connect(account).runSwap(corn, weth, amount, '0x12121212', { gasPrice: 10e9, gasLimit: 1000000 }) 
    const p = await answer.wait()
    console.log(p)

    console.log("Result: ", answer);

    console.log("Done!");

})