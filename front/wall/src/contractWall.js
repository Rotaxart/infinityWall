import provider from "./provider";
import { ethers } from "ethers";
const address = "0x8c47fE26385630D4De17B303a5Af3045827b7E73";

const abi = [
  {
    inputs: [
      { internalType: "uint256", name: "_minDonate", type: "uint256" },
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "address", name: "_newOwner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint64", name: "_id", type: "uint64" },
      {
        indexed: false,
        internalType: "string",
        name: "_message",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_sender",
        type: "address",
      },
    ],
    name: "messageSended",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "messages",
    outputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "string", name: "message", type: "string" },
      { internalType: "uint64", name: "id", type: "uint64" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minDonate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_text", type: "string" }],
    name: "setMessage",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_newValue", type: "uint256" }],
    name: "setMinDonate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

const wallContract = new ethers.Contract(address, abi, provider);

export default wallContract;