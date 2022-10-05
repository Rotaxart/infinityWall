import provider from "./provider";
import { ethers } from "ethers";
const address = "0x77A0C57B4f4d496c8301eE3bDA27cf4d4f67819f";

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "wallCreated",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_minDonate", type: "uint256" },
      { internalType: "string", name: "_name", type: "string" },
    ],
    name: "createNewWall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "walls",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

const factoryContract = new ethers.Contract(address, abi, provider);

export default factoryContract;