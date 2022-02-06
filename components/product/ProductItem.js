import Link from 'next/link';
import InfoProduk from '../InfoProduk';
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'

export default function CardProduk({product}) {
   const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const userLink = () => {
        return(
            <>
                <Link href={`product/${product._id}`}>
                    <a className="btn btn-info"
                    style={{marginRight: '5px', flex: 1}}>View</a>
                </Link>
                <button className="btn btn-success"
                style={{marginLeft: '5px', flex: 1}}
                disabled={product.inStock === 0 ? true : false} 
                onClick={() => dispatch(addToCart(product, cart))} >
                    Buy
                </button>
            </>
        )
    }
    
    const adminLink = () => {
                return(
                    <>
                        <Link href={`/admin/createproduk/${product._id}`}>
                            <a className="btn btn-primary font-bold"
                            style={{marginRight: '5px', flex: 1}}>Edit</a>
                        </Link>
                        <button className="btn btn-danger"
                        style={{marginLeft: '5px', flex: 1}}
                        data-toggle="modal" data-target="#exampleModal"
                        onClick={() => dispatch({
                            type: 'ADD_MODAL',
                            payload: [{ 
                                data: '', id: product._id, 
                                title: product.title, type: 'DELETE_PRODUCT' 
                            }]
                        })} >
                            Delete
                        </button>
                    </>
                )
            }
        


  return (
    <article className="bg-green-400 p-10 " >
      <Link href={`/product/${product._id}`} >
        <div className="border-solid border-4 border-green-900 " >
          <img src={product.img[0].url} className="w-full  max-h-40 object-contain content-center mt-3 mb-3" />
        </div>
      </Link>
      <InfoProduk
      title = {product.title}
      harga ={`Rp.${product.harga}`}
      
      />
       <div className="row justify-content-between mx-0">
         {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
         </div>
    </article>
  );
}




// import { addToCart } from '../../store/Actions'
// import 'bootstrap/dist/css/bootstrap.min.css'



   

//     const adminLink = () => {
//         return(
//             <>
//                 <Link href={`/admin/create/${product._id}`}>
//                     <a className="btn btn-info"
//                     style={{marginRight: '5px', flex: 1}}>Edit</a>
//                 </Link>
//                 <button className="btn btn-danger"
//                 style={{marginLeft: '5px', flex: 1}}
//                 data-toggle="modal" data-target="#exampleModal"
//                 onClick={() => dispatch({
//                     type: 'ADD_MODAL',
//                     payload: [{ 
//                         data: '', id: product._id, 
//                         title: product.title, type: 'DELETE_PRODUCT' 
//                     }]
//                 })} >
//                     Delete
//                 </button>
//             </>
//         )
//     }

//     return(
//         <div className="card" style={{ width: '18rem' }}>
//             <img className="card-img-top" src={product.img[0].url} alt={product.img[0].url} />
//             <div className="card-body">
//                 <h5 className="card-title text-capitalize" title={product.title}>
//                     {product.title}
//                 </h5>

//                 <div className="row justify-content-between mx-0">
//                     <h6 className="text-danger">${product.harga}</h6>
//                 </div>

//                 <p className="card-text" title={product.description}>
//                     {product.description}
//                 </p>
                    
//                 <div className="row justify-content-between mx-0">
//                     {!auth.user || auth.user.role !== "user" ? userLink() : adminLink()}
//                 </div>
//             </div>
//         </div>
//     )
// }


// export default ProductItem