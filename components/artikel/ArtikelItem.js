import Link from 'next/link';
import InfoPost from '../../components/InfoPost';
import { formatDate } from '../../utils/utils';
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'

export default function CardPost({artikel}) {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const userLink = () => {
        return(
            <>
                <Link href={`artikel/${artikel._id}`}>
                    <a className="btn btn-info"
                    style={{marginRight: '5px', flex: 1}}>View</a>
                </Link>
                <button className="btn btn-success"
                style={{marginLeft: '5px', flex: 1}}
                disabled={artikel.inStock === 0 ? true : false} 
                onClick={() => dispatch(addToCart(artikel, cart))} >
                    Buy
                </button>
            </>
        )
    }
    
    const adminLink = () => {
                return(
                    <>
                        <Link href={`/admin/createartikel/${artikel._id}`}>
                            <a className="btn btn-primary"
                            style={{marginRight: '5px', flex: 1}}>Edit</a>
                        </Link>
                        <button className="btn btn-danger"
                        style={{marginLeft: '5px', flex: 1}}
                        data-toggle="modal" data-target="#exampleModal"
                        onClick={() => dispatch({
                            type: 'ADD_MODAL',
                            payload: [{ 
                                data: '', id: artikel._id, 
                                title: artikel.title, type: 'DELETE_ARTIKEL' 
                            }]
                        })} >
                            Delete
                        </button>
                    </>
                )
            }
  return (

    <article className="shadow-2xl " >
      <Link href={`/artikel/${artikel._id}`}>
        <a>
          <img src={artikel.img[0].url} className="w-full  rounded mb-4" />
        </a>
      </Link>
      <InfoPost
          createdAt={formatDate(artikel.createdAt)}
          title = {artikel.title}
          content ={artikel.content}
      />
      <div className="row justify-content-between mx-0">
         {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
         </div>
    </article>
  );
}
