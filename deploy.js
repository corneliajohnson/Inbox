// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'because next shallow swamp blind silk novel shine sick social express script','https://rinkeby.infura.io/v3/6bdaf62224e94fb2a0cefbebf7501d72'
);

const web3 = new Web3(provider);
const INTITAL_STRING = 'Hi there!'

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result =  await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INTITAL_STRING],
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deploy();