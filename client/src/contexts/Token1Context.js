import React, { createContext, useState, useEffect } from "react";

import {
  DMATICAddress,
  DMATICABI,
  DUSDAddress,
  DUSDABI,
  DTXAddress,
  DTXABI,
  factoryAddress,
  factoryABI,
  routerAddress,
  routerABI,
  pairAddress,
  pairABI,
  kyzAddress,
  kyzABI,
  poolABI,
  quoterABI,
  quoterAddress,
  chainId,
  createYourTokenABI,
  createYourTokenAddress,
  NFTManagerABI,
  NFTManagerAddress,
  poolAddress,
  BSCchainid,
} from "../utils/contants";
import swal from "sweetalert";
import { bignumber } from "mathjs";
export const Token1Context = createContext();

const Web3 = require("web3");
// let web3 = new Web3(
//   "https://polygon-mumbai.infura.io/v3/6e2754c1907e44d0aea9fe116ebbe15d"
// );
export default function TokenProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState("");
  const [estimatedValue, setEstimatedValue] = useState();
  const [estimatedValue1, setEstimatedValue1] = useState();
  const [loader, setLoader] = useState(false);
  const [price, setPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState();
  const [intializedVar, setIntializedVar] = useState(false);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1);
  const [Errors,setError]=useState(true)
  
  let web3 = new Web3(window.ethereum);

