import React,{ useEffect, useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';

function AdminHome() {
  const navigate=useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [orderItem, setOrderItem] = useState(null)
  const authentication_user = useSelector(state=> state.authentication_user)  
  console.log(authentication_user)
  const baseURL = "http://127.0.0.1:8000";
  const token = localStorage.getItem("access");

  const getOrderData = async()=>{
    const result = await axios.get(baseURL+'/api/products/getOrder/',{
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
      console.log("orders.............",result)
      if(result.status == 200){
        setOrderList(result.data.orders)
      }
      else{
        alert("something wrong...")
      }
  }

  useEffect(() => {
    return () => {
      getOrderData();
    };
  }, [])
  console.log("wsedrftvgbhynujmi.....................",orderList)
  console.log(orderItem)
  const getOrderDetail = (order_id) =>{
      const order = orderList.find(item => item.id === order_id )
      setOrderItem(order)
  }

  const downloadOrderPdf = () => {
    if (orderItem) {
      axios.get(baseURL+`/api/products/orderPdf/${orderItem.id}/`, { responseType: 'blob' })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `order_${orderItem.invoice_number}.pdf`);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.error('Error downloading PDF:', error);
        });
    }
  };

  const DownloadSalesReport = () =>{
    
  }

  
  return (
    <>
        {orderItem ? (

          <>
          
          <table className="min-w-full bg-white border-collapse my-20">
            <thead className="bg-gray-100 border-b">
              <tr className="text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border-gray-200">
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Invoice Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Invoice Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                 Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th>
                  <button onClick={()=>setOrderItem("")}>back</button>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-700">
           
                <tr className="border-b border-gray-200" >
                  <td className="px-6 py-4">{orderItem.id}</td>
                  <td className="px-6 py-4">{orderItem.created_at}</td>
                  <td className="px-6 py-4">{orderItem.invoice_number}</td>
                  <td className="px-6 py-4">{orderItem.total_price}</td>
                  <td className="px-6 py-4">{orderItem.status}</td>
                  <td className="px-6 py-4"><button onClick={downloadOrderPdf}>Download invoice</button></td>
                </tr>
      </tbody>
          </table>
          </>
    ) : <div className='my-16'>
    <header className="bg-gray-200 py-4 px-6 flex justify-between items-center">
    <div className="flex items-center">
      <h1 className="text-xl font-bold">Order List</h1>
    </div>
    <nav>
      <ul className="flex space-x-4">
        <li onClick={DownloadSalesReport}>
          SlesReport
        </li>
      </ul>
    </nav>
  </header>
  <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr className="text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border-gray-200">
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Invoice Number
                </th>
                <th scope="col" className="px-6 py-3">
                 Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-700">
            {orderList.map((item, i) => {
              return (
                <tr className="border-b border-gray-200" key={i}>
                  <td className="px-6 py-4">{item.id}</td>

                  <td className="px-6 py-4">{item.invoice_number}</td>
                
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4" onClick={() => getOrderDetail(item.id)}>View Details</td>
                </tr>
              );
            })}
      </tbody>
          </table>
  </div>}
    </>
    
  )
}

export default AdminHome
