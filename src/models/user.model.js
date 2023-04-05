const mongoose = require('mongoose');
const { toJSON } = require('./plugins');


const userSchema = new mongoose.Schema({
    email: {
        type : String,
        required:true
    },
    passWord: {
        type : String,
        required:true
    },
    role: {
        type : String,
        required:true
    }
    

    
});
// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

const userDb = mongoose.model('userdb' , userSchema);
 module.exports = userDb;