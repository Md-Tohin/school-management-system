import { Link, useLocation } from 'react-router-dom'

const SuccessPage = () => {
    const location = useLocation();
    console.log(location);
    
  return (
    <div className='m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5 translate-y-1/2'>
      <p className='text-green-800 font-bold text-lg text-center'>{(location?.state?.text) ? location?.state?.text : "Payment"} Successfully</p>
      <Link to={'/'} className='border border-green-900 rounded text-green-900 hover:bg-green-900  hover:text-white transition-all px-4 py-1'>Go to Home</Link>
    </div>
  )
}

export default SuccessPage
