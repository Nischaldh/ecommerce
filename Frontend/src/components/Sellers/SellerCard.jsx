import React from 'react'
import { Link } from 'react-router-dom'

const SellerCard = ({seller}) => {
  return (
   <Link
    to={`/seller/${seller.id}`}
    className="flex flex-col items-center gap-3 p-5 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-orange-200 transition-all group"
  >
    <div className="size-20 rounded-full bg-orange-100 overflow-hidden flex items-center justify-center shrink-0 ring-2 ring-transparent group-hover:ring-orange-300 transition-all">
      {seller.profilePic ? (
        <img src={seller.profilePic} alt={seller.name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-orange-500 text-2xl font-bold">
          {seller.name?.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
    <p className="font-semibold text-gray-900 text-sm text-center group-hover:text-orange-500 transition-colors">
      {seller.name}
    </p>
  </Link>
  )
}

export default SellerCard
