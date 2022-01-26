import Link from 'next/link';
import Head from 'next/head';
import  Container  from '../../components/Container';
import Layouts from '../../components/layoutss';
import {getData } from '../../utils/fetchData'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'

export async function getServerSideProps(){

  const res = await getData('profilkaselas')

  return {
    props:{
      profilkasela:res.profilkasela,
    },
  }                                     
}

export default function Profilkasela({profilkasela}) {
console.log(profilkasela);
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state



    const userLink = () => {
        return(
            <>
                <Link href={`profilkasela/${profilkasela._id}`}>
                    <a className="btn btn-info"
                    style={{marginRight: '5px', flex: 1}}>View</a>
                </Link>
                <button className="btn btn-success"
                style={{marginLeft: '5px', flex: 1}}
                disabled={profilkasela.inStock === 0 ? true : false} 
                onClick={() => dispatch(addToCart(product, cart))} >
                    Buy
                </button>
            </>
        )
    }
    
    const adminLink = () => {
                return(
                    <>
                        {/* <Link href={`/admin/createprofil/${profilkasela[0]._id}`}>
                            <a className="btn btn-info"
                            style={{marginRight: '5px', flex: 1}}>Edit</a>
                        </Link> */}
                        <button className="btn btn-danger"
                        style={{marginLeft: '5px', flex: 1}}
                        data-toggle="modal" data-target="#exampleModal"
                        onClick={() => dispatch({
                            type: 'ADD_MODAL',
                            payload: [{ 
                                data: '', id: profilkasela._id, type: 'DELETE_PROFIL' 
                            }]
                        })} >
                            Delete
                        </button>
                    </>
                )
            }
        
  return (
    <Layouts>
      <Head>
        <title>ProfilKasela &mdash; Profilkasela</title>
      </Head>
        <Container>
        <div className="row justify-content-between mx-0">
         {!auth.user || auth.user.role !== "user" ? userLink() : adminLink()}
         </div>
      <img
        className=" pb-2 bg-cover max-h-[32rem] w-full md:w-full mb-3 md:mb-0"
        src={profilkasela[0].img[0].url}
      />
    <div className="grid grid-cols-1 md:grid-cols-2">
    <div className="text-black text-2xl">
    <img
        className=" 2xl:h-[350] xl:h-[350] lg:h-[300] md:h-[200] pb-3 bg-cover w-auto md:w-full mb-4 md:mb-0"
        src={profilkasela[0].img[1].url}
    />
    </div>
    <div className=" pl-2 font-produk2 prose prose-base  whitespace-normal break-all">
    {profilkasela[0].content1}    
    </div> 
    </div>
    <div className="grid grid-cols-1  md:grid-cols-2">
    <div className="prose prose-base font-produk2 max-w-none text-gray-black pr-2  whitespace-normal break-all">
    {profilkasela[0].content2}    
    </div> 
    <img
        className=" 22xl:h-[350] xl:h-[350] lg:h-[300] md:h-[200] bg-cover w-auto md:w-full mb-4 md:mb-0"
        src={profilkasela[0].img[2].url}
    />
    </div>
    <div className="">
      <img
        className=" pt-2 w-full  max-h-[38rem] md:w-full mb-4 md:mb-0"
        src={profilkasela[0].img[3].url}
      />
    </div>
    <div className=" mb-6 prose prose-base  font-produk2 max-w-none text-gray-black pr-2  whitespace-normal break-all">
    {profilkasela[0].content3} 
    </div>   
        </Container>
    </Layouts>
  );
}
