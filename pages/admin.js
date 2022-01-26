import React, { useContext } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {DataContext} from '../store/GlobalState'
import Cookie from 'js-cookie'
import nookies from 'nookies' 
import Headeruser from '../components/headeruser'
import Modal from '../components/Modal'
import Notify from '../components/Notify'
import Navbaradmin from '../components/navbaradmin'

export async function getServerSideProps (ctx) {
    const cookies = nookies.get(ctx);

    if(!cookies.refreshtoken){
        return {
            redirect: {
                destination: '/login'
            }
        }
    }
    return {
        props:{}
    }
}


function NavBar() {
    return (
        <div className="relative min-h-screen md:flex bg-halaman-loginadmin">  {/* mobile menu bar */}
      <Modal/>
    <Notify/>
    <Headeruser/>
    {/* sidebar */}
   <Navbaradmin/>
    {/* content */}
  <div className="flex-1 p-10 text-2xl font-bold">
    
    
    </div>
  </div>
    )
}

export default NavBar
