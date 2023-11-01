import React,{useContext} from 'react'
import codeswearContext from '@/context/codeswearContext';
const Alert = () => {
 const context = useContext(codeswearContext)
 const {alert,setAlert} = context
  return (
    <>
    {alert && <div  className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 -mt-1" role="alert">
  <p  className="font-bold">{alert.type}</p>
  <p>{alert.message}</p>

</div>}
</>
  )
}

export default Alert
