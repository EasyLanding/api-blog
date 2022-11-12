import userService from '../service/UserService.js'
import { validationResult } from 'express-validator'
import ApiError from '../exeptions/api-error.js'

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            'Не корректный емаил или пароль меньше 3 символов',
            errors.array()
          )
        )
      }
      const { email, password, username } = req.body
      const userData = await userService.registration(email, password, username)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }
  async active(req, res, next) {
    try {
    } catch (e) {
      next(e)
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies

      const userData = await userService.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
  async getUser(req, res, next) {
    try {
      const users = await userService.getAllUsers()
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }
  async updateUser(req, res, next) {
    try {
    } catch (e) {
      next(e)
    }
  }
}
export default new UserController()
