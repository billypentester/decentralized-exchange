const Web3  = require("web3");
const abi = require("./ABI/TokenABI.json")
const address="0xB69809bdef1D52Cadfed571bE162bb6d67D5c783"
var url="wss://polygon-mumbai.g.alchemy.com/v2/MXTlA2FpRDF3lP5pMRFjWA8C-o-Khq8b";
const privateKey="ed5e2f13218066fb70bd22f2cb2467924b42fb4c173f4518b54aa683791d17cd"
const web3=new Web3(url);
const web3Bsc= new Web3("wss://solemn-icy-sunset.bsc-testnet.discover.quiknode.pro/146f42549cf179d7117ec11c84476907a4fa7edd/")
// console.log(web3Bsc)
const account= web3.eth.accounts.privateKeyToAccount(privateKey);
// console.log(account.address)
const contract= new web3Bsc.eth.Contract(abi,address);
console.log(contract._address)
async function Bridge(){
   
const tx =await contract.methods.name().call().then(console.log)

}


Bridge()

// contract.events.TokenCreated({},(error,data)=>{
//     console.log(data)
// })

const message = web3.utils.soliditySha3(
    {t: 'address', v: "0x8d2a35B3C01E911c85f6548e1A8C47Fe90abCAe5"},
    {t: 'address', v: "0x8d2a35B3C01E911c85f6548e1A8C47Fe90abCAe5"},
    {t: 'uint256', v: 0},
    {t: 'uint256', v: "10000000000000000000"},
  ).toString('hex');
  console.log("message",message)
  const { signature } = web3.eth.accounts.sign(
    message, 
    privateKey
  ); 
  console.log("signature",signature)
//   const valuessss=web3.utils.toWei('1', 18);
//   console.log(valuessss)

// // Bridge()

// // console.log(tx);
// const checkit="000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000003e8000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000056d756a656500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000056d756a6565000000000000000000000000000000000000000000000000000000"
// console.log(checkit)
// const checkit1="0x000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000003e8000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000056d756a656500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000056d756a6565000000000000000000000000000000000000000000000000000000"
// console.log(checkit1)
// const encodedABI=web3.eth.abi.encodeParameters(['string','string','uint256','uint256'], ['mujee', 'mujee','1000','18']);
// console.log(encodedABI)
// if(checkit==encodedABI)
// {
//     console.log("same")
// }