import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './../../utils/Loader'

// import pools from './../../data/pools'
// const notVerified=require("../../images/notVerified.jpg")

import notVerified from './../../images/notVerified.jpg'

function TopPools() {

  const [Pools,setPools]=useState();
  const [loading, setLoading] = useState(false)
  const [Next,setNext]=useState(1);
  const navigate = useNavigate();

  async function getPools(page){
    try{
      setLoading(true)
      var response=await fetch(`http://localhost:5000/PoolsPage/?page=${page}`)
      var data=response.json().then((data)=>{console.log(data.data);setPools(data.data)})
      console.log(data)
      setLoading(false)
      const myDiv= document.getElementById(Number(page-1).toString())
      if(myDiv){
        myDiv.classList.remove('active')
      }
      const myDiv1= document.getElementById(page)
      myDiv1.classList.add('active')
      const myDiv2= document.getElementById(Number(page+1).toString())
      if(myDiv2){
        myDiv2.classList.remove('active')
      } 
  }
  catch(err){
      console.log("err",err)
  }

  }

  useEffect(()=>{
    getPools(Next);
  },[Next])

  const handleRowClick = (id) => {
    navigate(`/pools/stats/${id}`);
  }

  return (

    <>

    {
      loading && <Loader />
    }

    
        <div class="container" style={{ marginTop:'4rem' }}>

      

      <div className="py-5 text-center">
        <h1 className="display-6 ">Top Pools</h1>
      </div>
      {/* <table class="table mb-5 table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Pool</th>
            <th scope="col">MarketGap</th>
            <th scope="col">Volume 24H</th>
            <th scope="col">Volume 7D</th>
          </tr>
        </thead>
        <tbody>
          {
            pools.map((pool) => (
              <tr key={pool.id} id={pool.id} style={{ cursor:'pointer' }} onClick={handleRowClick}>
                <th scope="row">{pool.id}</th>
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
                <td class="h6">{pool.marketGap}</td>
                <td class="h6">{pool.volume24H}</td>
                <td class="h6">{pool.volume7D}</td>             
              </tr>
            ))
          }
        </tbody>
      </table> */}

      <table class="table mb-5 table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Pool</th>
            <th scope="col">Fee</th>
            <th scope="col">Tick Spacing</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {Pools?
            Pools.map((pool) => (
              <tr key={pool._id} id={pool._id} style={{ cursor:'pointer' }} onClick={()=>handleRowClick(pool.pool)}>
                <th scope="row">
                  {pool.image1?<><img style={{ width: '40px', height: '40px' }} class="rounded-circle " src={pool.tokensPicture.picture} alt="pool" />
                      <img style={{ width: '40px', height: '40px' }} class="rounded-circle " src={pool.tokensPicture.picture} alt="pool" /></>:<img style={{ width: '40px', height: '40px' }} className="rounded-circle m-1" src={notVerified} alt="token" />}
                
                    
                </th>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="m-1">
                      
                    </div>
                    <span class="m-1 h6">{pool.name}</span>
                    
                  </div>  
                </td>
                <td class="h6">{pool.fee}%</td>
                <td class="h6">{pool.tickSpacing}</td>
                            
                <td>
                    {pool.verified?                  
                    <button type="button" className="btn btn-primary">ADD LIQUIDITY</button>:
                    <button type="button" className="btn btn-danger">ADD LIQUIDITY</button>
}</td> 
              </tr>
            )):<></>
          }
        </tbody>
      </table>

      <div class="d-flex justify-content-center my-5">
        <nav aria-label="...">
          <ul class="pagination pagination-circle">
            <li class="page-item mx-1">
              <a class="page-link"onClick={()=>{setNext(Next==1?Number(1):Number(Next-1))}}>Previous</a>
            </li>
            <li id="1" class="page-item mx-1 active" onClick={()=>{setNext(Number(1))}}><a class="page-link" href="#">1</a></li>
            <li id="2" class="page-item mx-1 " onClick={()=>{setNext(Number(2))}} aria-current="page">
              <a class="page-link" href="#">2 <span class="visually-hidden">(current)</span></a>
            </li>
            <li id="3" class="page-item mx-1" onClick={()=>{setNext(Number(3))}}><a class="page-link" href="#">3</a></li>
            <li id="4" class="page-item mx-1" onClick={()=>{setNext(Number(4))}}><a class="page-link" href="#">4</a></li>
            <li id="5" class="page-item mx-1"onClick={()=>{setNext(Number(5))}}><a class="page-link" href="#">5</a></li>
            <li class="page-item mx-1">
              <a class="page-link" href="#" onClick={()=>{setNext(Number(Next+1))}}>Next</a>
            </li>
          </ul>
        </nav>
      </div>


        </div>
      
    

    
    </>
  )
}

export default TopPools