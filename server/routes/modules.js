const express = require('express')
const {
  createModule,
  getModules,
  getModule,
  deleteModule,
} = require('../controllers/modulesController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getModules)

//GET a single workout
router.get('/:id', getModule)

// POST a new workout
router.post('/', createModule)

// DELETE a workout
router.delete('/:id', deleteModule)

module.exports = router