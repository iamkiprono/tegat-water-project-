import express from "express"
import cors from 'cors'
import farmerRoutes from './routes/farmer.routes'
import paymentRoutes from './routes/payment.routes'
import readingRotues from './routes/reading.routes'
import coopRoutes from './routes/coop.routes'
import balanceRoutes from  './routes/balance.routes'
import { decodeJwt, signJwt } from "./lib/utils"



const app = express()

app.use(express.json())
app.use(cors())

// all routes
app.use('/farmers', farmerRoutes)
app.use('/payments', paymentRoutes)
app.use('/readings', readingRotues)
app.use('/coop', coopRoutes)

// one time use for adding prev balances
app.use('/balance', balanceRoutes)




app.listen(5000, ()=>{
    console.log(`Listening on 5000`)
})