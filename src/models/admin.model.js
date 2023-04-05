const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const adminSchema = new mongoose.Schema({
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
adminSchema.plugin(toJSON);
const adminDb = mongoose.model('admindb' , adminSchema);
 module.exports = adminDb;