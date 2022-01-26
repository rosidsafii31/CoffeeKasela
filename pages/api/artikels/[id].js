import connectDB from '../../../utils/connectDB'
import Artikel from '../../../models/Artikel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getArtikels(req, res)
            break;
        case "PUT":
            await updateArtikels(req, res)
            break;
        case "DELETE":
            await deleteArtikels(req, res)
            break;
    }
}

const getArtikels = async (req, res) => {
    try {
        const { id } = req.query;

        const artikels = await Artikel.findById(id)
        if(!artikels) return res.status(400).json({err: 'Produk Tidak Ada'})
        
        res.json({ artikels })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
const updateArtikels = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication Salah'})

        const {id} = req.query
        const {title, content, img} = req.body

        if(!title ||  !content || img.length === 0)
        return res.status(400).json({err: 'Isi semua form'})

        await Artikel.findOneAndUpdate({_id: id}, {
            title: title.toLowerCase(), content, img
        })

        res.json({msg: 'Update Sukses'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteArtikels = async(req, res) => {
    try {
        const result = await auth(req, res)
        
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication Salah'})

        const {id} = req.query

        await Artikel.findByIdAndDelete(id)
        res.json({msg: 'Hapus Produk.'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}