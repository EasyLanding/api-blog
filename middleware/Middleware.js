import ApiError from '../exeptions/api-error.js'

const Middleware = function (error, req, res, next) {
  console.log(error)
  if (error instanceof ApiError) {
    return res
      .status(error.status)
      .json({ message: error.message, errors: error.errors })
  }
  return res
    .status(500)
    .json({ message: 'Произошла не предвиденная ошибка(сервер crashed)' })
}
export default Middleware
