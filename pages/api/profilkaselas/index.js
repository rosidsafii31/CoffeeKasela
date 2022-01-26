import connectDB from '../../../utils/connectDB'
import Profilkasela from '../../../models/Profilkasela'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProfilkasela(req, res)
            break;
        case "POST":
            await createProfilkasela(req, res)
            break;
    }
}

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
}

const getProfilkasela = async (req, res) => {
    try {
        const features = new APIfeatures(Profilkasela.find(), req.query)
        // .filtering().sorting().paginating()

        const profilkasela = await features.query
        
        res.json({
            status: 'success',
            result: profilkasela.length,
            profilkasela,
          
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const createProfilkasela = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({err: 'Authentication Salah.'})

        const {img, content1, content2, content3 } = req.body

        if(!content1 || !content2 || !content3|| !img )
        return res.status(400).json({err: 'Isi semua form'})


        const newProfilkasela = new Profilkasela({
            content1: content1.toLowerCase(),img, content2, content3
        })

        await newProfilkasela.save()

        res.json({msg: 'Success! Membuat Profil'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}