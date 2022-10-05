import { ethers } from "ethers";
import provider from "./provider";
import { useEffect, useState } from "react";
import factoryContract from "./contractFactory";
import wallContract from "./contractWall";

function App() {

  const [account, setAccount] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState("");

  const handleConnectClick = async () => {
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0])
      console.log("ok")
    } catch (error) {
      console.error(error);
    }
  };

  const handleMessageButton = async () => {

  }

  const handleTextChange = (event) => {
    setMessage(event.target.value);
    console.log(message)

  }

  useEffect(() => {
    (async () => {
      const name = await wallContract.name()
      setName(name);
    })()
  }, [])

  return (
    <div>
      <button onClick={handleConnectClick}>Connect MetaMask</button>
      <p>{account}</p>
      <p>{name}</p>
      <form onSubmit={handleMessageButton}>
        <input type="text" onChange={handleTextChange}></input>
      </form>
      
    </div>
  );
}

export default App;
