import Link from "next/link";
import { useState } from "react";
import Container from "../components/Container";
import {DataContext} from '../store/GlobalState'
import {useRouter} from 'next/router'
import React, { useContext } from 'react'
import Cookie from 'js-cookie'

export default function Navbar() {
  const router = useRouter()
    const {state, dispatch} = useContext(DataContext)
    const { auth, cart } = state


    const isActive = (r) => {
        if(r === router.pathname){
            return " active"
        }else{
            return ""
        }
    }
  const [offcavnas, setOffcanvas] = useState(false);

  const loggedRouter = () => {
    return(
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={auth.user.avatar} alt={auth.user.avatar} 
                style={{
                    borderRadius: '50%', width: '30px', height: '30px',
                    transform: 'translateY(-3px)', marginRight: '3px'
                }} /> {auth.user.name}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                {
                    auth.user.role === 'admin' && adminRouter()
                }
                {
                    auth.user.role === 'user' && userRouter()
                }
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
            </div>
        </li>
       
    )
}
const adminRouter = () => {
  return(
      <>
      <Link href="/profile">
            <a className="dropdown-item">Profile</a>
      </Link>
      </>
  )
}
const userRouter = () => {
  return(
      <>
      <Link href="/profiles">
            <a className="dropdown-item">Profiles</a>
      </Link>
      </>
  )
}
const handleLogout = () => {
  Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
  localStorage.removeItem('firstLogin')
  dispatch({ type: 'AUTH', payload: {} })
  dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'} })
  return router.push('/')
}
  return (
    <div className="py-8 lg:py-14">
      <nav className="lg:h-30 fixed top-0 inset-x-0 w-full bg-neutral-900 text-white ">
        <Container>
          <div className="flex items-center ">
            <div className="w-3/12 lg:hidden">
              <button onClick={() => setOffcanvas(!offcavnas)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.4">
                    <path
                      d="M3 12H21"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 6H21"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 18H21"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>
            </div>
            <div className="lg:w-2/12 w-6/12 ">
              <Link href="/">
                <a className="flex items-center justify-center  lg:justify-start ">
                  <img className=" object-contain" src="/logo.png" />
                </a>
              </Link>
            </div>
            
            <div
              className={`lg:w-8/12 w-full bg-neutral-900 lg:bg-none fixed lg:static top-0 h-full lg:h-auto p-10 lg:p-0 transition-all ${offcavnas ? "left-0" : "-left-full"
                }`}
            >
              <button
                className="absolute top-10 right-10 lg:hidden"
                onClick={() => setOffcanvas(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x text-gray-lightest"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <ul className=" text-white ml-10 lg:space-x-12 font-produk2 font-extrabold text-lg flex lg:items-center  flex-col lg:flex-row space-y-4 lg:space-y-0">
                <li>
                  <Link href="/">
                    <a className="hover:underline md:text-lg ">Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/produk">
                    <a className="hover:underline md:text-lg ">Product</a>
                  </Link>
                </li>
                <li>
                  <Link href="/artikel">
                    <a className="hover:underline md:text-lg">Artikel</a>
                  </Link>
                </li>
                <li>
                  <Link href="/profilkasela">
                    <a className="hover:underline md:text-lg">Profil Kasela</a>
                  </Link>
                </li>
              <Link href="/cart">
                            <li className={"nav-item " + isActive('/cart')}>
                                <i className="fas fa-shopping-cart  position-relative" style={{color:"#fff"}} aria-hidden="true">
                                    <span className="position-absolute"
                                    style={{
                                        padding: '3px 6px',
                                        background: '#ed143dc2',
                                        borderRadius: '50%',
                                        top: '-10px',
                                        right: '-10px',
                                        color: '#ffffff',
                                        fontSize: '14px'
                                    }}>
                                        {cart.length}
                                    </span>
                                </i>
                                 <a className="md:text-lg ml-2" style={{color:"#fff"}}>Cart</a>
                            </li>
                        </Link>
                        <li>
                        {
                        Object.keys(auth).length === 0 
                        ? <li className="nav-item">
                            <Link href="/logins">
                                <a className={"nav-link" + isActive('/logins')}>
                                    <i className="fas fa-user" aria-hidden="true"></i> 
                                    <a className="md:text-lg ml-2"  style={{color:"#fff"}}>Sign in</a>
                                </a>
                            </Link>
                        </li>
                        : loggedRouter()
                    }
                    </li>
                     </ul>
            </div>
            
          </div>
        </Container>
      </nav>
    </div>
  );
}
