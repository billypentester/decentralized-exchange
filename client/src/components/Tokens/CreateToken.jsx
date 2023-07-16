
import './../../index.css'
import React, {useState, useEffect, useContext} from 'react'

import { Token1Context } from "../../contexts/Token1Context";

function CreateToken() {
  const {
    createToken,
    loader,
    setLoader
  } = useContext(Token1Context);
  const { connectWallet, walletAddress } = useContext(Token1Context);
  const [boolean1, setBoolean1] = useState(false);
  const [boolean2, setBoolean2] = useState(false);
  const [boolean3, setBoolean3] = useState(false);
 
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState();
  const [decimals, setDecimals] = useState();


  return (
    <div class="container" style={{ marginTop:'7rem'}}>
      <div className="bg-secondary d-flex justify-content-center align-items-center py-5">

        <div class="card shadow-lg col-12 col-sm-12 col-md-12 col-lg-7 rounded-3 border border-end-0 border-start-0 border-top-0 border-3">
          <h5 class="card-header h4 text-center">Create Token</h5>
          <div class="card-body">

            <div className='row justify-content-center'>

              <div className='row'>
                <div className="col-12 col-sm-6">
                  <div class="form-group">
                    <label for="Name" class="form-label mt-4">Token Name</label>
                    <input type="text" class="form-control" id="Name" placeholder="Ex: Ethereum" onChange={(e)=>{setName(e.target.value) }}/>
                  </div>
                </div>
                <div className='col-12 col-sm-6'>
                  <div class="form-group">
                    <label for="Symbol" class="form-label mt-4">Token Name</label>
                    <input type="text" class="form-control" id="Symbol" placeholder="Ex: ETH" onChange={(e)=>{setSymbol(e.target.value) }}/>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-12 col-sm-6'>
                  <div class="form-group">
                    <label for="Supply" class="form-label mt-4">Token Supply</label>
                    <input type="text" class="form-control" id="Supply" placeholder="0.0" onChange={(e)=>{setTotalSupply(e.target.value) }}/>
                  </div>
                </div>
                <div className='col-12 col-sm-6'>
                  <div class="form-group">
                    <label for="Decimals" class="form-label mt-4">Token Decimals</label>
                    <input type="text" class="form-control" id="Decimals" placeholder="0.0" onChange={(e)=>{setDecimals(e.target.value) }}/>
                  </div>
                </div>
              </div>
                
              <div className='row'>
                <div class="form-group">
                  <label for="Description" class="form-label mt-4">Token Type</label>
                  <div className="row boxedcheckbox">
                    <div className="col-12 col-md-4 text-center">
                      <input className='form-control form-control-lg' type="checkbox" id="0.01" name="skills" value="0.01" onChange={(e) => {setBoolean1(!boolean1)}}/>
                      <label for="0.01" class="form-label">Burnable</label>
                    </div>
                    <div className="col-12 col-md-4 text-center">
                      <input className='form-control form-control-lg' type="checkbox" id="0.1" name="skills" value="0.1" onChange={(e) => {setBoolean2(!boolean2);}}/>
                      <label for="0.1" class="form-label">Mintable</label>
                    </div>
                    <div className="col-12 col-md-4 text-center">
                      <input className='form-control form-control-lg' type="checkbox" id="0.3" name="skills" value="0.3" onChange={(e) => {setBoolean3(!boolean3)}}/>
                      <label for="0.3" class="form-label">Pauseable</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row flex-row justify-content-center mt-5 mb-3'>
                {
                  walletAddress.length > 0 ?
                  (
                      <>
                        <button type='button' class='btn btn-lg btn-primary rounded-pill w-75' onClick={() => {
                          setLoader(true)
                          createToken(name, symbol, totalSupply, decimals, boolean1, boolean2, boolean3);
                        }}>Create Token</button>
                      </>
                  )
                  :
                  (
                    <>
                      <button type='button' class='btn btn-lg btn-primary rounded-pill w-75' onClick={() => {
                        connectWallet();
                      }}>Connect Wallet</button>
                    </>
                  )
                }
              </div>
              
            </div>
                        
          </div>
        </div>

      </div>
    </div>
  )
}

export default CreateToken
