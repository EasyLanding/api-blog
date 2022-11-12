import Router from 'express'
import PostController from '../controllers/PostController.js'
import UserController from '../controllers/UserController.js'
import { body } from 'express-validator'
import AuthMiddleware from '../middleware/AuthMiddleware.js'

const router = new Router()

router.post('/articles', AuthMiddleware, PostController.create)
router.get('/articles', PostController.getAll)
router.get('/articles/:id', PostController.getOne)
router.put('/articles/:id', AuthMiddleware, PostController.update)
router.delete('/articles/:id', AuthMiddleware, PostController.delete)

router.post(
  '/users',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  UserController.registration
)
router.post('/users/login', UserController.login)
router.post('/users/logout', UserController.logout)
router.get('/users/activate/:link', UserController.active)
router.get('/refresh', UserController.refresh)
router.get('/users', AuthMiddleware, UserController.getUser)
router.put('/users/:id', AuthMiddleware, UserController.updateUser)

export default router
