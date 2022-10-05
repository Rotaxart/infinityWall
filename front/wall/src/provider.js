import { ethers } from "ethers";
const getProvider = () => {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider
  } else {
    console.log("MM not installed")
  }
};

const provider = getProvider();
export default provider;