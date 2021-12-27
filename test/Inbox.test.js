// contract test code will go here

//used for making assertions about test
const assert = require ('assert');
//serves as local ETH test netowrk
const ganache = require('ganache-cli');
//Web3 is the soultion to communcitating between a javascript app and the ETH network
//Web3 is captitalized because it is a construct - just to make instances of the web3 libaray
const Web3 = require('web3');
//create an instance of web3 and tells the instance to connect to the local test network (ganache)
const web3 = new Web3(ganache.provider());
//the complie.js export file contains the interface and bytecode in the :Inbox object
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;
const INTITAL_STRING = 'Hi there!'

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  //use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INTITAL_STRING],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  //test that an address exist for the deployed contract - returns a boolean
  it("deploys a contract", () => {
    assert.ok(inbox.options.address)
  });

    //test that the intiail message sting has a value
  it("has a default message", async ()=>{
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, INTITAL_STRING);
  });

  //test that the messgae string is modified
  it('can change the message', async ()=>{
    await inbox.methods.setMessage("new message").send({from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.ok.strictEqual(message, "new message");
  });
});