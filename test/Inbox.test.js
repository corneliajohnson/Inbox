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