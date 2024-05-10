import React, { useEffect, useState } from "react";
import CartItems from "../../components/user/CartItems";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [isItem, setIsItem] = useState(false);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("access");
  console.log(token);
  const baseURL = "http://127.0.0.1:8000";
  const authentication_user = useSelector((state) => state.authentication_user);
  const cart = useSelector((state) => state.cart);
  const user = authentication_user.username;
  console.log(user);
  console.log(cart);
  const getCartItems = async () => {
    try {
      console.log("dljklgs ");
      const result = await axios.get(baseURL + "/api/products/getCart/", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (result.status == 200) {
        setCartItems(result.data.cart_items);
        
        setIsItem(result.data.cart_items.length>0);
        setTotal(result.data.total);

        console.log("...............", result.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    return () => {
      getCartItems();
      const time = new Date().getHours();
        let greetingMsg;
        if (time < 10) {
          greetingMsg = "Good morning";
        } else if (time < 20) {
          greetingMsg = "Good day";
        } else {
          greetingMsg = "Good evening";
        }
        setGreeting(greetingMsg);
        };
  }, []);

  console.log("cart items........", cartItems);
  console.log(isItem);
  console.log("total value........", total);
  return (
    <div className="">
      <div className="overflow-x-auto ">
        {isItem ? (
          <>
            <table className="min-w-full bg-white border-collapse my-20">
              <thead className="bg-gray-100 border-b">
                <tr className="text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border-gray-200">
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Subtotal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Remove
                  </th>
                </tr>
              </thead>
              {cartItems.map((item, i) => {
                let image = `${baseURL}${item.product.image}`;
                return (
                  <CartItems
                    key={i}
                    id={item.id}
                    image={image}
                    name={item.product.title}
                    price={item.product.price}
                    sub_total={item.sub_total}
                    quantity={item.quantity}
                    setIsItem={setIsItem}
                    setTotal={setTotal}
                    
                  />
                );
              })}
            </table>

            <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                Cart Total
              </h5>

              <ul role="list" class="space-y-5 my-7">
                <li class="flex items-center">
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                    Total:
                  </span>
                  <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                    ${total}
                  </span>
                </li>
              </ul>
              <Link to={'/checkout'}>
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center h-screen">
              <div className="px-4 md:px-8 py-12 bg-gray-100 rounded-lg shadow-2xl max-w-xl">
                <h1 className="text-lg mb-4">
                  Hy {authentication_user.username} <span className="mx-2" id="demo">{greeting}</span> 😄,
                  <br />
                  <span className="text-4xl font-semibold">Cart is Empty........</span>
                  <span className="text-4xl font-semibold text-blue-700"> Shop?</span>
                </h1>
                <Link to={'/'}>
                <div className="flex flex-col justify-center w-full text-center mt-8 gap-6 sm:flex-row text-lg font-semibold">
                  <a className="bg-blue-600 w-full sm:w-40 py-4 rounded-lg text-white hover:bg-blue-700 shadow-lg">
                    Shop Now
                  </a>
                </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
