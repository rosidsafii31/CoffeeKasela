import connectDB from '../../../utils/connectDB'
import Product from '../../../models/Product'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProduct(req, res)
            break;
        case "POST":
            await createProduct(req, res)
            break;
    }
}

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 8
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
    paginating2(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 4
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const getProduct = async (req, res) => {
    try {
        const features = new APIfeatures(Product.find(), req.query)
        .sorting(). paginating2().paginating()
        const product = await features.query
        
        res.json({
            status: 'success',
            result: product.length,
            product,
          
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const createProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({err: 'Authentication Salah'})

        const {img, title, deskripsi, berat, harga, } = req.body

        if(!title || !img || !deskripsi || !berat || !harga )
        return res.status(400).json({err: 'Please add all the fields.'})


        const newProduct = new Product({
            title: title.toLowerCase(), img, deskripsi, berat, harga,
        })

        await newProduct.save()

        res.json({msg: 'Success! Membuat  product'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}