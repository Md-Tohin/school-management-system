
const CardLoading = () => {
  return (
    <div className="border px-2 py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:max-w-36 lg:min-w-52 rounded animate-pulse">
        <div className="min-h-14 lg:min-h-20 bg-blue-50 rounded  lg:w-full"> 
        </div>
        <div className="p-2 lg:p-3 bg-blue-50 rounded w-20">
        </div>
        <div className="p-2 lg:p-3 bg-blue-50 rounded w-32 lg:w-full">
        </div>
        <div className="p-2 lg:p-3 bg-blue-50 rounded w-14">
        </div>
        <div className="flex items-center justify-between gap-3 w-32 lg:w-full">
            <div className="p-2 lg:p-3 bg-blue-50 rounded w-20">
            </div>
            <div className="p-2 lg:p-3 bg-blue-50 rounded w-20">
            </div>            
        </div>
    </div>
  )
}

export default CardLoading
