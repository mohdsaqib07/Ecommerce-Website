import React, { useState} from 'react'
import Link from 'next/link'
import Head from 'next/head'
const Tshirts = ({items,cart,addToCart,toggleSideCart,instantBuy}) => {
  const [products,setProducts]= useState(items)


  return (
    <>
    <Head>
    <title>Tshirts - Codeswear.com </title>
    </Head>
    <div className='min-h-screen'>
      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
      {/* tshirts to mounted here */}
      {products.length === 0 && <p>We are Currently out of stock revisit the website later .</p>}
      {products.map((product,index)=>{ return (
      <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md m-3" key={`${product._id}`}>
        <Link href={`/products/${product.slug}`} className="block relative rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center h-full block m-auto"
            src={product.image}
          />
   </Link>
        {product.availableQty<1?<div className='flex items-center justify-center text-center mt-4 h-40'><p className='text-red-600 font-black'>Out of Stock</p></div>:<div className="mt-4 text-center sm:text-left">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            T-Shirts
          </h3>
          <Link href={`/products/${product.slug}`} className="block relative rounded overflow-hidden">
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {product.title}
          </h2>
          </Link>
          <p className="mt-1">&#x20B9;{product.price}</p>
         <span>Size : {product.size} </span>
          {/* <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10" id='itemSize'>

          {product.size.map((s,i)=>{
            return <option key={`Size${i}`} value={s}>{s}</option>

          })}
          </select> */}

         <div className='mt-2'>

            {product.color==='white' && <button className={`border-2 borde-gray-300 bg-white-300 rounded-full w-6 h-6 focus:outline-none`} />}
            {product.color==='blue' && <button className={`border-2 borde-gray-300 bg-blue-600 rounded-full w-6 h-6 focus:outline-none`} />}
            {product.color==='yellow' && <button className={`border-2 borde-gray-300 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none`} />}
            {product.color==='red' && <button className={`border-2 borde-gray-300 bg-red-600 rounded-full w-6 h-6 focus:outline-none`} />}
            {product.color==='green' && <button className={`border-2 borde-gray-300 bg-green-500 rounded-full w-6 h-6 focus:outline-none`} />}
            {product.color==='black' && <button className={`border-2 borde-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none`} />}

         </div>

         <div className='flex flex-row-reverse gap-x-1'>
          {!cart[product._id]?<button type='button' onClick={()=>{addToCart(product._id,product.price,product.title,product.size,product.category,product.image,product.color,product.slug)}} className="w-fit bg-indigo-400 text-white p-2 float-right rounded font-semibold cursor-pointer">Add to Cart</button>:<button type='button' className='w-fit bg-indigo-400 text-white p-2 float-right rounded font-semibold cursor-pointer' onClick={toggleSideCart}>Go to Cart</button>}
          <button type="button" className="w-fit bg-indigo-400 text-white p-2 float-right rounded font-semibold cursor-pointer" onClick={()=>{instantBuy(product._id,product.price,product.title,product.size,product.category,product.image,product.color,product.slug)}} >Buy Now</button>
          </div>
        </div>}

      </div>)
    })}

    </div>
  </div>
</section>

    </div>
    </>
  )
}

export async function getServerSideProps(context){
 try{
     const response = await fetch('http://localhost:3000/api/getproducts?category=tshirts')
     const data = await response.json();
     let items = data.products;
     items = JSON.parse(JSON.stringify(items))
     return {
      props:{items}
     }

 }catch(err){
      console.log('inside catch')
      console.log(err.message)
      return {
        props:{items:[]},
      }
 }
}

export default Tshirts
// :
