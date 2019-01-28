const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    diagram: {
        type:String,
        required: true
    },
   
    date: {
        type: Date,
        default: Date.now
    }
});

const archiUser = mongoose.model('archiusers', archiSchema);

module.exports = archiUser;

module.exports.savetask = (newtask,callback)=>{                  //data save karai
     newtask.save(callback);

};