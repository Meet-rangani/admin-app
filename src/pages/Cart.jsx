import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

function Cart() {
  return (
    <div className='container-fluid mt-3'>
        <div className='d-flex justify-content-center align-items-center gap-3'>
            <FaShoppingCart className='fs-2'/>
            <h1>Welcome to Your Cart!</h1>
        </div>
    </div>
  )
}

export default Cart
