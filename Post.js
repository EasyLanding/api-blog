import mongoose from 'mongoose'

const Post = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true }
})
export default mongoose.model('POST', Post)
