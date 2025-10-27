const convertpriceTocurrency =(price)=>{
  return new Intl.NumberFormat('en-IN',{
     style:'currency',
     currency:'USD',
  }).format(price)
}

export default convertpriceTocurrency;