const Modules = require('../models/modules')
const mongoose = require('mongoose')
const UserController = require('./userController')
const User = require('../models/users')
const Posts = require('../models/posts')

// get all posts
const getPosts = async (req, res) => {
  const user_id = req.user._id
  const { id } = req.params
  try{
    const posts = await Posts.findOne({moduleid: id})
    res.status(200).json(posts.posts.reverse())
  }
  catch{
    res.status(200).json([])
  }
}

// create new post
const createPost = async (req, res) => {
  const { id } = req.params
  const { post } = req.body
  const user_id = req.user._id
  author = ""
  try{
    const user = await User.findById(user_id)
    if(user.name === " "){
      author = user.email
    }
    else{
      author = user.name
    }
    const exist = await Posts.count({moduleid: id}, {limit : 1})
    if (exist == 1){
      const addpost = await Posts.findOneAndUpdate({moduleid: id}, 
        {
          $push: {"posts": {"author": author, "post": post, "authoremail": user.email}}
        })
      const newPosts = await Posts.findOne({"moduleid": id},{_id:0,posts:1})
      const latestPost = newPosts.posts.slice(-1)[0]
      res.status(200).json(latestPost)
    }else{
      const createpost = await Posts.create({moduleid: id, posts: {author: author, post: post, authoremail: user.email}})
      res.status(200).json(createpost)
    }
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

// delete a post
const deletePost = async (req, res) => {
    const { id, postid } = req.params
    try{
      const deletePost = await Posts.findOneAndUpdate({"moduleid": id}, 
        {
          $pull: {"posts": {_id: postid}}
        })
      const newPosts = await Posts.findOne({moduleid: id})
      res.status(200).json(newPosts.posts.reverse())
    }catch(error){
      console.log(error.message)
      res.status(400).json({error: error.message})
    }
    ////
    /////
    ///
}

const createComment = async (req,res) => {
    const { id, postid } = req.params
    const { comment } = req.body
    const user_id = req.user._id
    try{
      cauthor = ""
      const user = await User.findById(user_id)
      if(user.name === " "){
        cauthor = user.email
      }
      else{
        cauthor = user.name
      }
      const createComment = await Posts.findOneAndUpdate({moduleid: id, posts: {
        $elemMatch: {_id: postid}
      }},
        {
          $push: {"posts.$.comments": {"cauthor": cauthor, "comment": comment}}
        })
        const updatedPosts = await Posts.findOne({moduleid:id})
        res.status(200).json(updatedPosts.posts.reverse())
    }catch(error){
      res.status(400).json({error: error.message})
    }
}

module.exports = {
  getPosts,
  createPost,
  deletePost,
  createComment,
}
