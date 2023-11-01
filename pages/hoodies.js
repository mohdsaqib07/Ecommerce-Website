import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
const Hoodies = ({items,cart,addToCart,toggleSideCart}) => {
  const [products,setProducts]= useState(items)

  return (
    <>
     <Head>
    <title>Hoodies - Codeswear.com </title>
    </Head>
    <div clasName='min-h-screen'>
      <section className="text-gray-600 body-font h-screen">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
      {/* tshirts to mounted here */}
      {products.length === 0 && <p>We are Currently out of stock revisit the website later .</p>}
      {products.map((product,index)=>{ return (
      <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md m-3" key={product.slug}>
        <Link href={`/products/${product.slug}`} className="block relative rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center h-full block m-auto"
            src={product.image}
          />
        </Link>
        <div className="mt-4 text-center sm:text-left">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            Hoodies
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {product.title}
          </h2>
          <p className="mt-1">&#x20B9;{product.price}</p>
          <p className="mt-1">Size : {product.size}</p>
          <div className="flex flex-row-reverse gap-x-1">
          {!cart[product._id]?<button type='button' onClick={()=>{addToCart(product._id,product.price,product.title,product.size,product.category,product.image,product.color,product.slug)}} className="w-fit bg-indigo-400 text-white p-2 float-right rounded font-semibold cursor-pointer">Add to Cart</button>:<button type='button' className='w-fit bg-indigo-400 text-white p-2 float-right rounded font-semibold cursor-pointer' onClick={toggleSideCart}>Go to Cart</button>}
            <button type="button" className="w-fit bg-indigo-400 text-white p-2 float-right rounded font-semibold cursor-pointer" onClick={()=>{instantBuy(product._id,product.price,product.title,product.size,product.category,product.image,product.color,product.slug)}} >Buy Now</button>
          </div>
        </div>
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
      const response = await fetch('http://localhost:3000/api/getproducts?category=hoodies')
      const data = await response.json();
      const items = data.products;
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

export default Hoodies
