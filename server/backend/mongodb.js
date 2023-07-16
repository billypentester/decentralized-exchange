const cors=require('cors')
const mongoose=require('mongoose');
const express=require('express')
const app=express();
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const chain = EvmChain.MUMBAI;
const Web3  = require("web3");
var url="wss://polygon-mumbai.g.alchemy.com/v2/MXTlA2FpRDF3lP5pMRFjWA8C-o-Khq8b";
const web3=new Web3(url);
var BSCurl="wss://solemn-icy-sunset.bsc-testnet.discover.quiknode.pro/146f42549cf179d7117ec11c84476907a4fa7edd/"
const web3Bsc= new Web3(BSCurl)

const TokenABI = require("../ABI/TokenABI.json")
const NFTManagerABI = require("../ABI/ManagerABI.json")
mongoose.connect('mongodb+srv://billypentester:webpass136@cluster0.zxxm5.mongodb.net/decentralized-exchange?retryWrites=true&w=majority').then(
    console.log('connected')
)

const TokenSchema=require('./TokenSchema')
const PoolSchema=require('./PoolSchema')
const BridgePositionSchemaMUM=require('./BridgePositionSchemaMUM')
const BridgePositionSchemaBSC=require('./BridgePositionSchemaBSC')
app.use(cors())
app.use(express.json())


