import React,{useContext,useEffect,useState} from 'react'
import { Link } from 'react-router-dom'


import { Token1Context } from "../../contexts/Token1Context";
import { i } from 'mathjs';
import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function PoolLiquidity() {
  const {  walletAddress,getManagerContract,getTokenContracts,formatNumber ,chechkChain} = useContext(Token1Context);
  const [bool,setbool]=useState(false)
  const [positions,setPositions]=useState([])
  const [blockchain,setBlockchain]=useState("MUM")
  
// async function getBalance(){
//   try{
//   if(walletAddress){
//   const contract= await getManagerContract();
//   console.log("Manager",contract)
//   const balance = await contract.methods.balanceOf(walletAddress).call();
//   setTotalPositions(balance)
//   if(balance>0){
//     let arr=[]
//     let pos=[]
//   for(let i=0;i<balance;i++)
   
//   {
//     arr[i] = await contract.methods.tokenOfOwnerByIndex(walletAddress,i).call();
//     console.log("aarr",arr[i])
//     pos[i]=await contract.methods.positions(Number(i+1)).call();
//     console.log("pos[i]",pos[i])
//     const token=getTokenContracts(pos[i].)
//     const name0= await
//     setPositions(prevData => [...prevData, {...pos[i],name0:}])

//   }
  

//   }
// }
//   }catch (err){
//     console.log(err)
//   }
  
  
// }



async function getPositions(){
  if(walletAddress.length>0){
    try{
      console.log(walletAddress)
      
      const data = await fetch(`http://localhost:5000/GetMumPositions/${walletAddress}`)
      data=data.json().then((data)=>{console.log(data);setPositions((data.data));setBlockchain("MUM")})
      
  

    }catch(err){

    }

  }
  
}



async function getPositions1(){
  if(walletAddress.length>0){
    try{
      console.log(walletAddress)
      const data = await fetch(`http://localhost:5000/GetBscPositions/${walletAddress}`)
      data=data.json().then((data)=>{console.log(data);setPositions((data.data));setBlockchain("BSC")})
  
    }catch(err){

    }

  }
  
}

async function tryit(bool){
  if(bool){
    getPositions()

  }else{
    getPositions1()
  }
}

useEffect(()=>{
  chechkChain()
getPositions()

},[walletAddress])
useEffect(()=>{
  tryit(bool)

},[bool])



  return (
    
    <div class="container" style={{ marginTop:'4rem' }}>
      
      
{console.log(positions?.length)}
      <div class="py-5 d-flex justify-content-around align-items-center">
        <h1 class="display-6">Pools</h1>
        <button type="button" class="btn btn-primary">
          <Link to="/bridge/liquidity" className="text-white">New Position</Link>
        </button>
        <Switch {...label} onClick={()=>{setbool(!bool)}}/>
      </div>

      <div className="d-flex justify-content-center align-items-center py-2">

        <div class="card text-center shadow-lg col-md-6 col-lg-7 rounded-0 border border-end-0 border-start-0 border-top-0 border-3 border-primary">
          <h5 class="card-header h4">Your Positions ({positions?.length})  </h5><p className="text-muted">Blockchain: {blockchain}</p>
          
          <div class="card-body">
            {positions?<>
            {positions.map((item,index)=>(
              <Link to={`/bridge/liquiditystat/remove/${blockchain}`}  style={{ textDecoration:'none' }}>
              <div className="text-start text-dark bg-light shadow-1-strong p-4 rounded-3 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center my-3">
                    {/* <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="ETH" className="img-fluid" style={{ width:'30px' }} />
                    <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/4943.png" alt="UNI" className="img-fluid" style={{ width:'30px' }} /> */}
                    <span className="mx-2  my-0">{item.name}   {item.symbol}</span>
                    <span className="mx-2 my-0 px-3  bg-info text-white rounded-3 lead">{Number(item.fee)}%</span>
                  </div>
                  <button type="button" class="btn btn-primary mx-2">Deposit</button>
                </div>
                <span className="h5">Amount: {item.amount} </span ><br></br>
                <span className="h5"> Token Address: {item.token}  </span >
              </div>
            </Link>
            

            ))}</>:<></>}
            
            
        
          </div>
        </div>

      </div>



    </div>
  )
}

export default PoolLiquidity
