import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { useRouter } from 'next/router'
import OrderDetailAdmin from '../../components/OrderDetailAdmin'
import Modal from '../../components/Modal'
import Notify from '../../components/Notify'
import Headeruser from '../../components/headeruser'
import Navbaradmin from '../../components/navbaradmin'

const DetailOrder = () => {
    const {state, dispatch} = useContext(DataContext)
    const {orders, auth} = state

    const router = useRouter()

    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)
    },[orders])
            
    if(!auth.user) return null;
    return(
        <div className="relative min-h-screen md:flex">  {/* mobile menu bar */}
        <Modal/>
      <Notify/>
      <Headeruser/>
      {/* sidebar */}
     <Navbaradmin/>
      {/* content */}
    <div className="flex-1 p-10 text-2xl font-bold">
        <div className="my-3">
            <Head>
                <title>Detail Orders</title>
            </Head>

            <div>
                <button className="btn btn-dark" onClick={() => router.back()}>
                    <i className="fas fa-long-arrow-alt-left"  aria-hidden="true"></i> Go Back
                </button>
            </div>
            
            <OrderDetailAdmin orderDetail={orderDetail} state={state} dispatch={dispatch} />
        
        </div>
        </div></div>
    )
}

export default DetailOrder