import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/Link'
const Orders = ({notify,products}) => {
  const [orders,setOrders] = useState(products)
  const router = useRouter()


  useEffect(()=>{
    try{
     if(!localStorage.getItem('authtoken')){
          router.push('/login')
          notify('login to see your orders','error')
      }
     

    }
    catch(error){
      console.log(error.message)
    }

  },[])
  return (
    <div clasName='h-screen'>
      <div className='container bg-white m-auto h-screen'>
             <h1 className='p-8 text-left text-4xl font-medium text-black'>My Orders</h1>
             <div className='items'>
             <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light overflow-x-scroll">
          <thead className="border-b font-black dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">OrderId</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Details</th>
            </tr>
          </thead>
          <tbody>

          {orders.map((order,index)=>{  return <tr
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-gray-200" key={order._id}>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
              <td className="whitespace-nowrap px-6 py-4">{order.orderId}</td>
              <td className="whitespace-nowrap px-6 py-4">{order.address.email}</td>
              <td className="whitespace-nowrap px-6 py-4 text-indigo-600"><Link href={`/order?id=${order._id}&userId=${order.user}`}>Details</Link></td>
            </tr>})}

          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
             </div>
      </div>
    </div>
  )
}
export async function getServerSideProps(context){
  try{
      let token = context.query.token;
      let response = await fetch("http://localhost:3000/api/getorders",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "authtoken":token,
        }
      })
      let data = await response.json();
      let products  = data.orders;
      return{
        props:{
          products
        }
      }
  }catch(error){
    console.log(error.message);
    return {
      props: {
        products:[],
      }
    }
  }
}
export default Orders
