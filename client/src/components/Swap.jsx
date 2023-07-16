import "react-tooltip/dist/react-tooltip.css";
import Seo from './Utilities/Seo'
import React, {useState, useEffect, useContext, useRef} from 'react'
import { Token1Context } from "../contexts/Token1Context";
import inputTokens from '../data/inputTokens'
import Popup from '../utils/Popup';
import swal from "sweetalert";
import { Tooltip as ReactTooltip } from "react-tooltip";

function Swap() {
  const {
    Swap,
    connectWallet,
    walletAddress,
    findPool,
    quoter,
    estimatedValue,
    setEstimatedValue,
    estimatedValue1,
    setEstimatedValue1,
    checkIfApproved,
    approveTokensRouter,
    BalanceOfUser,
    checkBalanceCondition,
    Errors,
    getPoolBool,
    returnName
  } = useContext(Token1Context);
  const [r1, setR1] = useState(0.1); //larger number (ending val)
  // const [r2, setR2] = useState(0); //smaller number(starting val)
  const [show, setshow] = useState(false);

  const [token1, setToken1] = useState();
  const [boolean, setBoolean] = useState(true);
  const [check, setCheck] = useState();
  const [slippageVal, setSlippageVal] = useState(0);
  const [swapToken0, setSwapToken0] = useState();
  const [swapToken1, setSwapToken1] = useState();
  const [swapToken0Name, setSwapToken0Name] = useState("Select");
  const [swapToken1Name, setSwapToken1Name] = useState("Select");
  const [checkIfApproved1, setCheckIfApproved1] = useState(false);  
  const [tokenBalance, setTokenBalance] = useState(0);
  const [CheckTokenBalance, setCheckTokenBalance] = useState(false);
  const [SelectBothTokens, setSelectBothTokens] = useState(false);
  const [TokenDirection, setTokenDirection] = useState(false);
  const [fee, setFee] = useState();

  async function checkApprove(chain,Token,value){
    if(chain && Token && value){
      console.log(chain , Token , value, "it worked")
      const something= await checkIfApproved(chain,Token,value)
      console.log(something,"something value")
      setCheckIfApproved1(something )
    }else{
      setCheckIfApproved1(false)
    }

  }

async function BalanceProblem(token){
  if(walletAddress && token){
    const balance=await BalanceOfUser(token)
    console.log("check",balance)
    setTokenBalance(balance)
  }

}

async function checkConditionForBalance(token, amount){
  if(token, amount){
    const something=await checkBalanceCondition(token, amount);
    console.log("checkcondition",something)
    setCheckTokenBalance(something)

  }
  
}
async function checkgetPoolBool(token0, token1,value){
  getPoolBool(token0, token1,value);
}
async function checkSearch(bool,token){
  const name= await returnName(token)
  if(bool==1){
    
    setSwapToken0Name(name)
    setSwapToken0(token)

  }else{
    setSwapToken1Name(name)
    setSwapToken1(token)
  }
   

} 
function handleKeyPress(event,id) {
  console.log(event,"event here")
  if (event.key === 'Enter') {
    // Close the modal
    
    closeModal(id);
  }
}

function closeModal(id) {
  // Close the modal using JavaScript or jQuery, depending on your setup
  // For example, using jQuery:
 console.log("worked shayad")
 var modal = document.getElementById(id);
  const closeButton = modal.querySelector('[data-dismiss="modal"]');
  closeButton.click();
}


  
  useEffect(() => {
    Seo({
      title: "Swap",
      description: "Swap page",
    })
  }, []);


  useEffect(()=>{
    checkConditionForBalance(swapToken0,estimatedValue1)
    

  },[tokenBalance,estimatedValue1,swapToken0])


  useEffect(()=>{
    checkApprove(0x13881,swapToken0,estimatedValue1)

  },[swapToken0,estimatedValue1])

  useEffect(()=>{
    BalanceProblem(swapToken0)
    

  },[swapToken0,walletAddress])



  useEffect(()=>{
    checkgetPoolBool(swapToken0,swapToken1,fee)
  },[swapToken0,swapToken1,fee])


  return (
    <div class="container" style={{ marginTop:'7rem'}}>
      <div className="bg-secondary d-flex justify-content-center align-items-center py-5">

        <div class="card shadow-lg col-md-7 col-lg-6 rounded-3 border border-end-0 border-start-0 border-top-0 border-3 ">
          <div class="card-header h4 text-center">Swap</div>
          <div class="card-body">
            {console.log(swapToken1,swapToken1Name)}
            <div className='row justify-content-center'>

              <div className='row flex-row justify-content-center align-items-end m-2'>
                
                <div className='col-12 col-sm-7'>
                <p style={{textAlign:"end"}}>Your Balance: <b style={{color:"green"}}>{tokenBalance}</b></p>
                
                  <div class="form-group">
                    <label for="Sender" class="form-label mt-4">You Send</label>
                    <input type="number" class="form-control" id="Sender" placeholder="0.0"
                      value={estimatedValue1}
                      onChange={(e) => {
                        setToken1(e.target.value);
                        setEstimatedValue1(e.target.value);
                        {swapToken0 && swapToken1 && fee ?quoter(e.target.value,1,swapToken0,swapToken1,fee):<></>}
                        
                      }}
                    />
                  </div>  
                </div>
                <div className='col-12 col-sm-3 mt-3 mt-sm-0'>
                  <button type="button" class="btn btn-outline-primary w-100" data-toggle="modal" data-target="#send">{swapToken0Name}</button>
                </div>
              </div>

              <div className='row flex-row justify-content-center align-items-end'>
                <div className='col-12 col-sm-7'>
                  <div class="form-group">
                    <label for="Getter" class="form-label mt-4">You Get</label>
                    <input type="number" class="form-control" id="Getter" placeholder="0.0"
                      value={estimatedValue}
                      onChange={(e) => {
                        setToken1(e.target.value);
                        setEstimatedValue(e.target.value);
                        {swapToken0 && swapToken1 && fee?quoter(e.target.value,1,swapToken0,swapToken1,fee):<></>}                   }}
                    />
                  </div>  
                </div>
                <div className='col-12 col-sm-3 mt-3 mt-sm-0'>
                  <button type="button" class="btn btn-outline-primary w-100" data-toggle="modal" data-target="#get">{swapToken1Name}</button>
                </div>
              </div>
              <div className='row'>
                      <div class="form-group">
                        <label for="Fees" class="form-label mt-4">Fees</label>
                        <div className="row boxedradio">
                          <div id="1st" className="col-4 col-sm-4 text-center">
                            <input className='form-control form-control-lg' type="radio" id="500" name="skills" value="0.01"  onChange={(e) => {setFee(500);{swapToken0 && swapToken1 && token1 ?quoter(token1,1,swapToken0,swapToken1,500):<></>} }}/>
                            <label for="500" class="form-label">0.05%</label>
                          </div>
                          <div id="2nd" className="col-4 col-sm-4 text-center">
                            <input className='form-control form-control-lg' type="radio" id="3000" name="skills" value="0.1" onChange={(e) => {setFee(3000);{swapToken0 && swapToken1 && token1 ?quoter(token1,1,swapToken0,swapToken1,3000):<></>}}}/>
                            <label for="3000">0.3%</label>
                          </div>
                          <div id="3rd" className="col-4 col-sm-4 text-center">
                            <input className='form-control form-control-lg' type="radio" id="10000" name="skills" value="0.3" onChange={(e) => {setFee(10000);{swapToken0 && swapToken1 && token1  ?quoter(token1,1,swapToken0,swapToken1,10000):<></>}}}/>
                            <label for="10000">1%</label>
                          </div>
                        </div>
                      </div>
                    </div>
              <div className='row flex-row justify-content-center mt-5 mb-3'>
                {console.log(checkIfApproved1,"approve check")}
              {
                  walletAddress.length > 0 ?
                  (
                    <>{CheckTokenBalance && Errors?<>{checkIfApproved1?<button type='button' class='btn btn-lg btn-primary rounded-pill w-75' onClick={async() => {setCheckIfApproved1(  !(await approveTokensRouter(swapToken0,estimatedValue1)==true))}}>Approve</button>:<button type='button' class='btn btn-lg btn-primary rounded-pill w-75' onClick={() => {Swap(estimatedValue1, boolean, r1,swapToken0,swapToken1)}}>Swap</button>}
                    </>:<>
                    <button type='button' class='btn btn-lg btn-primary rounded-pill w-75' disabled>Swap</button>
                    </>}
                      {console.log(boolean, r1)}
                      
                    </>
                  )
                  :
                  (
                    <>
                      <button type='button' class='btn btn-lg btn-primary rounded-pill w-75' onClick={() => {connectWallet();}}>Connect Wallet</button>
                    </>
                  )
                }
              </div>

            </div>

          </div>
        </div>

        <div className="modal fade" id="send" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Choose Token</h5>
                <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#send">
                  <span aria-hidden="true"></span>
                </button>
              </div>
              <div className="modal-body">
                <div className='row justify-content-center'>
                  <div class="form-group">
                    <label class="form-label">Search</label>
                    <input type="email" class="form-control" id="SearchToken" placeholder="Search Token" onKeyDown={(event)=>{handleKeyPress(event,"send")}}  onChange={(e)=>{checkSearch(1,e.target.value)}}/>
                  </div>
                  <div class="d-flex flex-column my-3">
                    {inputTokens.map((token,index)=>(
                      <button type="button" class="btn btn-outline-light text-start w-100 mt-2" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#send" onClick={()=>{setSwapToken0(token.address);setSwapToken0Name(token.token);{swapToken1 && token1&& fee?quoter(token1,1,token.address,swapToken1,fee):<></>}}}>
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
                    <input type="email" class="form-control" id="SearchToken" placeholder="Search Token" onKeyDown={(event)=>{handleKeyPress(event,"get")}}  onChange={(e)=>{checkSearch(2,e.target.value)}}/>
                  </div>
                  <div class="d-flex flex-column my-3">
                  {inputTokens.map((token,index)=>(
                      <button type="button" class="btn btn-outline-light text-start w-100 mt-2" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#get" onClick={()=>{setSwapToken1(token.address);setSwapToken1Name(token.token);{swapToken0 && token1 && fee?quoter(token1,1,swapToken0,token.address,fee):<></>}}}>
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

        {/* {
          showModal && <Popup setShowModal={hideModal} title="Swap" message="Swap Successful" type="success" />
        } */}

        <ReactTooltip
          anchorId="1st"
          place="top"
          content="0.05% of the transaction amount is charged as fee"
        />

        <ReactTooltip
          anchorId="2nd"
          place="top"
          content="0.3% of the transaction amount is charged as fee"
        />

        <ReactTooltip
          anchorId="3rd"
          place="top"
          content="1% of the transaction amount is charged as fee"
        />

      </div>
    </div>
  )
}

export default Swap