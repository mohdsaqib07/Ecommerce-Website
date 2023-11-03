import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CodeState from '@/context/CodeState'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0)
  const notify = (message,method) => {
    if(method==='success'){

      toast.success(message, {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme:'light',

    });
    }
    else if(method==='error'){
      toast.error(message, {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme:'dark',

    });

    }

  }
  const myRef = useRef(null);
  const toggleSideCart = (e,close=false) => {
  
    if(close===true){
      myRef?.current?.classList?.add('translate-x-full')
    }
    else{
          myRef?.current?.classList?.toggle('translate-x-full')
    myRef?.current?.classList?.toggle('translate-x-0')
    }

  }
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0)
    const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    let keys = Object.keys(cart)
    let subt = 0;
    for (let i of keys) {
      subt += cart[i].price * cart[i].qty;
    }
    localStorage.setItem('subTotal', subt);
    setSubTotal(subt)

  }
  const fetchCartItems = async ()=>{
    try{

    
    const token = localStorage.getItem('authtoken')
      let response = await fetch("http://localhost:3000/api/fetchcartitem",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authtoken":token,
      },
      })
    console.log(response.status)
    let itemresponse = await response.json();

    if(itemresponse.success){
               let carItems = {};
    if(itemresponse.items.length!==0){
    for(let item of itemresponse.items){
     carItems[item.itemCode] = { qty: item.qty, price:item.price, name:item.name, size:item.size, category:item.category, image:item.image ,color:item.color,slug:item.slug }
     }
     
     setCart(carItems)
     saveCart(carItems)      
     }
    }
     }
     catch(err){
      console.log(err.message)
     }
  }
  useEffect(() => {
    // setProgress(1000)
    try {
     router.events.on('routeChangeStart', ()=>{
        setProgress(40);
      })
      router.events.on('routeChangeComplete', ()=>{
        setProgress(100);
        toggleSideCart(21,true);
      })
      if(localStorage.getItem('authtoken')){
              fetchCartItems();
      }

     
      
    }
    catch (err) {
      console.error(err);
      localStorage.clear();
    }
  }, []);


  const clearCart = async (navbar=false) => {
    if(navbar===true){
      const token = localStorage.getItem('authtoken')
      let response = await fetch("http://localhost:3000/api/managecartitem",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authtoken":token,
      },
      body:JSON.stringify({operation:"clear"})
      })
    let itemresponse = await response.json();

    }
    setCart({})
    saveCart({})
  }
  const removeItem = (itemCode) => {
 
    let tempCart = cart
    delete tempCart[itemCode]
    setCart(tempCart)
    saveCart(tempCart)
  }
  const decrementItemQty = async (itemCode) => {
     const token = localStorage.getItem('authtoken')
      let response = await fetch("http://localhost:3000/api/managecartitem",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authtoken":token,
      },
      body:JSON.stringify({itemCode,operation:"decrement"})
      })
    let itemresponse = await response.json();
 
    let newCart = cart;
    if (newCart[itemCode].qty === 1) {
      removeItem(itemCode)
    }
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty - 1;
    }
    setCart(newCart)
    saveCart(newCart)
  }
  const incrementItemQty = async (itemCode) => {
    const token = localStorage.getItem('authtoken')
      let response = await fetch("http://localhost:3000/api/managecartitem",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authtoken":token,
      },
      body:JSON.stringify({itemCode,operation:"increment"})
      })
    let itemresponse = await response.json();
    
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty + 1;
    }
    setCart(newCart)
    saveCart(newCart)
  }
  const addToCart = async (itemCode, price, name, size, category, image ,color,slug) => {
    const token = localStorage.getItem('authtoken')
    if(!token){
      router.push('/login')
      notify("Login to add item in the Cart",'error')
    }
    let item = {
      itemCode,price,name,size,category,image,color,slug,qty:1,state:"old"
    }
    let response = await fetch("http://localhost:3000/api/addcartitem",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authtoken":token,
      },
      body: JSON.stringify(item),
    })
    let itemresponse = await response.json();

    let newCart = cart;

    newCart[itemCode] = { qty: 1, price, name, size, category, image ,color,slug }


    setCart(newCart)
    saveCart(newCart)
  }
  const instantBuy = async (itemCode,price,name,size,category,image,color,slug) =>{
    const token = localStorage.getItem('authtoken')
     if(!token){
      router.push('/login')
      notify("Login to Buy the item",'error')
    }
    clearCart();
    

    let item = {
      itemCode,price,name,size,category,image,color,slug,qty:1,state:"instant"
    }
    let response = await fetch("http://localhost:3000/api/addcartitem",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authtoken":token,
      },
      body: JSON.stringify(item),
    })
    let itemresponse = await response.json();

    let newCart = {};

    newCart[itemCode] = { qty: 1, price, name, size, category, image ,color,slug }

    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')

  }
  return <>
   <CodeState>
    <Head>
        <title>Codeswear.com</title>
        <link rel="shortcut icon" href="/Myntra_logo.png" type="image/x-icon" />
        </Head>
      {router.asPath!=='/admin' && router.asPath!=='/admin/add' && router.asPath!=='/admin/allproducts' && router.asPath!=='/admin/orders' && router.asPath!=='/admin/imageuploader' && router.pathname!=='/admin/modify' && <Navbar cart={cart} addToCart={addToCart} decrementItemQty={decrementItemQty} incrementItemQty={incrementItemQty} removeItem={removeItem} clearCart={clearCart} subTotal={subTotal} myRef={myRef} toggleSideCart={toggleSideCart} notify={notify} />}
      <ToastContainer />
      <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={2}
        shadow={true}
        loaderSpeed={500}
        waitingTime={100}

      />
       </div>
      <Component cart={cart} addToCart={addToCart} decrementItemQty={decrementItemQty} incrementItemQty={incrementItemQty} removeItem={removeItem} clearCart={clearCart} subTotal={subTotal} myRef={myRef} toggleSideCart={toggleSideCart} instantBuy={instantBuy} notify={notify} progress={progress} setProgress={setProgress} {...pageProps} />
      {router.asPath!=='/admin' && router.asPath!=='/admin/allproducts' && router.asPath!=='/admin/add' && router.asPath!=='/admin/orders' && router.asPath!=='/admin/imageuploader' && <Footer />}
    </CodeState>
  </>

}
