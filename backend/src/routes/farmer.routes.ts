import express from 'express'
import { createFarmer, getFarmers, getFarmersBills, updateReading , createManyFarmers} from '../controllers/farmer.controller'


const router = express.Router()

router.put('/',updateReading)
router.get('/', getFarmers)
router.get('/bills', getFarmersBills)
router.post('/',createFarmer)
router.post('/many',createManyFarmers)

export default router