async function returnName(token){
  if(token)
  {
    try{
      const contract =await getTokenContracts(token)
    const name=await contract.methods.symbol().call()
    return name
  
    }catch(err){
      setError(false)
      return swal({
        title: "Attention",
        text: `Invalid Token`,
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });


    }
  }
  
  

}

  async function approveTokensRouter(token, tokenAmount) {
    try{
      const tokenContract = getTokenContracts(token);
    const tokenDecimals = await tokenContract.methods.decimals().call();
    const amountWithDecimals = Number(
      tokenAmount * 10 ** tokenDecimals
    ).toLocaleString("fullwide", {
      useGrouping: false,
    });
    const Approve = await tokenContract.methods
          .approve(routerAddress, amountWithDecimals)
          .send({ from: walletAddress }).then(()=>{
            swal({
              title: "Attention",
              text: `Transaction was successful`,
              icon: "warning",
              button: "OK!",
              className: "modal_class_success",
            });
          });
        await Approve;

    console.log("approved", Approve);
    return true

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



  async function Swap(amounts, bool, percent,token0,token1) {
    // const walletAddress = await connectWallet();
    // console.log(walletAddress);
    setError(true)
    try {
      if (bool) {
        const ContractRouter = new web3.eth.Contract(routerABI, routerAddress);
        const Contract0 = new web3.eth.Contract(kyzABI, token0);
        const Contract1 = new web3.eth.Contract(kyzABI, token1);
        // const userAddress = web3.utils.toChecksumAddress(
        //   window.ethereum.selectedAddress
        // );
        const decimals0=await Contract0.methods.decimals().call()
        const decimals1=await Contract1.methods.decimals().call()
      const amount = (amounts * 10 ** decimals0).toLocaleString("fullwide", {
        useGrouping: false,
      });
        

        
        console.log(amount,"amount is also here sir");
        const Balance = await Contract0.methods.balanceOf(walletAddress).call();
        console.log(Balance,"balance is here guys");
        if (Number(Balance) < Number(amount)) {
          setError(false)
          return swal({
            title: "Attention",
            text: `You don't have sufficient balance.`,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        }
        console.log("estimated value",estimatedValue1);

        var slippageValue = (estimatedValue1 - (percent * estimatedValue1) / 100);
        console.log("slippages", slippageValue);
        slippageValue  = (slippageValue * 10 ** decimals1).toLocaleString("fullwide", {
          useGrouping: false,
        });
        console.log("slippages", slippageValue);
        
        const ExactInputSingle = ContractRouter.methods
          .exactInputSingle([
            token0,
            token1,
            3000,
            walletAddress,
            1780400920,
            amount,
            slippageValue,//slippage set to 0 ATM
            0,
          ])
          .send({ from: walletAddress });

        await ExactInputSingle;
        return swal({
          title: "successfully Swapped",
          text: `Transaction Successfull`,
          icon: "success",
          button: "OK!",
          className: "modal_class_success",
        });
      } else {
        const ContractRouter = new web3.eth.Contract(routerABI, routerAddress);
        const Contract = new web3.eth.Contract(kyzABI, DTXAddress);
        // const userAddress = web3.utils.toChecksumAddress(
        //   window.ethereum.selectedAddress
        // );

        const amount = web3.utils.toWei(amounts.toString(), "ether");

        console.log(amount);

        const Balance = await Contract.methods.balanceOf(walletAddress).call();
        console.log(Balance);
        if (Balance < amount) {
          setError(false)
          return swal({
            title: "Attention",
            text: `You don't have sufficient balance.`,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        }

        var slippageValue = estimatedValue1 - (percent * estimatedValue1) / 100;
        console.log("slippages", slippageValue);
        slippageValue = web3.utils.toWei(slippageValue.toString(), "ether");
        console.log("slippages", slippageValue);
        const Approve = await Contract.methods
          .approve(routerAddress, amount)
          .send({ from: walletAddress });
        await Approve;

        // console.log(Approve);

        // const ExactInputSingle = await ContractRouter.methods
        //   .exactInputSingle([
        //     kyzAddress,
        //     DTXAddress,
        //     3000,
        //     walletAddress,
        //     1780400920,
        //     amount,
        //     0,
        //     0,
        //   ])
        //   .send({ from: walletAddress });
        const ExactInputSingle = ContractRouter.methods
          .exactInputSingle([
            DTXAddress,
            kyzAddress,

            3000,
            walletAddress,
            1780400920,
            amount,
            slippageValue,
            0,
          ])
          .send({ from: walletAddress });

        await ExactInputSingle;
        return swal({
          title: "successfully Swapped",
          text: `Transaction Successfull`,
          icon: "success",
          button: "OK!",
          className: "modal_class_success",
        });
      }

      // const value = await web3.eth.call(
      //   {
      //     from: walletAddress,
      //     to: routerAddress,
      //     data: ExactInputSingle.encodeABI(),
      //   },
      //   "latest"
      // );
      // console.log(Number(value));
    } catch (error) {
      console.log(error);
      return swal({
        title: "Attention",
        text: `Transaction Reverted.`,
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    }
    // console.log(userAddress);
  }

  const connectWallet = async () => {
    // const provider = await detectEthereumProvider();
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await accounts
        console.log(window.ethereum.chainId)
if(window.ethereum.chainId!=Web3.utils.toHex(chainId))
{

  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: Web3.utils.toHex(chainId),
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
          params: [{ chainId: Web3.utils.toHex(chainId) }],
        });
        setWalletAddress(accounts[0]);

        // console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log("please install MetaMask");
    }
  };
  const findPool = async () => {
    const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress);
    console.log(factoryContract);
    const getPoolAddress = await factoryContract.methods
      .getPool(kyzAddress, DTXAddress, 3000)
      .call();
    const boolean = kyzAddress < DTXAddress;
    console.log(boolean);
    console.log(getPoolAddress);
    console.log("err", poolABI);
    const PoolContract = new web3.eth.Contract(poolABI, getPoolAddress);
    console.log(PoolContract);
    const ok = web3.eth.abi.encodeParameters(
      ["address", "uint24", "address"],
      [
        "0x464f5831dbb146dace9f28fb106b893cfce37034",
        "3000",
        "0x4b919a6a9e7f7e382263579f80a4b41f0625a14a",
      ]
    );
    console.log(ok);
    const swapp = await PoolContract.methods.swap(
      walletAddress,
      boolean,
      "1000000000000000000",
      "4295128740",
      ok
    );

    const value = await web3.eth.call(
      {
        from: walletAddress,
        to: getPoolAddress,
        data: swapp.encodeABI(),
      },
      "latest"
    );
    console.log(Number(value));
  };
async function getPoolBool(token0, token1,value){
if(token0 && token1 && value){
  setError(true)
  const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress);
  let getPoolAddress
  try{
    getPoolAddress = await factoryContract.methods
      .getPool(token0, token1, value)
      .call();

  }catch(err){
    setError(false)
    return swal({
      title: "Attention",
      text: `Pool Doesn't Exist`,
      icon: "warning",
      button: "OK!",
      className: "modal_class_success",
    });


  }
    


  
      if(getPoolAddress !="0x0000000000000000000000000000000000000000"){
        return getPoolAddress
      }else{
      setError(false)
      return swal({
        title: "Attention",
        text: `Pool Doesn't Exist`,
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    }
  }
      
}



  const quoter = async (amounts, token,token0,token1,fee) => {
    const getPoolAddress= await getPoolBool(token0, token1, fee)
      if(getPoolAddress !="0x0000000000000000000000000000000000000000"){
    const quoterContract = new web3.eth.Contract(quoterABI, quoterAddress);
    console.log(amounts);
    const Token0Contract=await getTokenContracts(token0)
    const Token1Contract=await getTokenContracts(token1)
    const decimals0=await Token0Contract.methods.decimals().call()
    const decimals1=await Token1Contract.methods.decimals().call()
    setError(true)
    if (token == 1) {
      if (amounts == 0) {
        setEstimatedValue(0);
        return;
      }
      const amount = (amounts * 10 ** decimals0).toLocaleString("fullwide", {
        useGrouping: false,
      });

      console.log(amount);
      // const amount = web3.utils.fromWei(amounts, "ether");

      // console.log(quoterContract);
      console.log(token0,"ok",
        token1,"ok",
        fee,"ok",
        amount,"ok"
        )
      const QUOTEExactInputSingle =
        await quoterContract.methods.quoteExactInputSingle(
          token0,
          token1,
          fee,
          amount,
          0
        );

        let resultEst
        try{
          resultEst = await web3.eth.call(
                {
                  from: "0x0000000000000000000000000000000000000000",
                  to: quoterAddress,
                  data: QUOTEExactInputSingle.encodeABI(),
                },
                "latest"
              );
        }catch(err){
          console.log(err)
          setError(false)
          return swal({
            title: "Attention",
            text: `Insufficient funds in pool.`,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        
        }
      const amount1 = (resultEst / 10 ** decimals1).toLocaleString("fullwide", {
        useGrouping: false,
      });

      console.log(amount);
      setEstimatedValue(Number(amount1).toFixed(10));
      console.log(Number(amount1).toFixed(5));
    } else {
      if (amounts == 0) {
        setEstimatedValue1(0);
        return;
      }
      const amount = (amounts * 10 ** decimals1).toLocaleString("fullwide", {
        useGrouping: false,
      });

      console.log(amount);
      // const amount = web3.utils.fromWei(amounts, "ether");

      // console.log(quoterContract);
      console.log(token1,"ok",
        token0,"ok",
        fee,"ok",
        amount,"ok"
        )
      const QUOTEExactInputSingle =
        await quoterContract.methods.quoteExactInputSingle(
          token1,
          token0,
          fee,
          amount,
          0
        );
        let resultEst
try{
  resultEst = await web3.eth.call(
        {
          from: "0x0000000000000000000000000000000000000000",
          to: quoterAddress,
          data: QUOTEExactInputSingle.encodeABI(),
        },
        "latest"
      );
}catch(err){
  console.log(err)
  setError(false)
  return swal({
    title: "Attention",
    text: `Insufficient funds in pool.`,
    icon: "warning",
    button: "OK!",
    className: "modal_class_success",
  });

}
      const amount1 = (resultEst / 10 ** decimals0).toLocaleString("fullwide", {
        useGrouping: false,
      });

      console.log(amount);
      setEstimatedValue1(Number(amount1).toFixed(10));
      console.log(Number(amount1).toFixed(5));
    }
  }else{
    setError(false)
    return swal({
      title: "Attention",
      text: `Pool Doesn't Exist`,
      icon: "warning",
      button: "OK!",
      className: "modal_class_success",
    });
  }
  };
  const createToken = async (
    name,
    symbol,
    totalSupply,
    decimals,
    boolean1,
    boolean2,
    boolean3
  ) => {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const cycContract = new web3.eth.Contract(
        createYourTokenABI,
        createYourTokenAddress
      );
      alert("confirm transaction");

      var value = 0.05;
      value = web3.utils.toWei(value.toString(), "ether");
      let returnValue
      if (boolean1 == true && boolean2 == true && boolean3 == true) {
        try {
          const PausableMintBurn = await cycContract.methods
            .DeployPausableMintBurn(name, symbol, totalSupply, decimals)
            .send({ from: walletAddress, value: value }).then((value) => {
              returnValue = value;
            });
          console.log(PausableMintBurn);
        } catch (err) {
          console.log("PausableMintBurn", err);
        }
      } else if (boolean1 == true && boolean2 == true && boolean3 == false) {
        try {
          const MintBurn = await cycContract.methods
            .DeployMintBurn(name, symbol, totalSupply, decimals)
            .send({ from: walletAddress, value: value })
            .then((value) => {
              returnValue = value;
            });
          console.log(MintBurn);
        } catch (err) {
          console.log("MintBurn", err);
        }
      } else if (boolean1 == true && boolean2 == false && boolean3 == true) {
        try {
          const PausableBurn = await cycContract.methods
            .DeployPausableBurn(name, symbol, totalSupply, decimals)
            .send({ from: walletAddress, value: value }).then((value) => {
              returnValue = value;
            });
          console.log(PausableBurn);
        } catch (err) {
          console.log("PausableBurn", err);
        }
      } else if (boolean1 == false && boolean2 == true && boolean3 == true) {
        try {
          const PausableMint = await cycContract.methods
            .DeployPausableMint(name, symbol, totalSupply, decimals)
            .send({ from: walletAddress, value: value }).then((value) => {
              returnValue = value;
            });
          console.log(PausableMint);
        } catch (err) {
          console.log("PausableMint", err);
        }
      } else if (boolean1 == true && boolean2 == false && boolean3 == false) {
        try {
          const burnable = await cycContract.methods
            .DeployBurnable(name, symbol, totalSupply, decimals)
            .send({ from: walletAddress, value: value }).then((value) => {
              returnValue = value;
            });
          console.log(burnable);
        } catch (err) {
          console.log("burnable", err);
        }
      } else if (boolean1 == false && boolean2 == true && boolean3 == false) {
        try {
          const Mintable = await cycContract.methods
            .DeployMintable(name, symbol, totalSupply, decimals)
            .send({ from: walletAddress, value: value }).then((value) => {
              returnValue = value;
            });
          console.log(Mintable);
        } catch (err) {
          console.log("Mintable", err);
        }
      } else if (boolean1 == false && boolean2 == false && boolean3 == true) {
        try {
          const Pausable = await cycContract.methods
            .DeployPausable(name, symbol, totalSupply, decimals)
            .send({ from: walletAddress, value: value }).then((value) => {
              returnValue = value;
            });
          console.log(Pausable);
        } catch (err) {
          console.log("Pausable", err);
        }
      } else if (boolean1 == false && boolean2 == false && boolean3 == false) {
        try {
          

          const ERC20 = await cycContract.methods
            .DeployERC20(name, symbol, totalSupply, decimals)
            .send({ from: walletAddress, value: value })
            .then((value) => {
              returnValue = value;
            });

          // if (loader == 0) {
            await ERC20
          console.log("ERC20", ERC20);
          console.log("return value",returnValue);
          console.log("return value address",returnValue.events.TokenCreated.returnValues.token);
          
          
          // }

          // return swal({
          //   title: "Attention",
          //   text: ERC20.returnVales[1],
          //   icon: "warning",
          //   button: "OK!",
          //   className: "modal_class_success",
          // });
        } catch (err) {
          console.log("ERC20", err);
        }
      }
      return swal({
        title: "kindly save the following address",
        text:
          "Token Address:" +
          returnValue.events.TokenCreated.returnValues.token,
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    }
  };

  const getPrice = async () => {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress);
      const getPoolAddress = await factoryContract.methods
        .getPool(kyzAddress, DTXAddress, 3000)
        .call();
      const boolean = kyzAddress < DTXAddress;
      console.log(boolean);
      console.log(getPoolAddress);
      const PoolContract = new web3.eth.Contract(poolABI, getPoolAddress);
      console.log(PoolContract);
      const slot0 = await PoolContract.methods.slot0().call();
      // sqrtPriceX96 from pool contract
      let sqrtPriceX96 = slot0[0];
      console.log(Number(sqrtPriceX96));
      console.log(sqrtPriceX96);
      // price from sqrtPriceX96
      let price = Number((Number(sqrtPriceX96) / 2 ** 96) ** 2);
      let yes = Math.sqrt(price) * 2 ** 96;
      console.log(yes);
      console.log(price);
      console.log("mujee ", Number(price));
      console.log("------------------");
      let calculatedsqrtPriceX96 = Math.sqrt(2) * 2 ** 96;
      console.log("calculated: ", calculatedsqrtPriceX96.toLocaleString());
      //tick to sqrtPriceX96
      let tick = slot0[1];
      let mysqrtpricex96 = 1.0001 ** (tick / 2) * 2 ** 96;
      console.log("tick to sqrtPricex96:", mysqrtpricex96);
      //tick from newPool
      let CalculatedP = 112045541949572290000000000000 / 2 ** 96;
      let newbase = Math.sqrt(1.0001);
      let myNewTick = Math.log(CalculatedP) / Math.log(newbase);
      console.log("new calculated tick is :", myNewTick.toFixed(0));
      //price to tick
      //this is sqrtPriceX96/2^96
      let p = slot0[0] / 2 ** 96;
      let base = Number(Math.sqrt(1.0001));
      let newTick = Math.log(p) / Math.log(base);
      console.log("new tick price:", newTick);
      // setting tick spacing
      const tickSpacing = await PoolContract.methods.tickSpacing().call();
      console.log("tick spacing", tickSpacing);
      let mod = newTick % tickSpacing;
      if (mod == 0) {
        console.log(newTick);
      } else if (mod > tickSpacing / 2) {
        console.log(mod);
        console.log(tickSpacing);
        const val = Number(Number(tickSpacing) - Number(mod));
        console.log(newTick);
        newTick = newTick + val;
        console.log(Number(newTick));
      } else if (mod < tickSpacing / 2) {
        const val = Number(mod);
        newTick = newTick - val;
        console.log(Number(newTick));
      }
    }
  };
  async function getFactoryContract() {
    const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress);
    return factoryContract;
  }
  async function getManagerContract() {
    const NFTManagerContract = new web3.eth.Contract(
      NFTManagerABI,
      NFTManagerAddress
    );
    return NFTManagerContract;
  }

  async function AddLiquidityProfessionally(
    token0,
    token1,
    fee,
    pRatio,
    minPrice,
    maxPrice,
    token0Amount,
    token1Amount
  ) {
    try{

    
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const factoryContract = await getFactoryContract();
      let checkPoolAddress = await returnPoolAddress(
        factoryContract,
        token0,
        token1,
        fee
      );
      console.log(token0, "ok", token1, "ok", token0Amount, "ok", token1Amount);

      console.log("CHECKPOOLADDRESS", checkPoolAddress);
      var boolForReverseCheck = false;
      if (token0 > token1) {
        [token0, token1] = [token1, token0];
        [token0Amount, token1Amount] = [token1Amount, token0Amount];
        [minPrice, maxPrice] = [1 / minPrice, 1 / maxPrice];
        boolForReverseCheck = true;
        console.log("if worked.............................");
      }
      // sqrtPriceX96 = sqrtPriceX96.toLocaleString("fullwide", {
      //   useGrouping: false,
      // });

      const poolContract = getPoolContract(checkPoolAddress);
      const slot0 = await poolContract.methods.slot0().call();
      const tickSpacing = await poolContract.methods.tickSpacing().call();
      let CurrentTick = slot0[1];
      console.log("tick spacing", tickSpacing);

      let SQRPRICE296min = (Math.sqrt(minPrice) * 2 ** 96).toLocaleString(
        "fullwide",
        {
          useGrouping: false,
        }
      );
      console.log("sqrt price:", SQRPRICE296min);

      let CalculatedPmin = SQRPRICE296min / 2 ** 96;
      let newbasemin = Math.sqrt(1.0001);
      let minTick = Math.log(CalculatedPmin) / Math.log(newbasemin);
      console.log("new calculated min tick is :", minTick.toFixed(0));

      let modForMin = minTick % tickSpacing;
      if (modForMin == 0) {
        console.log(minTick);
      } else if (modForMin > tickSpacing / 2) {
        console.log(modForMin);
        console.log(tickSpacing);
        const val = Number(Number(tickSpacing) - Number(modForMin));
        console.log(val);
        // console.log(minTick);
        minTick = minTick + val;
      } else if (modForMin < tickSpacing / 2) {
        const val = Number(modForMin);
        console.log(val);
        minTick = minTick - val;
      }
      console.log("minimum tick exact", Number(minTick));

      //MACX PRICE

      let SQRPRICE296max = (Math.sqrt(maxPrice) * 2 ** 96).toLocaleString(
        "fullwide",
        {
          useGrouping: false,
        }
      );
      console.log("sqrt price:", SQRPRICE296max);

      let CalculatedPmax = SQRPRICE296max / 2 ** 96;
      let newbasemax = Math.sqrt(1.0001);
      let myNewTickmax = Math.log(CalculatedPmax) / Math.log(newbasemax);
      console.log("new calculated max tick is :", myNewTickmax.toFixed(0));

      let modFormax = myNewTickmax % tickSpacing;
      if (modFormax == 0) {
        // console.log(minTick);
      } else if (modFormax > tickSpacing / 2) {
        console.log(modFormax);
        console.log(tickSpacing);
        const val = Number(Number(tickSpacing) - Number(modFormax));
        console.log(val);
        // console.log(minTick);
        myNewTickmax = myNewTickmax + val;
      } else if (modFormax < tickSpacing / 2) {
        const val = Number(modFormax);
        console.log(val);
        myNewTickmax = myNewTickmax - val;
      }
      console.log("maximum tick exact", Number(myNewTickmax));

      let minSqrtPrice = 1.0001 ** (minTick / 2) * 2 ** 96;
      console.log("Min tick to sqrtPricex96:", minSqrtPrice);

      let maxSqrtPrice = (
        1.0001 ** (myNewTickmax / 2) *
        2 ** 96
      ).toLocaleString("fullwide", {
        useGrouping: false,
      });
      console.log("Max tick to sqrtPricex96:", maxSqrtPrice);

      let Minprice = Number((Number(minSqrtPrice) / 2 ** 96) ** 2);
      let Maxprice = Number((Number(maxSqrtPrice) / 2 ** 96) ** 2);

      console.log("price max", Maxprice);
      console.log("price min", Minprice);
      if (boolForReverseCheck) {
        setMaxPrice((1 / Maxprice).toFixed(2));
        setMinPrice((1 / Minprice).toFixed(2));

        [minTick, myNewTickmax] = [myNewTickmax, minTick];
      } else {
        setMaxPrice(Maxprice.toFixed(2));
        setMinPrice(Minprice.toFixed(2));
      }
      [token0Amount, token1Amount] = await takeDepositAmount(
        token0,
        token1,
        token0Amount,
        token1Amount
      );
      console.log("OK", token0Amount, "second", token1Amount);
      const TimeOut = Date.now() + 5 * 60;
      console.log("Date:", Date.now() + 5 * 60);
      const addliquityForPool = await addLiqidityToPool(
        token0,
        token1,
        fee,
        minTick,
        myNewTickmax,
        token0Amount,
        token1Amount,
        0,
        0,
        walletAddress,
        TimeOut
      );
      return swal({
        title: "Attention",
        text: `Transaction was Successful`,
        icon: "Success",
        button: "OK!",
        className: "modal_class_success",
      });

      // const mintLiquidity = await NFTManagerContract.methods
      //   .mint([
      //     token0,
      //     token1,
      //     fee,
      //     minTick,
      //     myNewTickmax,
      //     token0Amount,
      //     token1Amount,
      //     0,
      //     0,
      //   walletAddress,
      //   date
      // ])
      // .send();
    }
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
//important hai ye
  async function returnPoolAddress(factoryContract, token0, token1, fee) {
    const checkPoolAddress = await factoryContract.methods
      .getPool(token0, token1, fee)
      .call();
    return checkPoolAddress;
  }
  function getPoolContract(newPoolAddress) {
    const poolContract = new web3.eth.Contract(poolABI, newPoolAddress);
    return poolContract;
  }
  function tickToPrice(tick) {}
  function PriceToTick(price) {}

  async function mintPosition(newPoolAddress) {}
  async function getPriceFromPool(token0, token1, newPoolAddress) {
    const poolContract = getPoolContract(newPoolAddress);
    const slot0 = await poolContract.methods.slot0().call();
    console.log(slot0);
    let mysqrtPriceX96 = slot0[0];
    console.log("First SQRT PRICE", mysqrtPriceX96);
    let myprice = Number((Number(mysqrtPriceX96) / 2 ** 96) ** 2);
    setPrice(myprice.toFixed(2));
    console.log("mujee ", Number(myprice));
    let myTick = slot0[1];
    console.log("current tick", myTick);
    let power = myTick / 2;
    let MySqrtPrice = 1.0001 ** power;
    MySqrtPrice = MySqrtPrice * 2 ** 96;
    console.log("calculated sqrtPricex96:", MySqrtPrice);

    let Myprice = Number((Number(MySqrtPrice) / 2 ** 96) ** 2);
    console.log("calculated price fromMysqrt:", Myprice);

    if (token0 > token1) {
      setCurrentPrice((1 / myprice).toFixed(2));
    } else {
      setCurrentPrice(myprice.toFixed(2));
    }
  }
  async function getPriceOnClick(token0, token1, fee) {
    console.log("fee", fee);
    const factoryContract = await getFactoryContract();
    let checkPoolAddress = await returnPoolAddress(
      factoryContract,
      token0,
      token1,
      fee
    );
    console.log("pool value here:", checkPoolAddress);
    if (checkPoolAddress == 0x0000000000000000000000000000000000000000) {
      setCurrentPrice("need to initialize");
      setIntializedVar(false);
      // await getPriceFromPool(checkPoolAddress);
    } else {
      await getPriceFromPool(token0, token1, checkPoolAddress);
      setIntializedVar(true);
    }
  }

  const initializePool = async (token0, token1, fee, pRatio) => {
    try{

    
    console.log("--------function call--------");

    var returnValue;
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // const factoryContract = await getFactoryContract();
      // const checkPoolAddress = await returnPoolAddress(
      //   factoryContract,
      //   token0,
      //   token1,
      //   fee
      // );
      // console.log("CHECKPOOLADDRESS", checkPoolAddress);

      const NFTManagerContract = await getManagerContract();

      console.log("haha", NFTManagerContract);

      let sqrtPriceX96 = Math.sqrt(pRatio) * 2 ** 96;
      sqrtPriceX96 = sqrtPriceX96.toLocaleString("fullwide", {
        useGrouping: false,
      });
      console.log(sqrtPriceX96);
      if (token0 > token1) {
        [token0, token1] = [token1, token0];
      }
      const createAndInitialize = await NFTManagerContract.methods
        .createAndInitializePoolIfNecessary(token0, token1, fee, sqrtPriceX96)
        .send({ from: walletAddress })
        .then((value) => {
          returnValue = value;
        });
      console.log("executed with 500 with SAME : ", createAndInitialize);
      setIntializedVar(true);
      const newPoolAddress = returnValue.events[1].address;
      console.log(newPoolAddress);
      setCurrentPrice(pRatio);
      return newPoolAddress;
    }
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

    //   if (token0 < token1) {
    //     const createAndInitialize = await NFTManagerContract.methods
    //       .createAndInitializePoolIfNecessary(token0, token1, fee, sqrtPriceX96)
    //       .send({ from: walletAddress })
    //       .then((value) => {
    //         returnValue = value;
    //       });
    //     console.log("executed with 500 with SAME : ", createAndInitialize);
    //     console.log(returnValue);
    //     const newPoolAddress = returnValue.events[1].address;
    //     console.log(newPoolAddress);
    //     // calculating price
    //     const poolContract = getPoolContract(newPoolAddress);
    //     const slot0 = await poolContract.methods.slot0().call();
    //     console.log(slot0);
    //     //price from sqrtPriceX96
    //     let mysqrtPriceX96 = slot0[0];
    //     let myprice = Number((Number(mysqrtPriceX96) / 2 ** 96) ** 2);
    //     setPrice(myprice.toFixed(2));
    //     console.log("mujee ", Number(myprice));
    //     //calculating tick
    //     const tickSpacing = await poolContract.methods.tickSpacing().call();
    //     console.log("tick spacing", tickSpacing);
    //     //finding tick for min price
    //     console.log(minPrice);
    //     let modForMin = minPrice % tickSpacing;
    //     if (modForMin == 0) {
    //       console.log(minPrice);
    //     } else if (modForMin > tickSpacing / 2) {
    //       console.log(modForMin);
    //       console.log(tickSpacing);
    //       const val = Number(Number(tickSpacing) - Number(modForMin));
    //       console.log(val);
    //       console.log(minPrice);
    //       minPrice = minPrice + val;
    //       console.log(Number(minPrice));
    //     } else if (modForMin < tickSpacing / 2) {
    //       const val = Number(modForMin);
    //       console.log(val);
    //       minPrice = minPrice - val;
    //       console.log(Number(minPrice));
    //     }

    //     //finding tick for max price
    //     let modForMax = maxPrice % tickSpacing;
    //     if (modForMax == 0) {
    //       console.log(maxPrice);
    //     } else if (modForMax > tickSpacing / 2) {
    //       console.log(modForMax);
    //       console.log(tickSpacing);
    //       const val = Number(Number(tickSpacing) - Number(modForMax));
    //       console.log(val);
    //       console.log(maxPrice);
    //       maxPrice = maxPrice + val;
    //       console.log(Number(maxPrice));
    //     } else if (modForMax < tickSpacing / 2) {
    //       const val = Number(modForMax);
    //       console.log(val);
    //       maxPrice = maxPrice - val;
    //       console.log(Number(maxPrice));
    //     }
    //   } else {
    //     [token0, token1] = [token1, token0];
    //     const createAndInitialize = await NFTManagerContract.methods
    //       .createAndInitializePoolIfNecessary(token0, token1, fee, sqrtPriceX96)
    //       .send({ from: walletAddress })
    //       .then((value) => {
    //         returnValue = value;
    //       });
    //     console.log("executed with 500 with CHANGED : ", createAndInitialize);
    //     console.log(returnValue);
    //     const newPoolAddress = returnValue.events[1].address;
    //     console.log(newPoolAddress);
    //     const poolContract = new web3.eth.Contract(poolABI, newPoolAddress);
    //     const slot0 = await poolContract.methods.slot0().call();
    //     console.log(slot0);
    //     //price from sqrtPriceX96
    //     let mysqrtPriceX96 = slot0[0];
    //     let myprice = Number((Number(mysqrtPriceX96) / 2 ** 96) ** 2);
    //     setPrice(myprice.toFixed(2));
    //     console.log("mujee ", Number(myprice));
    //     //inverted ticks when token0>token1
    //     const tickSpacing = await poolContract.methods.tickSpacing().call();
    //     console.log("tick spacing", tickSpacing);
    //     //finding tick for min price
    //     minPrice = 1 / minPrice;
    //     let modForMin = minPrice % tickSpacing;
    //     if (modForMin == 0) {
    //       console.log(minPrice);
    //     } else if (modForMin > tickSpacing / 2) {
    //       console.log(modForMin);
    //       console.log(tickSpacing);
    //       const val = Number(Number(tickSpacing) - Number(modForMin));
    //       console.log(val);
    //       console.log(minPrice);
    //       minPrice = minPrice + val;
    //       console.log(Number(minPrice));
    //     } else if (modForMin < tickSpacing / 2) {
    //       const val = Number(modForMin);
    //       console.log(val);
    //       minPrice = minPrice - val;
    //       console.log(Number(minPrice));
    //     }
    //     //finding tick for max price
    //     maxPrice = 1 / maxPrice;
    //     let modForMax = maxPrice % tickSpacing;
    //     if (modForMax == 0) {
    //       console.log(maxPrice);
    //     } else if (modForMax > tickSpacing / 2) {
    //       console.log(modForMax);
    //       console.log(tickSpacing);
    //       const val = Number(Number(tickSpacing) - Number(modForMax));
    //       console.log(val);
    //       console.log(maxPrice);
    //       maxPrice = maxPrice + val;
    //       console.log(Number(maxPrice));
    //     } else if (modForMax < tickSpacing / 2) {
    //       const val = Number(modForMax);
    //       console.log(val);
    //       maxPrice = maxPrice - val;
    //       console.log(Number(maxPrice));
    //     }
    //   }
    // }
  }
  function getTokenContracts(token) {
    const tokenContract = new web3.eth.Contract(kyzABI, token);

    return tokenContract;
  }
  async function takeDepositAmount(token0, token1, token0Amount, token1Amount) {
    const token0Contract = getTokenContracts(token0);
    const token1Contract = getTokenContracts(token1);

    console.log(token0, "ok", token1, "ok", token0Amount, "ok", token1Amount);
    const token0Decimals = await token0Contract.methods.decimals().call();
    const token1Decimals = await token1Contract.methods.decimals().call();
    console.log(token0Decimals);
    console.log(token1Decimals);
    const amount0WithDecimals = Number(
      token0Amount * 10 ** token0Decimals
    ).toLocaleString("fullwide", {
      useGrouping: false,
    });
    const amount1WithDecimals = Number(
      token1Amount * 10 ** token1Decimals
    ).toLocaleString("fullwide", {
      useGrouping: false,
    });
    console.log("Amount 0 with Decimals: ", amount0WithDecimals);
    console.log("Amount 1 with Decimals: ", amount1WithDecimals);
    return [amount0WithDecimals, amount1WithDecimals];
  }
  async function addLiqidityToPool(
    token0,
    token1,
    fee,
    tickLower,
    tickUpper,
    amount0Desired,
    amount1Desired,
    amount0min,
    amount1Min,
    recipient,
    deadline
  ) {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const NFTManagerContract = await getManagerContract();

      console.log(
        token0,
        "ok",
        token1,
        "ok",
        fee,
        "ok",
        tickLower,
        "ok",
        tickUpper,
        "ok",
        amount0Desired,
        "ok",
        amount1Desired,
        "ok",
        amount0min,
        "ok",
        amount1Min,
        "ok",
        recipient,
        "ok",
        deadline
      );

      const addLiquidity = await NFTManagerContract.methods
        .mint([
          token0,
          token1,
          fee,
          tickLower,
          tickUpper,
          amount0Desired,
          amount1Desired,
          amount0min,
          amount1Min,
          recipient,
          deadline,
        ])
        .send({ from: walletAddress });
    }
  }
  async function approveTokens(token, tokenAmount) {
    try{

    
    const tokenContract = getTokenContracts(token);
    const tokenDecimals = await tokenContract.methods.decimals().call();
    const amountWithDecimals = Number(
      tokenAmount * 10 ** tokenDecimals
    ).toLocaleString("fullwide", {
      useGrouping: false,
    });
    const approveTokenss = await tokenContract.methods
      .approve(NFTManagerAddress, amountWithDecimals)
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

    console.log("approved", approveTokenss);
    }
    catch(err){
      swal({
        title: "Attention",
        text: `Transaction reverted`,
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
      return false

    }
  }




  function checkTime(time){
    const targetTime = new Date(time);
  
  const currentTime = new Date();
  
  const timeDifference = Math.abs(currentTime - targetTime);
  
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  
  if (daysDifference > 0) {
    return(` ${daysDifference} day${daysDifference === 1 ? '' : 's'} ago`);
  } else if (hoursDifference > 0) {
    return(` ${hoursDifference} hour${hoursDifference === 1 ? '' : 's'} ago`);
  } else if (minutesDifference > 0) {
    return(` ${minutesDifference} minute${minutesDifference === 1 ? '' : 's'} ago.`);
  } else {
    return(` ${secondsDifference} second${secondsDifference === 1 ? '' : 's'} ago`);
  }
  } 

  function formatNumber(num) {
    const units = ['K', 'M', 'B'];
    let unitIndex = 0;
    while (num >= 1000 && unitIndex < units.length - 1) {
      num /= 1000;
      unitIndex++;
    }
    let formattedNum = num.toFixed(2);
    const decimalIndex = formattedNum.indexOf('.');
    const numDigits = decimalIndex === -1 ? formattedNum.length : decimalIndex;
    const zerosToAdd = Math.max(0, 3 - numDigits);
    formattedNum = formattedNum;
    formattedNum += units[unitIndex];
    return formattedNum;
  }
async function chechkChain(){
  if(walletAddress.length>0){
    
    try{
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex("0x13881") }],
    });
    }
    catch(err){
      if(err.code=4902){
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: Web3.utils.toHex("0x13881"),
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
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex("0x13881") }],
      });

      }
      else{
        alert("Kindly Switch Your Chain to mumbai")

      }
     
      
      
    }
    

  }
  
} 


