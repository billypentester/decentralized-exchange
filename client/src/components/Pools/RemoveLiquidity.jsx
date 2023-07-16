import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Token1Context } from '../../contexts/Token1Context';
import { cos, i } from 'mathjs';
import Loader from '../../utils/Loader';

function RemoveLiquidity() {
  const [loading, setLoading] = useState(false);
  const {
    getReturnValuesLiquidity,
    getReturnPooledLiquidity,
    CollectAllLiquidity,
    DecreaseAllLiquidity,
    DeletePosition
    
    
    
  } = useContext(Token1Context);
  const { id }=useParams()
  const [Position,setPosition]=useState()
  const [fee0,setfee0]=useState()
  const [fee1,setfee1]=useState()
  const [amount0,setAmount0]=useState()
  const [amount1,setAmount1]=useState()
  const [bool,setBool]=useState(true)
  const [bool1,setBoo1l]=useState(true)
  async function DecreaseLiquidity(liquidity){
    try{
      const value=await DecreaseAllLiquidity(id,liquidity)
      await value
      setBool(false)
      setBoo1l(true)
      getPosition()
      

    }
    catch(err){
      console.log("error",err)
    }
  }

  async function CollectFee(){
    try{
      const value=await CollectAllLiquidity(id)
      await value
      setBoo1l(false)
      getPosition()
      

    }
    catch(err){
      console.log("error",err)
    }
  }


    
async function getFees(decimals0,decimals1,liquidity){
  console.log("decimals 0",decimals0)
  
  try{
    if(liquidity>0)
    {

    
    const value= await getReturnValuesLiquidity(id)
    let fee00=(value[0] / 10 ** decimals0).toLocaleString("fullwide", {
      useGrouping: false,
    });
    let fee11=(value[1] / 10 ** decimals1).toLocaleString("fullwide", {
      useGrouping: false,
    });
    console.log(fee00)
    const value0=await getReturnPooledLiquidity(id,liquidity)
    let fee0=(value0[0] / 10 ** decimals0).toLocaleString("fullwide", {
      useGrouping: false,
    });
    let fee1=(value0[1] / 10 ** decimals1).toLocaleString("fullwide", {
      useGrouping: false,
    });
    setAmount0(fee0)
    setAmount1(fee1)
    setfee0(fee00)
    setfee1(fee11)
  }else{
    const value= await getReturnValuesLiquidity(id)
    let fee00=(value[0] / 10 ** decimals0).toLocaleString("fullwide", {
      useGrouping: false,
    });
    let fee11=(value[1] / 10 ** decimals1).toLocaleString("fullwide", {
      useGrouping: false,
    });
    console.log(fee00)
    setAmount0(0)
    setAmount1(0)
    setfee0(fee00)
    setfee1(fee11)
  }
  setLoading(false)

  }catch(err){
    console.log("error ",err)

  }



}
  
async function getPosition(){
  setLoading(true);
  
    try{
      
      
      const data = await fetch(`http://localhost:5000/GetSinglePositions/${id}`)
      data=data.json().then((data)=>{console.log(data.data);setPosition((data.data)); getFees(data.data.decimal0,data.data.decimal1,data.data.liquidity);})
      
      
  

    }catch(err){

    }

  
  
}

  useEffect(()=>{
    getPosition()
    

  },[])
  
  return (
    
    <div class="container" style={{ marginTop:'7rem'}}>

{
        loading && <Loader />
      }
    <div className="d-flex justify-content-center align-items-center py-5">

      <div class="card text-center shadow-lg col-md-6 col-lg-6 rounded-0 border border-end-0 border-start-0 border-top-0 border-3 border-primary">
        <h5 class="card-header h4">Remove Liquidity</h5>
        <div class="card-body row">

          <div className="d-flex flex-column">

            <div className="my-1 d-flex align-items-center">
              <div className='mx-2'>
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="eth" border="0" width="50" height="50" />
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png" alt="eth" border="0" width="50" height="50" />
              </div>
              <h4 class="card-title text-start mx-2 mb-0">{Position?.name0}/{Position?.name1}</h4>
            </div>

            {/* <div className='my-3 bg-light col-12 rounded-3 p-3'>
              <h4>Amount</h4>
              <div class="range my-3">
                <div className='d-flex justify-content-between my-2'>
                  <span class="range-value">0</span>
                  <span class="range-value">25</span>
                  <span class="range-value">50</span>
                  <span class="range-value">75</span>
                  <span class="range-value">100</span>
                </div>
                <input type="range" class="form-range" min="0" max="100" step="25" id="customRange3" />
              </div>
            </div> */}

            <div className='my-2 bg-light col-12 rounded-3 p-3'>
              <h4 className='mb-3'>Price</h4>
              <div class="d-flex flex-column m-2">
                <div class="d-flex justify-content-between">
                  <span className='h5'>Pooled {Position?.name0}</span>
                  <span className='h5'>{amount0}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span className='h5'>Pooled {Position?.name1}</span>
                  <span className='h5'>{amount1}</span>
                </div>
              </div>
              <div class="d-flex flex-column m-2">
                <div class="d-flex justify-content-between">
                  <span className='h5'>{Position?.name0} earned fee</span>
                  <span className='h5'>{fee0}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span className='h5'>{Position?.name1} earned fee</span>
                  <span className='h5'>{fee1}</span>
                </div>
              </div>
            </div>

            <div className='my-2 bg-light col-12 rounded-3 p-3'>
              <div class="form-check form-switch">
                <label class="form-check-label" for="flexSwitchCheckDefault">Collected as WETH</label>
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              </div>
            </div>


          </div>

          <div className='container my-3'>
            {Number(fee0)>0 || Number(fee1)>0 && bool1?<button type="button" onClick={()=>{CollectFee()}} className="btn btn-primary btn-lg rounded-pill w-100">Get Fee</button>:<></>}
            
          </div>
          <div className='container my-3'>
            {bool && Position?.liquidity>0?<button type="button" onClick={async()=>{await DecreaseLiquidity(Position?.liquidity)}} className="btn btn-primary btn-lg rounded-pill w-100">Collect All Liquidity</button>:<></>}
            
          </div>
          <div className='container my-3'>
            {Number(amount0)> 0 || Number(amount1)>0 || Number(fee0)>0 || Number(fee1)>0 ?<></>:<button type="button" onClick={async()=>{await DeletePosition(id)}} className="btn btn-danger btn-lg rounded-pill w-100">Delete Position</button>}
            
          </div>

        </div>
      </div>

    </div>

  </div>
  )
}

export default RemoveLiquidity