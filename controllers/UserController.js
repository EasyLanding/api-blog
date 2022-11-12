import userService from '../service/UserService.js'

class UserController {
  async registration(req, res, next) {
    try {
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
    } catch (e) {
      next(e)
    }
  }
  async logout(req, res, next) {
    try {
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
    } catch (e) {
      next(e)
    }
  }
  async getUser(req, res, next) {
    try {
      res.json(['123', '456'])
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
