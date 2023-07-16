import React, { useContext, useEffect, useState } from 'react'
import { BridgeContext } from '../../contexts/BridgeContext';
import { Token1Context } from '../../contexts/Token1Context';
import swal from 'sweetalert';
import Loader from '../../utils/Loader';

function RemoveBridgeLiquidityMum() {
    const [TotalReserves,setTotalReserves]=useState()
    const [UsersReserves,setUsersReserves]=useState()
    const [fee,setFee]=useState()
    const [name,setName]=useState()
    const [supply,setSupply]=useState()
    const [ActualFee,setActualFee]=useState()
    const [ActualReserves,setActualReserves]=useState()
    const [ActualTotalReserves,setActualTotalReserves]=useState()
    const [ActualSupply,setActualSupply]=useState()
    const [bool,setBool]=useState(false)
    const [loading, setLoading] = useState(false);



    const {
    
        addTokenToBlockchain,
        getTokenContract,
        getBSCTokenContract,
        getMUMTokenContract,
        APPROVEtoken,
        getBscBridgeContract,
        getMumBridgeContract,
        Deposit,
        getRemainingBalances,
        WithdrawOnSecondBlockchain,
        bridgeABI,
        mumBridgeAddress,
        getContract,
        bscBridgeAddress,
        shiftChain
        
      } = useContext(BridgeContext);
      const {
        connectWallet,
        walletAddress,
        
        approveTokens
        
      } = useContext(Token1Context);
    async function getBalancesAndFees(token){
      setLoading(true)
        if (walletAddress)
        {
        const contract=await getBscBridgeContract()
        let Supply= Number(await contract.methods.totalActualReservesForTokens(token).call())
        setActualTotalReserves(Supply)
        let balance
        try{
             balance= await contract.methods.getFee(walletAddress,token).call()

        }catch{
            let value= await contract.methods.totalSupplyByOwner(walletAddress,token).call()
            let Deposit= await contract.methods.totalTokensDepositedByUser(walletAddress,token).call()
            

            balance=[0,value,Deposit]
        }
        console.log("balance:",balance)
        let TokenContract = await getBSCTokenContract(token);
        let decimals= Number(await TokenContract.methods.decimals().call())
        setActualFee(balance[0])
        console.log("value this",balance[1].toLocaleString("fullwide", {
            useGrouping: false,
          })-balance[0].toLocaleString("fullwide", {
            useGrouping: false,
          }))
        setActualSupply(balance[1].toLocaleString("fullwide", {
            useGrouping: false,
          })-balance[0].toLocaleString("fullwide", {
            useGrouping: false,
          }))
        setActualReserves(balance[2])
        let fee=(balance[0] / 10 ** decimals).toLocaleString("fullwide", {
            useGrouping: false,
          });
          
          let userSupply=(balance[1] / 10 ** decimals).toLocaleString("fullwide", {
            useGrouping: false,
          });
          let reserves=(balance[2] / 10 ** decimals).toLocaleString("fullwide", {
            useGrouping: false,
          });
          let supply=(Supply / 10 ** decimals).toLocaleString("fullwide", {
            useGrouping: false,
          });
          let name= await TokenContract.methods.symbol().call()
          setTotalReserves(supply)
          setUsersReserves(reserves)
          setFee(fee)
          setName(name)
          setSupply(userSupply)

          
        }
        setLoading(false)
        

        
    }

    async function CollectFee(token){
      try{

      
        const contract=await getContract(bridgeABI,bscBridgeAddress)
        await shiftChain(97)

        let balance= await contract.methods.RecieveFee(token).send({from:walletAddress}).then(()=>{
            swal({
              title: "Attention",
              text: `Transaction Successful`,
              icon: "success",
              button: "OK!",
              className: "modal_class_success",
            });
          });
          await getBalancesAndFees(token)
        }catch(err){
          console.log("err:",err);
          swal({
              title: "Warning",
              text: `Transaction Reverted`,
              icon: "warning",
              button: "OK!",
              className: "modal_class_success",
            });
      }




    }

    
    async function RemoveLiquidity(token){
      try{

      
        const contract=await getContract(bridgeABI,bscBridgeAddress)
        console.log("actual supply:",ActualSupply)
        await shiftChain(97)
        let balance= await contract.methods.removeLiquidityForTokens(token,ActualSupply.toString()).send({from:walletAddress}).then(()=>{
            swal({
              title: "Attention",
              text: `Transaction Successful`,
              icon: "success",
              button: "OK!",
              className: "modal_class_success",
            });
          });
         await getBalancesAndFees(token)
         setBool(true)
        }catch(err){
          console.log("err:",err);
          swal({
              title: "Warning",
              text: `Transaction Reverted`,
              icon: "warning",
              button: "OK!",
              className: "modal_class_success",
            });
      }




    }

    useEffect(()=>{
        getBalancesAndFees("0xB69809bdef1D52Cadfed571bE162bb6d67D5c783")

    },[walletAddress])


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
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png" alt="eth" border="0" width="50" height="50" />
              </div>
              <h4 class="card-title text-start mx-2 mb-0">{name}</h4>
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
                  <span className='h5'>Pooled {name}</span>
                  <span className='h5'>{UsersReserves}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span className='h5'>Total {name} reserves</span>
                  <span className='h5'>{TotalReserves}</span>
                </div>
              </div>
              <div class="d-flex flex-column m-2">
                <div class="d-flex justify-content-between">
                  <span className='h5'>{name} earned fee</span>
                  <span className='h5'>{fee}</span>
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
        {
            fee>0 ?
            <button onClick={()=>{CollectFee("0xB69809bdef1D52Cadfed571bE162bb6d67D5c783")}} type="button" className="btn btn-primary btn-lg rounded-pill w-100">Collect Fee</button>
         :
         <button disabled onClick={()=>{CollectFee("0xB69809bdef1D52Cadfed571bE162bb6d67D5c783")}} type="button" className="btn btn-primary btn-lg rounded-pill w-100">Collect Fee</button>
        

        }
            </div>

          <div className='container my-3'>
            {
                UsersReserves>0?
                <button onClick={()=>{RemoveLiquidity("0xB69809bdef1D52Cadfed571bE162bb6d67D5c783")}} type="button" className="btn btn-primary btn-lg rounded-pill w-100">Get Liquidity</button>
          :
          <button disabled onClick={()=>{RemoveLiquidity("0xB69809bdef1D52Cadfed571bE162bb6d67D5c783")}} type="button" className="btn btn-primary btn-lg rounded-pill w-100">Get Liquidity</button>
          
            }
        
           </div>

          {/* <div className='container my-3'>
        {
            bool && Number(ActualTotalReserves)<Number(ActualReserves)?
            <button onClick={()=>{WithdrawOnSecondBlockchain(0x13881,"0xB69809bdef1D52Cadfed571bE162bb6d67D5c783",supply,(Number(ActualFee)+Number(ActualReserves)))}} type="button" className="btn btn-primary btn-lg rounded-pill w-100">Withdraw on second blockchain</button>
         
            :
            <></>
        }
             </div> */}

        </div>
      </div>

    </div>

  </div>
  )
}

export default RemoveBridgeLiquidityMum