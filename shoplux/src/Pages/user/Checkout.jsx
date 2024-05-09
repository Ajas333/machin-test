import React, { useState, useEffect } from "react";
import CheckoutItem from "../../components/user/CheckoutItem";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';


function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("access");
  const authentication_user = useSelector((state) => state.authentication_user);
  const grand_total = total+8.0
  console.log(token);
  const baseURL = "http://127.0.0.1:8000";

  const getCartItems = async () => {
    try {
      const result = await axios.get(baseURL + "/api/products/getCart/", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (result.status == 200) {
        setCartItems(result.data.cart_items);
        setTotal(result.data.total);

        console.log("llkjhh...............", result.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    return () => {
      getCartItems();
    };
  }, []);

  const handleSubmit = async()=>{
    const result =await axios.post(`${baseURL}/api/products/order_product/`,{
        'cart_items': cartItems,
        'cart_total': total
    },{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': "application/json",
            "Content-Type": "application/json",
        },
    })
    console.log(result)
    if(result.status == 201){
        console.log("order created")
        Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
          }).then((value) => {
            // Reload the page
            window.location.href = "/"; // Replace "/" with the URL of your home page
        });
    }

  }
  

  return (
    <>
      <div class="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div class="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div class="relative">
            <ul class="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span class="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span class="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span class="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div class="px-4 pt-8">
          <p class="text-xl font-medium">Order Summary</p>
          <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          {cartItems.map((item, i) => {
                let image = `${baseURL}${item.product.image}`;
                return (
                  <CheckoutItem
                    key={i}
                    id={item.id}
                    image={image}
                    name={item.product.title}
                    price={item.product.price}
                    sub_total={item.sub_total}
                    quantity={item.quantity}
                    Total={total}
                  />
                );
              })}
            
          </div>
          <form class="mt-5 grid gap-6">
            <div class="relative">
              <input
                class="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_2"
              >
                <img
                  class="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div class="ml-5">
                  <span class="mt-2 font-semibold">Fedex Delivery</span>
                  <p class="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p class="text-xl font-medium">Payment Details</p>
          <p class="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div class="">
            <label for="email" class="mt-4 mb-2 block text-sm font-medium">
              Name:{authentication_user.username}
            </label>

            {/* <!-- Total --> */}
            <div class="mt-6 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Subtotal</p>
                <p class="font-semibold text-gray-900">${total}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Shipping</p>
                <p class="font-semibold text-gray-900">$8.00</p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">${grand_total}</p>
            </div>
          </div>
          <button onClick={handleSubmit} class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;
