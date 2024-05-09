import React,{useEffect,useState} from 'react';
import './main.css';
import axios from 'axios';
import star_icon from '../../assets/star_icon.png'
import star_dull_icon from '../../assets/star_dull_icon.png'
import { useParams } from 'react-router-dom';

function ProductDisplay() {
  
  const { product_id }= useParams();
  console.log("product id..............",product_id)
  const [product,setProduct] = useState([]);
  const [category,setCategory] = useState('')
  const baseURL = 'http://127.0.0.1:8000';

  const getProduct = async () =>{
    try{
        const productData = await axios.get(baseURL+'/api/products/product/',{ params: { product_id } });
        console.log("single product details",productData.data)
        console.log("before store data..........",product)
        setProduct(productData.data.product);
        setCategory(productData.data.category)
        console.log(product.title)
        
        
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

    console.log("after store data..........",product)
    const image=`${baseURL}${product.image}`
    
    

  return( 
    <section className="mt-20 mb-20">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="detail-gallery">
          <span className="zoom-icon"><i className="fi-rs-search"></i></span>
          <div className="product-image-slider">
            <figure className="border rounded-lg overflow-hidden">
              <img src={image} alt="product image" className="w-full" />
            </figure>
          </div>
        </div>
        <div className="detail-info">
          <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
          <div className="product-detail-rating">
            <div className="pro-details-brand">
              <span>Category: {category}</span>
            </div>
            <div className="product-rate-cover text-right">
              <div className="product-rate inline-block">
                <div className="product-rating w-5/6 bg-gray-200 h-6"></div>
              </div>
            </div>
          </div>
          <div className="clearfix product-price-cover">
            <div className="product-price primary-color float-left">
              <ins><span className="text-brand">${product.price}</span></ins>
            </div>
          </div>
          <div className="bt-1 border-t border-gray-200 mt-4 mb-4"></div>
          <div className="short-desc mb-6">
            <p className="text-sm">{product.description}</p>
          </div>
          <div className="product_sort_info text-sm mb-6">
            <ul>
              <li className="mb-2"><i className="fi-rs-crown mr-2"></i>1 year Brand Warranty</li>
              <li className="mb-2"><i className="fi-rs-refresh mr-2"></i>30 Day Return Policy</li>
              <li><i className="fi-rs-credit-card mr-2"></i>Cash on Delivery available</li>
            </ul>
          </div>
          <form method="post">
            <div className="row mt-8">
              <div className="col-lg">
                <div className="mb-4">
                  <a id="addToCartBtn" className="btn btn-primary btn-sm rounded w-full" href="#">Add to Cart</a>
                </div>
              </div>
            </div>
            <ul className="product-meta text-xs text-gray-600 mt-8">
              <li className="mb-2">SKU: <a href="#" className="text-blue-500">FWM15VKT</a></li>
              <li>Availability:<span className="in-stock text-green-500 ml-2">8 Items In Stock</span></li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  </section>

    
  );
}

export default ProductDisplay;