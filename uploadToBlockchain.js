const fs = require('fs');
const fetch = require('node-fetch');
const { create } = require('ipfs-http-client');
const { getEndpoint } = require('web3.storage');

const apiKey = 'e21d071085bbe791a328';
const apiSecret = 'b37eae9f772f5d5c15fe64f7ccc394c736fa5687ab891734725882a983111772';
const pinataEndpoint = 'https://api.pinata.cloud/';

const pinata = create({
  endpoint: pinataEndpoint + 'api/v0/', 
  headers: {
    pinata_api_key: apiKey,
    pinata_secret_api_key: apiSecret
  }
});

async function storeCSVToIPFS(filePath) {
    const file = fs.readFileSync(filePath);
    const { IpfsHash } = await pinata.add(file);
    return IpfsHash;
  }

async function storeCIDInSmartContract(cid) {
    const Web3 = require('web3');
    const web3 = new Web3(getEndpoint('goerli'));
    const MyContract = require('./MyContract.json');
    const contractAddress = '0xEE15C3A6122cdDD07C25243fe666690AEEea137F';
    const privateKey = 'skill pudding bracket rookie seek chimney orphan jealous rifle program saddle snack';
    const contract = new web3.eth.Contract(MyContract.abi, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const gas = await contract.methods.addData(cid).estimateGas();
    const tx = {
    from: accounts[0],
    to: contractAddress,
    gas: gas,
    data: contract.methods.addData(cid).encodeABI()
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('Transaction Hash:', receipt.transactionHash);
}

const filePath = 'C:/Users/Pranav Bawgikar/Downloads/Attempt1/download.json';

storeCSVToIPFS(filePath)
.then(cid => {
console.log('IPFS CID:', cid);
storeCIDInSmartContract(cid);
})
.catch(error => console.error(error));