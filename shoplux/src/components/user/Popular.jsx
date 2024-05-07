import React,{useEffect,useState} from 'react'
import './main.css'
import data_product from '../../assets/data'
import Items from './Items'
import axios from 'axios'


function Popular() {

  const baseURL = 'http://127.0.0.1:8000';
    const [products,setProducts]=useState([])
    const getAllProduct = async () =>{
        try{
            const productData = await axios.get(baseURL+'/api/products/allProducts/');
            console.log("all products details",productData)
            setProducts(productData.data.products);

        }
        catch(error){
            console.log("error fetching product data",error)
        }
    }

    useEffect(() => {
        return () => {
            getAllProduct();
        };
    }, [])

  return (
    <div className="popular bg-gray-100 dark:bg-gray-800 py-8 px-4 md:px-8 lg:px-16">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">POPULAR</h1>
      <hr className="w-20 mx-auto h-1 rounded-full bg-gray-400 dark:bg-gray-500" />

      <div className="popular-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">  {/* Adjusted grid columns */}
      {products.map((item, i) => {
    let image = `${baseURL}${item.image}`; // Correct concatenation
    return (
      <Items key={i} id={item.id} name={item.title} image={image} new_price={item.price} />
    );
  })}
      </div>
    </div>
   
  )
}
export default Popular
