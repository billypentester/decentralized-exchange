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
const TokenABI = require("../ABI/TokenABI.json")
const NFTManagerABI = require("../ABI/ManagerABI.json")
mongoose.connect('mongodb://0.0.0.0:27017/HalalSwap').then(
    console.log('connected')
)

const TokenSchema=require('./TokenSchema')
const PoolSchema=require('./PoolSchema')

app.use(cors())
app.use(express.json())


Moralis.start({
      apiKey: "NW1F1QjMg2uGf1eVWF9x00alsqCvTL55eskeKUOaz26qiMlK31JwBQQC94bqx7tn",
});
app.get('/TokenTransactions/:address',async (req,res)=>{
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

})

app.get('/PoolTransactions/:address',async (req,res)=>{
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

})


app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.post('/addToken',async(req,res)=>{
    
    if(!req.body.name || !req.body.symbol || !req.body.owner || !req.body.token || !req.body.totalSupply || !req.body.decimals){
        return res.json({message:"Please Enter all fields"})
   }
    // if(!validator.isEmail(req.body.email)){
    //     return res.json({message:"Invalid Email"})

    // }
    
   
    const data=await TokenSchema.create(req.body)
    // console.log(data)
    res.json({data,code:201})
})

app.post('/addPool',async(req,res)=>{
    
    if(!req.body.name || !req.body.fee || !req.body.token0 || !req.body.token1 || !req.body.tickSpacing || !req.body.pool ){
        return res.json({message:"Please Enter all fields"})
   }
    // if(!validator.isEmail(req.body.email)){
    //     return res.json({message:"Invalid Email"})

    // }
    
   
    const data=await PoolSchema.create(req.body)
    res.json({data,code:201})
})


app.get('/Tokens',async (req,res)=>{
    const data=await TokenSchema.find()
    // console.log(data)
    res.json({data})
   
})

app.get('/TokensPage/',async (req,res)=>{
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;


    const data=await TokenSchema.find().skip(skip).limit(limit)
    // console.log(data)
    res.json({data})
   
})

app.get('/PoolsPage/',async (req,res)=>{
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;


    const data=await PoolSchema.find().skip(skip).limit(limit)
    // console.log(data)
    res.json({data})
   
})

app.get('/Pools',async (req,res)=>{
    const data=await PoolSchema.find()
    // console.log(data)
    res.json({data})
   
})
app.get('/SearchPools/:name',async (req,res)=>{
    const name = req.params.name;
    const regex = new RegExp(name, 'i');
    const data=await PoolSchema.find({$or: [
        { name: { $regex: regex } },
        { token0: { $regex: regex } },
        { token1: { $regex: regex } },
      ]})
   
    // console.log(data)
    res.json({data})
   
})

app.get('/SearchTokens/:name',async (req,res)=>{
    const name = req.params.name;
    const regex = new RegExp(name, 'i');
    const data=await TokenSchema.find({$or: [
        { name: { $regex: regex } },
        { symbol: { $regex: regex } },
        { token: { $regex: regex } },
      ]})
   
    // console.log(data)
    res.json({data})
   
})


app.get('/SearchTokens/verify/:verify',async (req,res)=>{
    const verify = req.params.verify;
    
    const data=await TokenSchema.find({verified:verify})
   
    // console.log(data)
    res.json({data})
   
})
app.get('/SearchPools/verify/:verify',async (req,res)=>{
    const verify = req.params.verify;
    const data=await PoolSchema.find({verified:verify})
   
    // console.log(data)
    res.json({data})
   
})

app.get('/GetToken/:address',async (req,res)=>{
    const address = req.params.address;
    const data=await TokenSchema.findOne({token:address})
   
    // console.log(data)
    res.json({data})
   
})

app.get('/GetPool/:address',async (req,res)=>{
    const address = req.params.address;
    const data=await PoolSchema.findOne({pool:address})
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
   
})

app.get('/GetPositions/:address',async (req,res)=>{
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
        console.log("aarr",arr[i])
        pos[i]=await contract.methods.positions(Number(i+1)).call();
        console.log("pos[i]",pos[i])
        const contract0= new web3.eth.Contract(TokenABI,pos[i].token0);
        const contract1= new web3.eth.Contract(TokenABI,pos[i].token1);
        let tick0 = pos[i].tickLower;
        let tick1 = pos[i].tickUpper;
        let mysqrtpricex961 = 1.0001 ** (tick0 / 2) * 2 ** 96;
        let mysqrtpricex962 = 1.0001 ** (tick1 / 2) * 2 ** 96;
        let price0 = Number((Number(mysqrtpricex961) / 2 ** 96) ** 2).toLocaleString(
            "fullwide",
            {
              useGrouping: false,
            }
          );
        let price1 = Number((Number(mysqrtpricex962) / 2 ** 96) ** 2).toLocaleString(
            "fullwide",
            {
              useGrouping: false,
            }
          );
        const name0= await contract0.methods.name().call()
        const name1= await contract1.methods.name().call()
        data[i]={...pos[i],name0:name0,name1:name1,priceLower:price0,priceUpper:price1}
        
        
        // setPositions(prevData => [...prevData, {...pos[i],name0:name0,name1:name1}])
    
      }
      
    
      }

    
    // console.log(data)
    res.json({data})
   
})




app.listen(5000,()=>{console.log("listening")})