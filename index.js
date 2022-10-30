import express from 'express'
import mongoose from 'mongoose'
import Post from './Post.js'

const PORT = 5000
const DB_URL =
  'mongodb+srv://backend-blog-userApi:user@cluster0.grvleb6.mongodb.net/?retryWrites=true&w=majority'
const app = express()
app.use(express.json())
app.post('/', async (req, res) => {
  try {
    const { author, title, text } = req.body
    const post = await Post.create({ author, title, text })
    console.log(req.body)
    res.json(post)
  } catch (e) {
    req.status(500).json(e)
  }
})

async function appStart() {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`serverStarted on PORT: ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}
appStart()
