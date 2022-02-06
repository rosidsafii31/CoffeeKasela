import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { getKurir } from '../utils/fetchData'
import CartHistory from '../components/CartHistory'
import Navbaruser from '../components/navbaruser'
import Headeruser from '../components/headeruser'
import Modal from '../components/Modal'
import Notify from '../components/Notify'

const Curir = () => {
  const { state, dispatch } = useContext(DataContext)
  const { kurirs } = state

  const [kurir, setKurir] = useState('')
  const [awb, setAwb] = useState('')


  const handlePayment = async () => {
    if(!kurir || !awb)
    return dispatch({ type: 'NOTIFY', payload: {error: 'No Resi Salah'}})

    

    getKurir(kurir, awb)
    .then(res => {
        dispatch({ type: 'ADD_KURIRS', payload: [res] })
    //   if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })

    
    })
  }

    return(
      <div className="relative min-h-screen md:flex">  {/* mobile menu bar */}
            <Modal/>
            <Notify/>
            <Headeruser/>
            {/* sidebar */}
            <Navbaruser/>
            {/* content */}
        <div className="flex-1 p-10 text-2xl font-bold">
        <div className="row mx-auto">
        <Head>
          <title>Cart Page</title>
        </Head>

        <div className="col-md-4 text-xl font-bold table-responsive my-3">
          <form>
              <h2>Cek Resi </h2>

              <label htmlFor="kurir">Pilih Kurir</label>
              <br></br>
              <select className="form-control mb-2" value={kurir} onChange={e => setKurir(e.target.value)}>
                  <option hidden="hidden" selected="selected" value="default">
                    Pilih Kurir Pengantar
                  </option>
                  <optgroup label="Pilihan Kurir"  >
                    <option value="jne">JNE</option>
                    <option value="pos">POS Indonesia</option>
                    <option value="jnt">JNT</option>
                    <option value="sicepat">SiCepat</option>
                    <option value="tiki">Tiki</option>
                    <option value="anteraja">AnterAja</option>
                    <option value="ninja">Ninja</option>
                    <option value="ide">ID Express</option>
                    <option value="spx">Shopee Express</option>
                  </optgroup>
                </select>
              <label htmlFor="awb">Nomor Resi</label>
              <input type="text" name="awb" id="awb"
              className="form-control mb-2" value={awb}
              onChange={e => setAwb(e.target.value)} />
            </form>
            <button>
              <a className="btn btn-dark my-2" onClick={handlePayment}>Cek Resi</a>
              </button>
        </div>
        
        <div className="col-md-8 my-3 text-left text-uppercase text-base">
        <h2 className="text-uppercase">Shopping Cart</h2>
        <form>
        <table className="table-bordered  border-1 border-black table-hover w-100" id="table_id"
    style={{minWidth: '400px', cursor: 'pointer'}}>
        <thead className="bg-gray-700 font-weight-bold text-white">
            <tr>
            
                <th className="p-2">Nomor Resi</th>
                <th className="p-2">Kurir</th>
                <th className="p-2">Tanggal Pengiriman</th>
                <th className="p-2">Service Code</th>
            </tr>
        </thead>

        <tbody>
            {
                 kurirs.map(resi => (
                    <tr key={resi}>
                         <td className="p-2">
                             <a className='text-black font-semibold'>{resi.data.summary.awb}</a>
                        </td>
                        <td className="p-2">
                        <a className='text-black font-semibold'>{resi.data.summary.courier}</a>
                        </td>
                        <td className="p-2">
                        <a className='text-black font-semibold'>{resi.data.summary.date}</a>
                        </td>
                        <td className="p-2">
                        <a className='text-black font-semibold'>{resi.data.summary.service}</a>
                        </td>
                    </tr> 
                ))
            }
        </tbody>

    </table>
    <br></br>
    <table className="table-bordered  border-1 border-black table-hover w-100" id="table_id"
    style={{minWidth: '400px', cursor: 'pointer'}}>
        <thead className="bg-gray-700 font-weight-bold text-white">
            <tr>
                <th className="p-2">Pengirim</th>
                <th className="p-2">Asal</th>
                <th className="p-2">Penerima</th>
                <th className="p-2">Tujuan</th>
                <th className="p-2">Status</th>
            </tr>
        </thead>

        <tbody>
            {
                 kurirs.map(resi => (
                    <tr key={resi}>
                        <td className="p-2">
                        <a className='text-black font-semibold'>{resi.data.detail.shipper}</a>
                        </td>
                        <td className="p-2">
                        <a className='text-black font-semibold'>{resi.data.detail.origin}</a>
                        </td>
                        <td className="p-2">
                        <a className='text-black font-semibold'>{resi.data.detail.receiver}</a>
                        </td>
                        <td className="p-2">
                        <a className='text-black font-semibold'>{resi.data.detail.destination}</a>
                        </td>
                        <td className="p-2">
                        <a className='text-black font-semibold'>{resi.data.summary.status}</a>
                        </td>
                    </tr> 
                ))
            }
        </tbody>

    </table>
    <br></br>
    <table className="table-bordered  border-1 border-black table-hover w-100" id="table_id"
    style={{minWidth: '400px', cursor: 'pointer'}}>
        <thead className="bg-gray-700 font-weight-bold text-white">
            <tr>
                <th className="p-2">History</th>
            </tr>
        </thead>

        <tbody>
                  <CartHistory />
        </tbody>
    </table>
        </form>
            
            
        </div>
      </div>
      </div></div>
    )
  }
  
export default Curir