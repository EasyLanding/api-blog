import mongoose from 'mongoose'

const Post = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: true },
  tagList: { type: Array, required: false },
  createdAt: { type: String },
  updatedAt: { type: Boolean },
  favoritesCount: { type: Number },
  author: {
    username: { type: String },
    bio: { type: String },
    image: { type: String },
    following: { type: Boolean }
  }
})
export default mongoose.model('POST', Post)
