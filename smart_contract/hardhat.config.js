//https://eth-sepolia.g.alchemy.com/v2/uveOxQj40EZTwA0_MoUMFXxhErTxKgPV

require("@nomicfoundation/hardhat-toolbox");

//require('@nomiclabs/hardhat-waffle');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/uveOxQj40EZTwA0_MoUMFXxhErTxKgPV',
      accounts: [ '12709a7d4e95249ff4a13b911de602500d3415118fb4565c47de6c54cbc703fb' ]
    }
  }
};