async function BalanceOfUser( tokenName) {
  if (tokenName  && walletAddress) {
    const tokenContract = new web3.eth.Contract(kyzABI, tokenName);
    try{
      const decimals = await tokenContract.methods.decimals().call();
      const balance = await tokenContract.methods.balanceOf(walletAddress).call()
    
    
    console.log(balance,"yeeee")
    let amount=0
    if(balance>0){
       amount= (balance / 10 ** decimals).toLocaleString("fullwide", {
        useGrouping: false,
      });

    }
    
    return amount
  }
  catch(err){
    console.log("error in BalanceOfUser",err)
    return "This Token is Not Allowed"
    
  }

  }
  


}
async function checkBalanceCondition(tokenName,amount)

{
  
  if(tokenName && amount && walletAddress){
    console.log(tokenName, "&&", amount , "&&", walletAddress)
  const tokenContract = new web3.eth.Contract(kyzABI, tokenName);
    const decimals = await tokenContract.methods.decimals().call();
  amount = (amount * 10 ** decimals).toLocaleString("fullwide", {
    useGrouping: false,
  });
let balance=await BalanceOfUser(tokenName)
balance = (balance * 10 ** decimals).toLocaleString("fullwide", {
  useGrouping: false,
});
console.log(balance, "&&", Number(balance)<Number(amount) , "&&", amount)
if(Number(balance)<Number(amount)){
  return false
}else{
  return true
}
  }else{
    return false
  }
}


