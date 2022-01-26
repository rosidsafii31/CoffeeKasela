import Head from 'next/head'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../../../store/GlobalState'
import {imageUpload} from '../../../utils/imageUpload'
import {postData, getData, putData} from '../../../utils/fetchData'
import {useRouter} from 'next/router'
import Modal from '../../../components/Modal'
import Notify from '../../../components/Notify'
import Headeruser from '../../../components/headeruser'
import Navbaradmin from '../../../components/navbaradmin'

const ProductsManager = () => {
    const initialState = {
        title: '',
        harga: 0,
        berat: '',
        deskripsi: '',
    }
    const [product, setProduct] = useState(initialState)
    const {title, harga, berat, deskripsi} = product

    const [img, setImages] = useState([])

    const {state, dispatch} = useContext(DataContext)
    const { auth} = state

    const router = useRouter()
    const {id} = router.query
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if(id){
            setOnEdit(true)
            getData(`products/${id}`).then(res => {
                setProduct(res.products)
                setImages(res.products.img)
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages([])
        }
    },[id])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setProduct({...product, [name]:value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUploadInput = e => {
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if(files.length === 0) 
        return dispatch({type: 'NOTIFY', payload: {error: 'Files tidak tersedia'}})

        files.forEach(file => {
            if(file.size > 1024 * 1024)
            return err = 'Ukuran file lebih dari 1 mb'

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return err = 'format harus jpg.'

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
        return dispatch({type: 'NOTIFY', payload: {error: 'Authentication Salah'}})

        if(!title || !harga || !berat || !deskripsi || img.length === 0)
        return dispatch({type: 'NOTIFY', payload: {error: 'Isi semua form'}})

    
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = img.filter(img => !img.url)
        const imgOldURL = img.filter(img => img.url)

        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)

        let res;
        if(onEdit){
            res = await putData(`products/${id}`, {...product, img: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }else{
            res = await postData('products', {...product, img: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }

        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        
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
                <label htmlFor="judul" className='mb-2 fw-bold text-white'>Judul Produk</label>
                    <input type="text" name="title" value={title}
                    placeholder="Title" className="d-block w-100 form-control mb-2 "
                    onChange={handleChangeInput} />

                    <div className="row">
                        <div className="col-sm-6 mb-2">
                            <label htmlFor="harga" className='fw-bold text-white'>Harga</label>
                            <input type="number" name="harga" value={harga}
                            placeholder="Harga" className="d-block w-100 p-2 form-control"
                            onChange={handleChangeInput} />
                        </div>
                        <div className="col-sm-6 ">
                            <label htmlFor="berat" className='fw-bold text-white'>Berat</label>
                            <input type="string" name="berat" value={berat}
                            placeholder="Berat" className="d-block w-100 p-2 form-control"
                            onChange={handleChangeInput} />
                        </div>
                    </div>
                    <label htmlFor="deskripsi" className='mb-2 fw-bold text-white'>Deskripsi Produk</label>
                    <textarea name="deskripsi" id="deskripsi" cols="30" rows="4"
                    placeholder="Deskripsi" onChange={handleChangeInput}
                    className="d-block w-100 p-2  form-control" value={deskripsi} />

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