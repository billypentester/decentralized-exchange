import React, { useEffect, useState } from 'react'
import tokens from '../../data/tokens.js'
import { useNavigate } from 'react-router-dom';
const notVerified=require("../../images/notVerified.jpg")
function Tokens() {
  const [Tokenss,setTokenss]=useState();
  const [Next,setNext]=useState(1);

  const navigate = useNavigate();

  const handleRowClick = (address) => {
    
    navigate(`/tokens/stats/${address}`);
  }
async function searchTokens(name){
  try{
    var response=await fetch(`http://localhost:5000/SearchTokens/${name}`)
    var data=response.json().then((data)=>{console.log(data.data);setTokenss(data.data)})
    console.log(data)
    

    }
    
    
    

catch(err){
    console.log("err",err)
}


}


  async function getTokens(page){
    try{
      var response=await fetch(`http://localhost:5000/TokensPage/?page=${page}`)
      var data=response.json().then((data)=>{console.log(data.data);setTokenss(data.data)})
      console.log(data)
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
    getTokens(Next);


  },[Next])

  return (
    <div className="container" style={{ marginTop:'4rem' }}>

      <div className="py-5 text-center">
        <h1 className="display-6">Trending Tokens</h1>
      </div>

      <div className="d-flex justify-content-between align-items-center">

        <div className="col-3">
          <div className="form-group">
            <input type="text" id="Search" className="form-control bg-light" placeholder='Filter Tokens' onChange={(e)=>{searchTokens(e.target.value)}}/>
          </div>
        </div>

        <div className="d-flex">

          <div className="dropdown mx-1">
            <button className="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-mdb-toggle="dropdown" aria-expanded="false">
              1Y
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#">1M</a></li>
              <li><a className="dropdown-item" href="#">1W</a></li>
              <li selected><a className="dropdown-item" href="#">1D</a></li>
              <li><a className="dropdown-item" href="#">1H</a></li>
            </ul>
          </div>

          <div className="dropdown mx-1">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-mdb-toggle="dropdown" aria-expanded="false">
              Ethereum
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item">Polygon</a></li>
              <li><a className="dropdown-item">Optimism</a></li>
              <li><a className="dropdown-item">Arbitrum</a></li>
            </ul>
          </div>

        </div>

      </div>
      

      <table className="table my-5 table-hover align-middle justify-center">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Token Name</th>
            <th scope="col">Price</th>
            <th scope="col">Decimals</th>
            <th scope="col">Market Gap</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {console.log(Next)}
        <tbody>
            {Tokenss?
              Tokenss.map((token) => (
                <tr key={token._id} id={token._id} style={{ cursor:'pointer' }} onClick={()=>handleRowClick(token.token)}>
                  <th scope="row">{token.image?<img style={{ width: '40px', height: '40px' }} className="rounded-circle m-1" src={token.image} alt="token" />:<img style={{ width: '40px', height: '40px' }} className="rounded-circle m-1" src={notVerified} alt="token" />}</th>
                  <td>
                    <div className="d-flex align-items-center">
                      
                      
                      <span className="m-1 h6">{token.name}</span>
                      {/* <span className="m-1">{token.symbol}</span> */}
                    </div>  
                  </td>
                  <td className="h6">{token.symbol}</td>
                  <td className="h6">{token.decimals}</td>
                  <td className="h6">{token.totalSupply}</td>
                  <td>
                    {token.verified?                  
                    <button type="button" className="btn btn-primary">Buy</button>:
                    <button type="button" className="btn btn-danger">Buy</button>
}
                  </td>               
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
  )
}

export default Tokens