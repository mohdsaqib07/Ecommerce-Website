import { useRouter} from 'next/router'
import React, { useEffect,useState } from 'react'

const MyAccount = ({notify,setProgress}) => {
 const router = useRouter()
 
 const [customername,setName] = useState("")
 const [email,setEmail] = useState("")
 const [phone,setPhone] = useState("")
 const [address1,setAddress1] = useState("")
 const [address2,setAddress2] = useState("")
 const [pincode,setPinCode] = useState("")
 const [city,setCity] = useState("")
 const [state,setState] = useState("")
 const [readonly,setRead] = useState(false)
 const [password,setPassword] = useState("")
 const [npassword,setNPassword] = useState("")
 const [button,setButton] = useState("Save")
 const loadDefaultData = async ()=>{
  const token = localStorage.getItem('authtoken')
  const response = await fetch('http://localhost:3000/api/fetchaddress',{
    method:"POST",
    headers:{
       "Content-Type":"application/json",
       'authtoken':token
    }
  });
  const {address} = await response.json();
  
  if(address){
  
      setName(address.customername)    
  

  setEmail(address.email)
  setPhone(address.phone)
  setAddress1(address.address1)
  setAddress2(address.address2)
      setPinCode(address.pincode)
      setCity(address.city)
      setState(address.state)
      setButton("Update")
      setRead(true)
      localStorage.setItem('defaultaddress',JSON.stringify(address))
      }
 }
  useEffect(()=>{
    if(!localStorage.getItem('authtoken')){
        router.push('/login')
        notify('login to access myaccount','error')
        return 
    }
    else{
      if(localStorage.getItem('defaultaddress')){
        let defaultdata = JSON.parse(localStorage.getItem('defaultaddress'))
        setName(defaultdata.customername)
  setEmail(defaultdata.email)
  setPhone(defaultdata.phone)
  setAddress1(defaultdata.address1)
  setAddress2(defaultdata.address2)
      setPinCode(defaultdata.pincode)
      setCity(defaultdata.city)
      setState(defaultdata.state)
      setButton("Update")
      setRead(true)
      }
      else{
           loadDefaultData();   
      }
     
     }
  },[])
  const changeData = async(e)=>{
   if(e.target.name === 'customername')
   setName(e.target.value)
   else if(e.target.name === 'email')
   setEmail(e.target.value)
   else if(e.target.name === 'phone')
   setPhone(e.target.value)
   else if(e.target.name === 'address1')
   setAddress1(e.target.value)
   else if(e.target.name === 'address2')
   setAddress2(e.target.value)
   else if(e.target.name === 'pincode')
   setPinCode(e.target.value)
   else if(e.target.name === 'password')
   setPassword(e.target.value)
   else if(e.target.name === 'npassword')
   setNPassword(e.target.value)
 
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
  async function saveDefaultAddress(e){
    e.preventDefault();
    const data = {
      customername,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      pincode
    }
    const token = localStorage.getItem('authtoken')
    if(button==='Save'){
      setProgress(40)
     const response = await fetch('http://localhost:3000/api/addaddress',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        'authtoken':token
      },
      body:JSON.stringify({data})
    })
     if(response.status===200){
      notify("Address Has been Updated",'success')
     }
     setProgress(100)
    }
    setRead(!readonly)
    if(readonly===false){
      setButton("Update")
    }
    else{
      setButton("Save")
    }
    let defaultdata = {
      customername,email,phone,address1,address2,pincode,city,state
    }
    localStorage.setItem('defaultaddress',JSON.stringify(defaultdata))
   
  }
  async function changePassword(){
    try{  
         if(password!=="" && npassword!==""){
          setProgress(40)
          const token = localStorage.getItem('authtoken')
          const response = await fetch("http://localhost:3000/api/updatepassword",{
            method:"POST",
            headers:{
              'Content-Type':"application/json",
              'authtoken':token
            },
          body:JSON.stringify({password,npassword})
          })
          setProgress(50)
          const data = await response.json();
          console.log(response.status)
          if(response.status === 200){
            notify(data.status,'success')
            setPassword("")
            setNPassword("")
          }
          else{
            notify(data.status,'error')
            setPassword("")
            setNPassword("")
          }
          setProgress(100)
          }

       
    }catch(err){
      console.log(err.message)
    }
  }
  return (
    <div className="container mx-auto my-10">
     <div>
      <h1 className='font-black text-4xl text-center'>Update Your Account</h1>
      <h2 className='mt-16 text-xl font-semibold capitalize'>1. Default Delievery Details</h2>
      <form className="mx-auto flex flex-wrap  mt-2" >
          <div className="px-2 w-1/2 sm:w-1/3">
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input type="text" id="customername" name="customername" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={customername} onChange={changeData} readOnly={readonly}  />
            </div>
          </div>
          <div className="px-2 w-1/2 sm:w-1/3">
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={email} onChange={changeData} readOnly={readonly}  />
            </div>
          </div>
          <div className="px-2 w-full sm:w-1/3">
            <div className="relative mb-4">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
              <input type="tel" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Your 10 digit Phone Number" value={phone} onChange={changeData} maxLength={10} readOnly={readonly} />
            </div>
          </div>
          <div className="px-2 w-full">
            <div className="relative mb-4">
              <label htmlFor="address1" className="leading-7 text-sm text-gray-600">Address 1</label>
              <textarea rows={4} placeholder="1234 Main St" type="text" id="address1" name="address1" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={address1} onChange={changeData} readOnly={readonly} />
            </div>
          </div>
          <div className="px-2 w-full">
            <div className="relative mb-4">
              <label htmlFor="address2" className="leading-7 text-sm text-gray-600">Address 2</label>
              <input placeholder="Apartment , Building , Studio or Floor" type="text" id="address2" name="address2" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={address2} onChange={changeData} readOnly={readonly}  />
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
              <input type="tel" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" minLength={6} maxLength={6} value={pincode} onChange={changeData} readOnly={readonly}  />
            </div>
          </div>
           <div className='px-2'>
           <button className='bg-indigo-600 text-white px-3 py-2 rounded-md font-black text-xl shadow-md' type='button' onClick={saveDefaultAddress}>{button}</button>
           </div>
        </form>
        </div>
        <div>
         <h2 className='mt-16 text-xl font-semibold capitalize'>2.Change Password</h2>
      <form className="mx-auto flex flex-wrap  mt-2" >
          <div className="px-2 w-1/2 sm:w-1/2">
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Old Password</label>
              <input type="text" id="customername" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={password} onChange={changeData} required   />
            </div>
          </div>
          <div className="px-2 w-1/2 sm:w-1/2">
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">New Password</label>
              <input type="email" id="email" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={npassword} onChange={changeData} required   />
            </div>
          </div>
         
         
           <div className='px-2'>
           <button className='bg-indigo-600 text-white px-3 py-2 rounded-md font-black text-xl shadow-md' type='button' onClick={changePassword} >Change Password</button>
           </div>
        </form>
        </div>
      </div>
  )
}

export default MyAccount