export const pricewithdiscount = (price , discount = 1)=>{

  const actualamount = Math.ceil((Number(price) * Number(discount)) / 100);
  console.log(actualamount,'s')
  const lastamount = Number(price) - actualamount;
  return lastamount
}

