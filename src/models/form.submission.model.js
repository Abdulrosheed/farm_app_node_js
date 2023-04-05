const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const formSubmissionSchema = new mongoose.Schema({
    formSubmissionObject: {
        type : Object,
        required:true
    },
    form_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "formdb",
        required:true
    },
    user_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "userdb",
        required:true
    },
    
    
    



});
formSubmissionSchema.plugin(toJSON);

const formSubmissionDb = mongoose.model('formSubmissiondb' , formSubmissionSchema);
module.exports = formSubmissionDb;
 
