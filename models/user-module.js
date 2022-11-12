import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  image: { type: String, default: '' },
  isActiveted: { type: Boolean, default: false },
  activationLink: { type: String }
})
export default mongoose.model('USER', UserSchema)
