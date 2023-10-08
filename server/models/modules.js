const mongoose = require('mongoose');

const ModulesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    students: {
        type: Array,
        required: false,
    }
    //versionKey:false,
});
  
const ModulesModel = mongoose.model("modules", ModulesSchema);
module.exports = ModulesModel;