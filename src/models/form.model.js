const mongoose = require('mongoose');
const { toJSON } = require('./plugins');


const formSchema = new mongoose.Schema({
    formObject: {
        type : Object,
        required:true
    },
    isPublic: {
        type : Boolean,
        required:true
    },
    user_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "userdb",
        required:true
    },
    formSubmissions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "formSubmissiondb"
        }
    ],
    agents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "agentdb"
        }
    ],
    
    



});
formSchema.plugin(toJSON);

 const formDb = mongoose.model('formdb' , formSchema);
 module.exports = formDb;