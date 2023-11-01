import React, { useState,useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import codeswearContext from '@/context/codeswearContext'
import Error from 'next/error'


const Product = ({cart,addToCart,toggleSideCart,item,variants,instantBuy,notify,error}) => {

if(error===404){
  return <Error statusCode={404} />
}
const router = useRouter()
const { slug } = router.query
const context = useContext(codeswearContext)  
const [product,setProduct] = useState("")
const [color,setColor] = useState("")
const [size,setSize] = useState("")
const {pincode,setPincode,servicable,setServicable} = context

const changePin = (e) => {
  if (e.target.name === 'pincode') {
    setPincode(e.target.value)
    setServicable("")
  }
}

const checkServicibility = async (e) => {

  e.preventDefault()
  let response = await fetch('http://localhost:3000/api/pincode')
  let data = await response.json()
  let pincodes = data.pincodes

  if (Object.keys(pincodes).includes(pincode)) {
    setServicable('Pincode is Servicable')
     notify('Pincode is Servicable','success');
    }
    else {
      setServicable('Pincode is Not Servicable')
      notify('Pincode is Not Servicable','error');
      }


  }
 const refreshVariant=(newsize,newcolor)=>{
     let url = `http://localhost:3000/products/${variants[newcolor][newsize]['slug']}`;
     router.push(url);
     // router.refresh();
 }
useEffect(()=>{
  setProduct(item)
setColor(product.color);
setSize(product.size);
},[refreshVariant])
  return (
    <div>
<section className="text-gray-600 body-font overflow-hidden">

        <div className="container px-5 py-24 mx-auto">

          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full h-full object-cover object-center rounded"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 relative">
              <h2 className="text-sm title-font text-gray-500 tracking-widest capitalize">
                {product.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 capitalize">
                {product.title} <br /> ({product.size}/{product.color})
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">
                {product.desc}
              </p>
              
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">

                  {Object.keys(variants).includes('white') && <button className={`border-2 rounded-full w-6 h-6 focus:outline-none ${color==='white'?'border-black':'border-gray-300'}`} onClick={()=>{refreshVariant(size,'white')}} /> }
                  {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button className={`border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color==='red'?'border-black':'border-gray-300'}`} onClick={()=>{refreshVariant(size,'red')}} />}
                  {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button className={`border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color==='blue'?'border-black':'border-gray-300'}`} onClick={()=>{refreshVariant(size,'blue')}} />}
                  {Object.keys(variants).includes('yellow') && Object.keys(variants['yellow']).includes(size) && <button className={`border-2 ml-1 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none ${color==='yellow'?'border-black':'border-gray-300'}`} onClick={()=>{refreshVariant(size,'yellow')}} />}
                  {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button className={`border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color==='green'?'border-black':'border-gray-300'}`} onClick={()=>{refreshVariant(size,'green')}} />}
                  {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color==='black'?'border-red-600':'border-gray-300'}`} onClick={()=>{refreshVariant(size,'black')}} />}
                </div>
                {product.category!=='mugs' && product.category!=='stickers' && <div className="flex ml-6 items-center">
                  <span className="mr-3 capitalize">Size : </span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10" value={size}
                     onChange={(e)=>{refreshVariant(e.target.value,color)}}>
                      {color && Object.keys(variants[color]).includes('XS') && <option value={'XS'}>XS</option>}
                      {color && Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                      {color && Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                      {color && Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                      {color && Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                  </div>}
             </div>
             {product.availableQty<1?<div className='flex items-center justify-center h-72'><p className='font-black text-red-600 text-xl sm:text-4xl'>Out of Stock</p></div>:<div>
              <div className="flex flex-col space-y-1 sm:space-y-0 sm:flex-row">
                <span className="title-font font-medium text-2xl text-gray-900">
                  &#x20B9;{product.price}
                </span>
                <button type="button" className="w-fit ml-0 sm:ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded self-end sm:self-start" onClick={()=>{instantBuy(product._id,product.price,product.title,product.size,product.category,product.image,product.color)}}>
                  Checkout
                </button>
                {!cart[product._id] ?<button type="button" className="w-fit ml-0 sm:ml-1 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded self-end sm:self-start" onClick={()=>{ addToCart(product._id,product.price,product.title,product.size,product.category,product.image,product.color)}}>
                  Add to Cart
                </button>
                :<button type="button" className="w-fit ml-0 sm:ml-1 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded self-end sm:self-start" onClick={toggleSideCart}>
                  Go to Cart
                </button>}

              </div>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 flex items-center justify-center absolute -top-3 sm:top-0 right-0 text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
              <div className='relative mt-3 sm:mt-12 w-fit sm:w-2/3 pin'>
                <form action="" className='flex flex-col sm:flex-row relative w-fit sm:w-full' onSubmit={checkServicibility}>
                  <input type="text" name="pincode" id="pincode" placeholder='Enter pincode to check' className='outline-none border-b border-pink-600 py-2 px-1 w-fit sm:w-full' value={pincode} onChange={changePin} minLength={6} maxLength={6} required />
                  <button type="submit" className={`relative w-fit bg-pink-600 sm:bg-white text-white rounded sm:rounded-none p-2 sm:p-0 mt-1 sm:mt-0 sm:absolute sm:right-[10px] sm:top-2 self-end sm:self-auto ${pincode.length === 6 ? 'sm:text-pink-600' : 'sm:text-black'}`}>Check</button>
                </form>
                <p className='mt-2 opacity-70 font-extralight text-md'>{servicable}</p>
              </div>
              </div>}
            </div>
          </div>
        </div>
      </section>



    </div>
  )
}

export async function getServerSideProps(context){
  try{

  let error=null;
  const slug = context.query.slug

  const response = await fetch(`http://localhost:3000/api/getproduct?slug=${slug}`)
  const product = await response.json()

  if(response.status===404){
     console.log('product is undefined')
     return {
      props:{error:404}
     }
  }
  
    return {
    props: {item:product.product,variants:product.variants,error},
  }
  }
  catch(error){
    console.log(error.message)
    return {
      props:{item:null,error:200},
    }
  }
};



export default Product
