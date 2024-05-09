import React from 'react'

function CheckoutItem(props) {
  return (
    <div>
      <div>
        <div class="flex flex-col rounded-lg bg-white sm:flex-row">
        <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src={props.image} alt="" />
        <div class="flex w-full flex-col px-4 py-4">
          <span class="font-semibold">{props.name}</span>
          <span class="float-right text-gray-400">quantity:{props.quantity}</span>
          <p class="text-lg font-bold">{props.sub_total}</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CheckoutItem
