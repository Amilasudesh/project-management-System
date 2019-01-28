const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    reason: {
        type:String,
        required: true
    },
   
    date: {
        type: Date,
        default: Date.now
        
    }
});

const archileave = mongoose.model('archileave', leaveSchema);

module.exports = archileave;

module.exports.saveleave = (newleave,callback)=>{                  //data save karai
     newleave.save(callback);

};