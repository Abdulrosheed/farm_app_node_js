const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const agentSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required:true
    },
    lastName: {
        type : String,
        required:true
    },
    phoneNumber: {
        type : String,
        required:true
    },
    user_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "userdb",
        required:true
    },
   forms: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "formdb"
        }
    ],

   
    
});
agentSchema.plugin(toJSON);

const agentDb = mongoose.model('agentdb' , agentSchema);
module.exports = agentDb;
 