async function checkIfApproved(chainId, tokenName, amount) {
  console.log(amount,"amount ye ayi hai");
  
  if (tokenName && amount && walletAddress) {
    const tokenContract = new web3.eth.Contract(kyzABI, tokenName);
    const decimals = await tokenContract.methods.decimals().call();
    amount = (amount * 10 ** decimals).toLocaleString("fullwide", {
      useGrouping: false,
    });
    console.log("amount entered",amount)
    const checkAllowance = await tokenContract.methods
      .allowance(walletAddress, routerAddress)
      .call();
    
    console.log(checkAllowance, "checkallowance",checkAllowance < amount,"condition value");

    if (Number(checkAllowance) < Number(amount)) {
      console.log("running if");
      return true;
    } else {
      console.log("running else if");
      return false;
    }
  } else {
    return false;
    }
  }

async function getReturnValuesLiquidity(tokenID){
  const contract =await getManagerContract()
  const params = {
    tokenId: tokenID,
    recipient: walletAddress,
    amount0Max: "340282366920938463463374607431768211455",
    amount1Max: "340282366920938463463374607431768211455",
  };
  
  const swapp = contract.methods.collect(params);
  
  const value = await web3.eth.call(
    {
      from: walletAddress,
      to: NFTManagerAddress,
      data: swapp.encodeABI(),
      value: "0",
    },
    "latest"
  );
  
  // Decode the return values using the contract's ABI
  const returnValues = web3.eth.abi.decodeParameters(['uint128', 'uint128'], value);

  console.log(returnValues);
  return returnValues
  
}


