import Head from 'next/head'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../../../store/GlobalState'
import {imageUpload} from '../../../utils/imageUpload'
import {postData, getData, putData} from '../../../utils/fetchData'
import {useRouter} from 'next/router'
import Headeruser from '../../../components/headeruser'
import Modal from '../../../components/Modal'
import Notify from '../../../components/Notify'
import Link from 'next/link'
import Navbaradmin from '../../../components/navbaradmin'

const ProductsManager = () => {
    const initialState = {
        content1: '',
        content2: '',
        content3: '',
    }
    const [profilkasela, setProfilkasela] = useState(initialState)
    const {content1, content2, content3} = profilkasela

    const [img, setImages] = useState([])

    const {state, dispatch} = useContext(DataContext)
    const { auth,cart} = state

    const router = useRouter()
    const {id} = router.query
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if(id){
            setOnEdit(true)
            getData(`profilkaselas/${id}`).then(res => {
                setProfilkasela(res.profilkaselas)
                setImages(res.profilkaselas.img)
            })
        }else{
            setOnEdit(false)
            setProfilkasela(initialState)
            setImages([])
        }
    },[id])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setProfilkasela({...profilkasela, [name]:value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUploadInput = e => {
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if(files.length === 0) 
        return dispatch({type: 'NOTIFY', payload: {error: 'FIle tidak tersedia'}})

        files.forEach(file => {
            if(file.size > 1024 * 1024)
            return err = 'file levih dari 1 mb'

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return err = 'format img harus jpg.'

            num += 1;
            if(num <= 5) newImages.push(file)
            return newImages;
        })

        if(err) dispatch({type: 'NOTIFY', payload: {error: err}})

        const imgCount = img.length
        if(imgCount + img.length > 5)
        return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 5 images.'}})
        setImages([...img, ...newImages])
    }

    const deleteImage = index => {
        const newArr = [...img]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(auth.user.role !== 'admin') 
        return dispatch({type: 'NOTIFY', payload: {error: 'Authentication salah'}})

        if(!content1 || !content2 || !content3 || img.length === 0)
        return dispatch({type: 'NOTIFY', payload: {error: 'isi semua form'}})

    
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = img.filter(img => !img.url)
        const imgOldURL = img.filter(img => img.url)

        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)

        let res;
        if(onEdit){
            res = await putData(`profilkaselas/${id}`, {...profilkasela, img: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }else{
            res = await postData('profilkaselas', {...profilkasela, img: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }

        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        
    }

    const isActive = (r) => {
        if(r === router.pathname){
            return " active"
        }else{
            return ""
        }
    }
  
    const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
        dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'} })
        return router.push('/')
    }
  
    const adminRouter = () => {
        return(
            <>
            <Link href="/user">
                <a className="dropdown-item">User</a>
            </Link>
            </>
        )
    }
  
    const loggedRouter = () => {
        return(
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={auth.user.avatar} alt={auth.user.avatar} 
                    style={{
                        borderRadius: '50%', width: '30px', height: '30px',
                        transform: 'translateY(-3px)', marginRight: '3px', float : 'left'
                    }} /> {auth.user.name}
                </a>
  
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href="/profile">
                        <a className="dropdown-item">Profile</a>
                    </Link>
                    {
                        auth.user.role === 'admin' && adminRouter()
                    }
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
            </li>
        )
    }

    return(
        <div className="relative min-h-screen md:flex bg-slate-900">  {/* mobile menu bar */}
        <Modal/>
      <Notify/>
      <Headeruser/>
      {/* sidebar */}
      <Navbaradmin/>
      {/* content */}
    <div className="flex-1 p-10 text-2xl font-bold">
    <div className="products_manager">
            <Head>
                <title>Products Manager</title>
            </Head>
            <form className="row"  onSubmit={handleSubmit}>
                <div className="col-md-6 border-4">
                    <label htmlFor="content1" className='mb-2 fw-bold text-white'>Content1</label>
                    <textarea name="content1" id="content1" cols="30" rows="4"
                    placeholder="Content1" onChange={handleChangeInput}
                    className="d-block w-100 p-2  form-control" value={content1} />

                    <label htmlFor="content2" className='mb-2 fw-bold text-white'>Content2</label>
                    <textarea name="content2" id="content2" cols="30" rows="4"
                    placeholder="Content2" onChange={handleChangeInput}
                    className="d-block w-100 p-2  form-control" value={content2} />

                    <label htmlFor="content3" className='mb-2 fw-bold text-white'>Content3</label>
                    <textarea name="content3" id="deskripsi" cols="30" rows="4"
                    placeholder="Content3" onChange={handleChangeInput}
                    className="d-block w-100 p-2  form-control" value={content3} />

                    <button type="submit" className="btn btn-info my-2 px-4 fw-bold">
                        {onEdit ? 'Update': 'Create'}
                    </button>

                </div>

                <div className="col-md-6 border-4">
                    <div className="input-group my-4 mb-3 mx-2">
                        <div className="input-group-prepend border rounded ">
                            <span className="input-group-text form-control">Upload</span>
                        </div>
                        <div className="custom-file border rounded">
                            <input type="file" className="custom-file-input form-control"
                            onChange={handleUploadInput} multiple accept="img/*" />
                        </div>

                    </div> 

                    <div className="row img-up mx-0">
                        {
                            img.map((img, index) => (
                                <div key={index} className="file_img my-1">
                                    <img src={img.url ? img.url : URL.createObjectURL(img)}
                                     alt="" className="img-thumbnail rounded" />

                                     <span onClick={() => deleteImage(index)}>X</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </form>
        </div>
      
      </div>
    </div>
        
    )
}

export default ProductsManager