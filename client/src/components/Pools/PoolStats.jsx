import React, {useEffect, useState,useContext} from 'react'
import { useParams } from 'react-router-dom'
import pools from './../../data/pools'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './../../utils/Loader'
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
import { Token1Context } from "../../contexts/Token1Context";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PoolStats() {
  const [bool,setbool]=useState(false)
  const [Next,setNext]=useState(10);
  const {formatNumber, checkTime}=useContext(Token1Context);
  const [Pool,setPool]=useState()
  const [arr,setArr]=useState([]);
  const [PoolTrans,setPoolTrans]=useState()
  const navigate = useNavigate();
  const [RemainingPoolTrans,setRemainingPoolTrans]=useState();
  const [loading, setLoading] = useState(false);

  const handleRowClick = (e) => {
    const id = e.currentTarget.id;
    console.log(id);
    navigate(`/pools/stats/${id}`);
  }

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
  async function getPoolData(address){
    try{
      var response=await fetch(`http://localhost:5000/GetPool/${address}`)
      var data=response.json().then((data)=>{console.log(data.data);setPool(data)
      setArr((data.data.name).split("/"))})
      console.log(data.data)
    }catch(err){
      console.log(err)
  
    }
  
  }
  async function getPoolTransactions(address){
    try{
      setLoading(true);
      var response=await fetch(`http://localhost:5000/PoolTransactions/${address}`)
      var data=response.json().then((data)=>{console.log(data.data.result);setPoolTrans((data.data.result).slice(0,10));setRemainingPoolTrans(data.data.result);setbool(true)})
      console.log(data.data)
      setLoading(false);
    }catch(err){
      console.log(err)

    }

  }
  {console.log("value remaining",RemainingPoolTrans?.length)}
  function moveNext(){
    if(bool && Next>0 && Number(Next)<Number(RemainingPoolTrans.length+10))
    {
    
      setPoolTrans(RemainingPoolTrans.slice(Number(Next-10),Number(Next)))
      
    }
  }
  function changeNext(value){
    if(Number(Next+value)>0 && Number(Next+value)<Number(RemainingPoolTrans.length+10))
    {
      setNext(Number(Next+value))
    }
  }

  const { id } = useParams();
  const ids=1
  const [poolStat, setPoolStat] = React.useState('');

  useEffect(() => {
    getPoolData(id)
    getPoolTransactions(id)
    const pool = pools.filter((pool) => pool.id == ids);
    console.log(pool[0]);
    setPoolStat(pool[0]);
  },[ids])

  useEffect(()=>{
    moveNext()

  },[Next])

  return (
    <div style={{ marginTop:'4rem' }}>
      {
        loading && <Loader />
      }
    {Pool?<>
      <div className="bg-light shadow-2-strong">
        <div className="p-5 container h-25">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              {/* <div className="mx-3">
                <img src={poolStat.tokensPicture[0].picture} alt={poolStat.name} className="img-fluid" style={{ width:'50px' }} />
                <img src={poolStat.tokensPicture[1].picture} alt={poolStat.name} className="img-fluid" style={{ width:'50px' }} />
              </div> */}
              <h1 className="m-0">{(Pool.data.name).toString().toUpperCase()}</h1>
              <span className="mx-3 bg-primary px-3 py-1 rounded-3 text-white">{Pool.data.fee} %</span>
            </div>
            <div>
              <button className="btn btn-lg btn-primary mx-3">
                <Link to={`/pools/create`} className="text-decoration-none text-light">Add Liquidity</Link>
              </button>
            </div>
          </div>
          <div className="cont row justify-content-between flex-row mt-5">
            <div className="col-5 text-start">
              <h5 className="lead">Pool Address</h5>
              <h6>{Pool.data.pool}</h6>
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
            <h1>$8.56M</h1>
            <span className="text-success h4">+ {poolStat.fee}%</span>
          </div>

          <div className="d-flex flex-column my-3 rounded-3 align-align-items-stretch">

            <div className='col-12 my-3'>
              <div className='bg-primary p-3 mx-3 rounded-2 text-light shadow-4-strong'>
                <div className='d-flex flex-column text-center'>
                  <h3 className="text-white">{Pool.data.tickSpacing}</h3>
                  <span>Tick Spacing</span>
                </div>
              </div>
            </div>

            <div className="d-flex">

              <div className='col-6 my-3'>
                <div className='bg-primary p-3 mx-3 rounded-2 text-light shadow-4-strong'>
                  <div className='d-flex flex-column text-center'>
                  {Number(Pool.amount0)>Number(1000*10**Pool.decimal0)? <h3 className="text-white">{formatNumber((Pool.amount0/10**Pool.decimal0).toLocaleString(
        "fullwide",
        {
          useGrouping: false,
        }
      ))}</h3>:<h3 className="text-white">{(Pool.amount0/10**Pool.decimal0).toFixed()} </h3>}
                    <span>{arr[0]}</span>
                  </div>
                </div>
              </div>

              <div className='col-6 my-3'>
                <div className='bg-primary mx-3 p-3 rounded-2 text-light shadow-4-strong'>
                  <div className='d-flex flex-column text-center'>
                  {Number(Pool.amount1)>Number(1000*10**Pool.decimal1)?<h3 className="text-white">{formatNumber((Pool.amount1/10**Pool.decimal1).toLocaleString(
        "fullwide",
        {
          useGrouping: false,
        }
      ))}</h3>:<h3 className="text-white">{(Pool.amount1/10**Pool.decimal1).toFixed()} </h3>}
                    <span>{arr[1]}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="container my-5 mx-auto col-10 d-flex flex-column justify-content-center">
          
          <h2>Transsactions</h2>

          {/* <table class="table mb-5 mt-3 table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th scope="col">Pool</th>
                <th scope="col">Total Value</th>
                <th scope="col">DAI Ammount</th>
                <th scope="col">USDC Ammount</th>
                <th scope="col">Account</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {
                pools.map((pool) => (
                  <tr key={pool.id} id={pool.id} style={{ cursor:'pointer' }} onClick={handleRowClick}>
                    <th scope="row">Swap DAI for USDC</th>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="m-1">
                          <img style={{ width: '40px', height: '40px' }} class="rounded-circle " src={pool.tokensPicture[0].picture} alt="pool" />
                          <img style={{ width: '40px', height: '40px' }} class="rounded-circle " src={pool.tokensPicture[1].picture} alt="pool" />
                        </div>
                        <span class="m-1 h6">{pool.name}</span>
                        <span class="m-1 bg-light p-1 rounded-3">{pool.fee}%</span>
                      </div>  
                    </td>
                    <td class="h6">1.11 DAI</td>
                    <td class="h6">2.34 USDC</td>
                    <td class="h6">0x523A...bF5c</td>  
                    <td class="h6">1 hour ago</td>             
                  </tr>
                ))
              }
            </tbody>
          </table> */}
{PoolTrans?
          <table class="table mb-5 mt-3 table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th scope="col">Pool</th>
                {/* <th scope="col">Total Value</th> */}
                <th scope="col">{arr[0]} Ammount</th>
                <th scope="col">{arr[1]} Ammount</th>
                <th scope="col">Account</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {
                PoolTrans.map((pool) => (
                  <tr key={pool.id} id={pool.id} style={{ cursor:'pointer' }} onClick={{}}>
                    {Number(pool.data.amount0)>0?<th scope="row">Swap {arr[0]} for {arr[1]} </th>:<th scope="row">Swap {arr[1]} for {arr[0]} </th>}
                    
                    {/* <td>
                      <div class="d-flex align-items-center">
                        <div class="m-1">
                          <img style={{ width: '40px', height: '40px' }} class="rounded-circle " src={pool.tokensPicture[0].picture} alt="pool" />
                          <img style={{ width: '40px', height: '40px' }} class="rounded-circle " src={pool.tokensPicture[1].picture} alt="pool" />
                        </div>
                        <span class="m-1 h6">{pool.name}</span>
                        <span class="m-1 bg-light p-1 rounded-3">{pool.fee}%</span>
                      </div>  
                    </td> */}
                    <td class="h6">{((pool.data.amount0)/10**(Pool.decimal0)).toLocaleString(
        "fullwide",
        {
          useGrouping: false,
        }
      )}</td>
                    <td class="h6">{((pool.data.amount1)/10**(Pool.decimal1)).toLocaleString(
        "fullwide",
        {
          useGrouping: false,
        }
      )}</td>
                    <td class="h6"><a href={`https://mumbai.polygonscan.com/address/${pool.data.recipient}`} target="_blank" >{(pool.data.recipient).substr(0,5)}...{(pool.data.recipient).substr(-4)}</a></td>  
                    <td class="h6">{checkTime(pool.block_timestamp)}</td>             
                  </tr>
                ))
              }
            </tbody>
            
          </table>
          
          :<></>}
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary mx-2" onClick={ ()=>{ changeNext(-10)}}>{"<<"}</button>
            <button className="btn btn-primary mx-2" onClick={ ()=>{ changeNext(10)}}>{">>"}</button>
          </div>

      </div></>:<></>}
      
        

    </div>
  )
}

export default PoolStats