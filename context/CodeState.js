
import { useState,useEffect, useRef } from 'react';
import CodeswearContext from './codeswearContext';

// create a context provider
const CodeState = ({ children }) => {
  const [pincode, setPincode] = useState("")
  const [servicable, setServicable] = useState("")
  const [cart,setCart] = useState({})
  const [auth,setAuth] = useState('')
  const [alert,setAlert] = useState(null)
  const [formData,setFormData] = useState({
    customername:"",
    email:"",
    phone:"",
    address1:"",
    address2:"",
    pincode:"",
  })
  const [spinner,setSpinner] = useState(false);
  const [dropdown,setDropDown] = useState(false);
  useEffect(() => {
    // Access localStorage here
    const authToken = localStorage.getItem('authtoken');
    setAuth(authToken);
  }, []);

  let second = 21
  const [first,setFirst] = useState(second)



  return (
    <CodeswearContext.Provider value={{ pincode,setPincode,servicable,setServicable,cart,setCart,first,setFirst,auth,setAuth,alert,setAlert,formData,setFormData,spinner,setSpinner,dropdown,setDropDown }}>
      {children}
    </CodeswearContext.Provider>
  )
}
export default CodeState;
