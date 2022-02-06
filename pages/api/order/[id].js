import connectDB from '../../../utils/connectDB'
import Orders from '../../../models/orderModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getOrders(req, res)
            break;
        case "DELETE":
            await deleteOrders(req, res)
            break;
        case "PUT":
            await deliveredOrder(req, res)
            break;
           
    }
}

const getOrders = async (req, res) => {
    try {
        const { id } = req.query;

        const order = await Orders.findById(id)
        if(!order) return res.status(400).json({err: 'Tidak ada data Orders'})
        
        res.json({ order })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
const deliveredOrder = async(req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: 'Authentication Salah.'})
        const {id} = req.query
        const {resi,jasapengiriman} = req.body
        
        if(!resi)
        return res.status(400).json({err: 'Isi semua form.'})

        await Orders.findOneAndUpdate({_id: id}, {
            resi,jasapengiriman
        })

        res.json({msg: 'Update Sukses'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}