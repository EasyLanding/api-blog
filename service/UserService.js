import UserSchema from '../models/user-module.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import mailService from './mail-service.js'
import tokenService from './token-service.js'
import { UserDto } from './dtos/user-dto.js'

class UserService {
  async registration(email, password, username) {
    const candidate = await UserSchema.findOne({ email })
    const candidateUserName = await UserSchema.findOne({ username })
    if (candidate || candidateUserName) {
      throw new Error('Такой юзер уже имеется')
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activeLink = uuidv4()
    const user = await UserSchema.create({
      email,
      password: hashPassword,
      username,
      activeLink
    })

    await mailService.sentActivationMail(email, activeLink)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }
}
export default new UserService()
