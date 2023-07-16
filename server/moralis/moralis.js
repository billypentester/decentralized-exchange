const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
// const abi=require("../ABI/Pool.json")

const runApp = async () => {
  await Moralis.start({
    apiKey: "NW1F1QjMg2uGf1eVWF9x00alsqCvTL55eskeKUOaz26qiMlK31JwBQQC94bqx7tn",
    // ...and any other configuration
  });
   const address = "0x0C9727E7311df3E57ea167097A531dBC5Ec1931d";
  // const address = "0x464f5831DbB146DaCe9F28fb106b893cfcE37034";
  const KYZaddress="0x464f5831DbB146DaCe9F28fb106b893cfcE37034"
  const chain = EvmChain.MUMBAI;
//   const abi = {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "sender",
//         type: "address",
//       },
//       { indexed: true, internalType: "address", name: "recepient", type: "address" },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount0",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount1",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint160",
//         name: "sqrtPriceX96",
//         type: "uint160",
//       },
//       {
//         indexed: false,
//         internalType: "uint128",
//         name: "liquidity",
//         type: "uint128",
//       },
//       {
//         indexed: false,
//         internalType: "int24",
//         name: "tick",
//         type: "int24",
//       },
//     ],
//     name: "Swap",
//     type: "event",
//   };
  // const response = await Moralis.EvmApi.transaction.getWalletTransactions({
  //   address,
  //   chain,
  // });

// const topic =
//     "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
// const response = await Moralis.EvmApi.events.getContractEvents({
//     address,
//     chain,
//     topic,
//     abi
//   });


const topic =
"0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67";
// const topic =
// "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

const abi = {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"int256","name":"amount0","type":"int256"},{"indexed":false,"internalType":"int256","name":"amount1","type":"int256"},{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Swap","type":"event"}
// const abi ={"anonymous":false,"inputs":[{"indexed":true,"internalType":"address",
// "name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],
// "name":"Transfer","type":"event"}
const response = await Moralis.EvmApi.events.getContractEvents({
address,
chain,
topic,
abi,
});

const data=await response.toJSON()
  console.log(data.result);
};

runApp();