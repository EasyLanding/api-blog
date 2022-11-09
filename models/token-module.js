import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'USER' },
  refreshToken: { type: String, required: true }
})
export default mongoose.model('TOKEN', TokenSchema)
