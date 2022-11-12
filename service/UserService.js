import UserSchema from '../models/user-module.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
//import mailService from './mail-service.js'
import tokenService from './token-service.js'
import { UserDto } from './dtos/user-dto.js'
import ApiError from '../exeptions/api-error.js'

class UserService {
  async registration(email, password, username) {
    const candidate = await UserSchema.findOne({ email })
    const candidateUserName = await UserSchema.findOne({ username })
    if (candidate || candidateUserName) {
      throw ApiError.BadRequest('Такой юзер уже имеется')
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activeLink = uuidv4()
    const user = await UserSchema.create({
      email,
      password: hashPassword,
      username,
      activeLink
    })

    // await mailService.sentActivationMail(
    //   email,
    //   `http://localhost:5000/api/users/activate${activeLink}`
    // )
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }
  async login(email, password) {
    const user = await UserSchema.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Не верный пароль')
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizationError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const findTokenDB = await tokenService.findToken(refreshToken)
    if (!userData || !findTokenDB) {
      throw ApiError.UnauthorizationError()
    }
    const user = await UserSchema.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }
  async getAllUsers() {
    const users = await UserSchema.find()
    return users
  }
}
export default new UserService()
