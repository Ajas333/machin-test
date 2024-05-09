import React,{ useEffect,useState }  from 'react'
import CartItems from '../../components/user/CartItems'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function Cart() {
  const [cartItems,setCartItems] =useState([])
  const [isItem,setIsItem] =useState(false)
  const [total,setTotal] =useState(0)
  const token = localStorage.getItem('access')
  console.log(token)
  const baseURL = 'http://127.0.0.1:8000';
  const authentication_user=useSelector((state) => state.authentication_user);
  const user=authentication_user.username
  console.log(user)
  const getCartItems = async ()=>{
    try{
    console.log('dljklgs ');
    const result = await axios.get(baseURL+'/api/products/getCart/',{
      headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': "application/json",
          "Content-Type": "application/json",
      },
  })
  if(result.status == 200){
    setCartItems(result.data.cart_items)
    setIsItem("true")
    setTotal(result.data.total) 
    
    console.log("...............",result.data)
    
  }
    }
    catch(error){
        console.log("error",error)
    }
  
  }
  useEffect(() => {
    return () => {
      getCartItems();
    };
  }, [])

  console.log("cart items........",cartItems)
  console.log(isItem)
  console.log("total value........",total)
  return (
    <div className='my-20' >
      <h2>Cart</h2>
    
    <div className="overflow-x-auto ">
    {isItem?
    <>
      <table className="min-w-full bg-white border-collapse">
      <thead className="bg-gray-100 border-b">
        <tr className="text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border-gray-200">
          <th scope="col" className="px-6 py-3">Image</th>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Price</th>
          <th scope="col" className="px-6 py-3">Quantity</th>
          <th scope="col" className="px-6 py-3">Subtotal</th>
          <th scope="col" className="px-6 py-3">Remove</th>
        </tr>
      </thead>
        {cartItems.map((item,i) =>{
          let image=`${baseURL}${item.product.image}`;
          return(
            <CartItems key={i} id={item.id} image={image} name={item.product.title} price={item.product.price} sub_total={item.sub_total} quantity={item.quantity} />
          )
        })}
        <tr className="text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border-gray-200">
          <td scope="col" className="px-6 py-3">Total:${total}</td>
        </tr>

    </table>
        

<div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
<h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400"> Cart Total</h5>

<ul role="list" class="space-y-5 my-7">
<li class="flex items-center">
<span className='text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3'>
      Total:
</span>
<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">${total}</span>
</li>
</ul>
<Link to={'/checkout'}>
<button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
  Proceed to Checkout
  </button>
  </Link>
</div>
</>
  
  :
  <h3>No item found</h3>
    }

</div>
</div>
  )
}

export default Cart
