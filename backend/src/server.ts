import express from "express"
import cors from 'cors'
import farmerRoutes from './routes/farmer.routes'
import paymentRoutes from './routes/payment.routes'
import readingRotues from './routes/reading.routes'
import coopRoutes from './routes/coop.routes'

import cron from 'node-cron';

const app = express()

app.use(express.json())
app.use(cors())

app.use('/farmers', farmerRoutes)
app.use('/payments', paymentRoutes)
app.use('/readings', readingRotues)
app.use('/coop', coopRoutes)

const performPostRequest = async () => {
    try {
    //   const response = await axios.post('YOUR_ENDPOINT_URL', {
    //     // Add your request body here if needed
    //   });
      console.log(`POST request successful. Response: `);
    } catch (error) {
      console.error('Error performing POST request:', error);
    }
  };
  
  // Schedule the cron job to run every second
  cron.schedule('* * * * * *', async () => {
    await performPostRequest();
  });


app.listen(5000, ()=>{
    console.log(`Listening on 5000`)
})