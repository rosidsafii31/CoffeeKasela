import Link from 'next/link'
import { useState, useContext, useEffect } from 'react'
import {DataContext} from '../../store/GlobalState'
import Headeruser from '../../components/headeruser'
import Modal from '../../components/Modal'
import Notify from '../../components/Notify'
import Navbaradmin from '../../components/navbaradmin'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Pemesanan() {

    const {state, dispatch} = useContext(DataContext)
    const { auth, notify, orders } = state

    return (
        <div className="relative min-h-screen md:flex ">  {/* mobile menu bar */}
      <Modal/>
    <Notify/>
    <Headeruser/>
    {/* sidebar */}
   <Navbaradmin/>
    {/* content */}
  <div className="flex-1 text-base font-bold">
  <h3 className="text-uppercase text-center mt-1">Riwayat Orderan</h3>

<div className="my-3 table-responsive">
        <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls btn btn-success mb-3"
                    table="table_id"
                    filename="Laporanorder"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
    <table className="table-bordered  border-1 border-black table-hover w-100" id="table_id"
    style={{minWidth: '400px', cursor: 'pointer'}}>
        <thead className="bg-gray-700 font-weight-bold text-white">
            <tr>
                <th className="p-2">Tanggal Order</th>
                <th className="p-2">Id Order</th>
                <th className="p-2">User</th>
                <th className="p-2">Email</th>
                <th className="p-2">No Whatsapp</th>
                <th className="p-2">No Resi</th>
                <th className="p-2">Nama Barang</th>
                <th className="p-2">Harga</th>
                <th className="p-2">Jumlah</th>
                <th className="p-2">Total</th>
                <th className="p-2">Action</th>
            </tr>
        </thead>

        <tbody>
            {
                orders.map(order => (
                   
                    <tr key={order._id}>
                         <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                         <td className="p-2">
                            <a>{order._id}</a>
                        </td>
                        <td className="p-2">
                            <a>{order.user.name}</a>
                        </td>
                        <td className="p-2">
                            <a>{order.user.email}</a>
                        </td>
                        <td className="p-2">{order.user.nomorwa}</td>

                        <td className="p-2">
                            <div>{order.jasapengiriman}</div>
                            <div>{order.resi}</div>
                            </td>

                        <td className="p-2">
                        {
                        order.cart.map(item => (
                        <div key={item._id}>
                            <div>{item.title}</div>
                        </div>
                            ))
                        }
                        </td>
                        <td className="p-2">
                        {
                        order.cart.map(item => (
                        <div key={item._id}>
                            <div>{item.harga}</div>
                        </div>
                            ))
                        }
                        </td>
                        <td className="p-2">
                        {
                        order.cart.map(item => (
                        <div key={item._id}>
                            <div>{item.jumlah}</div>
                        </div>
                            ))
                        }
                        </td>
                        <td className="p-2">
                        <a>{order.total}</a>
                        </td>
                        <td className="p-2">
                        <form method="get" action={`/orderadmin/${order._id}`}>
                        <button className="btn btn-dark" type="submit">Kirim No Resi </button>
                        </form>
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

export default Pemesanan

