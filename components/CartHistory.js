import { DataContext } from '../store/GlobalState'
import { useContext, useState, useEffect } from 'react'
const CartHistory = () => {
    const { state, dispatch } = useContext(DataContext)
    const { kurirs } = state
    console.log(kurirs)
    return (
        <div>
        {
            kurirs.map(item => (
                <tr key={item._id}>
                <td>
                <a className='text-black font-semibold'>{item.data.history.date}</a><br></br>
                <a className='text-black font-semibold'>{item.data.history.desc}</a>
                </td>
                {
                item.data.history.map(item => (
                    <tr>
                    <td>
                    <a className='text-black font-semibold'>{item.date}</a><br></br>
                    <a className='text-black font-semibold'>{item.desc}</a><br></br>
                   </td><br></br>
                   </tr>
                ))
              }
            </tr>
                ))
            }
        </div>
    )
}

export default CartHistory