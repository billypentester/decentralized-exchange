
import './../../index.css'
import React, {useState, useEffect, useContext} from 'react'
import { Token1Context } from "../../contexts/Token1Context";
import inputTokens from '../../data/inputTokens'
import { number } from 'mathjs';
function CreatePool() {

  const {
    
    connectWallet,
    walletAddress,
    getPrice,
    takeDepositAmount,
    price,
    setPrice,
    AddLiquidityProfessionally,
    currentPrice,
    getPriceOnClick,
    intializedVar,
    maxPrice, 
    setMaxPrice,
    minPrice, 
    setMinPrice,
    initializePool,
    approveTokens,
    returnName


  } = useContext(Token1Context);

  const [position, setPosition] = useState({ x: 25});
  const [isDragging, setIsDragging] = useState(false);
  const [token0, setToken0] = useState();
  const [token1, setToken1] = useState();
  const [fee, setFee] = useState();
  const [pRatio, setPRatio ]= useState(2);
  
  const [token0Amount, setToken0Amount]=useState()
  const [token1Amount, setToken1Amount]=useState()
  const [swapToken0, setSwapToken0] = useState();
  const [swapToken1, setSwapToken1] = useState();
  const [swapToken0Name, setSwapToken0Name] = useState("Select");
  const [swapToken1Name, setSwapToken1Name] = useState("Select");
  const [bool1, setBool1] = useState(false);
  const [bool2, setBool2] = useState(false);
  const handleMouseDown = (event) => {
    setIsDragging(true);
  };

  async function checkSearch(bool,token){
    const name= await returnName(token)
    if(bool==1){
      
      
      
      setToken0(token);
      setSwapToken0Name(name)
  
    }else{
      setToken1(token)
      setSwapToken1Name(name)
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
async function priceFunctiion(){
  if(token0 && token1 && fee){
   await getPriceOnClick(token0, token1, fee)
   return token0,token1,fee
  }

}

async function ApproveBool(value, token0, token0Amount){
  if(value==1){
    const nice= await approveTokens( token0, token0Amount);
    console.log("nice",nice)
    if(nice){
      setBool1(nice)

    }
    

  }else{
    const nice= await approveTokens( token0, token0Amount);
    if(nice){
      setBool2(nice)

    }
  }
  

} 
useEffect(()=>{
  priceFunctiion()

},[token0,token1,fee])

useEffect(()=>{
  setMaxPrice(Number(Number(currentPrice)+1).toFixed())
},[currentPrice])
  return (
    
    <div class="container" style={{ marginTop:'7rem'}}>
      <div className="bg-secondary d-flex justify-content-center align-items-center py-5">

        <div class="card shadow-lg col-12 col-sm-12 col-md-10 rounded-3 border border-end-0 border-start-0 border-top-0 border-3">
          <h5 class="card-header h4 text-center">Add Liquidity</h5>
          <div class="card-body">

            <div className='row justify-content-center'>

              <div className='row justify-content-center'>

                <div className="row flex-column col-12 col-sm-10 col-md-10 col-lg-6">

                  <div className="row">
                    <div class="form-group">
                      <label for="Name" class="form-label mt-4">Token Name</label>
                      <div class="input-group mb-3 row flex-row">
                        <button type="button" class="form-control btn btn-outline-primary col-5 col-sm-10 mx-3" data-toggle="modal" data-target="#send">{swapToken0Name}</button>
                        <button type="button" class="form-control btn btn-outline-primary col-5 col-sm-10 mx-3" data-toggle="modal" data-target="#get">{swapToken1Name}</button>                      
                      </div>
                    </div>
                  </div>
                  
                  <div className='row'>
                    <div class="form-group">
                      <label for="Amount" class="form-label mt-4">Deposit Ammount</label>
                      <div class="d-flex flex-column">
                        {
                          intializedVar ? 
                          <input type="number" id="Amount" className="form-control mb-3" placeholder='token0' onChange={(e)=>{setToken0Amount(e.target.value)}}/>
                          :
                          <input type="number" id="Amount" className="form-control mb-3" placeholder='token0' onChange={(e)=>{setToken0Amount(e.target.value)}} disabled />
                        }
                        {
                          intializedVar ?
                          <input type="number" id="Amount" className="form-control mb-3" placeholder='token1' onChange={(e)=>{setToken1Amount(e.target.value)}}/> 
                          :
                          <input type="number" id="Amount" className="form-control mb-3" placeholder='token1' onChange={(e)=>{setToken1Amount(e.target.value)}} disabled />
                        }
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div class="form-group">
                      <label for="Fees" class="form-label mt-4">Fees</label>
                      <div className="row boxedradio">
                        <div className="col-12 col-sm-4 text-center">
                          <input className='form-control form-control-lg' type="radio" id="500" name="skills" value="0.01" onChange={(e) => {setFee(500) }}/>
                          <label for="500" class="form-label">0.05 %</label>
                        </div>
                        <div className="col-12 col-sm-4 text-center">
                          <input className='form-control form-control-lg' type="radio" id="3000" name="skills" value="0.1" onChange={(e) => {setFee(3000)}}/>
                          <label for="3000">0.3 %</label>
                        </div>
                        <div className="col-12 col-sm-4 text-center">
                          <input className='form-control form-control-lg' type="radio" id="10000" name="skills" value="0.3" onChange={(e) => {setFee(10000)}}/>
                          <label for="10000">1 %</label>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className='row flex-column col-12 col-sm-10 col-md-10 col-lg-6'>
              
                  <div className='my-1'>
                    
                    <h5 class="card-title text-start mx-4 p-2"></h5>
                    <div className="mx-4 mb-3 p-3 bg-light">
                      
                        {
                          currentPrice !== 'need to initialize' ?
                          <div className='d-flex justify-content-between'>
                            <div className='d-flex flex-column  my-2'>
                              <strong className='mb-2'>Price Ratio</strong>
                              <h4 className='lead text-start'>{currentPrice}</h4>
                            </div>
                            <img width="60" height="60" src="https://img.icons8.com/emoji/60/coin-emoji.png" alt="coin-emoji"/>
                          </div>
                          :
                          <div className='d-flex flex-column justify-content-center align-items-center my-2'>
                            
                              {token0!=token1?
                              <div className='d-flex text-center my-2'>
                              <strong className='mb-2 me-1 text-danger'>Oops !!!</strong>
                              <h4 className='lead text-start text-danger'>{currentPrice}</h4>
                              </div>
                            :
                            <div className='d-flex text-center my-2'>
                              <strong className='mb-2 me-1 text-danger'>Oops !!!</strong>
                              <h4 className='lead text-start text-danger'>You can crete this Pool</h4>
                              </div>
                            }
                              
                            
                          </div>
                        }
                      
                      {
                        intializedVar ? 
                        <></>
                        :
                        <div className='col-12 bg-light rounded-3'>
                          <div className='d-flex justify-content-center'>
                            <div className='form-group'>
                              <label for="minPrice" class="form-label mt-2 w-100 text-center">Price Ratio</label>
                              <div class="d-flex align-items-center" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-outline-secondary" onClick={()=>{setPRatio(Number(pRatio-1)>0? Number(Number(pRatio)-1):pRatio)}}>-</button>
                                
                                <input type="text" id="Fee" className="form-control" value={pRatio}  onChange={(e)=>{setPRatio(e.target.value>0? e.target.value:null)}}/>

                                <button type="button" class="btn btn-outline-secondary" onClick={()=>{setPRatio(Number(Number(pRatio)+1))}}>+</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                    
                    {
                      intializedVar ?
                      <div className="row mx-4 p-2 justify-content-around">
                        <div className='col-12 col-sm-5'>
                          <div className='form-group'>
                            <label for="minPrice" class="form-label mt-4 w-100 text-center">Min Price</label>
                            <div class="d-flex align-items-center" role="group" aria-label="Basic example">
                              <button type="button" class="btn btn-outline-secondary" onClick={()=>{setMinPrice(Number(Number(minPrice)-1)>0?Number(Number(minPrice)-1):1)}}>-</button>
                              <h5 className='d-inline h-4 m-0 text-dark mx-4'>{minPrice}</h5>
                              <button type="button" class="btn btn-outline-secondary" onClick={()=>{setMinPrice( Number(Number(minPrice)+1)<currentPrice?Number(Number(minPrice)+1):minPrice)}}>+</button>
                            </div>
                          </div>
                        </div>
                        <div className='col-12 col-sm-5'>
                          <div className='form-group'>
                            <label for="minPrice" class="form-label mt-4 w-100 text-center">Max Price</label>
                            <div class="d-flex align-items-center" role="group" aria-label="Basic example">
                              <button type="button" class="btn btn-outline-secondary" onClick={()=>{setMaxPrice(Number(maxPrice-1)>currentPrice?Number(Number(maxPrice)-1):maxPrice)}}>-</button>
                              <h5 className='d-inline h-4 m-0 text-dark mx-4'>{maxPrice}</h5>
                              <button type="button" class="btn btn-outline-secondary" onClick={()=>{setMaxPrice(Number(Number(maxPrice)+1))}}>+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      :
                      // <div className="d-flex mx-4 p-2 justify-content-around">
                      //   <div className='col-5 bg-light rounded-3'>
                      //     <div className='my-2'>
                      //       <span className='text-dark w-100 text-center'>min price</span>
                      //     </div>
                      //     <div className='d-flex align-items-center justify-content-between my-2'>
                      //       <button className='btn btn-secondary p-2 mx-2'disabled onClick={()=>{
                      //         setMinPrice(minPrice-1)
                      //       }}>
                      //         <i class="fa-solid fa-minus d-inline"></i>
                      //       </button>
                      //       <h5 className='d-inline h-4 m-0 text-dark' disabled>{minPrice}</h5>
                      //       <button className='btn btn-secondary p-2 mx-2' disabled onClick={()=>{
                      //         setMinPrice(minPrice+1)
                      //       }}>
                      //         <i class="fa-solid fa-plus d-inline"></i>
                      //       </button>
                      //     </div>
                      //   </div>
                      //   <div className='col-5 bg-light rounded-3'>
                      //     <div className='my-2'>
                      //       <span className='text-dark'>max price</span>
                      //     </div>
                      //     <div className='d-flex align-items-center justify-content-between my-2'>
                      //       <button className='btn btn-secondary p-2 mx-2' disabled  onClick={()=>{
                      //         setMaxPrice(maxPrice-1)
                      //       }}>
                      //         <i class="fa-solid fa-minus d-inline"></i>
                      //       </button>
                      //       <h5 className='d-inline h-4 m-0 text-dark'>{maxPrice}</h5>
                      //       <button className='btn btn-secondary p-2 mx-2' disabled onClick={()=>{
                      //         setMaxPrice(maxPrice+1)
                      //       }}>
                      //         <i class="fa-solid fa-plus d-inline"></i>
                      //       </button>
                      //     </div>
                      //   </div>
                      // </div>
                      <></>
                    }
                  
                  </div>

                </div>

              </div>

              <div className='row flex-row justify-content-center mt-5 mb-3'>
                    
                    {}
                <div className='row flex-row justify-content-center mb-5'>
                  {bool1 ?<button type='button' class='btn btn-lg btn-outline-primary w-25 w-sm-25 mx-3 mb-2 mb-sm-0' disabled onClick={async()=>{  setBool1(await approveTokens( token0, token0Amount)==true) }}> Approve token 0 </button>
                  :
                  <>                
                  {walletAddress.length>0 && intializedVar?
                    <button type='button'  class='btn btn-lg btn-outline-primary w-25 w-sm-25 mx-3 mb-2 mb-sm-0' onClick={()=>{ApproveBool(1, token0, token0Amount) }}> Approve token 0 </button>
                  :
                  <button type='button' class='btn btn-lg btn-outline-primary w-25 w-sm-25 mx-3 mb-2 mb-sm-0' disabled onClick={async()=>{setBool2(await approveTokens( token1, token1Amount)==true) }}> Approve token 1 </button>
                  
                  
                  
                  }
                  
                  </> 
                  }
                {bool2? <button type='button' class='btn btn-lg btn-outline-primary w-25 w-sm-25 mx-3 mb-2 mb-sm-0' disabled onClick={async()=>{setBool2(await approveTokens( token1, token1Amount)==true) }}> Approve token 1 </button>
: <>                
{walletAddress.length && intializedVar>0?
  <button type='button'  class='btn btn-lg btn-outline-primary w-25 w-sm-25 mx-3 mb-2 mb-sm-0' onClick={()=>{ApproveBool(2, token1, token1Amount) }}> Approve token 1 </button>
:
<button type='button' class='btn btn-lg btn-outline-primary w-25 w-sm-25 mx-3 mb-2 mb-sm-0' disabled onClick={async()=>{setBool2(await approveTokens( token1, token1Amount)==true) }}> Approve token 1 </button>



}

</> }
                </div>
            

                {
                walletAddress.length > 0 ? 
                (
                  !intializedVar?
                  <>
                  {token0!=token1?<>
                    <button type='button' class='btn btn-lg btn-primary rounded-pill w-75 mb-3' onClick={()=>{initializePool( token0, token1, fee, pRatio) }}> Initialize Pool </button>
                  </>
                  :
                  <button disabled type='button' class='btn btn-lg btn-primary rounded-pill w-75 mb-3' onClick={()=>{initializePool( token0, token1, fee, pRatio) }}> Initialize Pool </button>
                }
                  </>
                  :
                  <>
                    <button type='button' class='btn btn-lg btn-primary rounded-pill w-75 mb-3' onClick={()=>{AddLiquidityProfessionally( token0, token1, fee, pRatio, minPrice, maxPrice, token0Amount, token1Amount) }}> Add Liquidity </button>
                  </>
                ) 
                : 
                (
                  <>
                    <button type='button' class='btn btn-lg btn-primary rounded-pill w-75 mb-3' onClick={()=>{connectWallet()}}> Connect Wallet </button>
                  </>
                )}

              </div>

            </div>

          </div>
        </div>

      </div>


      {/* <div className="modal fade" id="send" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
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
                  <input type="email" class="form-control" id="SearchToken" placeholder="Search Token" onKeyDown={(event)=>{handleKeyPress(event,"get")}}  onChange={(e)=>{checkSearch(2,e.target.value)}}/>
                </div>
                <div class="d-flex flex-column my-3">
                  {inputTokens.map((token,index)=>(
                    <button type="button" class="btn btn-outline-light text-start w-100 mt-2" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#send" onClick={()=>{setToken0(token.address);setSwapToken0Name(token.token)}}>
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
                  <input type="email" class="form-control" id="SearchToken" placeholder="Search Token" onKeyDown={(event)=>{handleKeyPress(event,"send")}}  onChange={(e)=>{checkSearch(1,e.target.value)}}/>
                </div>
                <div class="d-flex flex-column my-3">
                {inputTokens.map((token,index)=>(
                    <button type="button" class="btn btn-outline-light text-start w-100 mt-2" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#get" onClick={()=>{setToken1(token.address);setSwapToken1Name(token.token)}}>
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
      </div> */}




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
                      <button type="button" class="btn btn-outline-light text-start w-100 mt-2" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#send" onClick={()=>{setToken0(token.address);setSwapToken0Name(token.token)}}>
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
                      <button type="button" class="btn btn-outline-light text-start w-100 mt-2" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#get" onClick={()=>{setToken1(token.address);setSwapToken1Name(token.token)}}>
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

export default CreatePool
