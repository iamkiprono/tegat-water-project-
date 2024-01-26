import express from 'express'
import { coopController } from '../controllers/coop.controller'


const router = express.Router()


router.post("/", coopController)


export default router