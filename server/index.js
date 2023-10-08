require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose');
const UserModel = require('./models/users');
const ModulesModel = require('./models/modules');
const modulesRoutes = require('./routes/modules');
const userRoutes = require('./routes/user');
const moduleRoutes = require('./routes/module');
const groupsRoutes = require('./routes/groups');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

app.use('/api/modules', modulesRoutes)
app.use('/api/user', userRoutes)
app.use('/api/module', moduleRoutes)
app.use('/api/groups', groupsRoutes)

app.get("/getUsers", async (req, res) => {
    try{
        const data = await UserModel.find();
        res.json(data);
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
})

app.get("/getCC", async(req, res) => {
  try{
    const data = await ModulesModel.find({name: "cc"});
    res.json(data)
  }
  catch(error){
    res.status(500).json({message : error.message})
  }
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })



// routes


