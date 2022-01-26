import SectionHeader from '../components/SectionHeader';
import Head from 'next/head';
import  Container  from '../components/Container';
import Layout from '../components/Layout';
import {getData } from '../utils/fetchData'
import { useState } from 'react';

export async function getServerSideProps(){

  const res = await getData('profilkaselas')

  return {
    props:{
      profilkasela:res.profilkasela,
    },
  }                                     
}

export default function Profilkasela({profilkasela}) {

  return (
    <Layout>
      <Head>
        <title>ProfilKasela &mdash; Profilkasela</title>
      </Head>
        <SectionHeader>Profil Kasela</SectionHeader>
        <Container>
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
    </Layout>
  );
}
