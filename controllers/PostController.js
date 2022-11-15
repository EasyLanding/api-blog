import Post from '../models/Post.js'

class PostController {
  async create(req, res) {
    try {
      const createDate = new Date()
      const { title, description, body } = req.body.articles
      const post = await Post.create({
        articles: {
          title,
          description,
          body,
          createdAt: createDate.toISOString(),
          updatedAt: createDate.toISOString(),
          favoritesCount: 0,
          author: {
            username: '',
            bio: '',
            image: '',
            following: true
          }
        }
      })
      console.log(req.body)
      return res.json(post)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async getAll(req, res) {
    try {
      const posts = await Post.find()
      return res.json(posts)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params
      console.log(id)
      if (!id) {
        res.status(400).json({ message: 'ID Не указан или указан не верно' })
      }
      const post = await Post.findById(id)
      return res.json(post)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async update(req, res) {
    try {
      const post = req.body
      const { id } = req.params
      if (!id) {
        res.status(400).json({ message: 'ID Не указан или указан не верно' })
      }
      const updatePost = await Post.findByIdAndUpdate(id, post, {
        new: true
      })
      return res.json(updatePost)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        res.status(400).json({ message: 'ID Не указан или указан не верно' })
      }
      const post = await Post.findByIdAndDelete(id)
      return res.json(post)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new PostController()
