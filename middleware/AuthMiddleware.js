import ApiError from '../exeptions/api-error.js'
import tokenService from '../service/token-service.js'

const AuthMiddleware = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizationError())
    }
    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.UnauthorizationError())
    }
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.UnauthorizationError())
    }
    req.user = userData
    next()
  } catch (e) {
    return next(ApiError.UnauthorizationError())
  }
}
export default AuthMiddleware
