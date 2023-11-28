import React from 'react'
import Delete from '@material-ui/icons/Delete'
// import trash from "../trash.svg"
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  

  const handleCheckOut = async () => {
    try {
        let userEmail = localStorage.getItem("userEmail");

        // Check if userEmail is available
        if (!userEmail) {
            console.error("User email is missing.");
            return;
        }

        let response = await fetch("http://localhost:5000/api/orderData", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });

        console.log("Order Response:", response);

        if (response.ok) {
            dispatch({ type: "DROP" });
        } else {
            console.error("Checkout failed:", response.statusText);
        }
    } catch (error) {
        console.error("Checkout error:", error.message);
    }
}


  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' className='text-white' >{index + 1}</th>
                <td className='text-white'>{food.name}</td>
                <td className='text-white'>{food.qty}</td>
                <td className='text-white'>{food.size}</td>
                <td className='text-white'>{food.price}</td>
                <td ><button type="button" className="btn p-0 text-danger"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-primary'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>
    </div>
  )
}
