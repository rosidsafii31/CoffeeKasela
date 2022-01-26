import connectDB from '../../../utils/connectDB'
import Product from '../../../models/Product'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProducts(req, res)
            break;
        case "PUT":
            await updateProducts(req, res)
            break;
        case "DELETE":
            await deleteProducts(req, res)
            break;
    }
}

const getProducts = async (req, res) => {
    try {
        const { id } = req.query;

        const products = await Product.findById(id)
        if(!products) return res.status(400).json({err: 'Produk tidak tersedia.'})
        
        res.json({ products })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const updateProducts = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication Salah'})

        const {id} = req.query
        const {title, harga, berat, deskripsi,img} = req.body

        if(!title || !harga || !berat || !deskripsi || img.length === 0)
        return res.status(400).json({err: 'Isi semua form'})

        await Product.findOneAndUpdate({_id: id}, {
            title: title.toLowerCase(), harga, berat, deskripsi,img
        })

        res.json({msg: 'Success! Update  product'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteProducts = async(req, res) => {
    try {
        const result = await auth(req, res)
        
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication salah'})

        const {id} = req.query

        await Product.findByIdAndDelete(id)
        res.json({msg: 'Deleted  product.'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}