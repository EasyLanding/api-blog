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
  async removeToken(refreshToken) {
    const tokenData = await tokenModule.deleteOne({ refreshToken })
    return tokenData
  }
  validateAccessToken(token) {
    try {
      const userData = Jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = Jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }
  async findToken(refreshToken) {
    const tokenData = await tokenModule.findOne({ refreshToken })
    return tokenData
  }
}
export default new TokenService()
