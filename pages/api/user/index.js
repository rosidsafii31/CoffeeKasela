import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'
import { JsonWebTokenError } from 'jsonwebtoken'
import jsonwebtoken from 'jsonwebtoken'
import { Kirimemail } from '../../../email'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await uploadInfor(req, res)
            break;
        case "GET":
            await getUsers(req, res)
            break;
        case "PUT":
                await putUsers(req, res)
                break;
    }
}


const getUsers = async (req, res) => {
    try {
       const result = await auth(req, res)
    //    if(result.role === 'admin','user') 
    //    return res.status(400).json({err: "Authentication is not valid"})

        const users = await Users.find().select('-password')
        res.json({users})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}


const uploadInfor = async (req, res) => {
    try {
        const result = await auth(req, res)
        
        const {name, avatar,nomorwa,akunbank} = req.body

        const newUser = await Users.findOneAndUpdate({_id: result.id}, {name, avatar,nomorwa,akunbank})

        res.json({
            msg: "Update Success!",
            user: {
                name,
                avatar,
                akunbank,
                email: newUser.email,
                nomorwa,
                role: newUser.role
            }
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
