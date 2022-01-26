import Link from 'next/link'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import Navbaruser from '../components/navbaruser'
import Headeruser from '../components/headeruser'
import Modal from '../components/Modal'
import Notify from '../components/Notify'
const Profiles = () => {

    const {state, dispatch} = useContext(DataContext)
    const { auth, notify, orders } = state

    if(!auth.user) return null;
    return( 
        <div className="relative min-h-screen md:flex">  {/* mobile menu bar */}
            <Modal/>
            <Notify/>
            <Headeruser/>
            {/* sidebar */}
            <Navbaruser/>
            {/* content */}
        <div className="flex-1 p-10 text-base font-bold">
                    <h3 className="text-uppercase">Orders</h3>

                    <div className="my-3 table-responsive">
                        <table className="table-bordered table-hover w-100 text-uppercase"
                        style={{minWidth: '600px', cursor: 'pointer'}}>
                            <thead className="bg-light font-weight-bold">
                                <tr>
                                    <td className="p-2">id</td>
                                    <td className="p-2">date</td>
                                    <td className="p-2">total</td>
                                    <td className="p-2">resi</td>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    orders.map(order => (
                                        <tr key={order._id}>
                                            <td className="p-2">
                                                <Link href={`/order/${order._id}`}>
                                                    <a>{order._id}</a>
                                                </Link>
                                                
                                            </td>
                                            <td className="p-2">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-2">{order.total}</td>
                                            <td className="p-2">
                                               {order.resi}
                                            </td>
                                        </tr> 
                                    ))
                                }
                            </tbody>

                        </table>
                    
                </div>
       
        </div>
        </div>
        
        
    )
}

export default Profiles