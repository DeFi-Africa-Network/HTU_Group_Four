import React, {useState} from "react";
import './Storage.css'
import {ethers} from 'ethers'
import ABI from '../../contract/artifacts/Storage_abi.json'

const Storage = () =>{
  const [showCurrentNumber, setShowCurrentNumber] = useState(null)
  const [connectWallet, setConnectWallet] = useState("Connect Wallet")
  const [showAddress, setShowAddress] = useState("Not connected yet.")
  const [contract, setContract] = useState(null)

const contractAddress = "0xE92ff591eb6F646A53E1BF7b3275C63ddC10CE93"

//function to connect to metamask wallet
  function connectWalletHandler(){
    if(window.ethereum){
    window.ethereum.request({method: 'eth_requestAccounts'})
    .then(result =>{
        setShowAddress(result[0])
        setConnectWallet("Wallet is connected")
        loadBlockchainData()
})
}else{
    alert("You have to install metamask")
}
}
//function to load block chain data
const loadBlockchainData = async()=>{
    let provider = new ethers.BrowserProvider(window.ethereum)
    let signer = await provider.getSigner()
    let dataFromBlockchain = new ethers.Contract(contractAddress, ABI, signer)
    setContract(dataFromBlockchain)
}

//function to submit form data
const handleSubmitData = async(e)=>{
    e.preventDefault()
    await contract.store(e.target.setNumber.value)
    e.target.reset();
}



//function to retrieve data
const retrieveData = async(e)=>{
    let val = await contract.retrieve();
    setShowCurrentNumber(val.toString())
}


  return(
    <div className="container">
      <h1>The Storage dApp</h1>
      <button onClick={connectWalletHandler} className="btn1">{connectWallet}</button>
      <p>Address: {showAddress}</p>
      
      <form onSubmit={handleSubmitData}>
        <label htmlFor="setNumber">Type Number</label>
        <input type="number" id="setNumber"/><br/>
        <button type={'submit'} className="btn2">Store Number</button>
      </form>

      <button className="btn3" onClick={retrieveData}>Retrieve Number</button>
      <div className="display">{showCurrentNumber}</div>
    </div>
  );
}

export default Storage;