import Head from 'next/head';
import Layouts from '../../components/layoutss';
import {getData } from '../../utils/fetchData'
import ArtikelItem from '../../components/artikel/ArtikelItem'
import Headeruser from '../../components/headeruser'
import Modal from '../../components/Modal'
import Notify from '../../components/Notify'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {DataContext} from '../../store/GlobalState'
import React, { useContext } from 'react'
import Navbaradmin from '../../components/navbaradmin';

export async function getServerSideProps() {
  const ress = await getData('artikels')
  
return {
    props:{
      artikel:ress.artikel,
      result:ress.result,
    },
  }                                     
}


export default function Artikel({artikel}) {
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
                <a className="w-25 font-produk2 flex items-center justify-center px-5 py-3 border border-transparent text-lg rounded-md text-white bg-orange-500 hover:bg-orange-600 ">
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
          {/* <div className=" flex justify-center space-x-4 mb-10 ">
          <button className='bg-gray-darkl hover:bg-gray text-xl font-produk3 p-2 rounded-lg' 
          onClick={() => router.push(`/artikel/?page=${page - 1}`)} 
          disabled={page <= 1}>Previous</button>
          <button className='bg-gray-darkl hover:bg-gray text-xl font-produk3 p-2 rounded-lg'
          onClick={() => router.push(`/artikel/?page=${page + 1}`)}
          disabled={page >= lastpage}>Next</button>
          </div> */}
      
  </div>
</div>
      
  );
}
