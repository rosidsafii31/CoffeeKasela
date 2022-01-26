import Head from 'next/head'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../../../store/GlobalState'
import {imageUpload} from '../../../utils/imageUpload'
import {postData, getData, putData} from '../../../utils/fetchData'
import {useRouter} from 'next/router'
import Modal from '../../..//components/Modal'
import Notify from '../../../components/Notify'
import Headeruser from '../../../components/headeruser'
import Navbaradmin from '../../../components/navbaradmin'

const ArtikelsManager = () => {
    const initialState = {
        title: '',
        content: '',
    }
    const [artikel, setArtikel] = useState(initialState)
    const {title, content} = artikel

    const [img, setImages] = useState([])

    const {state, dispatch} = useContext(DataContext)
    const { auth} = state

    const router = useRouter()
    const {id} = router.query
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if(id){
            setOnEdit(true)
            getData(`artikels/${id}`).then(res => {
                setArtikel(res.artikels)
                setImages(res.artikels.img)
            })
        }else{
            setOnEdit(false)
            setArtikel(initialState)
            setImages([])
        }
    },[id])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setArtikel({...artikel, [name]:value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUploadInput = e => {
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if(files.length === 0) 
        return dispatch({type: 'NOTIFY', payload: {error: 'Files tidak ada.'}})

        files.forEach(file => {
            if(file.size > 1024 * 1024)
            return err = 'Ukuran lebih dari 1 mb'

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return err = 'Format harus jpg.'

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
        return dispatch({type: 'NOTIFY', payload: {error: 'Authentication salah.'}})

        if(!title || !content || img.length === 0)
        return dispatch({type: 'NOTIFY', payload: {error: 'isi semua form'}})

    
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = img.filter(img => !img.url)
        const imgOldURL = img.filter(img => img.url)

        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)

        let res;
        if(onEdit){
            res = await putData(`artikels/${id}`, {...artikel, img: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }else{
            res = await postData('artikels', {...artikel, img: [...imgOldURL, ...media]}, auth.token)
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
                <title>Artikels Manager</title>
            </Head>
            <form className="row"  onSubmit={handleSubmit}>
                <div className="col-md-6 border-4">
                <label htmlFor="judul" className='mb-2 fw-bold text-white'>Judul Artikel</label>
                    <input type="text" name="title" value={title}
                    placeholder="Title" className="d-block w-100 form-control mb-2 "
                    onChange={handleChangeInput} />

                    <label htmlFor="content" className='mb-2 fw-bold text-white'>Content Artikel</label>
                    <textarea name="content" id="content" cols="30" rows="4"
                    placeholder="Content" onChange={handleChangeInput}
                    className="d-block w-100 p-2  form-control" value={content} />

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

export default ArtikelsManager