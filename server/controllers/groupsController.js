const Groups = require('../models/groups')
const mongoose = require('mongoose')
const UserController = require('./userController')
const User = require('../models/users')
const UserModel = require('../models/users')

// get all groups
const getGroups = async (req, res) => {
    const user_id = req.user._id
    const user = await User.find({_id: user_id})
    const groups = await Groups.find({members:{ $in: user[0].email}})
  
    res.status(200).json(groups)
  }

const createGroup = async (req, res) => {
  const {groupname, coursename, email} = req.body
  let emptyFields = []
  if(!coursename) {
    emptyFields.push('test')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try{
    const groups = await Groups.create({groupname: groupname, coursename: coursename, members: [email]})
    res.status(200).json(groups)
  }
    catch(error){
      res.status(400).json({error: error.message})
    }
}

const getMessages = async (req, res) => {
  const { id } = req.params

  try{
    const group = await Groups.findById(id)
    res.status(200).json(group.messages.reverse())
  }catch(error){
    res.status(400).json({error: error.message})
  }

}

const addMember = async(req, res) => {
  const { id } = req.params
  const { email } = req.body
  try{
    const exist = await Groups.count({$and:[{_id: id, members:email}]}, {limit : 1})
    if (exist == 1){
      res.status(400).json({error: "Student already in group!"})
    }
    else{
      const group = await Groups.findByIdAndUpdate({_id: id},
        {
          $push: {"members": email}
        })
      res.status(200).json(group)
    }
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

const leaveGroup = async(req, res) => {
  const { id } = req.params
  const { useremail } = req.body
  try{
    const group = await Groups.findByIdAndUpdate({_id: id},
      {
        $pull: {"members": useremail}
      })
    res.status(200).json(group)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

const addMessage = async(req, res) => {
  const { id } = req.params
  const user_id = req.user._id
  const { message } = req.body
  author = ""
  try{
    const user = await UserModel.findById(user_id)
    if(user.name == " "){
      author = user.email
    }
    else{
      author = user.name
    }
    const message1 = await Groups.findByIdAndUpdate({_id: id},
      {
        $push: {"messages": {"author": author, "message": message,}}
      })
    const newMessages = await Groups.findById({_id: id},{_id:0,messages:1})
    const latestMessage = newMessages.messages.slice(-1)[0] 
    console.log(latestMessage)
    res.status(200).json(latestMessage)
  }catch(error){
    console.log(error)
    res.status(400).json({error: error.message})
  }
}

module.exports = {
    getGroups,
    createGroup,
    getMessages,
    addMember,
    leaveGroup,
    addMessage,
  }
  