import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import validator from 'validator';
const Login = ({notify,setProgress}) => {
  
  const router = useRouter()
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [cpassword,setCPassword] = useState("");
  const handleChange = (e) =>{
    if(e.target.name === 'show'){
      document.getElementById('password').type = document.getElementById('password').type === 'password' ? 'text' : 'password';
    }

    if(e.target.name==='email'){
      setEmail(e.target.value)
    }
    else if(e.target.name === 'password'){
      setPassword(e.target.value);
    }
    else if(e.target.name === 'cpassword'){
      setCPassword(e.target.value)
    }


  }
  useEffect(()=>{
    if(localStorage.getItem('authtoken')){
      router.push('/')
    }
    console.log(router.query.token)
  })
  const authUser =async (e) => {
        e.preventDefault();
        setProgress(40)
        const response = await fetch('http://localhost:3000/api/forgotpassword',{
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email,sendMail:true})
        })
        const data = await response.json();
        if(data?.success){
      
          notify('Password reset email has been sent','success')
        }
        else{
          notify('Invalid Credentials','error')
        }
        setProgress(100)
  }
  const changePassword = async (e) =>{
    e.preventDefault();
    let requestdata = {
      password, 
      cpassword, 
      email,
      sendMail:false
    }
          setProgress(40)
        const response = await fetch('http://localhost:3000/api/forgotpassword',{
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestdata)
        })
        const data = await response.json();
        if(data?.success){
          setPassword(" ")
          setCPassword(" ")
          setEmail(" ")
          notify('Your Password Has Been Changed','success')
        }
        else{
          notify('Invalid Credentials','error')
        }
        setProgress(100)
    console.log('running')
  }
  return (
    <>
     <Head>
    <title>Forget password - Codeswear.com </title>
    </Head>
    <div className='min-h-screen'>
      {/* <div className='mt-24'>
      {spinner && <Spinner />}
      </div> */}
 <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-col flex-wrap items-center">
    <div className="navigators lg:w-2/6 md:w-1/2 rounded-lg flex flex-row md:mx-auto w-full mb-3">
      <Link href='/login' className='w-1/2 bg-white text-center p-2 text-black border border-r-0 font-black rounded-l'>Login</Link>
      <Link href='/signup' className='w-1/2 bg-white text-black text-center p-2 border font-black rounded-r'>SignUP</Link>
    </div>
   {!router.query.token ? <form onSubmit={authUser} className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0" autoComplete='on'>
         <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
           Trouble with logging in ?
         </h2>
         <div className="relative mb-4">
           <label htmlFor="username" className="leading-7 text-sm text-gray-600">
             Enter Your Registered Email Address 
           </label>
           <input
             type="text"
             id="email"
             name="email"
             className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
             value={email}
             onChange={handleChange}
             placeholder="Email address or username"
           />
         </div>
   
         <button type='submit' className="disabled:bg-indigo-400 capitalize text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" disabled={!validator.isEmail(email)} >
           Change password
         </button>
        
       </form> : <form onSubmit={changePassword} className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0" autoComplete='on'>
         <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
          Change password
         </h2>
         <div className="relative mb-4">
           <label htmlFor="username" className="leading-7 text-sm text-gray-600">
             Enter New Password 
           </label>
           <input
             type="password"
             id="password"
             name="password"
             className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
             value={password}
             onChange={handleChange}
             placeholder="New Password"
           />
           <label htmlFor='showPass' className="leading-7 text-sm text-gray-600">Show Password</label>
      <input type='checkbox' name='show' id='show' className='bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ml-2 absolute bottom-[7px]' onChange={handleChange} />
         </div>
          <div className="relative mb-4">
           <label htmlFor="username" className="leading-7 text-sm text-gray-600">
             Confirm New Password 
           </label>
           <input
             type="password"
             id="cpassword"
             name="cpassword"
             className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
             value={cpassword}
             onChange={handleChange}
             placeholder="Confirm New Password"
           />
         </div>
   
         <button type='submit' className="disabled:bg-indigo-200 capitalize text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" disabled={validator.isLength(password,{min:6}) && validator.isLength(cpassword,{min:6}) && password===cpassword ? false : true} >
           Reset Password
         </button>
        
       </form>}
       {router.query.token!==undefined && password!==cpassword && <div className='mt-2 lg:w-2/6 md:w-1/2 mx-auto w-full'><p className='text-red-500 font-semibold text-sm'>Passwords Dont' Match</p></div>}
       {router.query.token!==undefined && password===cpassword && password>5 && cpassword>5 && <div className='mt-2 lg:w-2/6 md:w-1/2 mx-auto w-full'><p className='text-green-500 font-semibold text-sm'>PasswordsMatch</p></div>}
  </div>
</section>

    </div>
    </>
  )
}

export default Login
