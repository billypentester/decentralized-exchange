import React, { createContext, useContext, useState, useEffect } from "react";
import { Token1Context } from "./Token1Context";

import {
  bscBridgeAddress,
  bridgeABI,
  mumBridgeAddress,
  chainId,
  BSCchainid,
  kyzABI,
} from "../utils/contants";
import swal from "sweetalert";
export const BridgeContext = createContext();

const Web3 = require("web3");

export default function BridgeProvider({ children }) {
  var MumURL="wss://polygon-mumbai.g.alchemy.com/v2/MXTlA2FpRDF3lP5pMRFjWA8C-o-Khq8b";
  const BSCURL="wss://serene-withered-sponge.bsc-testnet.discover.quiknode.pro/393e752e6aed76a5aff551bfc6c160ea4f906bbb/"
  const { walletAddress, approveTokens } = useContext(Token1Context);
  let web3 = new Web3(window.ethereum);
  let web3BSC= new Web3(BSCURL);
  let web3Mum= new Web3(MumURL);
  console.log(web3);
  async function shiftChain(CHAINid) {
    try{
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: Web3.utils.toHex(CHAINid) }],
  });
}catch(err){
  console.log("error code",err.code)
  if(err.code==4902 || err.code ==-32603){
    console.log("error code",err.code)
    if(CHAINid==0x61){
      console.log("chain is this",CHAINid)
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: Web3.utils.toHex(CHAINid),
          chainName: "Binance Smart Chain Testnet",
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
          nativeCurrency: {
            name: "tBNB",
            symbol: "tBNB",
            decimals: 18,
          },
          blockExplorerUrls: ["https://testnet.bscscan.com"],
        },
      ],
    });
  }else{
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: Web3.utils.toHex(CHAINid),
          chainName: "Mumbai Testnet",
          rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
          nativeCurrency: {
            name: "Mumbai Testnet",
            symbol: "MATIC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://polygonscan.com/"],
        },
      ],
    });
  }
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: Web3.utils.toHex(CHAINid) }],
  });

  }

}
  }
  async function addTokenToBlockchain(mumbaiToken, bscToken, fee) {
    const mumBridgeContract = new web3.eth.Contract(
      bridgeABI,
      mumBridgeAddress
    );

    const AddToken = await mumBridgeContract.methods
      .addToken(mumbaiToken, bscToken, fee)
      .send({ from: walletAddress });
    console.log("confirmed", AddToken);
  }
  async function getContract(contractABI, contractAddress) {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    return contract;
  }
  async function getBSCTokenContract( contractAddress) {
    const contract = new web3BSC.eth.Contract(kyzABI, contractAddress);
    return contract;
  }
  async function getMUMTokenContract( contractAddress) {
    const contract = new web3Mum.eth.Contract(kyzABI, contractAddress);
    return contract;
  }
  async function getTokenContract( contractAddress) {
    const contract = new web3.eth.Contract(kyzABI, contractAddress);
    return contract;
  }
  async function getMumBridgeContract() {
    const contract = new web3Mum.eth.Contract(
      bridgeABI,
      mumBridgeAddress
    );
    return contract;
  }
  async function getBscBridgeContract() {
    const contract = new web3BSC.eth.Contract(
      bridgeABI,
      bscBridgeAddress
    );
    return contract;
  }
  //approvetoken
  async function APPROVEtoken(CHAINid,tokenName, tokenValue) {
    try{
    let TokenContract,address
    console.log("chain is", CHAINid)
    
    await shiftChain(CHAINid)
    
    
    if(CHAINid==0x13881){
    
    
     address=mumBridgeAddress
 }else{
   address=bscBridgeAddress

 }
 TokenContract = await getTokenContract(tokenName);


    
    const decimals = await TokenContract.methods.decimals().call()
    tokenValue = (tokenValue * 10 ** decimals).toLocaleString("fullwide", {
      useGrouping: false,
    });
    const Approve = await TokenContract.methods
      .approve(address, tokenValue)
      .send({ from: walletAddress }).then(()=>{
        swal({
          title: "Attention",
          text: `Transaction was successful`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
      return true
    console.log("approved successfully", Approve);
  }
  catch(err){
    return swal({
      title: "Attention",
      text: `Transaction reverted`,
      icon: "warning",
      button: "OK!",
      className: "modal_class_success",
    });

  }
  }

  async function BridgeLiquidityy(CHAINid, tokenName, tokenValue) {
    try{
    let contract
    let TokenContract
    if(CHAINid!=window.ethereum.chainId){
     await  shiftChain(CHAINid)
    }

    if(CHAINid==0x13881){
      contract=await getContract(bridgeABI,mumBridgeAddress)
      TokenContract = await getTokenContract(tokenName);
   }else{
     contract=await getContract(bridgeABI,bscBridgeAddress)
     TokenContract = await getBSCTokenContract(tokenName);
   }
    console.log(tokenName, "***************", tokenValue);

    
    const decimals = await TokenContract.methods.decimals().call()
    tokenValue = (tokenValue * 10 ** decimals).toLocaleString("fullwide", {
      useGrouping: false,
    });
   
    console.log(contract);
    const addLiquidityToBridge = await contract.methods
      .addTokensforLiquidity(tokenName, tokenValue)
      .send({ from: walletAddress }).then(()=>{
        swal({
          title: "Attention",
          text: `Transaction Successful`,
          icon: "success",
          button: "OK!",
          className: "modal_class_success",
        });
      });
    console.log("done", addLiquidityToBridge);
  }
    catch(err){
      return swal({
        title: "Attention",
        text: `Transaction reverted`,
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
  
    }
  }
  async function Deposit(CHAINid,tokenName, tokenValue){
    console.log(CHAINid,tokenName, tokenValue)
    try{
      
let contract,TokenContract
await shiftChain(CHAINid)
  
  if(CHAINid==0x13881){
    contract=await getContract(bridgeABI,mumBridgeAddress)
    TokenContract = await getTokenContract(tokenName);
    
 }else{
   contract=await getContract(bridgeABI,bscBridgeAddress)
   TokenContract = await getBSCTokenContract(tokenName);
 }
 
 const decimals = await TokenContract.methods.decimals().call()
    tokenValue = (tokenValue * 10 ** decimals).toLocaleString("fullwide", {
      useGrouping: false,
    });
 const nonce= await contract.methods.nonces().call()
 console.log(nonce)

   const message = web3.utils.soliditySha3(     
    {t: 'address', v: walletAddress},
     {t: 'address', v: walletAddress},
     {t: 'uint256', v: tokenValue},
    {t: 'uint256', v: Number(nonce+20)},
   ).toString('hex');
console.log("message",message)
   const sig= await web3.eth.personal.sign(message,walletAddress)
   console.log(sig)
   console.log(walletAddress,"ok", walletAddress,"ok",tokenName,"ok", tokenValue,"ok", Number(nonce+20), "ok",sig )
   const sendMoney= await contract.methods.send(walletAddress,tokenValue,tokenName,Number(nonce+20),sig).send({from:walletAddress}).then(()=>{
    swal({
      title: "Attention",
      text: `Transaction Successful`,
      icon: "success",
      button: "OK!",
      className: "modal_class_success",
    });
  });
    }
   catch(err){
    return swal({
      title: "Attention",
      text: `Transaction reverted`,
      icon: "warning",
      button: "OK!",
      className: "modal_class_success",
    });

  }


  }
async function getRemainingBalances(CHAINid,tokenName){
  try{
      
  let contract
  
  if(CHAINid!=window.ethereum.chainId){
   await  shiftChain(CHAINid)
  }
  if(CHAINid==0x13881){
    contract=await getContract(bridgeABI,mumBridgeAddress)
    
 }else{
   contract=await getContract(bridgeABI,bscBridgeAddress)
   
 }
 const withdraw= await contract.methods.getRemainingBalance(walletAddress,tokenName).send({from:walletAddress}).then(()=>{
  swal({
    title: "Attention",
    text: `Transaction Successful`,
    icon: "success",
    button: "OK!",
    className: "modal_class_success",
  });
});


}
catch(err){
 return swal({
   title: "Attention",
   text: `Transaction reverted`,
   icon: "warning",
   button: "OK!",
   className: "modal_class_success",
 });

}

}

async function WithdrawOnSecondBlockchain(CHAINid,tokenName,supplyAmount, tokenValue){
  try{
    
let contract,TokenContract
await shiftChain(CHAINid)

if(CHAINid==0x13881){
  contract=await getContract(bridgeABI,mumBridgeAddress)
  
}else{
 contract=await getContract(bridgeABI,bscBridgeAddress)
 
}
TokenContract = await getTokenContract(tokenName);
const decimals = await TokenContract.methods.decimals().call()
  tokenValue = (tokenValue * 10 ** decimals).toLocaleString("fullwide", {
    useGrouping: false,
  });
const nonce= await contract.methods.nonces().call()
console.log(nonce)

 const message = web3.utils.soliditySha3(     
  {t: 'address', v: walletAddress},
   {t: 'address', v: walletAddress},
   {t: 'uint256', v: tokenValue},
  {t: 'uint256', v: nonce},
 ).toString('hex');
console.log("message",message)
 const sig= await web3.eth.personal.sign(message,walletAddress)
 console.log(sig)
 console.log(walletAddress,"ok", walletAddress,"ok",tokenName,"ok", tokenValue,"ok", nonce, "ok",sig )
 const sendMoney= await contract.methods.getLiquidityFromSupplyOnSecondBlockchain(tokenName,supplyAmount,nonce,sig).send({from:walletAddress}).then(()=>{
  swal({
    title: "Attention",
    text: `Transaction Successful`,
    icon: "success",
    button: "OK!",
    className: "modal_class_success",
  });
});
  }
 catch(err){
  return swal({
    title: "Attention",
    text: `Transaction reverted`,
    icon: "warning",
    button: "OK!",
    className: "modal_class_success",
  });

}


}
  
  

  return (
    <BridgeContext.Provider
      value={{
        BridgeLiquidityy,
        addTokenToBlockchain,
        APPROVEtoken,
        getBscBridgeContract,
        getMumBridgeContract,
        getTokenContract,
        getBSCTokenContract,
        getMUMTokenContract,
        Deposit,
        getRemainingBalances,
        WithdrawOnSecondBlockchain,
        bridgeABI,
        mumBridgeAddress,
        getContract,
        bscBridgeAddress,
        shiftChain
      }}
    >
      {children}
    </BridgeContext.Provider>
  );
}
