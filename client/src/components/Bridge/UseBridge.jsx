import React, {useState, useContext,useEffect} from 'react'
import { BridgeContext } from "../../contexts/BridgeContext";
import { Token1Context } from '../../contexts/Token1Context';
import BridgeTokens from "../../data/BridgeTokens";
import Blockchains from "../../data/Blockchains";
function UseBridge() {
  const [chainId,setchainId]=useState()
  const [tokenValue,setTokenValue]=useState()
  const [tokenName,setTokenName]=useState(0)
    const [tokenFee,setTokenFee]=useState()
  const [tokenSupply,setTokenSupply]=useState()
  const [secondTOken,setsecondTOken]=useState()
  const [secondTokenSymbol,setsecondTokenSymbol]=useState()

  const [tokenNameW,setTokenNameW]=useState(0)
  const [useRemainings,setUseRemainings]=useState(0)
  const [chainIdW,setchainIdW]=useState()
  const [tokenReserves,setTokenReserves]=useState()
  const [swapToken0Name, setSwapToken0Name] = useState("Select");
  const [swapToken1Name, setSwapToken1Name] = useState("Select");
  const [swapChain0Name, setswapChain0Name] = useState("Select");
  const [swapChain1Name, setswapChain1Name] = useState("Select");
  const [bool1, setBool1] = useState(false);
  const {
    
    addTokenToBlockchain,
    getTokenContract,
    getBSCTokenContract,
    getMUMTokenContract,
    APPROVEtoken,
    getBscBridgeContract,
    getMumBridgeContract,
    Deposit,
    getRemainingBalances
    
  } = useContext(BridgeContext);
  const {
    connectWallet,
    walletAddress,
    
    approveTokens
    
  } = useContext(Token1Context);

    
async function getTokenCredentials(mum,token){
  let contract,contract0
  let TokenContract

  setTokenFee(undefined)
  try{
  if(mum && token){

 
  if(mum==0x13881){
     contract=await getMumBridgeContract()
     contract0= await getBscBridgeContract()
 TokenContract = await getMUMTokenContract(token);
  }else{
    contract=await getBscBridgeContract()
    contract0= await getMumBridgeContract()
    TokenContract = await getBSCTokenContract(token);
  }
  console.log("chala yahan tk", contract._address)
  const allowed=await contract.methods.allowedTokens(token).call()
  const paused=await contract.methods.pausedTokens(token).call()
  if(allowed==1 && paused==0){
    const fee= await contract.methods.FeeForToken(token).call()
    setTokenFee(fee)
   

    const secondTOken = await contract.methods.TokenToToken(token).call()
    setsecondTOken(secondTOken)

    let Supply= await contract0.methods.totalActualReservesForTokens(secondTOken).call()
    console.log("SUPLLY HERE",Supply)
    const decimals = await TokenContract.methods.decimals().call()
    Supply = (Supply / 10 ** decimals).toLocaleString("fullwide", {
      useGrouping: false,
    });
    setTokenSupply(Supply)
    let secondTokenContract
    if(mum==0x13881){
       secondTokenContract= await getBSCTokenContract(secondTOken)
    }else{

       secondTokenContract= await getMUMTokenContract(secondTOken)

    }
    
    const symbol=await secondTokenContract.methods.symbol().call()
    setsecondTokenSymbol(symbol)


    
  }
  else{
    setTokenFee(-1)

  }
  
}
  }catch(err){
    console.log(err)

  }
}



async function getTokenCredentialsW(mum,token){
  let contract,contract0
  let TokenContract
  console.log(mum,token)

  setTokenReserves(undefined)
  try{
  if(mum && token){

 
  if(mum==0x13881){
     contract=await getMumBridgeContract()
     contract0= await getBscBridgeContract()
 TokenContract = await getMUMTokenContract(token);
  }else{
    contract=await getBscBridgeContract()
    contract0= await getMumBridgeContract()
    TokenContract = await getBSCTokenContract(token);
  }
  const allowed=await contract.methods.allowedTokens(token).call()
  const paused=await contract.methods.pausedTokens(token).call()
  if(allowed==1 && paused==0){
  console.log("chala yahan tk", contract._address)
  const balance=await contract.methods.userRemainingBalance(walletAddress,token).call()
  const reserves=await contract.methods.totalActualReservesForTokens(token).call()
  
  const decimals = await TokenContract.methods.decimals().call()
  let SupplyBalance = (balance / 10 ** decimals).toLocaleString("fullwide", {
    useGrouping: false,
  });
  let SupplyReserves = (reserves / 10 ** decimals).toLocaleString("fullwide", {
    useGrouping: false,
  });

  setTokenReserves(SupplyReserves)
  setUseRemainings(SupplyBalance)
}
else{
  setTokenReserves(-1)

}
}
  }catch(err){
    console.log(err)

  }
}

useEffect(()=>{
  getTokenCredentials(chainId,tokenName)

},[tokenName,chainId])
useEffect(()=>{
  getTokenCredentialsW(chainIdW,tokenNameW)
},[tokenNameW,chainIdW])


  const [mumbaiToken,setMumbaiToken]= useState()
  const [bscToken,setBscToken]= useState()
  const [fee,setFee]= useState()
  return (
    <div class="container" style={{ marginTop:'7rem'}}>
      <div className="bg-secondary d-flex justify-content-center align-items-center py-5">

        <div class="card shadow-lg col-12 col-md-12 col-lg-10 rounded-3 border border-end-0 border-start-0 border-top-0 border-3">
          <h5 class="card-header h4 text-center">Bridge</h5>
          <div class="card-body">

            <div className="">
              
              <ul class="nav nav-tabs nav-fill mb-3" id="ex-with-icons" role="tablist">
                <li class="nav-item" role="presentation">
                  <a class="nav-link active" id="Deposit" data-toggle="tab" href="#DepositTab" role="tab"
                    aria-controls="DepositTab" aria-selected="true"><i class="fas fa-chart-pie fa-fw me-2"></i>Deposit</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" id="Widhrawal" data-toggle="tab" href="#WidthrawalTab" role="tab"
                    aria-controls="WidthrawalTab" aria-selected="false"><i class="fas fa-cogs fa-fw me-2"></i>Widhrawal</a>
                </li>
              </ul>
              
              <div class="tab-content" id="ex-with-icons-content">

                <div class="tab-pane fade show active" id="DepositTab" role="tabpanel" aria-labelledby="Deposit">
                  <div className="row justify-content-center">
                    <div className="row flex-row justify-content-center align-items-end">
                      <div className="col-12 col-sm-6">
                        <div className='form-group'>
                          <label for="Fee" class="form-label mt-4">Amount</label>
                          <input type="text" id="Fee" className="form-control" placeholder='0.0' onChange={(e)=>{setTokenValue(e.target.value)}}/>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className='row flex-row justify-content-center'>
                          <button type="button" class="btn btn-outline-primary col-12 col-sm-12 col-md-12 col-lg-4 mx-3 mt-4 my-lg-0" data-toggle="modal" data-target="#get">{swapToken0Name}</button>
                          <button type="button" class="btn btn-outline-primary col-12 col-sm-12 col-md-12 col-lg-4 mx-3 mt-4 my-lg-0" data-toggle="modal" data-target="#send">{swapChain0Name}</button>
                        </div>
                      </div>
                      {tokenFee?<>
            {tokenFee>0?<><div className="my-2">
            
            <div className="d-flex mx-4 my-2 p-3 bg-light rounded-3">
              <strong className="mb-0 h4"> 
                {chainId==0x13881?"BSC":"MUMBAI"}: Token {secondTokenSymbol && secondTokenSymbol}:
              </strong>
              <p className='mb-0 lead'>{secondTOken?secondTOken:<></>}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center mx-4 my-2 p-3 bg-light rounded-3">
              <div className='d-flex flex-column'>
                <h4>{tokenSupply?tokenSupply:<></>}</h4>
                <p className="mb-0">Total Actual Reserve</p>
              </div>
              <img width="60" height="60" src="https://img.icons8.com/emoji/60/coin-emoji.png" alt="coin-emoji"/>
            </div>
            
            </div> 
            <div className="row flex-row justify-content-center mt-3 mb-2">
                {bool1?<button type="button" class="btn btn-lg btn-primary rounded-pill w-75" disabled
                  onClick={async () => {
                    setBool1(APPROVEtoken(chainId,tokenName,tokenValue)==true)
                  }}>Approve Token</button>:
                  <button type="button" class="btn btn-lg btn-primary rounded-pill w-75"
                  onClick={async () => {
                    setBool1(APPROVEtoken(chainId,tokenName,tokenValue)==true)
                  }}>Approve Token</button>}
                
                </div>
              </>:
              <div class="alert alert-dismissible alert-danger my-3 p-3">
                <strong>Oh snap!</strong> This Token is not allowed on Blockchain
              </div>
              }</>:<></>}
                    </div>
                      
                    <div className='row flex-row justify-content-center mt-5 mb-3'>
                    {
                      walletAddress.length > 0 ? 
                      (
                        <>
                          <button type='button' class='btn btn-lg btn-primary rounded-pill w-75' onClick={() => { Deposit(chainId,tokenName, tokenValue); }}>Deposit</button>
                        </>
                      ) 
                      : 
                      (
                        <>
                          <button type='button' class='btn btn-lg btn-primary rounded-pill w-75' onClick={() => { connectWallet(); }}>Connect Wallet</button>
                        </>
                      )}
                    </div>
                  
                  </div>
                </div>

                <div class="tab-pane fade" id="WidthrawalTab" role="tabpanel" aria-labelledby="Widhrawal">
                  <div className="row">
                    
                    
                    <div className="row flex-row justify-content-center align-items-end">
                      
                      <div className="col-6">
                        <div className='row flex-row justify-content-center'>
                        <button type="button" class="btn btn-outline-primary col-5 mx-3" data-toggle="modal" data-target="#getW">{swapToken1Name}</button>
                          <button type="button" class="btn btn-outline-primary col-5 mx-3" data-toggle="modal" data-target="#sendW">{swapChain1Name}</button>
                        </div>
                      </div>

                      {tokenReserves?<>
            {tokenReserves>0?<><div className="my-2">
            
              <div className="d-flex mx-4 my-2 p-2">
                <h4>{chainIdW==0x13881?"MUMBAI blockchain":"BSC blockchain"} </h4>  
              </div>
              <div className="d-flex justify-content-between bg-light mx-4 mb-2 p-4 rounded-3">
                <div className="d-flex flex-column">
                  <h4>{useRemainings?useRemainings:<></>}</h4>
                  <p className='mb-0'>Total User balance</p>
                </div>
                <img width="60" height="60" src="https://img.icons8.com/emoji/60/coin-emoji.png" alt="coin-emoji"/>
              </div>
              <div className="d-flex justify-content-between bg-light mx-4 mb-2 p-4 rounded-3">
                <div className="d-flex flex-column">
                  <h4>{tokenReserves?tokenReserves:<></>}</h4>
                  <p className='mb-0'>Total Actual Reserves</p>
                </div>
                <img width="60" height="60" src="https://img.icons8.com/emoji/60/coin-emoji.png" alt="coin-emoji"/>
              </div>
            </div> 
              </>
              :
              <div class="alert alert-dismissible alert-danger my-3 p-3">
                <strong>Oh snap!</strong> This Token is not allowed on Blockchain
              </div>
              }
              </>:<></>}
                    </div>
                      
                    <div className='row flex-row justify-content-center mt-5 mb-3'>
                    {walletAddress.length > 0 ? (
              <>
                {
                  tokenReserves?
                  <button 
        type="button" className="btn btn-primary btn-lg btn-block rounded-pill shadow-3-strong"
          onClick={() => {
            getRemainingBalances(chainIdW,tokenNameW)
            
          }}
        
          > <span> WithDraw </span></button>:<button 
          type="button" className="btn btn-primary btn-lg btn-block rounded-pill shadow-3-strong"
            onClick={() => {
              
            }} disabled
          
            > <span> WithDraw </span></button>

                }
          
          </>
            ) : (
              <>
                <button
                  type="button" className="btn btn-primary btn-lg btn-block rounded-pill shadow-3-strong"
                  onClick={() => {
                    connectWallet();
                    
                  }}
                >
                  <span>CONNECT WALLET</span>
                </button>
              </>
            )}
                    </div>
                  
                  </div>
                </div>

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
                        <img src={token.image} alt="..." className='rounded-circle' style={{width:'50px', height:'50px'}}/>
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
                        <img src={token.image} alt="..." className='rounded-circle' style={{width:'50px', height:'50px'}}/>
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

      <div className="modal fade" id="getW" tabindex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Choose Token</h5>
              <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#getW">
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
                    <button type="button" class="btn btn-outline-light text-start w-100 mt-2" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#getW" onClick={()=>{setTokenNameW(token.address);setSwapToken1Name(token.token)}}>
                    <div className='row align-items-center'>
                      <div className='col-2'>
                        <img src={token.image} alt="..." className='rounded-circle' style={{width:'50px', height:'50px'}}/>
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

      <div className="modal fade" id="sendW" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Choose Blockchain</h5>
              <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#sendW">
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <div className='row justify-content-center'>
                
                <div class="d-flex flex-column my-3">
                  {Blockchains.map((token,index)=>(
                    <button type="button" class="btn btn-outline-light text-start w-100 mt-2" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#sendW" onClick={()=>{setchainIdW(token.chain);setswapChain1Name(token.token)}}>
                    <div className='row align-items-center'>
                      <div className='col-2'>
                        <img src={token.image} alt="..." className='rounded-circle' style={{width:'50px', height:'50px'}}/>
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

export default UseBridge
