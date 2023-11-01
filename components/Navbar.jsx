import React,{useContext} from 'react';
import codeswearContext from '@/context/codeswearContext';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { AiOutlineShoppingCart , AiFillCloseCircle , AiFillPlusCircle , AiFillMinusCircle } from 'react-icons/ai';

import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({cart,addToCart,decrementItemQty,removeItem,subTotal,clearCart,incrementItemQty,myRef,toggleSideCart,notify}) => {
const router = useRouter();
const context = useContext(codeswearContext)
const {auth,setAuth,dropdown,setDropDown} = context

const logoutUser = ()=>{
  clearCart();
  setDropDown(false)
  localStorage.removeItem('authtoken')
  localStorage.removeItem('defaultaddress')
  setAuth(null)
  router.push('/')
  notify('Logged out Successfully!','success')
}

return (
    <div className='flex flex-col justify-center items-start sm:items-center sm:flex-row sm:justify-start shadow-lg z-10 bg-white mb-2 sticky top-0'>
      <div className="logo flex items-center mx-0 sm:mx-5 space-x-2 p-2">
        <Image src="/Myntra_logo.png" alt="codeswear.com" width={60} height={37.17} className='object-cover' />
        <Link href='/' className='cursor-pointer font-extralight hover:text-indigo-300'>CodesWear.com</Link>
      </div>
      <div className="navigation p-2">
        <ul className='flex flex-col sm:flex-row items-start sm:text-lg space-y-2 sm:space-y-0 sm:space-x-4 font-semibold'>
            <Link href={'/tshirts'} ><li className={`hover:text-indigo-700 ${router.asPath==='/tshirts' && 'text-indigo-600'}`}>Tshirts</li></Link>
            <Link href={'/hoodies'} ><li className={`hover:text-indigo-700 ${router.asPath==='/hoodies' && 'text-indigo-600'}`}>Hoddies</li></Link>
            <Link href={'/mugs'}><li className={`mr-4 sm:mr-0 hover:text-indigo-700 ${router.asPath==='/mugs' && 'text-indigo-600'}`}>Mugs</li></Link>
            <Link href={'/stickers'} ><li className={`hover:text-indigo-700 ${router.asPath==='/stickers' && 'text-indigo-600'}`}>Stickers</li></Link>
        </ul>
      </div>
      <div className="cart absolute right-0 top-2 mx-5 p-2 flex flex-row space-x-1">
      {auth!==null?<><button className='cursor-pointer' onClick={()=>{setDropDown(!dropdown)}}><MdAccountCircle className="text-2xl text-black" /></button></>:<Link href='/login' className='text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 absolute top-0 right-0 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-blue-800'>Login</Link>}
        {auth!=null && <button className='text-2xl cursor-pointer text-black relative' name='navbarCart' onClick={(e)=>{setDropDown(false);toggleSideCart(e);}}><AiOutlineShoppingCart className='text-indigo-600'/><span className='text-xs absolute right-[-4px] top-[-5px] w-4 h-4 rounded-full bg-indigo-700 text-white'>{Object.keys(cart).length}</span></button>}

      </div>
     {dropdown && <div className='absolute right-4 top-10 py-2 bg-white text-md shadow-xl border rounded'>
        <ul className='flex flex-col leading-8 font-medium text-md'>
          <li className='hover:bg-indigo-500 hover:text-white px-4 cursor-pointer'><Link href='/myaccount'>My Account</Link></li>
          <li className='px-4 hover:bg-indigo-500 hover:text-white cursor-pointer'><Link href={`/orders?token=${auth}`}>Orders</Link></li>
          <li onClick={logoutUser} className='cursor-pointer px-4 hover:bg-indigo-500 hover:text-white'>Logout</li>
        </ul>
      </div>}
      <div className={`sidebar absolute z-20 top-0 right-0 bg-white px-8 w-96 h-screen overflow-y-scroll overflow-x-hidden py-10 transform transition-transform translate-x-full rounded-l-xl`} ref={myRef}>
        <div className="cart flex gap-2"><h2 className='font-black text-xl'>Cart</h2><BsFillBagCheckFill className='inline text-xl mt-[3px] text-blue-600' /> </div>
        <hr className='w-screen' />
        <span className='absolute right-1 top-3 cursor-pointer text-2xl text-indigo-600' name='navbarCart' onClick={toggleSideCart}><AiFillCloseCircle /></span>
        <div className='flex flex-col space-y-3'>
            <div className="items flex flex-col space-y-3">
            {Object.keys(cart).length===0 && <div>No items in the Cart</div>}
            {Object.keys(cart).map((key,index)=>{ return (<div key={key}><div className="item flex space-x-2 mt-4">

            <div className="item-image relative">
              <button className='absolute cursor-pointer -top-2 -left-1 text-xl text-black' onClick={()=>{removeItem(key)}}><AiFillCloseCircle /></button>

              <img src={cart[key].image} alt="item" className='object-cover object-center w-full h-36' />

            </div>
            <div className="item-desc flex flex-col w-[60%] overflow-hidden space-y-1">
            <div className='font-extralight capitalize'> {cart[key].category} </div>
            <Link href={`/products/${cart[key].slug}`}>
            <div className='font-bold capitalize'> {cart[key].qty} x {cart[key].name}</div>
            </Link>
            <div className="add-on">
            <button onClick={()=>{decrementItemQty(key)}} ><AiFillMinusCircle className='inline cursor-pointer text-indigo-600' /></button>
            
            <span className='ml-1'>Qty</span>
            <button onClick={()=>{incrementItemQty(key)}} className='ml-1'><AiFillPlusCircle className='inline cursor-pointer text-indigo-600' /></button>
            </div>
            <div> Size : {cart[key].size} </div>
            <div className='font-extralight capitalize'>Color : {cart[key].color}</div>
            <div> &#x20B9;{cart[key].price} </div>
            </div>
            </div>
            <hr /></div>)
            })}

            </div>
            {subTotal!==0 && <div className="price-estimation flex justify-between">
              <small className='uppercase opacity-50'>Sub-total</small>
              <small>&#x20B9; {subTotal}</small>
            </div>}
            {Object.keys(cart).length!==0?<div className="final-stage flex space-x-2">
                        <Link href={'/checkout'} className="flex mt-2 w-fit bg-indigo-700 text-white py-2 px-4 float-right rounded font-black cursor-pointer text-md focus:outline-none hover:bg-indigo-600"><BsFillBagCheckFill className='mt-[2px] mr-1' /> Checkout</Link>
                        <button onClick={()=>{clearCart(true)}} type="button" className="mt-2 w-fit bg-indigo-700 text-white py-2 px-4 float-right rounded font-black cursor-pointer text-md focus:outline-none hover:bg-indigo-600">Clear</button>
                        </div>:<div className='className="final-stage flex space-x-2"'>
                          <button disabled={true} type="button" className="flex mt-2 w-fit bg-indigo-300 text-white py-2 px-4 float-right rounded font-black text-md focus:outline-none"><BsFillBagCheckFill className='mt-[2px] mr-1' /> Checkout</button>
                        <button  disabled={true} type="button" className="mt-2 ml-2 w-fit bg-indigo-300 text-white py-2 px-4 float-right rounded font-black text-md focus:outline-none">Clear</button>
                        </div>}


        </div>
      </div>
    </div>
  )
}

export default Navbar
