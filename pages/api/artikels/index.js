import connectDB from '../../../utils/connectDB'
import Artikel from '../../../models/Artikel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getArtikel(req, res)
            break;
        case "POST":
            await createArtikel(req, res)
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
        const limit = this.queryString.limit * 1 || 6
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const getArtikel = async (req, res) => {
    try {
        const features = new APIfeatures(Artikel.find(), req.query)
        .sorting().paginating()

        const artikel = await features.query
        
        res.json({
            status: 'success',
            result: artikel.length,
            artikel,
          
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const createArtikel = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({err: 'Authentication salah'})

        const {title ,img, content } = req.body

        if(!title || !img || !content )
        return res.status(400).json({err: 'Isi semua form'})


        const newArtikel = new Artikel({
            title: title.toLowerCase(), img, content, 
        })

        await newArtikel.save()

        res.json({msg: 'Success! Membuat  artikel'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}