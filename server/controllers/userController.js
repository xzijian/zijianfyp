const UserModel = require('../models/users')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await UserModel.login(email, password)

    // create a token
    const token = createToken(user._id)
    names = user.name 
    course = user.course
    year = user.year

    res.status(200).json({email, token, names, course, year})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await UserModel.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const updateProfile = async (req, res) => {
  const {email, name, course, year} = req.body

  const user = await UserModel.findOneAndUpdate({email: email}, {
    ...req.body
  })
  
  if (!user) {
    return res.status(400).json({error: 'No such user!'})
  }

  res.status(200).json(user)
}

const addModule = async function(name, email){
  try{  
    const exist = await UserModel.count({$and:[{email: email, modules:name}]}, {limit : 1})
    if (exist == 1){
      return 0
    }
    else{
      const user = await UserModel.findOneAndUpdate({email: email},
        {
          $push: {"modules": name}
        })
        return 1
      }
    }
    catch(error){
      return {error: error.message}
    }
}

const remModule = async function(name, email){
  try{  
    const user = await UserModel.findOneAndUpdate({email: email},
      {
        $pull: {"modules": name}
      })
      return 1
    }
    catch(error){
      return {error: error.message}
    }
}

module.exports = { signupUser, loginUser, updateProfile, addModule, remModule }