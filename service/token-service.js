import Jwt from 'jsonwebtoken'
import tokenModule from '../models/token-module.js'

class TokenService {
  generateToken(payload) {
    const accessToken = Jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '3h'
    })
    const refreshToken = Jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '60d'
    })
    return { accessToken, refreshToken }
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModule.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await tokenModule.create({ user: userId, refreshToken })
    return token
  }
}
export default new TokenService()
