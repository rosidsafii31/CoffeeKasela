import Head from 'next/head'
import CardPost from '../components/CardPost';
import {getData } from '../utils/fetchData'
import CardProduk from '../components/CardProduk';
import FeaturedPost from '../components/FeaturedPost'
import Link from 'next/link';
import Layout from '../components/Layout';
import { useState } from 'react';
export async function getServerSideProps({query}) {
  const sort = query.sort || ''
  const page = query.page || 1

  const res = await getData(`products?limit=${page * 4}&sort=${sort}`)
  const ress = await getData(`artikels?limit=${page * 6}&sort=${sort}`)

  return {
    props: {
      product:res.product,
      result:res.result,
      artikel:ress.artikel,
      result:ress.result
    }, // will be passed to the page component as props
  }
}

export default function Home({product,artikel}) {
  // const [products, setProducts] = useState(props.products)
  return (
    <Layout>
      <Head>
        <title>Home &mdash; COFFEE KASELA</title>
        </Head>
         <FeaturedPost/>
        <div className="">
        <div className=" bg-slate-900  pb-2 ">
        <p className="pt-24 pb-3 text-center font-produkjudul text-white text-4xl">KOPI KASELA GOMBENGSARI </p>
        <div className=" flex justify-end mr-5 pt-1 ">
          <button className=" bg-zinc-100 hover:bg-zinc-300  text-black font-bold py-2 px-4 border rounded">
          <Link href="/produk"><a className=" text-auto md:text-center font-produk2">PRODUK LAINNYA</a></Link>
          </button>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-4">
        {product.map(product => (
            <div key={product._id} className="md:w-12/12 w-full  px-4 py-6">
              <CardProduk product={product} />   
            </div>
            ))}
          </div>
        </div>
        </div>
        <div className=" container-fluid  bg-white  px-5 pb-5  mt-6">
        <p className="pt-2 text-center text-black font-produkjudul text-gray-hitam text-4xl ">ARTIKEL </p>
        <div className=" flex justify-end mr-5 pt-1 ">
          <button className=" bg-gray-800 hover:bg-gray-400 text-white hover:text-black font-bold py-2 px-4 border rounded">
          <Link href="/artikel"><a className=" text-auto md:text-center font-produk2">Read More</a></Link>
          </button>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {artikel.map(artikel => {
            return(
            <div key={artikel._id} className="md:w-12/12 w-full  px-4 py-6">
              <CardPost artikel={artikel} />   
            </div>
          )})}
      </div>
    
        </div> 
    </Layout>
  )
}
