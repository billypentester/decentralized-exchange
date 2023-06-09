
import './../../index.css'
import React, {useState, useEffect, useContext} from 'react'
import { Token1Context } from "../../contexts/Token1Context";

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
    approveTokens


  } = useContext(Token1Context);

  const [position, setPosition] = useState({ x: 25});
  const [isDragging, setIsDragging] = useState(false);
  const [token0, setToken0] = useState();
  const [token1, setToken1] = useState();
  const [fee, setFee] = useState();
  const [pRatio, setPRatio ]= useState(1);
  
  const [token0Amount, setToken0Amount]=useState()
  const [token1Amount, setToken1Amount]=useState()

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
async function priceFunctiion(){
  if(token0 && token1 && fee){
   await getPriceOnClick(token0, token1, fee)
   return token0,token1,fee
  }

}
useEffect(()=>{
  priceFunctiion()

},[token0,token1,fee])
  return (
    
    <div class="container" style={{ marginTop:'7rem'}}>
      <div className="bg-secondary d-flex justify-content-center align-items-center py-5">

        <div class="card shadow-lg col-md-6 col-lg-10 rounded-3 border border-end-0 border-start-0 border-top-0 border-3">
          <h5 class="card-header h4 text-center">Add Liquidity</h5>
          <div class="card-body">

            <div className='row'>

              <div className='row justify-content-center'>

                <div className="row flex-column col-6">

                  <div className="row">
                    <div class="form-group">
                      <label for="Name" class="form-label mt-4">Token Name</label>
                      <div class="input-group mb-3">
                        <input type="number" class="form-control" id="Name" placeholder='Ex: "0x000000000000000"' onChange={(e)=>{setToken0(e.target.value) }}/>
                        <input type="number" class="form-control" id="Name" placeholder='Ex: "0x000000000000000"' onChange={(e)=>{setToken1(e.target.value) }}/>
                      </div>
                    </div>
                  </div>
                  
                  <div className='row'>
                    <div class="form-group">
                      <label for="Amount" class="form-label mt-4">Deposited Ammount</label>
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
                        <div className="col-4 text-center">
                          <input className='form-control form-control-lg' type="radio" id="500" name="skills" value="0.01" onChange={(e) => {setFee(500) }}/>
                          <label for="500" class="form-label">500</label>
                        </div>
                        <div className="col-4 text-center">
                          <input className='form-control form-control-lg' type="radio" id="3000" name="skills" value="0.1" onChange={(e) => {setFee(3000)}}/>
                          <label for="3000">3000</label>
                        </div>
                        <div className="col-4 text-center">
                          <input className='form-control form-control-lg' type="radio" id="10000" name="skills" value="0.3" onChange={(e) => {setFee(10000)}}/>
                          <label for="10000">10000</label>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className='row flex-column col-6'>
                
                  <a>{currentPrice}</a>
              
                  <div className='my-1'>
                    
                    <h5 class="card-title text-start mx-4 p-2"></h5>
                    <div className="d-flex flex-column mx-4 mb-3 px-4 bg-light h-100">
                      <svg class="range-svg" viewBox="0 0 500 100">
                        <rect class="range-track" x="25" y="45" width="450" height="10" rx="5" />
                        <circle draggable class="range-handle range-handle--left" cx={position.x} cy="50" r="12" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave} />
                        <circle class="range-handle range-handle--right" cx="475" cy="50" r="12" />
                        <rect class="range-selection" x="25" y="45" width="450" height="10" rx="5" />
                      </svg>
                    </div>
                    
                    {/* {
                      intializedVar ? 
                      <></>
                      :
                      <div className='col-5 bg-light rounded-3 text-white'>
                        <div>
                          <div className='my-2'>
                            <span className='text-dark'>price</span>
                          </div>
                          <div className='d-flex align-items-center justify-content-between my-2'>
                            <button className='btn btn-secondary p-2 mx-2' onClick={(e)=>{setPRatio(pRatio-1)}} >
                              <i class="fa-solid fa-minus d-inline" ></i>
                            </button>
                            <h5 className='d-inline h-4 m-0 text-dark'>{pRatio}</h5>
                            <button className='btn btn-secondary p-2 mx-2' onClick={(e)=>{setPRatio(pRatio+1)}}>
                              <i class="fa-solid fa-plus d-inline"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    } */}
                    
                    {
                      intializedVar?
                      <div className="d-flex mx-4 p-2 justify-content-around">
                        <div className='col-5 bg-light rounded-3 text-white'>
                          <div className='my-2'>
                            <span className='text-dark'>min price</span>
                          </div>
                          <div className='d-flex align-items-center justify-content-between my-2'>
                            <button className='btn btn-secondary p-2 mx-2' onClick={()=>{
                              setMinPrice(minPrice-1)
                            }}>
                              <i class="fa-solid fa-minus d-inline"></i>
                            </button>
                            <h5 className='d-inline h-4 m-0 text-dark'>{minPrice}</h5>
                            <button className='btn btn-secondary p-2 mx-2' onClick={()=>{
                              setMinPrice(minPrice+1)
                            }}>
                              <i class="fa-solid fa-plus d-inline"></i>
                            </button>
                          </div>
                        </div>
                        <div className='col-5 bg-light rounded-3 text-white'>
                          <div className='my-2'>
                            <span className='text-dark'>max price</span>
                          </div>
                          <div className='d-flex align-items-center justify-content-between my-2'>
                            <button className='btn btn-secondary p-2 mx-2' onClick={()=>{
                              setMaxPrice(maxPrice-1)
                            }}>
                              <i class="fa-solid fa-minus d-inline"></i>
                            </button>
                            <h5 className='d-inline h-4 m-0 text-dark'>{maxPrice}</h5>
                            <button className='btn btn-secondary p-2 mx-2' onClick={()=>{
                              setMaxPrice(maxPrice+1)
                            }}>
                              <i class="fa-solid fa-plus d-inline"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      :
                      <div className="d-flex mx-4 p-2 justify-content-around">
                        <div className='col-5 bg-light rounded-3 text-white'>
                          <div className='my-2'>
                            <span className='text-dark'>min price</span>
                          </div>
                          <div className='d-flex align-items-center justify-content-between my-2'>
                            <button className='btn btn-secondary p-2 mx-2'disabled onClick={()=>{
                              setMinPrice(minPrice-1)
                            }}>
                              <i class="fa-solid fa-minus d-inline"></i>
                            </button>
                            <h5 className='d-inline h-4 m-0 text-dark' disabled>{minPrice}</h5>
                            <button className='btn btn-secondary p-2 mx-2' disabled onClick={()=>{
                              setMinPrice(minPrice+1)
                            }}>
                              <i class="fa-solid fa-plus d-inline"></i>
                            </button>
                          </div>
                        </div>
                        <div className='col-5 bg-light rounded-3 text-white'>
                          <div className='my-2'>
                            <span className='text-dark'>max price</span>
                          </div>
                          <div className='d-flex align-items-center justify-content-between my-2'>
                            <button className='btn btn-secondary p-2 mx-2' disabled  onClick={()=>{
                              setMaxPrice(maxPrice-1)
                            }}>
                              <i class="fa-solid fa-minus d-inline"></i>
                            </button>
                            <h5 className='d-inline h-4 m-0 text-dark'>{maxPrice}</h5>
                            <button className='btn btn-secondary p-2 mx-2' disabled onClick={()=>{
                              setMaxPrice(maxPrice+1)
                            }}>
                              <i class="fa-solid fa-plus d-inline"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    }
                  
                  </div>

                </div>

              </div>

              <div className='row flex-row justify-content-center mt-5 mb-3'>
                
                <button type='button' class='btn btn-lg btn-primary rounded-pill w-75 mb-3' onClick={()=>{approveTokens( token0, token0Amount) }}> Approve token 0 </button>
                <button type='button' class='btn btn-lg btn-primary rounded-pill w-75 mb-3' onClick={()=>{approveTokens( token1, token1Amount) }}> Approve token 1 </button>
               
                {
                walletAddress.length > 0 ? 
                (
                  !intializedVar?
                  <>
                    <button type='button' class='btn btn-lg btn-primary rounded-pill w-75 mb-3' onClick={()=>{initializePool( token0, token1, fee, pRatio) }}> Initialize Pool </button>
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
    </div>
  )
}

export default CreatePool
