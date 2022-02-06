import Head from 'next/head';
import Layout from '../../components/Layout';
import {getData } from '../../utils/fetchData'
import { useState } from 'react';
import Link from 'next/link';
import React, { useContext } from 'react'
import {useRouter} from 'next/router'
import {DataContext} from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import Notify from '../../components/Notify';

export async function getServerSideProps({ params : {id}}) {
  const res = await getData(`products/${id}`)
  return {
    props: {
      product:res.products,
    }, // will be passed to the page component as props
  }
}

export default function Detail({product}) {

  const {state, dispatch} = useContext(DataContext)
    const { auth, cart } = state

  return (
    <Layout >
      <Head>
        <title>{product.title} &mdash; Epictetus</title>
      </Head>
      <Notify/>
      <div className=" grid grid-cols-1 md:grid-cols-3 col-span-2 gap-10 px-10 py-10 bg-white ">
        <div className="my-5">
          <img
            className=" h-auto w-full object-contain content-center border-solid border-8 border-black p-3"
            src={product.img[0].url
            }
          />
        </div>
        <div className=" text-black my-5">
          <div className="text-4xl pb-5 font-produk4 ">{product.title}</div>
          <div className="text-base pb-4 font-produk2 ">{product.deskripsi}</div>
          <div className="text-xl pb-3 font-produk2 ">{product.berat}</div>
          <div className="text-4xl pb-3 font-produk4 ">{`Rp.${product.harga}`}</div>
          <div>
          <button  onClick={() => dispatch(addToCart(product, cart))} 
            className="px-5 py-3  text-black  bg-orange-500 hover:bg-orange-600 font-produk2 font-bold tracking-wider rounded"
          >
            Masuk Keranjang
          </button>
          </div>
          <div className='mt-3'>
          <Link href="/produk" >
                <button className="font-produk2 font-bold flex items-center justify-center px-5 py-3 rounded-md text-black hover:text-white  bg-blue-700 hover:bg-blue-600">
          Produk Lain
                </button>
                </Link>
        </div>
        </div>
      </div>
    </Layout>
  );
}
