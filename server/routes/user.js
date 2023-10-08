const express = require('express')

// controller functions
const { loginUser, signupUser, updateProfile } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/register', signupUser)

router.patch('/profile', updateProfile)

module.exports = router