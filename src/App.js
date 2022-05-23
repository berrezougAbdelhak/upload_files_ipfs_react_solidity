import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [ipfsHash,setIpfsHash]=useState(null)
  const [buffer,setBuffer]=useState('')
  const [ethAddress,setEthAddress]=useState('')
  const [blockNumber,setBlockNumber]=useState('')
  const [transactionHash,setTransactionHash]=useState("")
  const [gasUsed,setGasUsed]=useState("")
  const[txReceipt,setTxReceipt]=useState("")

  return (
    <div className="App">
      <header className="App-header">
        <h1> Ethereum and IPFS with Create React App</h1>
      </header>
      
      <hr />
<Grid>
      <h3> Choose file to send to IPFS </h3>
      <Form onSubmit={this.onSubmit}>
        <input 
          type = "file"
          onChange = {this.captureFile}
        />
         <Button 
         bsStyle="primary" 
         type="submit"> 
         Send it 
         </Button>
      </Form>
<hr/>
<Button onClick = {this.onClick}> Get Transaction Receipt </Button>
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
                <td>{this.state.ipfsHash}</td>
              </tr>
              <tr>
                <td>Ethereum Contract Address</td>
                <td>{this.state.ethAddress}</td>
              </tr>
              <tr>
                <td>Tx Hash # </td>
                <td>{this.state.transactionHash}</td>
              </tr>
              <tr>
                <td>Block Number # </td>
                <td>{this.state.blockNumber}</td>
              </tr>
              <tr>
                <td>Gas Used</td>
                <td>{this.state.gasUsed}</td>
              </tr>
            
            </tbody>
        </Table>
    </Grid>
 </div>
  );
}

export default App;
