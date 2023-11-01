import React,{useState,useContext,useEffect} from 'react'
import Link from 'next/link'
import codeswearContext from '@/context/codeswearContext';
import { useRouter } from 'next/router';
import Head from 'next/head'

const Signup = ({notify,setProgress}) => {
  const router = useRouter();
  const context = useContext(codeswearContext)
  const {setAuth} = context
  const [fname,setFname] = useState("");
  const [lname,setLname] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  useEffect(()=>{
    if(localStorage.getItem('authtoken')){
      router.push('/')
    }
  })
  const handleChange =  (e) =>{
          if(e.target.name === "show"){
            document.getElementById('password').type = document.getElementById('password').type === 'password' ? 'text' : 'password'; 
            
          }
          else{
            
            if(e.target.name==='fname')
            setFname(e.target.value);
            else if(e.target.name==='lname')
            setLname(e.target.value);
            else if(e.target.name==='email')
            setEmail(e.target.value);
            else if(e.target.name==='password')
            setPassword(e.target.value);
          }
  }
  const validateUser= (e)=>{
     setProgress(40)
     fetch('http://localhost:3000/api/createuser', {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({fname,lname,email,password}), // body data type must match "Content-Type" header
            }).then(function(response){
              setProgress(80);
              return response.json();
            }).then(function(data){
              if(data.success){
                // setProgress(100);
                setAuth(localStorage.setItem('authtoken',data.token))
                setFname("")
                setLname("")
                setEmail("")
                setPassword("")
                router.push('/')
                
                notify("Your CodesWear Account has been created","success")
                
              }
              else{
                setProgress(100);
              
                notify(data.status,"error")
              }
            }).catch(function(error){
              console.log(error.message)
            })

           

  }
  return (
    <>
      <Head>
    <title>Signup - Codeswear.com </title>
    </Head>
    <div className='min-h-screen'>
    <section className="text-gray-600 body-font">
 <div className="container px-5 py-24 mx-auto flex flex-col flex-wrap items-center">
  <div className="navigators lg:w-2/6 md:w-1/2 rounded-lg flex flex-row md:mx-auto w-full mb-3">
    <Link href='/login' className='w-1/2 bg-white text-black text-center p-2  font-black rounded-l border'>Login</Link>
    <Link href='/signup' className='w-1/2 bg-indigo-600 text-white text-center p-2 font-black rounded-r'>SignUP</Link>
  </div>
 <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0" >
    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
      Sign Up for An Account
    </h2>

    <div className="relative mb-4">
      <label htmlFor="fname" className="leading-7 text-sm text-gray-600">
        First Name
      </label>
      <input
        type="text"
        id="fname"
        name="fname"
        value={fname}
        onChange={handleChange}
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        required
      />
    </div>
    
    <div className="relative mb-4">
      <label htmlFor="lname" className="leading-7 text-sm text-gray-600">
        Last Name
      </label>
      <input
        type="text"
        id="lname"
        name="lname"
        value={lname}
        onChange={handleChange}
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        required
      />
    </div>
    
  
    <div className="relative mb-4">
      <label htmlFor="email" className="leading-7 text-sm text-gray-600">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email" 
        value={email}
        onChange={handleChange}
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        required
      />
     
    </div>
    <div className="relative mb-4">
      <label htmlFor="password" className="leading-7 text-sm text-gray-600">
        Choose New Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleChange}
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        required
        minLength={5}
      />
      <label htmlFor='showPass' className="leading-7 text-sm text-gray-600">Show Password</label>
      <input type='checkbox' name='show' id='show' className='bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ml-2 absolute bottom-[7px]' onChange={handleChange} />
    </div>

    <button onClick={validateUser} className={`text-white ${password.length<6?'bg-indigo-300':'bg-indigo-500'} border-0 py-2 px-8 focus:outline-none ${password.length<6?'':'hover:bg-indigo-600'} rounded text-lg`} disabled={password.length<6?true:false}>
      Register
    </button>

  </div>
</div>
</section>

  </div>
  </>
  )
}

export default Signup
