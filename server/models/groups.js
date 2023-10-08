const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    groupname: {
      type: String,
      required: true,
    },
    coursename: {
        type: String,
        required: true,
    },
    members: {
        type: Array,
        required: true,
    },
    messages: [{
        author: String,
        message: String,
        createdAt: {type: Date, default: Date.now},
    }], 
})

const GroupsModel = mongoose.model("groups1", GroupSchema);
module.exports = GroupsModel;