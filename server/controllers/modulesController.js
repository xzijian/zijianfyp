const Modules = require('../models/modules')
const mongoose = require('mongoose')
const UserController = require('./userController')
const User = require('../models/users')

// get all modules
const getModules = async (req, res) => {
  const user_id = req.user._id
  const user_modules = await User.find({_id: user_id})
  const modules = await Modules.find({name:{ $in: user_modules[0].modules}})
  
  res.status(200).json(modules)
}

// get a single module
const getModule = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such module'})
  }

  const module = await Modules.findById(id)

  if (!module) {
    return res.status(404).json({error: 'No such module'})
  }
  res.status(200).json(module)
}


// create new module
const createModule = async (req, res) => {
  const {name, email} = req.body
  let emptyFields = []

  if(!name) {
    emptyFields.push('test')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try{
    const user = await UserController.addModule(name, email)
    const modules = await Modules.findOneAndUpdate({name: name},
      {
        $push: {"students": email}
      })
      res.status(200).json(modules)
    }
    catch(error){
      res.status(400).json({error: error.message})
    }
  }

// delete a module
const deleteModule = async (req, res) => {
  const { id } = req.params
  const user_id = req.user._id
  const currUser = await User.find({_id: user_id})
  const module = await Modules.findOne({_id: id})
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such module'})
  }
  try{
    const module = await Modules.findOneAndUpdate({_id: id}, 
      {
        $pull: {'students': currUser[0].email}
      })
    const remove = await UserController.remModule(module.name, currUser[0].email)
    }
    catch(error){
      res.status(400).json({error: error.message})
    }

  if (!module) {
    return res.status(400).json({error: 'No such module'})
  }

  res.status(200).json(module)
}

module.exports = {
  getModules,
  getModule,
  createModule,
  deleteModule,
}
