import {useRouter} from 'next/router';
import CardPost from '../components/CardPost';
import SectionHeader from '/components/SectionHeader';
import Container from '../components/Container'
import Head from 'next/head';
import {getData } from '../utils/fetchData'
 import Layout from '../components/Layout';
 import {useState, useContext, useEffect} from 'react'
 import filterSearch from '../utils/filterSearch';

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
    <Layout >
      <Head>
        <title>Artikel &mdash; Artikel</title>
      </Head>
        <SectionHeader>ARTIKEL</SectionHeader>
        <Container>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {artikel.map(artikel => {
            return(
            <div key={artikel._id} className="md:w-12/12 w-full  px-4 py-6">
              <CardPost artikel={artikel} />   
            </div>
          )})}
      </div>
      {
              result < page * 6 ? ""
              : <button className='btn btn-info d-block mx-auto mb-4 mt-5'
              onClick={handlerSelanjutnya}>
                Selanjutnya
                </button>
            }
      </Container>
    </Layout>
  );
}
