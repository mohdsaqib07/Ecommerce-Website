import React,{useState,useContext,useEffect} from 'react'
import codeswearContext from '@/context/codeswearContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import Head from 'next/head'
const Login = ({notify,setProgress}) => {
  
  const router = useRouter()
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const context = useContext(codeswearContext)
  const {setAuth} = context
  
  const handleChange = (e) =>{
    if(e.target.name==='show'){
      document.getElementById('password').type = document.getElementById('password').type === 'password' ? 'text' : 'password';

    }
    else{
      if(e.target.name === 'email'){
        setEmail(e.target.value);
      }
      else if(e.target.name === 'password'){
        setPassword(e.target.value);
      }
    }
  }
  useEffect(()=>{
    if(localStorage.getItem('authtoken')){
      router.push('/')
    }
  })
  const authUser = (e) => {
        e.preventDefault();
        setProgress(40)
        fetch('http://localhost:3000/api/getuser',{
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email,password}), // body data type must match "Content-Type" header
        }).then(function(response){
          setProgress(80);
          return response.json();
        }).then(function(authdata){
          console.log(authdata)
          if(authdata.success){
            // setProgress(100)
            setEmail("");
            setPassword("");
            setAuth(localStorage.setItem('authtoken',authdata.token))
            router.push('/')
            notify("You have been logged in",'success');
          }
          else{
            setProgress(100);
            notify(authdata.status,'error');
      
          }
        }).catch((error)=>{
          console.error(error)
        })
    
  }
  return (
    <>
      <Head>
    <title>Login - Codeswear.com </title>
    </Head>
    <div className='min-h-screen'>
      {/* <div className='mt-24'>
      {spinner && <Spinner />}
      </div> */}
 <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-col flex-wrap items-center">
    <div className="navigators lg:w-2/6 md:w-1/2 rounded-lg flex flex-row md:mx-auto w-full mb-3">
      <Link href='/login' className='w-1/2 bg-indigo-600 text-center p-2 text-white font-black rounded-l'>Login</Link>
      <Link href='/signup' className='w-1/2 bg-white text-black text-center p-2 border font-black rounded-r'>SignUP</Link>
    </div>
   <form onSubmit={authUser} className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0" autoComplete='on'>
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        Sign in to Your Account
      </h2>
      <div className="relative mb-4">
        <label htmlFor="username" className="leading-7 text-sm text-gray-600">
          Email 
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          value={password}
          onChange={handleChange}
        />
        <label htmlFor='showPass' className="leading-7 text-sm text-gray-600">Show Password</label>
        <input type='checkbox' name='show' id='show' className='bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ml-2 absolute bottom-[7px]' onChange={handleChange} />
      </div>
      <div className='relative mb-4 self-end'>
        <Link href='/fpassword' className='leading-7 text-sm text-indigo-600 capitalize'>Forget Your Password ?</Link>
      </div>
      <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" disabled={password<6?true:false}>
        Login
      </button>
     
    </form>
  </div>
</section>

    </div>
    </>
  )
}

export default Login
