import React, {useEffect,useState,useContext} from 'react'
import { useParams } from 'react-router-dom'
import tokens from '../../data/tokens'
import { Link } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import pools from './../../data/pools';
import { Token1Context } from "../../contexts/Token1Context";
const notVerified=require("../../images/notVerified.jpg")

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function TokenStats() {
  const {formatNumber, checkTime}=useContext(Token1Context);
  const [bool,setbool]=useState(false)
  
  const [TokenTrans,setTokenTrans]=useState();
  const [RemainingTokenTrans,setRemainingTokenTrans]=useState();
  const [Tokens,setTokens]=useState();
  const [Decimals,setDecimals]=useState();
  const { id }=useParams()
  const [Next,setNext]=useState(10);
  console.log("params address",id)
  const options = {
    responsive: true,
    labels: {
      fontColor: '#fff',
      display: false,
    },
    scales: {
      y: {
        display:false,
      }
    }
  };

  const labels = ['1:00 AM', '5:00 AM', '9:00 AM', '1:00 PM', '5:00 PM', '9:00 PM'];

  const data = {
    labels,
    datasets: [
      {
        label: 'value',
        data:[1208, 1190, 1195, 1195, 1204, 1196, 1212, 1208, 1211, 1200, 1204, 1197, 1206, 1202, 1195, 1212, 1211, 1205, 1204, 1195, 1208, 1197, 1191, 1209, 1212, 1193, 1192, 1197, 1195, 1206, 1194, 1198, 1194, 1201, 1204, 1205, 1205, 1196, 1211, 1190, 1208, 1211, 1205, 1193, 1210, 1194, 1199, 1203, 1212, 1209, 1194, 1191, 1195, 1207, 1194, 1203, 1207, 1202, 1198, 1203, 1195, 1198, 1194, 1203, 1196, 1210, 1211, 1206, 1195, 1197, 1194, 1208, 1190, 1193, 1211, 1198, 1190, 1191, 1209, 1196, 1193, 1206, 1192, 1206, 1204, 1193, 1194, 1197, 1192, 1202, 1205, 1192, 1197, 1205, 1192, 1207, 1210, 1191, 1209, 1194, 1200, 1209, 1203, 1212, 1195, 1190, 1193, 1201, 1196, 1207, 1204, 1205, 1199, 1210, 1193, 1209, 1210, 1206, 1192, 1206, 1199, 1199, 1207, 1210, 1212, 1193, 1208, 1209, 1192, 1194, 1191, 1205, 1210, 1207, 1212, 1195, 1192, 1201, 1207, 1194, 1198, 1199, 1204, 1200],
        borderColor: '#3b71ca',
        backgroundColor: '#3b71ca',
        fill: false,
        lineTension: 0.5,
      },

    ],
  };
async function getTokenData(address){
  try{
    var response=await fetch(`http://localhost:5000/GetToken/${address}`)
    var data=response.json().then((data)=>{console.log(data.data);setTokens(data.data);})
    console.log(data.data)
  }catch(err){
    console.log(err)

  }

}


  async function getTransactions(address){
    try{
      var response=await fetch(`http://localhost:5000/TokenTransactions/${address}`)
      var data=response.json().then((data)=>{console.log(data.data.result);setTokenTrans((data.data.result).slice(0,10));setRemainingTokenTrans((data.data.result));setDecimals(data.decimals);setbool(true)})
      console.log(data.data)
    }catch(err){
      console.log(err)

    }

  }
  {console.log("remaining length ",RemainingTokenTrans?.length)}
  function moveNext(){
    if(bool && Next>0 && Number(Next)<Number(RemainingTokenTrans.length+10))
    {
    
      setTokenTrans(RemainingTokenTrans.slice(Number(Next-10),Number(Next)))
      
    }
  }
  function changeNext(value){
    if(Number(Next+value)>0 && Number(Next+value)<Number(RemainingTokenTrans.length+10))
    {
      setNext(Number(Next+value))
    }
  }
 
  
  const ids=1

  const [tokenStat, setTokenStat] = React.useState('');

  useEffect(() => {
    getTokenData(id)
    getTransactions(id)
    const token = tokens.filter((token) => token.id == ids);
    setTokenStat(token[0]);
  },[id])
  useEffect(()=>{
    moveNext()

  },[Next])

  return (
    
    <div style={{ marginTop:'4rem' }}>
{Tokens?<>
      <div className="bg-light shadow-2-strong">
        <div className="p-5 container h-25">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              {Tokens.image?<img src={Tokens.image} className="img-fluid me-3" style={{ width:'50px' }} />:<img src={notVerified} style={{ width:'50px' }} className="img-fluid me-3" />
              
              }
              <h1 className="m-0">{(Tokens.name).toString().charAt(0).toUpperCase()+(Tokens.name).toString().toLowerCase().slice(1)}</h1><br></br><br></br>
            </div>
            <div>
              <button className="btn btn-lg btn-primary">
                <Link to={`/swap`} className="text-decoration-none text-light">Swap {(Tokens.name).toString().charAt(0).toUpperCase()+(Tokens.name).toString().toLowerCase().slice(1)}</Link>
              </button>
            </div>
          </div>
          <div className="row justify-content-between flex-row mt-5">
            <div className="col-5 text-start">
              <h5 className="lead">Token Address</h5>
              <h6>{Tokens.token}</h6>
            </div>
            <div className="col-5 text-end">
              <h5 className="lead">Owner Address</h5>
              <h6>{Tokens.owner}</h6>
            </div>
          </div>
        </div>

      </div>

      <div className="container d-flex my-4 justify-content-center">

        <div className="me-4 d-flex align-content-center flex-column justify-content-center">
          <div className="bg-light text-center rounded-pill shadow-4-strong px-1 py-2">
            <h5 className="p-1 bg-primary rounded-pill text-white">1D</h5>
            <h5 className="p-1">1W</h5>
            <h5 className="p-1">1M</h5>
            <h5 className="p-1">1Y</h5>
          </div>
        </div>

        <div className="col-7 bg-light rounded-3 p-3 mx-2 shadow-4-strong">
          <Line options={options} data={data} />
        </div>

        <div className="col-4 rounded-3 mx-2">

          <div className='d-flex flex-column text-end p-3 rounded-3 bg-light shadow-4-strong'>
            <h1>{tokenStat.price}</h1>
            <span className="text-success h4">+{tokenStat.change}</span>
          </div>

          <div className="d-flex justify-content-center align-items-stretch my-3 rounded-3 flex-wrap">

            <div className='col-5 bg-primary m-3 p-3 box rounded-2 text-light shadow-4-strong'>
              <div className='d-flex flex-column text-center'>
                <h3 className='text-white'>{formatNumber(Tokens.totalSupply)}</h3>
                <span>Total Supply</span>
              </div>
            </div>

            <div className='col-5 bg-primary m-3 p-3 box rounded-2 text-light shadow-4-strong'>
              <div className='d-flex flex-column text-center'>

                {console.log("read here: ",Tokens.decimals)}
                <h3 className='text-white'>{Tokens.decimals?Tokens.decimals:<>-</>}</h3>
                <span>Decimals</span>
              </div>
            </div>

            <div className='col-5 bg-primary m-3 p-3 box rounded-2 text-light shadow-4-strong'>
              <div className='d-flex flex-column text-center'>
                <h3 className='text-white'>{(Tokens.symbol).toString().toUpperCase()}</h3>
                <span>Symbol</span>
              </div>
            </div>
            {Tokens.verified?<div className='col-5 bg-primary m-3 p-3 box rounded-2 text-light shadow-4-strong'>
              <div className='d-flex flex-column text-center'>
                <h3 className='text-white'>Verified</h3>
                <span>Verification</span>
              </div>
            </div>:
            <div className='col-5 bg-danger m-3 p-3 box rounded-2 text-light shadow-4-strong'>
              <div className='d-flex flex-column text-center'>
                <h3 className='text-white'>Unverified</h3>
                <span>Verification</span>
              </div>
            </div>
}

          </div>

        </div>

      </div>
{Tokens.description?
      <div className="container m-5 col-8">
          <h2>Description</h2>
          <p className="p-3">
            {Tokens.description}
            </p>
      </div>:<></>
}
      <div className="container my-5 mx-auto col-10 d-flex flex-column justify-content-center">
          
          <h2>Transactions</h2>

          <table class="table mb-5 mt-3 table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th scope="col">Action</th>
                <th scope="col">Total Value</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              { 
                TokenTrans?
                TokenTrans.map((pool) => (
                  <tr key={pool.id} id={pool.id} style={{ cursor:'pointer' }} onClick={{}}>
                    <th scope="row">Transfer</th>
                    <td>
                      {(pool.data.value/ 10 ** Decimals).toLocaleString("fullwide", {useGrouping: false})} 
                    </td>
                    <td class="h6"><a href={`https://mumbai.polygonscan.com/address/${pool.data.from}`} target="_blank">{(pool.data.from).substr(0,5)}...{(pool.data.from).substr(-4)}</a></td>
                    <td class="h6"><a href={`https://mumbai.polygonscan.com/address/${pool.data.to}`} target="_blank">{(pool.data.to).substr(0,5)}...{(pool.data.to).substr(-4)}</a></td>
                    <td class="h6">{checkTime(pool.block_timestamp)}</td>             
                  </tr>
                ))
                :
                <>
                  <td colSpan="5" className="text-center">
                    
                      no transactions found
                    
                  </td>
                </>
              }
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary mx-2" onClick={ ()=>{ changeNext(-10)}}>{"<<"}</button>
            <button className="btn btn-primary mx-2" onClick={ ()=>{ changeNext(10)}}>{">>"}</button>
          </div>
          


      </div></>
      :<></>}
    </div>
  )
}

export default TokenStats