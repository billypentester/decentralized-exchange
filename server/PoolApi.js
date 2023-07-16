const Web3  = require("web3");
const factoryABI = require("./ABI/FactoryABI.json")
const TokenABI = require("./ABI/TokenABI.json")

const factoryAddress="0x2F632a89a777b1f0632A11448157Be763B1c3E0d"
var url="wss://polygon-mumbai.g.alchemy.com/v2/MXTlA2FpRDF3lP5pMRFjWA8C-o-Khq8b";
const privateKey="ed5e2f13218066fb70bd22f2cb2467924b42fb4c173f4518b54aa683791d17cd"
const web3=new Web3(url);
// const web3Bsc= new Web3("https://data-seed-prebsc-1-s1.binance.org:8545")
// console.log(web3Bsc)
const account= web3.eth.accounts.privateKeyToAccount(privateKey);
// console.log(account.address)
const contract= new web3.eth.Contract(factoryABI,factoryAddress);
async function Bridge(){
   
const tx =await contract.methods.fee().call().then(console.log)

}
// contract.events.TokenCreated({},(error,data)=>{
//     console.log(data)
// })


contract.events.PoolCreated({}, 'latest')
.on("data", async(event)=>{
    try{
    console.log("Called Successfully")
    const { token0, token1,fee,tickSpacing,pool } = event.returnValues;
    const contract1= new web3.eth.Contract(TokenABI,token0);
    const contract2= new web3.eth.Contract(TokenABI,token1);
    const name1=await contract1.methods.symbol().call()
    const name2=await contract2.methods.symbol().call()
    const name= `${name1}/${name2}`
    const fees=Number(fee)/10000;

//     const name= await contract.methods.name().call()
//     const symbol= await contract.methods.symbol().call()
//     const totalSupply= await contract.methods.totalSupply().call()
//     const decimals= await contract.methods.decimals().call()
//     let amount=  totalSupply / 10 ** decimals;
//     amount =amount.toLocaleString(
//         "fullwide",
//         {
//           useGrouping: false,
//         }
//       );

try{
    var response=await fetch("http://localhost:5000/addPool",{
        method:"POST",
        body:JSON.stringify({name:name.toString(),fee:Number(fees),token0:token0.toString(),token1:token1.toString(),tickSpacing:Number(tickSpacing),pool:pool.toString()}),
        headers:{"Content-Type":"application/json"}
    })
    console.log(response.status)
    
}
catch(err){
    console.log("err",err)
}
}
catch(err){
  console.log(err)
}
   
 
    
})
.on("connected", function(subscriptionId){
    console.log("connected 1");
});

