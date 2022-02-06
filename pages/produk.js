import CardProduk from '../components/CardProduk';
import SectionHeaderproduk from '../components/SectionHeaderproduk';
import Head from 'next/head';
import Layout from '../components/Layout';
import {useRouter} from 'next/router';
import {getData } from '../utils/fetchData'
import {useState, useContext, useEffect} from 'react'
import filterSearch from '../utils/filterSearch';

export async function getServerSideProps({ query}){
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

export default function Produk({product, result}) {
   const[page, setPage] = useState(1)
  const router = useRouter()

   const handlerSelanjutnya =() => {
    setPage(page+1)
    filterSearch({router, page : page + 1})
   }

  return (
    <Layout>
      <Head>
        <title>Produk &mdash; Produk</title>
      </Head>
        <SectionHeaderproduk>PRODUCT</SectionHeaderproduk>
        <div className=" bg-white  pb-10 ">
        <a className="text-center font-produkjudul text-white text-4xl"></a>
        <div className="grid grid-cols-1 md:grid-cols-4">
        {product.map(product => (
            <div key={product._id} className="md:w-12/12 w-full  px-4 py-6">
              <CardProduk product={product} />   
            </div>
            ))}
          </div>
          <div className='flex justify-center'>{
              result < page * 8 ? ""
              : <button className='bg-blue-700 hover:bg-blue-600 d-block px-5 py-3 mt-2 text-white'
              onClick={handlerSelanjutnya}>
                Selanjutnya
                </button>
            }</div>
            
          </div>
    </Layout>
  );
}
