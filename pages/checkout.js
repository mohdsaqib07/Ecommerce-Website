import React, { useEffect, useContext,useState } from 'react'
import codeswearContext from '@/context/codeswearContext'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Head from 'next/head'
import { BsFillBagCheckFill } from "react-icons/bs";
import Script from 'next/script'


const Checkout = ({ cart, clearCart, decrementItemQty, incrementItemQty, subTotal, removeItem, toggleSideCart,notify }) => {
    const context = useContext(codeswearContext)
  const [disabled,setDisabled] = useState(true)
  const { formData, setFormData } = context
  const [state,setState] = useState("")
  const [city,setCity] = useState("")
  const [readonly,setRead] = useState(false)
  const [button,setButton] = useState("Save")
     useEffect(()=>{
    if(!localStorage.getItem('authtoken')){
      router.push('/login')
      notify('login to placed your order','error')
      return 
    }
    if(localStorage.getItem('defaultaddress')){
      let defaultdata = JSON.parse(localStorage.getItem('defaultaddress'))
      let defaultformdata = {
        customername:defaultdata.customername,email:defaultdata.email,phone:defaultdata.phone,address1:defaultdata.address1,address2:defaultdata.address2,pincode:defaultdata.pincode
      }
      setFormData(defaultformdata)
      setCity(defaultdata.city)
      setState(defaultdata.state)
      setRead(true)
      setButton("Update")
    }

  },[])


  const changeData = async (e) => {
  setFormData({
      ...formData, [e.target.name]: e.target.value
    })
   console.log(formData)
    if(e.target.name === 'pincode' && e.target.value.length===6){
      let response = await fetch('http://localhost:3000/api/pincode')
      let data = await response.json()
      let pincodes = data.pincodes
      if(Object.keys(pincodes).includes(e.target.value)){
        setState(pincodes[e.target.value].state)
        setCity(pincodes[e.target.value].city)

      }
      else{
        notify("Pincode is not Servicable try some other pincode",'error')
        setState("")
        setCity("")
      }
    }else if(e.target.name === 'pincode' && e.target.value.length!==6){
      setState("")
      setCity("")
    }
    
  }

  const router = useRouter();
  async function checkoutOrder(){
    console.log('checking out the order')
    const authtoken = localStorage.getItem('authtoken')
    let orderId =  Math.floor(Math.random()*Date.now());
    let newformdata = formData
    newformdata.city = city;
    newformdata.state = state;
    const data = {cart,subTotal,orderId,formData:newformdata}

    let response = await fetch('http://localhost:3000/api/pretransaction',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' , 'authtoken':authtoken },
      body: JSON.stringify(data),
})
    let order = await response.json();
    if(response.status===200){
      clearCart(true);
      router.push(`/order?id=${order.item._id}&userId=${order.item.user}`)
      notify('Your Order is Placed successfully','success')
    }else if(order.cart){
      clearCart(true);
      notify(order.cart,'error')
    }
     else{
       notify(order.error,'error')
     }



  }
  function saveDefaultAddress(e){
    e.preventDefault();
    setRead(!readonly)
    if(readonly===false){
      setButton("Update")
    }
    else{
      setButton("Save")
    }

    console.log('address is changed')
  }

  return (
    <>

      <Head>
       
    <title>Checkout - Codeswear.com </title>

        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      {/* <Script src="https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/.js" type="text/javascript" crossorigin="anonymous" ></Script> */}
      <Script src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous"></Script>
      <div className='container mx-auto mt-6'>
        <h1 className='text-3xl font-black text-center'>Checkout</h1>
        <h2 className='mt-4 text-xl font-semibold capitalize'>1. Delievery Details</h2>
        <form className="mx-auto flex flex-wrap  mt-4">
          <div className="px-2 w-1/2 sm:w-1/3">
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input type="text" id="customername" name="customername" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={formData.customername} onChange={changeData} readOnly={readonly} />
            </div>
          </div>
          <div className="px-2 w-1/2 sm:w-1/3">
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={formData.email} onChange={changeData} readOnly={readonly} />
            </div>
          </div>
          <div className="px-2 w-full sm:w-1/3">
            <div className="relative mb-4">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
              <input type="tel" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Your 10 digit Phone Number" value={formData.phone} onChange={changeData} maxLength={10} readOnly={readonly} />
            </div>
          </div>
          <div className="px-2 w-full">
            <div className="relative mb-4">
              <label htmlFor="address1" className="leading-7 text-sm text-gray-600">Address 1</label>
              <textarea rows={4} placeholder="1234 Main St" type="text" id="address1" name="address1" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={formData.address1} onChange={changeData} readOnly={readonly} />
            </div>
          </div>
          <div className="px-2 w-full">
            <div className="relative mb-4">
              <label htmlFor="address2" className="leading-7 text-sm text-gray-600">Address 2</label>
              <input placeholder="Apartment , Building , Studio or Floor" type="text" id="address2" name="address2" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={formData.address2} onChange={changeData} readOnly={readonly} />
            </div>
          </div>
          <div className="px-2 w-full sm:w-3/5">
            <div className="relative mb-4">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
              <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={city} readOnly />
            </div>
          </div>
          <div className="px-2 w-1/2 sm:w-1/5">
            <div className="relative mb-4">
              <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
              <input id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out p-2" value={state} readOnly />

            </div>
          </div>
          <div className="px-2 w-1/2 sm:w-1/5">
            <div className="relative mb-4">
              <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Zip</label>
              <input type="tel" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" minLength={6} maxLength={6} value={formData.pincode} onChange={changeData} readOnly={readonly} />
            </div>
          </div>
 <div className='px-2'>
           <button className='bg-indigo-600 text-white px-3 py-2 rounded-md font-black text-xl shadow-md' type='button' onClick={saveDefaultAddress}>{button}</button>
           </div>
        </form>
        <h2 className='mt-4 text-xl font-semibold capitalize'>2. Review Your Cart <BsFillBagCheckFill className='inline text-indigo-600 mb-2' /></h2>
        <div className="sidebarbg-white px-8 h-auto py-10 container mx-auto w-full">

          <hr className='' />

          <div className='flex flex-col space-y-3 w-full h-auto'>
            <div className="items flex flex-col space-y-3 w-full h-auto">
              {Object.keys(cart).length === 0 && <div>No items in the Cart</div>}
              {Object.keys(cart).map((key) => {
                return (<div key={key}><div className="item flex-col space-y-2 sm:flex-row justify-start sm:justify-between flex space-x-2 mt-4 w-full">

                  <div className="item-image relative">
                    <button className='absolute cursor-pointer -top-2 -left-1 text-xl text-black' onClick={() => { removeItem(key) }}><AiFillCloseCircle /></button>
                    <img src={cart[key].image} alt="item" className='object-cover object-top sm:object-center w-full h-96 sm:h-72' />
                  </div>
                  <div className="item-desc flex flex-col overflow-hidden space-y-1 self-baseline sm:self-center text-left sm:text-right w-auto sm:w-1/4">
                    <div className='font-extralight capitalize self-baseline sm:self-end'> {cart[key].category} </div>
                    <div className='font-bold capitalize'> {cart[key].qty} x {cart[key].name}</div>
                    <div className='font-extralight capitalize'>Color : {cart[key].color}</div>
                    <div className="add-on self-baseline sm:self-end">
                    <button onClick={() => { decrementItemQty(key) }}><AiFillMinusCircle className='inline cursor-pointer text-indigo-600' /></button>
                    
                    <span className='ml-1'>Qty</span>
                       <button onClick={() => { incrementItemQty(key) }} className='ml-1'><AiFillPlusCircle className='inline cursor-pointer text-indigo-600' /></button> 
                      </div>
                    <div className='self-baseline sm:self-end'> &#x20B9;{cart[key].price} </div>
                  </div>
                </div>
                  <hr /></div>)
              })}

            </div>
            {subTotal !== 0 && <div className="price-estimation flex justify-between">
              <big className='uppercase opacity-50'>Sub-total</big>
              <big>&#x20B9; {subTotal}</big>
            </div>}
            <div className="final-stage flex flex-row-reverse">
              {subTotal !== 0 && <button onClick={checkoutOrder}  className="flex mt-2 w-fit bg-indigo-700 disabled:bg-indigo-200 text-white py-2 px-4 rounded font-black cursor-pointer text-md focus:outline-none hover:bg-indigo-600"> <BsFillBagCheckFill className='mt-[2px]' /> Pay &#x20B9;{subTotal}</button>}
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
