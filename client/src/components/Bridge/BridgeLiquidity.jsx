import React, {useState, useContext ,useEffect} from 'react'
import { BridgeContext } from "../../contexts/BridgeContext";
import { Token1Context } from '../../contexts/Token1Context';
import {

  mumBridgeAddress,

} from "../../utils/contants";


import BridgeTokens from "../../data/BridgeTokens";
import Blockchains from "../../data/Blockchains";

function BridgeLiquidity() {
  
  const [swapToken0Name, setSwapToken0Name] = useState("Select");
  const [swapChain0Name, setswapChain0Name] = useState("Select");
  const {
    
    BridgeLiquidityy,
    APPROVEtoken,
    getBscBridgeContract,
    getMumBridgeContract,
    getTokenContract,
    getBSCTokenContract,
    getMUMTokenContract
    
    
  } = useContext(BridgeContext);
  const {
    connectWallet,
    walletAddress,
   t
    
    
    
  } = useContext(Token1Context);
  const [position, setPosition] = useState({ x: 25});
  const [isDragging, setIsDragging] = useState(false);
  const [tokenValue,setTokenValue]=useState()
  const [tokenName,setTokenName]=useState(0)
  const [chainId,setchainId]=useState()
  const [tokenFee,setTokenFee]=useState()
  const [tokenSupply,setTokenSupply]=useState()
  const [check,setcheck]=useState(false)
  const [bool1, setBool1] = useState(false);
async function getTokenCredentials(mum,token){
  let contract
  let TokenContract

  setTokenFee(undefined)
  try{
  if(mum && token){

 
  if(mum==0x13881){
     contract=await getMumBridgeContract()
 TokenContract = await getMUMTokenContract(tokenName);
  }else{
    contract=await getBscBridgeContract()
    TokenContract = await getBSCTokenContract(tokenName);
  }
  console.log("chala yahan tk", contract._address)
  const allowed=await contract.methods.allowedTokens(token).call()
  const paused=await contract.methods.pausedTokens(token).call()
  if(allowed==1 && paused==0){
    const decimals = await TokenContract.methods.decimals().call()
    let fee= await contract.methods.totalActualReservesForTokens(token).call()
    fee=(fee / 10 ** decimals).toLocaleString("fullwide", {
      useGrouping: false,
    });
    
    let Supply= await contract.methods.totalTokensSupply(token).call()
    
    
    Supply = (Supply / 10 ** decimals).toLocaleString("fullwide", {
      useGrouping: false,
    });
    setTokenFee(fee)
    setTokenSupply(Supply)
    setcheck(true)


    
  }
  else{
    setTokenFee(-1)
    setcheck(false)

  }
  
}
  }catch(err){
    console.log(err)

  }
}

  const handleMouseDown = (event) => {
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    if (isDragging && event.target.tagName === 'circle') {
      if(position.x + event.movementX < 25){
        setPosition({ x: 25 });
      }
      else if(position.x + event.movementX > 475){
        setPosition({ x: 475 });
      }
      else{
        const tranformX = `translateX(${position.x + event.movementX}px)`
        event.target.style.transform = tranformX;
        setPosition({ x: position.x + event.movementX });
      }
    }
  };

  const handleMouseUp = (event) => {
    setIsDragging(false);
  };

  const handleMouseLeave = (event) => {
    setIsDragging(false);
  };

  useEffect(()=>{
    getTokenCredentials(chainId,tokenName)
  
  },[tokenName,chainId])
  return (
    <div class="container" style={{ marginTop:'7rem' }}>
      <div className="bg-secondary d-flex justify-content-center align-items-center py-5">
{console.log(tokenName)}
        <div class="card shadow-lg col-12 col-sm-12 col-md-10 rounded-3 border border-end-0 border-start-0 border-top-0 border-3">
          <h5 class="card-header h4 text-center">Add Liquidity to Bridge</h5>
          <div class="card-body">

            <div className="row">

              <div className="row justify-content-center">

                <div className="row flex-column col-12 col-sm-12 col-md-6 col-lg-8">
                
                  <div className='row'>
                    <div className="col-12 col-sm-6">
                      <div className='form-group'>
                        <label for="ChainID" class="form-label mt-4">Token</label>
                        <button type="button" class="form-control btn btn-outline-primary col-12 col-sm-5" data-toggle="modal" data-target="#get">{swapToken0Name}</button>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className='form-group'>
                        <label for="Token" class="form-label mt-4">Chain</label>
                        <button type="button" class="form-control btn btn-outline-primary col-12 col-sm-5" data-toggle="modal" data-target="#send">{swapChain0Name}</button>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div classNamw="form-group">
                    <label for="DepositedAmmount" class="form-label mt-4">Deposited Ammount</label>
                      {
                        check?
                        <input type="text" id="DepositedAmmount" className="form-control" placeholder='0.0' onChange={(e)=>{ 
                        setTokenValue(e.target.value);
                        console.log(tokenValue);
                      }}/>
                      :
                        <input type="text" id="DepositedAmmount" disabled className="form-control" placeholder='0.0' onChange={(e)=>{ 
                        setTokenValue(e.target.value);
                        console.log(tokenValue);
                      }}/>}
                    </div>
                  </div>

                  <div className='row justify-content-center'>
                    <div class="form-group">
                      <label for="Fees" class="form-label mt-4"></label><br></br>
                      {bool1?<button type='button' disabled class='form-control btn btn-lg btn-primary rounded-pill w-100 mb-3' onClick={async() => { setBool1(await APPROVEtoken(chainId,tokenName,tokenValue)==true) }}>Approve Token</button>
                   :<button type='button' class='form-control btn btn-lg btn-primary rounded-pill w-100 mb-3' onClick={async() => { setBool1(await APPROVEtoken(chainId,tokenName,tokenValue)==true) }}>Approve Token</button>
                   
                   }
                       </div>
                  </div>

                </div>

                { check && 
                  <div className='row flex-column col-12 col-sm-12 col-md-6 col-lg-8'>
                    <div className='h-100 d-flex flex-column justify-content-around mx-4 mb-3 p-4 bg-light'>
                      <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column'>
                          <h4>{check?tokenFee:<></>}</h4>
                          <p>Total Actual Reserves</p>
                        </div>
                        <img width="60" height="60" src="https://img.icons8.com/emoji/60/coin-emoji.png" alt="coin-emoji"/> 
                      </div>
                      <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column'>
                          <h4>{check?tokenSupply:<></>}</h4>
                          <p>Total Liquidity Supply</p>  
                        </div>
                        <img width="60" height="60" src="https://img.icons8.com/emoji/60/coin-emoji.png" alt="coin-emoji"/>
                      </div>
                    </div>
                  </div>
                }

              </div>

              <div className='row flex-row justify-content-center mt-5 mb-3'>
                
                {
                  walletAddress.length > 0 ? 
                  (
                    <>
                      <button type='button' class='btn btn-lg btn-primary rounded-pill w-75 mb-3' onClick={() => { BridgeLiquidityy(chainId,tokenName,tokenValue); }}>Add Liquidity</button>
                    </>
                  )
                  :
                  (
                    <>
                      <button type='button' class='btn btn-lg btn-primary rounded-pill w-75 mb-3' onClick={() => { connectWallet() }}>Connect Wallet</button>
                    </>
                  )
                }

              </div>
            
            </div>
          
          </div>     
        </div>
      
      </div>





      <div className="modal fade" id="get" tabindex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Choose Token</h5>
              <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#get">
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <div className='row justify-content-center'>
                <div class="form-group">
                  <label class="form-label">Search</label>
                  <input type="email" class="form-control" id="SearchToken" placeholder="Search Token"/>
                </div>
                <div class="d-flex flex-column my-3">
                {BridgeTokens.map((token,index)=>(
                    <button type="button" class="btn btn-outline-light text-start w-100 mt-2" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#get" onClick={()=>{setTokenName(token.address);setSwapToken0Name(token.token)}}>
                    <div className='row align-items-center'>
                      <div className='col-2'>
                        <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png" alt="..." className='rounded-circle' style={{width:'50px', height:'50px'}}/>
                      </div>
                      <div className='col-10'>
                        <h5 className='mb-0'>{token.name}</h5>
                        <p className='mb-0'>{token.token}</p>
                        <p className='mb-0'>{token.chain}</p>
                      </div>
                    </div>
                  </button>



                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="modal fade" id="send" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Choose Blockchain</h5>
              <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#send">
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <div className='row justify-content-center'>
                
                <div class="d-flex flex-column my-3">
                  {Blockchains.map((token,index)=>(
                    <button type="button" class="btn btn-outline-light text-start w-100 mt-2" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#send" onClick={()=>{setchainId(token.chain);setswapChain0Name(token.token)}}>
                    <div className='row align-items-center'>
                      <div className='col-2'>
                        <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png" alt="..." className='rounded-circle' style={{width:'50px', height:'50px'}}/>
                      </div>
                      <div className='col-10'>
                        <h5 className='mb-0'>{token.name}</h5>
                        <p className='mb-0'>{token.token}</p>
                      </div>
                    </div>
                  </button>



                  ))}
                  
                  
                  
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>










    </div>
  )
}

export default BridgeLiquidity
