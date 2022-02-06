import Head from 'next/head';
import Layouts from '../../components/layoutss';
import {getData } from '../../utils/fetchData'
import ArtikelItem from '../../components/artikel/ArtikelItem'
import Headeruser from '../../components/headeruser'
import Modal from '../../components/Modal'
import Notify from '../../components/Notify'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState, useContext, useEffect} from 'react'
import filterSearch from '../../utils/filterSearch';
import Navbaradmin from '../../components/navbaradmin';

export async function getServerSideProps({ query }) {
  const sort = query.sort || ''
  const page = query.page || 1
  
  const ress = await getData(`artikels?limit=${page * 6}&sort=${sort}`)
  
return {
    props:{
      artikel:ress.artikel,
      result:ress.result,
      
    },
  }                                     
}


export default function Artikel({artikel,result}) {
  const[page, setPage] = useState(1)
  const router = useRouter()

   const handlerSelanjutnya =() => {
    setPage(page+1)
    filterSearch({router, page : page + 1})
   }
  return (
    <div className="relative min-h-screen md:flex ">  {/* mobile menu bar */}
    <Modal/>
  <Notify/>
  <Headeruser/>
  {/* sidebar */}
 <Navbaradmin/>
      {/* content */}
      <div className="flex-1 p-3 text-2xl font-bold">
        <Head>
        <title>Artikel &mdash; Artikel</title>
      </Head>
      <div className="rounded-md shadow ml-5 ">
      <Link href="/admin/createartikel" >
                <a className="w-25 font-produk2 flex items-center justify-center px-5 py-3 border border-transparent text-lg rounded-md text-white bg-blue-700 hover:bg-blue-600  ">
            Tambah Artikel
                </a>
                </Link>
                </div>      
      <div className="grid grid-cols-1 md:grid-cols-3">
          {artikel.map(artikel => {
            return(
            <div key={artikel._id} className="md:w-12/12 w-full  px-4 py-6">
              <ArtikelItem artikel={artikel} />   
            </div>
          )})}
       </div>
       <div className='flex justify-center '>{
              result < page * 6 ? ""
              : <button className='bg-blue-700 hover:bg-blue-600 font-produk2 text-lg rounded-md d-block px-5 py-3 mt-2 text-white'
              onClick={handlerSelanjutnya}>
                Selanjutnya
                </button>
            }</div>

  </div>
</div>
      
  );
}
