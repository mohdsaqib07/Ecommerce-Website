import React,{useEffect} from 'react'
import {useRotuer, useRouter} from 'next/router'
import  { connectDB,disconnectDB } from '@/middleware/db'; // Import the connectDB function
import Order from '@/models/Order';
const OrderClient = ({notify,item}) => {
    const router = useRouter();
  
    console.log(item)
    useEffect(()=>{
    if(!localStorage.getItem('authtoken')){
        router.push('/login')
        notify('login to see your order','error')
    }
    if(router.asPath === '/order'){
      router.push('/')
    }
  },[])
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
                CodesWear.com
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order Id:#{item.orderId}
              </h1>

              <p className="leading-relaxed mb-4">
                Your Items Has Been Placed Successfully!
              </p>
              <div className="flex mb-4 text-center">
                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                  Items
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                  Quantity
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                  Price 
                </a>
              </div>
          
              {item.products.map((it)=>{ return <div className="flex border-t border-gray-200 py-2" key={it.productId}>
                <span className="text-gray-500 w-36">{it.name} ({it.size})</span>
                <span className="text-gray-900 ml-auto mr-0">{it.quantity}</span>
                <span className="ml-auto text-gray-900">&#x20B9;{it.iPrice} X {it.quantity} = {it.iPrice*it.quantity}</span>
              </div>})}
        

              <div className="flex flex-col space-y-3">
                <small className="title-font font-medium text-2xl text-gray-900">
                  Sub-Total &#x20B9;{item.amount}
                </small>
                <button className="ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded w-full">
                  Track Order
                </button>
        
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={item.products[0].image}
            />
          </div>
        </div>
      </section>

    </div>
  )
}
export async function getServerSideProps(context){
try{
   await connectDB();
   const {id,userId} = context.query
   
   let item = await Order.findOne({_id:id,user:userId});
   
   item = JSON.parse(JSON.stringify(item)); //
   
    await disconnectDB();
    return {
             props: {
               item:item,
             }
           }

  }
  catch(error){
    console.log(error.message);
    return {
      props: {
        item:null,
      }
    }
  }
}
export default OrderClient