Moralis.start({
      apiKey: "NW1F1QjMg2uGf1eVWF9x00alsqCvTL55eskeKUOaz26qiMlK31JwBQQC94bqx7tn",
});
app.get('/TokenTransactions/:address',async (req,res)=>{
  try{

  
    const address = req.params.address;
    const abi ={"anonymous":false,"inputs":[{"indexed":true,"internalType":"address",
"name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],
"name":"Transfer","type":"event"}
const topic =
"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const contract= new web3.eth.Contract(TokenABI,address);
const decimals= await contract.methods.decimals().call()
const response = await Moralis.EvmApi.events.getContractEvents({
    address,
    chain,
    topic,
    abi,
    });
    const data= response.toJSON()
    res.json({data,decimals:decimals.toString()})
  }
  catch(err){
    console.log(err)
  }
})

app.get('/PoolTransactions/:address',async (req,res)=>{
  try{

  
    const address = req.params.address;
    const abi = {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"int256","name":"amount0","type":"int256"},{"indexed":false,"internalType":"int256","name":"amount1","type":"int256"},{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Swap","type":"event"}

const topic =
"0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67";
const response = await Moralis.EvmApi.events.getContractEvents({
    address,
    chain,
    topic,
    abi,
    });
    const data= response.toJSON()
    res.json({data})
  }
  catch(err){
    console.log(err)
  }

})


app.get('/', (req, res) => {
  try{

  
    res.send('Hello World, from express');
  }
  catch(err){
    console.log(err)
  }
});

app.post('/addToken',async(req,res)=>{
  try{
    
    if(!req.body.name || !req.body.symbol || !req.body.owner || !req.body.token || !req.body.totalSupply || !req.body.decimals){
        return res.json({message:"Please Enter all fields"})
   }
    // if(!validator.isEmail(req.body.email)){
    //     return res.json({message:"Invalid Email"})

    // }
    
   
    const data=await TokenSchema.create(req.body)
    // console.log(data)
    res.json({data,code:201})
  }
  catch(err){
    console.log(err)
  }
})

app.post('/addPool',async(req,res)=>{
  try{
    
    if(!req.body.name || !req.body.fee || !req.body.token0 || !req.body.token1 || !req.body.tickSpacing || !req.body.pool ){
        return res.json({message:"Please Enter all fields"})
   }
    // if(!validator.isEmail(req.body.email)){
    //     return res.json({message:"Invalid Email"})

    // }
    
   
    const data=await PoolSchema.create(req.body)
    res.json({data,code:201})
  }
  catch(err){
    console.log(err)
  }
})


app.get('/Tokens',async (req,res)=>{
  try{
    const data=await TokenSchema.find()
    // console.log(data)
    res.json({data})
  }
  catch(err){
    console.log(err)
  }
   
})

app.get('/TokensPage/',async (req,res)=>{
  try{
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;


    const data=await TokenSchema.find().skip(skip).limit(limit)
    // console.log(data)
    res.json({data})
  }
  catch(err){
    console.log(err)
  }
   
})

app.get('/PoolsPage/',async (req,res)=>{
  try{
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;


    const data=await PoolSchema.find().skip(skip).limit(limit)
    // console.log(data)
    res.json({data})
  }
  catch(err){
    console.log(err)
  }
   
})

app.get('/Pools',async (req,res)=>{
  try{
    
    const data=await PoolSchema.find()
    // console.log(data)
    res.json({data})
  }
  catch(err){
    console.log(err)
  }
   
})
app.get('/SearchPools/:name',async (req,res)=>{
  try{
    const name = req.params.name;
    const regex = new RegExp(name, 'i');
    const data=await PoolSchema.find({$or: [
        { name: { $regex: regex } },
        { token0: { $regex: regex } },
        { token1: { $regex: regex } },
      ]})
   
    // console.log(data)
    res.json({data})
  }
  catch(err){
    console.log(err)
  }
   
})

app.get('/SearchTokens/:name',async (req,res)=>{
  try{
    const name = req.params.name;
    const regex = new RegExp(name, 'i');
    const data=await TokenSchema.find({$or: [
        { name: { $regex: regex } },
        { symbol: { $regex: regex } },
        { token: { $regex: regex } },
      ]})
   
    // console.log(data)
    res.json({data})
  }
  catch(err){
    console.log(err)
  }
   
})


app.get('/SearchTokens/verify/:verify',async (req,res)=>{
  try{
    const verify = req.params.verify;
    
    const data=await TokenSchema.find({verified:verify})
   
    // console.log(data)
    res.json({data})
  }
  catch(err){
    console.log(err)
  }
   
})
app.get('/SearchPools/verify/:verify',async (req,res)=>{
  try{
    const verify = req.params.verify;
    const data=await PoolSchema.find({verified:verify})
   
    // console.log(data)
    res.json({data})
  }
  catch(err){
    console.log(err)
  }
   
})

app.get('/GetToken/:address',async (req,res)=>{
  try{
    const address = req.params.address;
    const data=await TokenSchema.findOne({token:address})
   
    // console.log(data)
    res.json({data})
  }
  catch(err){
    console.log(err)
  }
   
})

app.get('/GetPool/:address',async (req,res)=>{
  try{

    const address = req.params.address;
    
    const data=await PoolSchema.findOne({pool:address})
    console.log(data)
    // console.log(data.token0)
    const contract= new web3.eth.Contract(TokenABI,data.token0);
const amount0= await contract.methods.balanceOf(address).call()
const contract1= new web3.eth.Contract(TokenABI,data.token1);
const amount1= await contract1.methods.balanceOf(address).call()
const decimal0= await contract.methods.decimals().call()

const decimal1= await contract1.methods.decimals().call()

amount0.toLocaleString(
    "fullwide",
    {
      useGrouping: false,
    }
  );
  amount1.toLocaleString(
    "fullwide",
    {
      useGrouping: false,
    }
  );
    // console.log(data)
    res.json({data,amount0:amount0,amount1:amount1,decimal0:decimal0,decimal1:decimal1})
  }
  catch(err){
    console.log(err)
  }
   
})

app.get('/GetPositions/:address',async (req,res)=>{
  try{
    const address = req.params.address;
    const contract= new web3.eth.Contract(NFTManagerABI,"0xD6E23055a8d868156F75e8Ac5827296e83434683");
    const balance = await contract.methods.balanceOf(address).call();
    let data=[]
    if(balance>0){
        let arr=[]
        let pos=[]
      for(let i=0;i<balance;i++)
       
      {
        arr[i] = await contract.methods.tokenOfOwnerByIndex(address,i).call();
        // console.log("aarr",arr[i])
        pos[i]=await contract.methods.positions(Number(arr[i])).call();
        // console.log("pos[i]",pos[i])
        const contract0= new web3.eth.Contract(TokenABI,pos[i].token0);
        const contract1= new web3.eth.Contract(TokenABI,pos[i].token1);
        let tick0 = pos[i].tickLower;
        let tick1 = pos[i].tickUpper;
        console.log(tick0,tick1,"values")
        let minSqrtPrice = (
          1.0001 ** (tick0 / 2) *
          2 ** 96
        ).toLocaleString("fullwide", {
          useGrouping: false,
        });
        let maxSqrtPrice = (
          1.0001 ** (tick1 / 2) *
          2 ** 96
        ).toLocaleString("fullwide", {
          useGrouping: false,
        });
        
        let Minprice = Number((Number(minSqrtPrice) / 2 ** 96) ** 2).toLocaleString("fullwide", {
          useGrouping: false,
        });;
      let Maxprice = Number((Number(maxSqrtPrice) / 2 ** 96) ** 2).toLocaleString("fullwide", {
        useGrouping: false,
      });
        const symbol0= await contract0.methods.symbol().call()
        const symbol1= await contract1.methods.symbol().call()
        data[i]={...pos[i],symbol0:symbol0,symbol1:symbol1,priceLower:Minprice,priceUpper:Maxprice,tokenId:arr[i]}
        
        
        // setPositions(prevData => [...prevData, {...pos[i],name0:name0,name1:name1}])
    
      }
      
    
      }

    
    // console.log(data)
    res.json({data})
  }
  catch(err){
    console.log(err)
  }
   
})


app.get('/GetSinglePositions/:id',async (req,res)=>{
  console.log("got it")
  try{
    const id = req.params.id;
    const contract= new web3.eth.Contract(NFTManagerABI,"0xD6E23055a8d868156F75e8Ac5827296e83434683");
    let data=await contract.methods.positions(Number(id)).call(); 
    const contract0= new web3.eth.Contract(TokenABI,data.token0);
    const contract1= new web3.eth.Contract(TokenABI,data.token1);
    const symbol0= await contract0.methods.symbol().call()
    const symbol1= await contract1.methods.symbol().call()
    const decimal0= await contract0.methods.decimals().call()
    const decimal1= await contract1.methods.decimals().call()
    data={...data, name0:symbol0,name1:symbol1,decimal0:decimal0,decimal1:decimal1} 
    res.json({data})
}
catch(err){
  console.log(err)
}
});

app.post('/BscPosition',async(req,res)=>{
  try{
    
  const exist0=await BridgePositionSchemaBSC.findOne({user:req.body.user,token:req.body.token})
  let data
  const contract= new web3Bsc.eth.Contract(TokenABI,req.body.token);
  const name=await contract.methods.name().call()
  const symbol=await contract.methods.symbol().call()
  if(exist0){
    let amount = Number(Number(exist0.amount) + Number(req.body.amount))
    
    let update={user:req.body.user,token:req.body.token,amount:amount,name:name,symbol:symbol,fee:req.body.fee}
     data =await BridgePositionSchemaBSC.findByIdAndUpdate(exist0._id,update,{
      new:true
     })
  }else{
    let update={user:req.body.user,token:req.body.token,amount:req.body.amount,name:name,symbol:symbol,fee:req.body.fee}
     data=await BridgePositionSchemaBSC.create(update)

  }
  res.json({data,code:201})
}
catch(err){
  console.log(err)
}
});

app.get('/GetMumPositions/:address',async (req,res)=>{
  try{
  const address = req.params.address;
  const regexPattern = new RegExp(address, 'i');
  const data=await BridgePositionSchemaMUM.find({user:regexPattern})
 
  // console.log(data)
  res.json({data})
}
catch(err){
  console.log(err)
}
 
})
app.get('/GetBscPositions/:address',async (req,res)=>{
  try{
  const address = req.params.address;
  const regexPattern = new RegExp(address, 'i');
  const data=await BridgePositionSchemaBSC.find({user:regexPattern })
 
  // console.log(data)
  res.json({data})
}
catch(err){
  console.log(err)
}
 
})


app.post('/MumPosition',async(req,res)=>{
  try{

 
  const exist0=await BridgePositionSchemaMUM.findOne({user:req.body.user,token:req.body.token})
  let data
  const contract= new web3.eth.Contract(TokenABI,req.body.token);
  const name=await contract.methods.name().call()
  const symbol=await contract.methods.symbol().call()
  if(exist0){
    let amount = Number(exist0.amount + req.body.amount)
    let update={user:req.body.user,token:req.body.token,amount:amount,fee:req.body.fee,name:name,symbol:symbol}
     data =await BridgePositionSchemaMUM.findByIdAndUpdate(exist0._id,update,{
      new:true
     })
  }else{
    let update={user:req.body.user,token:req.body.token,amount:req.body.amount,name:name,symbol:symbol,fee:req.body.fee}
     data=await BridgePositionSchemaMUM.create(update)

  }
  res.json({data,code:201})
}catch(err){
  console.log("error in mumPosition:",err)

}
  
    
  
  
 
  
 
});

app.post('/BscPosition',async(req,res)=>{
  try{

  
    
  const exist0=await BridgePositionSchemaBSC.findOne({user:req.body.user,token:req.body.token})
  let data
  const contract= new web3Bsc.eth.Contract(TokenABI,req.body.token);
  const name=await contract.methods.name().call()
  const symbol=await contract.methods.symbol().call()
  if(exist0){
    let amount = Number(exist0.amount) + Number(req.body.amount)
    console
    let update={user:req.body.user,token:req.body.token,amount:amount,name:name,symbol:symbol,fee:fee}
     data =await BridgePositionSchemaBSC.findByIdAndUpdate(exist0._id,update,{
      new:true
     })
  }else{
    let update={user:req.body.user,token:req.body.token,amount:req.body.amount,name:name,symbol:symbol,fee:fee}
     data=await BridgePositionSchemaBSC.create(update)

  }

  res.json({data,code:201})
}catch(err){
  console.log("error in mumPosition:",err)

}
});



app.listen(5000,()=>{console.log("listening")})