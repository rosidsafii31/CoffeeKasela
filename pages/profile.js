import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import Link from 'next/link'
import valid from '../utils/valid'
import { patchData } from '../utils/fetchData'
import {imageUpload} from '../utils/imageUpload'
import Modal from '../components/Modal'
import Notify from '../components/Notify'
import Headeruser from '../components/headeruser'
import Navbaradmin from '../components/navbaradmin'

const Profile = () => {
    const initialSate = {
        avatar: '',
        name: '',
        akunbank: '',
        nomorwa: 0,
        password: '',
        cf_password: ''
    }
    const [data, setData] = useState(initialSate)
    const { avatar, name,nomorwa,akunbank, password, cf_password } = data

    const {state, dispatch} = useContext(DataContext)
    const { auth, notify, orders } = state

    useEffect(() => {
        if(auth.user) setData({...data, name: auth.user.name, akunbank: auth.user.akunbank,nomorwa: auth.user.nomorwa})
    },[auth.user])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({...data, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleUpdateProfile = e => {
        e.preventDefault()
        if(password){
            const errMsg = valid(name, auth.user.email, nomorwa,akunbank, password, cf_password)
            if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })
            updatePassword()
        }

        if(name !== auth.user.name || avatar ||nomorwa !== auth.user.nomorwa|| akunbank!== auth.user.akunbank) updateInfor()
    }

    const updatePassword = () => {
        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        patchData('user/resetPassword', {password}, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
            return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
        })
    }

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        if(!file)
            return dispatch({type: 'NOTIFY', payload: {error: 'file tidak boleh osong.'}})

        if(file.size > 1024 * 1024) //1mb
            return dispatch({type: 'NOTIFY', payload: {error: 'Image Lebih dari 1 Mb'}})

        if(file.type !== "image/jpeg" && file.type !== "image/png") //1mb
            return dispatch({type: 'NOTIFY', payload: {error: 'Format Img Salah'}})
        
        setData({...data, avatar: file})
    }

    const updateInfor = async () => {
        let media;
        dispatch({type: 'NOTIFY', payload: {loading: true}})

        if(avatar) media = await imageUpload([avatar])

        patchData('user', {
            name,nomorwa,akunbank, avatar: avatar ? media[0].url : auth.user.avatar
        }, auth.token).then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            dispatch({type: 'AUTH', payload: {
                token: auth.token,
                user: res.user
            }})
            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }


    if(!auth.user) return null;
    return( 
        <div className="relative min-h-screen md:flex">  {/* mobile menu bar */}
        <Modal/>
      <Notify/>
      <Headeruser/>
      {/* sidebar */}
     <Navbaradmin/>
      {/* content */}
    <div className="flex-1 p-10 text-2xl font-bold">
    <div className="profile_page">
            <Head>
                <title>Profile</title>
            </Head>
             
                <div className="mx-auto my-4 border-4 border-black " style={{maxWidth: '500px'}}>
                    <h3 className="text-center text-uppercase">
                        {auth.user.role === 'user' ? 'User Profile' : 'Admin Profile'}
                    </h3>

                    <div className="avatar">
                        <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} 
                        alt="avatar" />
                        <span>
                            <i className="fas fa-camera"  aria-hidden="true"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up"
                            accept="image/*" onChange={changeAvatar} />
                        </span>
                    </div>

                    <div className="form-group mx-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name} className="form-control"
                        placeholder="Your name" onChange={handleChange} />
                    </div>

                    <div className="form-group mx-2">
                        <label htmlFor="akunbank">Akun Bank</label>
                        <input type="text" name="akunbank" value={akunbank} className="form-control"
                        placeholder="Akun Bank" onChange={handleChange} />
                    </div>

                    <div className="form-group mx-2">
                        <label htmlFor="nomorwa">No Whatsapp</label>
                        <input type="text" name="nomorwa" value={nomorwa} className="form-control"
                        placeholder="No Whatsapp" onChange={handleChange} />
                    </div>

                    <div className="form-group mt-2 mx-2">
                        <label htmlFor="email ">Email</label>
                        <input type="text" name="email" defaultValue={auth.user.email} 
                        className="form-control mt-2" disabled={true} />
                    </div>

                    <div className="form-group mt-2 mx-2">
                        <label htmlFor="password ">New Password</label>
                        <input type="password" name="password" value={password} className="form-control mt-2"
                        placeholder="Your new password" onChange={handleChange} />
                    </div>

                    <div className="form-group mt-2 mx-2">
                        <label htmlFor="cf_password ">Confirm New Password</label>
                        <input type="password" name="cf_password" value={cf_password} className="form-control mt-2"
                        placeholder="Confirm new password" onChange={handleChange} />
                    </div>

                    <button className="btn btn-info mt-2 mx-2 mb-2" disabled={notify.loading}
                    onClick={handleUpdateProfile}>
                        Update
                    </button>
                </div> 
            

        </div>
        
      
      </div>
    </div>
        
    )
}

export default Profile