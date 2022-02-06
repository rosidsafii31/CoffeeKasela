import Link from 'next/link'
import {patchData,putData,getData} from '../utils/fetchData'
import {updateItem} from '../store/Actions'
import {useState, useContext, useEffect} from 'react'
import {useRouter} from 'next/router'


const OrderDetail = ({orderDetail, state, dispatch}) => {
    const {auth, orders} = state
    const initialState = {
        resi: '',
        jasapengiriman: '',
    }
    const [orderan, setResi] = useState(initialState)
    const {resi,jasapengiriman} = orderan

    const router = useRouter()
    const {id} = router.query
    const [onEdit, setOnEdit] = useState(false)
    useEffect(() => {
        if(id){
            setOnEdit(true)
            getData(`order/${id}`).then(res => {
                setResi(res.order)
            })
        }else{
            setOnEdit(false)
            setResi(initialState)
        }
    },[id])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setResi({...orderan, [name]:value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(auth.user.role !== 'admin') 
        return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not valid.'}})

        let res;
        if(onEdit){
            res = await putData(`order/${id}`, {...orderan}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }
        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        
    }


    if(!auth.user) return null;
    return(
        <>
        {
            orderDetail.map(order => (
            <div key={order._id} style={{margin: '20px auto'}} className="row justify-content-around">
                <div className="text-uppercase my-3" style={{maxWidth: '600px'}}>
                    <h2 className="text-2xl">Id Order {order._id}</h2>
                    <form className="row"  onSubmit={handleSubmit}>
                    <div className="mt-4 text-secondary">
                    <div className="col-md-6 p-3 border-4 border-black">
                    <input type="text" name="resi" value={resi}
                    placeholder="Masukkan No Resi" className="d-block w-100 form-control mb-2 "
                    onChange={handleChangeInput} />
                     <input type="text" name="jasapengiriman" value={jasapengiriman}
                    placeholder="Masukkan Jasa Pengiriman" className="d-block w-100 form-control mb-2 "
                    onChange={handleChangeInput} />
                    
  

                    <button type="submit" className="btn btn-info my-2 px-4 fw-bold">
                        {onEdit ? 'Update': 'Create'}
                    </button>
                    
                </div>
                
                    </div>
                    </form>
                </div>
             
            </div>
            ))
        }
        </>
    )
}

export default OrderDetail