import Modal from '../components/Modal'
import Notify from '../components/Notify'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/CartItem'
import Link from 'next/link'
import { postCurir, getOngkirkota, postData } from '../utils/fetchData'
import { useRouter } from 'next/router'
import Navbaruser from '../components/navbaruser'
import Headeruser from '../components/headeruser'

// export async function getServerSideProps() {
//   const res = await  getOngkirkota()

//   return {
//     props: {
//       res,
//     }, // will be passed to the page component as props
//   }
// }


const Cart = ({ress,res}) => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth, orders } = state

  const [total, setTotal] = useState(0)

  // const [asal, setOngkirasal] = useState('')
  // const [ongkirtujuan, setOngkirtujuan] = useState('')
  // const [berat, setBerat] = useState('')



  const router = useRouter()

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + (item.harga * item.jumlah)
      },0)

      setTotal(res)
    }

    getTotal()
  },[cart])
  

//   const handleOngkir = async () => {

//     dispatch({ type: 'NOTIFY', payload: {loading: true} })

//     postCurir({ asal, ongkirtujuan,berat})
//     .then(res => {
//       console.log(res)
//   })
// }
  
  const handlePayment = async () => {

    dispatch({ type: 'NOTIFY', payload: {loading: true} })

    postData('order', { cart, total,}, auth.token)
    .then(res => {
      if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })

      dispatch({ type: 'ADD_CART', payload: [] })
      
      const newOrder = {
        ...res.newOrder,
        user: auth.user,
        
      }
   
      dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
      dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
      return router.push(`/pesanan/${res.newOrder._id}`)
    })
  
  }

  if( cart.length === 0 )
  return <Link href="/"><img className="" src="/empty_cart.jpg" alt="not empty"/></Link>
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
  <p className='text-base text-red-600'> !!! Silahkan Login terlebih dahulu sebelum melanjutkaan ke pembayaran jika belum memiliki akun silahkan register terlebih dahulu !!!</p>
        <div className="col-md-8 text-secondary table-responsive my-3">
          <h2 className="text-uppercase">Keranjang Belanjaan</h2>

          <table className="table my-3">
            <tbody>
              {
                cart.map(item => (
                  <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                ))
              }
            </tbody>
          </table>
        </div>

        <div className="col-md-4 my-3 text-right text-uppercase text-secondary">
            <form>
              <h2>Pembayaran</h2>
            </form>
            {/* <label htmlFor="address" className='mb-2'>Kota Asal</label>
            <br></br>
            <select className="w-64 text-xl border-1" placeholder="Pembayaran">
                  <option hidden="hidden" value="0">Pilih Kota</option>
                {res.rajaongkir.results.map(ongkirkota => (
                  <option key={ongkirkota._id} value={ongkirkota.city_name} onChange={e => setOngkirasal(e.target.value)}>
                    {ongkirkota.city_name}
                    
                  </option>
                ))
              } 
                </select>
                <br></br>
                <label htmlFor="address" className='mb-2'>Kota Tujuan</label>
            <br></br>
            <select className="w-64 text-xl border-1" placeholder="Pembayaran">
                  <option hidden="hidden" value="0">Pilih Kota</option>
                {res.rajaongkir.results.map(ongkirkota => (
                  <option key={ongkirkota._id} value={ongkirkota.city_name} onChange={e => setOngkirtujuan(e.target.value)} >
                    {ongkirkota.city_name}
                  </option>
                ))
              } 
                </select>
              <br></br>
              <label htmlFor="berat">Berat Barang</label>
              <input type="text" name="berat" id="berat"
              className="form-control mb-2" value={berat}
              onChange={e => setBerat(e.target.value)} />

              <Link href={auth.user ? '#!' : '/logins'}>
              <a className="btn btn-dark my-2" onClick={handleOngkir}>Cek ongkir</a>
            </Link> */}
             <div className='mt-4'>
            <h3>Total: <span className="text-danger">{total}</span></h3>

            <Link href={auth.user ? '#!' : '/logins'}>
              <a className="btn btn-dark my-2" onClick={handlePayment}>Bayar</a>
            </Link>
            </div>   
        </div>
      </div>
      
  </div>
</div>
    )
  }
  
export default Cart