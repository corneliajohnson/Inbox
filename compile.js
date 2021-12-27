// compile code will go here

//standard modules

//the path module helps build a directory path from the complie.js file to the inbox.sol file
const path = require ('path');
//file system module
const fs = require('fs');
//solidity complier
const solc = require('solc')


//set path that points to Inbox.sol file
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
//read in the contents of the file - raw source code fron contract
const source = fs.readFileSync(inboxPath, 'utf8');

//complie statement -  1 is th e number of contacts we want to compile
//module.exports makes file avaalible to other files outside of the project
//using constracts[':Inbox'] because there isonly on contract info is only needed for the :Inbox object
module.exports = solc.compile(source, 1).contracts[':Inbox'];