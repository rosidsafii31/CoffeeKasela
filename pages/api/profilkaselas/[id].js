import connectDB from '../../../utils/connectDB'
import Product from '../../../models/Product'
import auth from '../../../middleware/auth'
import Profilkasela from '../../../models/Profilkasela'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProfilkaselas(req, res)
            break;
        case "PUT":
            await updateProfilkaselas(req, res)
            break;
        case "DELETE":
            await deleteProfilkaselas(req, res)
            break;
    }
}

const getProfilkaselas = async (req, res) => {
    try {
        const { id } = req.query;

        const Profilkaselas = await Profilkasela.findById(id)
        if(!Profilkaselas) return res.status(400).json({err: 'This product does not exist.'})
        
        res.json({ Profilkaselas })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const updateProfilkaselas = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication Salah.'})

        const {id} = req.query
        const {img, content1, content2, content3,} = req.body

        if( !content1 || !content2 || !content3 || img.length === 0)
        return res.status(400).json({err: 'Isi semua form'})

        await Product.findOneAndUpdate({_id: id}, {
            content1: content1.toLowerCase(), content2, content3, img,
        })

        res.json({msg: 'Success! Updated a product'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteProfilkaselas = async(req, res) => {
    try {
        const result = await auth(req, res)
        
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication salah.'})

        const {id} = req.query

        await Profilkasela.findByIdAndDelete(id)
        res.json({msg: 'Deleted a product.'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}