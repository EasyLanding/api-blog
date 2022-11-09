import Router from 'express'
import PostController from '../controllers/PostController.js'
import UserController from '../controllers/UserController.js'

const router = new Router()

router.post('/articles', PostController.create)
router.get('/articles', PostController.getAll)
router.get('/articles/:id', PostController.getOne)
router.put('/articles/:id', PostController.update)
router.delete('/articles/:id', PostController.delete)

router.post('/users', UserController.registration)
router.post('/users/login', UserController.login)
router.post('/users/logout', UserController.logout)
router.get('/users/activate/:link', UserController.active)
router.get('/refresh', UserController.refresh)
router.get('/users', UserController.getUser)
router.put('/users/:id', UserController.updateUser)

export default router
