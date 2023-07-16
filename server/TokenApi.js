const Web3  = require("web3");
const LaunchPadABI = require("./ABI/LaunchpadABI.json")
const TokenABI = require("./ABI/TokenABI.json")

const LaunchpadAddress="0xCDef10b66f7B1513DC0583089FD34A95F431c5D3"
var url="wss://polygon-mumbai.g.alchemy.com/v2/MXTlA2FpRDF3lP5pMRFjWA8C-o-Khq8b";
const privateKey="ed5e2f13218066fb70bd22f2cb2467924b42fb4c173f4518b54aa683791d17cd"
const web3=new Web3(url);
// const web3Bsc= new Web3("https://data-seed-prebsc-1-s1.binance.org:8545")
// console.log(web3Bsc)
const account= web3.eth.accounts.privateKeyToAccount(privateKey);
// console.log(account.address)
const contract= new web3.eth.Contract(LaunchPadABI,LaunchpadAddress);
async function Bridge(){
   
const tx =await contract.methods.fee().call().then(console.log)

}
// contract.events.TokenCreated({},(error,data)=>{
//     console.log(data)
// })


contract.events.TokenCreated({}, 'latest')
.on("data", async(event)=>{
    try{
    console.log("Called Successfully")
    const { owner, token } = event.returnValues;
    const contract= new web3.eth.Contract(TokenABI,token);
    const name= await contract.methods.name().call()
    const symbol= await contract.methods.symbol().call()
    const totalSupply= await contract.methods.totalSupply().call()
    const decimals= await contract.methods.decimals().call()
    let amount=  totalSupply / 10 ** decimals;
    amount =amount.toLocaleString(
        "fullwide",
        {
          useGrouping: false,
        }
      );

try{
    var response=await fetch("http://localhost:5000/addToken",{
        method:"POST",
        body:JSON.stringify({name:name.toString(),symbol:symbol.toString(),owner:owner.toString(),token:token.toString(),decimals:Number(decimals),totalSupply:amount}),
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

