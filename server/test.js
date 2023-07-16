const tick =31;
const sq=Math.sqrt(1.0001)**(tick/2);
const v=2 ** 96;
console.log(Number(v))
const nq=Number(sq)* 2**96;
console.log(Number(nq))


const priceLower = Math.sqrt(1.0001 ** 7000);
const priceUpper = Math.sqrt(1.0001 ** 19400)
amount0 = Number("10000000000000000000") * (Math.sqrt(1 - (1 - Math.sqrt(priceLower / priceUpper)) ** 2))
console.log(amount0)
