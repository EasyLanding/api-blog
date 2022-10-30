import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'

const PORT = 5000
const DB_URL =
  'mongodb+srv://backend-blog-userApi:user@cluster0.grvleb6.mongodb.net/?retryWrites=true&w=majority'
const app = express()
app.use(express.json())
app.use('/api', router)

async function appStart() {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`serverStarted on PORT: ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}
appStart()
