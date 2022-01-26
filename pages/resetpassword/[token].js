import Head from 'next/head'
import Link from 'next/link'
import {useState, useContext, useEffect} from 'react'
import {putDataa} from '../../utils/fetchData'
import Layouts from '../../components/Layouts'
import {useRouter} from 'next/router';

const Lupapassword = () => {

    const[password,setPassword] = useState('');
    const[erorpassword,setErorPassword] = useState('');
    const[confirmpassword,setConfirmPassword] = useState('');
    const[erorconfirmpassword,setErorConfirmPassword] = useState('');

    const changePassword = (e) => {
        
        const value = e.target.value
        setPassword(value)
        if(!value) {
            setErorPassword('Password baru tidak boleh kosong')
        }else {
            setErorPassword('')
        }
    }

    const changeConfirmassword = (e) => {
        const value = e.target.value
        setConfirmPassword(value)
        if(!value) {
            setErorConfirmPassword(' Ulangi password tidak boleh kosong')
        }else if (password !== value) {
            setErorConfirmPassword(' Password tidak cocok')
        } else {
            setErorConfirmPassword('')
        }
    }
    

    const simpan = () => {
      const token = jsonwebtoken.sign({
        iduser: user._id
    }, process.env.ACCESS_TOKEN_SECRET)
        const data = {
            password : password,
            token: token,
        }
        putDataa('resettpassword', data)
        .then(res => {
          console.log(res)
       })
    }

    return(
      <Layouts>
      <div>
        <Head>
          <title>Sign in Page</title>
        </Head>
      
        <form className="mx-auto my-4 border-3 p-3" style={{maxWidth: '500px'}} >
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password Baru</label>
            <input type="password" className="form-control mt-2" id="exampleInputPassword1"
            name="password" value={password} onChange={changePassword} />
            {
                erorpassword && (
                    <p className='text-danger'>{erorpassword}</p>
                )
            }
          </div>
          <div className="form-group  mt-2">
            <label htmlFor="exampleInputPassword1"> Ulangi Password Baru</label>
            <input type="password" className="form-control  mt-2" id="exampleInputPassword2"
            name="password" value={confirmpassword} onChange={changeConfirmassword} />
             {
                    erorconfirmpassword && (
                    <p className='text-danger'>{erorconfirmpassword}</p>
                )
            }
          </div>
      
          <button onClick={simpan} className="btn btn-dark w-100  mt-3">Simpan</button>
        </form>
      </div>
      </Layouts>
    )
  }
  
  export default Lupapassword