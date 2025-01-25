import { IoClose } from "react-icons/io5"

const AddFieldComponent = ({close, value, onChange, submit}) => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-70 p-4 z-50 flex justify-center items-center">
      <div className="bg-white p-4 w-full max-w-md rounded">
        <div className="flex justify-between items-center">
            <h1 className="font-semibold">Add Field</h1>
            <button onClick={close}>
                <IoClose size={25}/>
            </button>
        </div>
        
        <input type="text" value={value} onChange={onChange} className="bg-blue-50 p-2 my-3 border rounded focus-within:border-primary-200 outline-none w-full" autoFocus={true} placeholder="Enter field name" />
        <button onClick={submit} className="bg-primary-200 hover:bg-primary-100 font-semibold text-neutral-600 px-4 py-2 rounded mx-auto w-fit block">Add Field</button>
      </div>
    </section>
  )
}

export default AddFieldComponent