async function getReturnPooledLiquidity(tokenID,liquidity){
  const TimeOut = Date.now() + 5 * 60;
  const contract =await getManagerContract()
  const params = {
    tokenId: tokenID,
    liquidity: liquidity,
    amount0Min: 0,
    amount1Min: 0,
    deadline:TimeOut
  };
  
  const swapp = contract.methods.decreaseLiquidity(params);
  
  try{
    const value = await web3.eth.call(
      {
        from: walletAddress,
        to: NFTManagerAddress,
        data: swapp.encodeABI(),
        value: "0",
      },
      "latest"
    );
    const returnValues = web3.eth.abi.decodeParameters(['uint128', 'uint128'], value);

    console.log(returnValues);
    return returnValues
  }catch(err){
    console.log("err",err)
  }
  
  
  // Decode the return values using the contract's ABI

  
}

async function DecreaseAllLiquidity(tokenID,liquidity){
  const TimeOut = Date.now() + 5 * 60;
  const contract =await getManagerContract()
  const params = {
    tokenId: tokenID,
    liquidity: liquidity,
    amount0Min: 0,
    amount1Min: 0,
    deadline:TimeOut
  };
  try{
    const swapp =await contract.methods.decreaseLiquidity(params).send({ from: walletAddress }).then(()=>{
      swal({
        title: "Attention",
        text: `Transaction was successful`,
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    });
    return true

  }catch (err){
    console.log("err:", err)

  }
 
  

  
}

async function CollectAllLiquidity(tokenID){
  
  const contract =await getManagerContract()
  const params = {
    tokenId: tokenID,
    recipient: walletAddress,
    amount0Max: "340282366920938463463374607431768211455",
    amount1Max: "340282366920938463463374607431768211455",
  };
  try{
    const swapp =await contract.methods.collect(params).send({ from: walletAddress }).then(()=>{
      swal({
        title: "Attention",
        text: `Transaction was successful`,
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    });;
    return true

  }catch (err){
    console.log("err:", err)

  }
 
  

  
}

async function DeletePosition(tokenID){
  
  const contract =await getManagerContract()
 
  try{
    const swapp =await contract.methods.burn(tokenID).send({ from: walletAddress }).then(()=>{
      swal({
        title: "Attention",
        text: `Transaction was successful`,
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    });;
    return true

  }catch (err){
    console.log("err:", err)

  }
 
  

  
}


useEffect(()=>{

},[])

  return (
    <Token1Context.Provider
      value={{
        Swap,
        connectWallet,
        walletAddress,
        findPool,
        quoter,
        estimatedValue,
        setEstimatedValue,
        estimatedValue1,
        setEstimatedValue1,
        createToken,
        getPrice,
        loader,
        setLoader,
        initializePool,
        setPrice,
        price,
        AddLiquidityProfessionally,
        currentPrice,
        setCurrentPrice,
        getPriceOnClick,
        intializedVar,
        maxPrice,
        setMaxPrice,
        minPrice,
        setMinPrice,
        takeDepositAmount,
        approveTokens,
        formatNumber,
        checkTime,
      
        getManagerContract,
        getTokenContracts,
        chechkChain,
        checkIfApproved,
        approveTokensRouter,
        BalanceOfUser,
        checkBalanceCondition,
        Errors,
        setError,
        getPoolBool,
        returnName,
        getReturnValuesLiquidity,
        getReturnPooledLiquidity,
        CollectAllLiquidity,
        DecreaseAllLiquidity,
        DeletePosition

      }}
    >
      {children}
    </Token1Context.Provider>
  );
}
