const Web3  = require("web3");
const abi = require("./ABI/abi.json")
const TokenABI = require("./ABI/TokenABI.json")
//updated bridge
const BridgeMumAddress="0x80d4C799FBBD5B1Dc042ec542d15Db7e7A02639c"
const BridgeBSCAddress="0x9CE244751064cFb4fE4F345D0A96ef568c0a659b"

//old brdige
// const BridgeMumAddress="0x0dE979ABDf4833Be69514aCF19bd0253A71AC189"
// const BridgeBSCAddress="0xF6a19eE0F3084192EC28c3d505fd902B79AE72bb"

var Mumurl="wss://polygon-mumbai.g.alchemy.com/v2/MXTlA2FpRDF3lP5pMRFjWA8C-o-Khq8b";
var BSCurl="wss://solemn-icy-sunset.bsc-testnet.discover.quiknode.pro/146f42549cf179d7117ec11c84476907a4fa7edd/"
const privateKey="ed5e2f13218066fb70bd22f2cb2467924b42fb4c173f4518b54aa683791d17cd"
const web3=new Web3(Mumurl);
const web3Bsc= new Web3(BSCurl)
// console.log(web3Bsc)
const account0= web3.eth.accounts.wallet.add(privateKey);
const account1= web3Bsc.eth.accounts.wallet.add(privateKey);
 console.log(account0.address)
const contractMum= new web3.eth.Contract(abi,BridgeMumAddress);
const contractBsc= new web3Bsc.eth.Contract(abi,BridgeBSCAddress);

// console.log(contractBsc)
// console.log(account0)
async function Bridge(){
   
    const tx1 =await contractMum.methods.recieve("0x8d2a35B3C01E911c85f6548e1A8C47Fe90abCAe5","0x7Fa5312AD6C05d99fF6F29b830560d3e7880E1a4","0x8b8951C71467B931c37af1a3d67f2d1752eDF69E", 200, 8, "0x9191cce0efd3da8e74de49a980bfd4c346ea9f0ef34de8b5131e44d028720bc5427d8fcdecd9db935c53fbcae08a4a4a25d6dfa5e989c5f7d5eba6d4fc2666ea1c").encodeABI()
  
    const txData = {
      from: account0.address,
      to: BridgeMumAddress,
      data:tx1,
      gas:100000,
      
    };
    const receipt = await web3Bsc.eth.sendTransaction(txData);
    console.log("successfully bridged")
  console.log("successfully bridged")


}

contractMum.events.Transfer({}, 'latest')
.on("data", async(event)=>{
  try{
    console.log("Called Successfully")
    const { from, to,token, amount, nonce, signature } = event.returnValues;
    console.log(from,"ok", to,"ok",token,"ok", amount,"ok", nonce, "ok",signature )
    const txToken= await contractMum.methods.TokenToToken(token).call();
    const tx1 =await contractBsc.methods.recieve(from,to,txToken, amount, nonce, signature).encodeABI()
    
    const txData = {
      from: account1.address,
      to: BridgeBSCAddress,
      data:tx1,
      gas:100000,
      
    };
    const receipt = await web3Bsc.eth.sendTransaction(txData);
    console.log("successfully bridged")
  }
  catch(err){
    console.log(err)
  }
    
})
.on("connected", function(subscriptionId){
    console.log("connected 1");
    
});



contractBsc.events.Transfer({}, 'latest')
.on("data", async(event)=>{
  try{
  console.log("Called Successfully")
  const { from, to,token, amount, nonce, signature } = event.returnValues;
  console.log(from,"ok", to,"ok",token,"ok", amount,"ok", nonce, "ok",signature )
  const txToken= await contractBsc.methods.TokenToToken(token).call();
  console.log(txToken)
  const tx1 =await contractMum.methods.recieve(from,to,txToken, amount, nonce, signature).encodeABI()
  
    const txData = {
      from: account0.address,
      to: BridgeMumAddress,
      data:tx1,
      gas:100000,
      gasPrice:200000000000,
      
    };
    const receipt = await web3.eth.sendTransaction(txData);
    console.log("successfully bridged")
  console.log("successfully bridged")
}
catch(err){
  console.log(err)
}
  
}).on("connected", function(subscriptionId){
  console.log("connected 2");
});


contractBsc.events.LiquidityAdded({}, 'latest')
.on("data", async(event)=>{
  try{
  console.log("Called Successfully")
  const { user, token, amount} = event.returnValues;
  console.log(event.returnValues);
  console.log(user, token, amount)
  const contract=new web3Bsc.eth.Contract(TokenABI,token)
  const decimals=await contract.methods.decimals().call()
  let amount1= Number(Number( amount) / 10 ** decimals);
  const fee=await contractBsc.methods.FeeForToken(token).call()
  try{
    var response=await fetch("http://localhost:5000/BscPosition",{
        method:"POST",
        body:JSON.stringify({user:user.toString(),token:token.toString(),amount:amount1,fee:fee}),
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
  
  
}).on("connected", function(subscriptionId){
  console.log("connected 3");
});



contractMum.events.LiquidityAdded({}, 'latest')
.on("data", async(event)=>{
  try{
    console.log("Called Successfully")
    const { user, token, amount } = event.returnValues;
    console.log(event.returnValues);
  console.log(user, token, amount)
  const contract=new web3.eth.Contract(TokenABI,token)
  const decimals=await contract.methods.decimals().call()
  let amount1= Number(Number( amount) / 10 ** decimals);
  const fee=await contractMum.methods.FeeForToken(token).call()
    try{
      var response=await fetch("http://localhost:5000/MumPosition",{
          method:"POST",
          body:JSON.stringify({user:user.toString(),token:token.toString(),amount:amount1,fee:fee}),
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
    console.log("connected 4");
});


console.log("wellplayed")

// Bridge()


