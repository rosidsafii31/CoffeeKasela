import Head from 'next/head';
import {getData } from '../../utils/fetchData'
import ProductItem from '../../components/product/ProductItem'
import Headeruser from '../../components/headeruser'
import Modal from '../../components/Modal'
import Notify from '../../components/Notify'
import Link from 'next/link'
import React, { useContext } from 'react'
import Navbaradmin from '../../components/navbaradmin';

export async function getServerSideProps({query}){
  const sort = query.sort || ''
  const page = query.page || 1

  const res = await getData(`products?limit=${page * 8}&sort=${sort}`)

  return {
    props:{
      product:res.product,
      result:res.result,
    },
  }                                     
}

export default function ProdukHome({product}) {

  return (
    <div className="relative min-h-screen md:flex bg-slate-900">  {/* mobile menu bar */}
      <Modal/>
    <Notify/>
    <Headeruser/>
    {/* sidebar */}
    <Navbaradmin/>
    {/* content */}
  <div className="flex-1 p-3 text-2xl font-bold">
  <Head>
        <title>Produk &mdash; Produk</title>
      </Head>
        <div className="bg-gray-hitam pb-10 ">
        <div className="rounded-md shadow ml-5 ">
        <Link href="/admin/createproduk" >
                <a className="w-25 font-produk2 flex items-center justify-center px-5 py-3 border border-transparent text-lg rounded-md text-white bg-orange-500 hover:bg-orange-600 ">
            Tambah Produk
                </a>
                </Link>
              </div>
        <div className="grid grid-cols-1 md:grid-cols-4">
        {product.map(product => (
            <div key={product._id} className="md:w-12/12 w-full  px-4 py-6">
              <ProductItem product={product} />   
            </div>
            ))}
          </div>
          
          {/* <div className=" flex justify-center space-x-4  ">
          <button className='bg-gray-darkl hover:bg-gray text-xl font-produk3 p-2 rounded-lg' 
          onClick={() => router.push(`/produk/?page=${page - 1}`)} 
          disabled={page <= 1}>Previous</button>
          <button className='bg-gray-darkl hover:bg-gray text-xl font-produk3 p-2 rounded-lg'
          onClick={() => router.push(`/produk/?page=${page + 1}`)}
          disabled={page >= lastpage}>Next</button>
          </div> */}

          </div>
    
    </div>
  </div>
    );
}
