
import { Link } from 'react-router-dom'

const CancelPage = () => {
  return (
    <section>
      <div className='m-2 w-full max-w-md bg-red-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5 translate-y-1/2'>
        <p className='text-red-800 font-bold text-lg text-center'>Order Cancel</p>
        <Link to={'/'} className='border border-red-900 rounded text-red-900 hover:bg-red-900  hover:text-white transition-all px-4 py-1'>Go to Home</Link>
    </div>
    </section>
  )
}

export default CancelPage
