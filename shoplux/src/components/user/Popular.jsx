import React from 'react'
import './main.css'
import data_product from '../../assets/data'
import Items from './Items'

function Popular() {
  return (
    <div className="popular bg-gray-100 dark:bg-gray-800 py-8 px-4 md:px-8 lg:px-16">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">POPULAR</h1>
      <hr className="w-20 mx-auto h-1 rounded-full bg-gray-400 dark:bg-gray-500" />

      <div className="popular-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">  {/* Adjusted grid columns */}
        {data_product.map((item, i) => (
          <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
   
  )
}
export default Popular
