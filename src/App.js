import "./App.css";
import { useState } from "react";
import storehash from "./storehash";
import web3 from "./web3";
import ipfs from "./ipfs";
import { Form, Button, Grid, Table } from "react-bootstrap";
import React, { Component } from 'react';

function App() {
  const [ipfsHash, setIpfsHash] = useState(null);
  const [buffer, setBuffer] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [gasUsed, setGasUsed] = useState("");
  const [txReceipt, setTxReceipt] = useState("");

 const captureFile =(event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => convertToBuffer(reader)    
  };
const convertToBuffer = async(reader) => {
  //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
  //set this buffer -using es6 syntax
    setBuffer(buffer);
};
const onClick = async () => {
try{
    setBlockNumber("waiting...")
    setGasUsed("waiting...")
//get Transaction Receipt in console on click
//See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
await web3.eth.getTransactionReceipt(transactionHash, (err, txreceipt)=>{
      console.log(err,txreceipt);
      setTxReceipt(txreceipt)
    }); //await for getTransactionReceipt
await setBlockNumber(txReceipt.blockNumber) 
    await setGasUsed(txReceipt.gasUsed)     
  } //try
catch(error){
    console.log(error);
  } //catch
} //onClick
const onSubmit = async (event) => {
  event.preventDefault();
 //bring in user's metamask account address
  const accounts = await web3.eth.getAccounts();
 
  console.log('Sending from Metamask account: ' + accounts[0]);
//obtain contract address from storehash.js
  const ethAddress= await storehash.options.address;
  setEthAddress(ethAddress)
//save document to IPFS,return its hash#, and set hash# to state
//https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
  await ipfs.add(buffer, (err, ipfshash) => {
    console.log(err,ipfshash);
    //setState by setting ipfsHash to ipfsHash[0].hash 
    setIpfsHash(ipfshash)
// call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
//return the transaction hash from the ethereum contract
//see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
    
    storehash.methods.sendHash(ipfsHash).send({
      from: accounts[0] 
    }, (error, transactionhash) => {
      console.log(transactionHash);
      setTransactionHash(transactionhash)
    }); //storehash 
  }) //await ipfs.add 
}; //onSubmit
  return (
    <div className="App">
      <header className="App-header">
        <h1> Ethereum and IPFS with Create React App</h1>
      </header>

      <hr />
      <Grid>
        <h3> Choose file to send to IPFS </h3>
        <Form onSubmit={onSubmit}>
          <input type="file" onChange={captureFile} />
          <Button bsStyle="primary" type="submit">
            Send it
          </Button>
        </Form>
        <hr />
        <Button onClick={onClick}> Get Transaction Receipt </Button>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Tx Receipt Category</th>
              <th>Values</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>IPFS Hash # stored on Eth Contract</td>
              <td>{ipfsHash}</td>
            </tr>
            <tr>
              <td>Ethereum Contract Address</td>
              <td>{ethAddress}</td>
            </tr>
            <tr>
              <td>Tx Hash # </td>
              <td>{transactionHash}</td>
            </tr>
            <tr>
              <td>Block Number # </td>
              <td>{blockNumber}</td>
            </tr>
            <tr>
              <td>Gas Used</td>
              <td>{gasUsed}</td>
            </tr>
          </tbody>
        </Table>
      </Grid>
    </div>
  );
}

export default App;
