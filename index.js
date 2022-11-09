import express from 'express'
import mongoose from 'mongoose'
import router from './router/router.js'
import cors from 'cors'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)

async function appStart() {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => console.log(`serverStarted on PORT: ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}
appStart()
