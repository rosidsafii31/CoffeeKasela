import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { useRouter } from 'next/router'
import Link from 'next/link'
import OrderDetail from '../../components/OrderDetail'
import Navbaruser from '../../components/navbaruser'
import Headeruser from '../../components/headeruser'
import Modal from '../../components/Modal'
import Notify from '../../components/Notify'

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
     <Navbaruser/>
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
            
            <OrderDetail orderDetail={orderDetail} state={state} dispatch={dispatch} />
        </div>
        </div>
        </div>
    )
}

export default DetailOrder