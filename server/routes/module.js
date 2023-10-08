const express = require('express')
const {
  createPost,
  getPosts,
  deletePost,
  createComment,
} = require('../controllers/moduleController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all posts
router.get('/:id', getPosts)

// POST a new post
router.post('/:id', createPost)

// DELETE a post
router.delete('/:id/:postid', deletePost)

// POST a new comment
router.post('/:id/:postid', createComment)

module.exports = router
