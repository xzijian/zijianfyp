const express = require('express')
const {
  createGroup,
  getGroups,
  getMessages,
  addMember,
  leaveGroup,
  addMessage,
} = require('../controllers/groupsController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all groups
router.get('/', getGroups)

// POST a new group
router.post('/', createGroup)

// GET all messages
router.get('/messages/:id', getMessages)

// POST a new message
router.post('/messages/:id', addMessage)

// ADD new member
router.post('/:id', addMember)

// LEAVE group
router.delete('/:id', leaveGroup)

module.exports = router
