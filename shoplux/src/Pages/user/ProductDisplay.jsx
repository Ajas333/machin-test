import React,{useEffect,useState} from 'react';
import './main.css';
import axios from 'axios';
import star_icon from '../../assets/star_icon.png'
import star_dull_icon from '../../assets/star_dull_icon.png'
import { useParams } from 'react-router-dom';

function ProductDisplay() {

  const { product_id }= useParams();
  console.log("product id..............",product_id)
  const [product,setProduct] = useState();
  const baseURL = 'http://127.0.0.1:8000';

  const getProduct = async () =>{
    try{
        const productData = await axios.get(baseURL+'/api/products/product/',{ params: { product_id } });
        console.log("single product details",productData)
        setProduct(productData.data.products);

    }
    catch(error){
        console.log("error fetching product data",error)
    }
}
  useEffect(() => {
    return () => {
      getProduct();
    };
  }, [])

  return( 
<div class="flex flex-wrap justify-between my-20">
  <div class="w-full md:w-1/2 lg:w-1/3">
    <div class="flex justify-center">
      <img class="w-64 h-64" src="" alt="" />
    </div>
  </div>
  <div class="w-full md:w-1/2 lg:w-2/3 px-4">
    <h1 class="text-2xl font-bold mb-2">Title</h1>
    <div class="flex items-center mb-2">
      <img class="w-4 h-4" src={star_icon} alt="" />
      <img class="w-4 h-4" src={star_icon} alt="" />
      <img class="w-4 h-4" src={star_icon} alt="" />
      <img class="w-4 h-4" src={star_icon} alt="" />
      <img class="w-4 h-4" src={star_dull_icon} alt="" />
      <p class="ml-2">(122)</p>
    </div>
    <div class="text-xl font-bold mb-2">$150</div>
    <div class="mb-4">
      <p class="text-sm">erfgtyhujikocvbnumio,tybunm dfghjtybnuty rftgyhujtfgyhu rtvybunimtyu rftgyhujitgyhu tfgyhuji</p>
    </div>
    <div class="mb-4">
      <p class="text-sm">vctyvbunk</p>
    </div>
  </div>
</div>
  );
}

export default ProductDisplay;