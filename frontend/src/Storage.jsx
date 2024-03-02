import React, {useState} from "react";
import './Storage.css'

const Storage = () =>{
  const [showCurrentNumber, setShowCurrentNumber] = useState(null)
  const [connectWallet, setConnectWallet] = useState("Connect Wallet")
  const [showAddress, setShowAddress] = useState("Not connected yet.")
  const [contract, setContract] = useState(null)


  function connectWalletHandler(){
    if (window.ethereum) {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then (result => {
        setShowAddress(result[0])
        setConnectWallet("Wallet is connected")
      })
    }else{
      alert("You don't have metamask installed")
    }
  }

  return(
    <div className="container">
      <h1>The Storage dApp</h1>
      <button onClick={connectWalletHandler} className="btn1">{connectWallet}</button>
      <p>Address: {showAddress}</p>
      
      <form>
        <label htmlFor="setNumber">Type Number</label>
        <input type="number" id="setNumber"/><br/>
        <button type={'submit'} className="btn2">Store Number</button>
      </form>

      <button className="btn3">Retrieve Number</button>
      <div className="display">{showCurrentNumber}</div>
    </div>
  );
}

export default Storage;