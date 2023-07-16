import React from 'react'
import { Token1Context } from "../../contexts/Token1Context";
import { useState, useEffect, useContext } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

function ConnectWallet() {
    const {
        connectWallet,
        walletAddress,

      } = useContext(Token1Context);
  return (
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Connect Wallet</h5>
                    <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"                  
                     ></button>
                </div>
                <div class="modal-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <button type="button" className="d-flex align-items-center btn btn-outline-secondary w-100 my-2" data-dismiss="modal"   
                                    onClick={() => {
                                    connectWallet();}}
                                    >
                                    <img className="ml-2 me-3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png" alt="Metamask" width='50px' loading="lazy" />
                                    <span className="h5 m-0">Metamask</span>
                                </button>
                                <button type="button" className="d-flex align-items-center btn btn-outline-secondary w-100 my-2" data-dismiss="modal"
                                onClick={() => {
                                    connectWallet();}}>
                                    <img className="ml-2 me-3" src="https://trustwallet.com/assets/images/media/assets/TWT.png" alt="Metamask" width='50px' loading="lazy" />
                                    <span className="h5 m-0">Trust Wallet</span>
                                </button>
                                <button type="button" className="d-flex align-items-center btn btn-outline-secondary w-100 my-2" data-dismiss="modal"
                                onClick={() => {
                                    connectWallet();}}>
                                    <img className="ml-2 me-3" src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eqb7dlnhn14iuukp4byj" alt="Metamask" width='50px' loading="lazy" />
                                    <span className="h5 m-0">Block Wallet</span>
                                </button>
                                <button type="button" className="d-flex align-items-center btn btn-outline-secondary w-100 my-2" data-dismiss="modal"
                                onClick={() => {
                                    connectWallet();}}>
                                    <img className="ml-2 me-3" src="https://th.bing.com/th/id/R.b8c359124c407077bb3eadc43e8a8402?rik=e%2bO7qDs01%2fSwyw&pid=ImgRaw&r=0" alt="Metamask" width='50px' loading="lazy" />
                                    <span className="h5 m-0">BitKeep Wallet</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConnectWallet