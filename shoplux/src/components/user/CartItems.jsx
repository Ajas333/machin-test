import axios from "axios";
import React, { useState } from "react";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function CartItems(props) {
  const [quantity, setQuantity] = useState({
    cartItem_id: props.id,
    quantity: props.quantity,
    sub: props.sub_total,
  });
  console.log(quantity);
  console.log("cart items inside component.......",props.cartItems)
  const baseURL = "http://127.0.0.1:8000";
  const token = localStorage.getItem("access");

  const handleIncrement = () => {
    const updatedQuantity = quantity.quantity + 1;
    const updatedSub = updatedQuantity * props.price;
    const status = updateQuantity(updatedQuantity);
    setQuantity((prev) => ({
      ...prev,
      quantity: updatedQuantity,
      sub: updatedSub,
    }));
    props.setTotal((prevTotal) => prevTotal + parseInt(props.price, 10));
    console.log("ipdated quantity.........", updatedQuantity);
  };

  const handleDecrement = () => {
    const updatedQuantity = Math.max(0, quantity.quantity - 1);
    const updatedSub = updatedQuantity * props.price;
    const status = updateQuantity(updatedQuantity);
    setQuantity((prev) => ({
      ...prev,
      quantity: updatedQuantity,
      sub: updatedSub,
    }));
    props.setTotal((prevTotal) => prevTotal - parseInt(props.price, 10));
    props.setIsItem(!updatedQuantity == 0);
    console.log("ipdated quantity.........", updatedQuantity);
  };

  const updateQuantity = async (updatedQuantity) => {
    try {
      const result = await axios.put(
        baseURL + "/api/products/updateCart/",
        { newQuantity: updatedQuantity, cartItem_id: quantity.cartItem_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("quantitu uupdate status result.......", result);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCartItem = async () => {
    try {
      const id=props.id
      const result = await axios.delete(baseURL+'/api/products/deleteCartItem/', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data:{
            cartItem_id:id
          }
      });
      props.setTotal((prevTotal) => prevTotal - parseInt(quantity.sub, 10));
      console.log(result); 
      console.log("Delete request successful");
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };


  return (
    <>
      {quantity.quantity > 0 ? (
        <tbody className="text-sm font-normal text-gray-700">
          <tr className="border-b border-gray-200">
            <td className="px-6 py-4">
              <img src={props.image} alt="#" className="w-16 h-16 rounded-md" />
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col">
                <h5 className="font-semibold">{props.name}</h5>
              </div>
            </td>
            <td className="px-6 py-4">${props.price}</td>
            <td className="px-6 py-4">
              <div className="flex items-center justify-between w-24">
                <button
                  onClick={handleDecrement}
                  className="px-2 py-1 bg-gray-200 rounded-md"
                >
                  <i className="fi-rs-angle-small-down">
                    <FaArrowAltCircleDown />
                  </i>
                </button>
                <span>{quantity.quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="px-2 py-1 bg-gray-200 rounded-md"
                >
                  <i className="fi-rs-angle-small-up">
                    <FaArrowAltCircleUp />
                  </i>
                </button>
              </div>
            </td>
            <td className="px-6 py-4">${quantity.sub}</td>
            <td className="px-6 py-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <i onClick={deleteCartItem} className="fi-rs-trash">
                  <MdDelete />
                </i>
              </a>
            </td>
          </tr>
        </tbody>
      ) : (
        "no data"
      )}
    </>
  );
}

export default CartItems;

