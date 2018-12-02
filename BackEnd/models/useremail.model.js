const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UseremailSchema = new Schema({
    userEmail: {type: String, required: true, max: 100},
    isEnabled: {type: Boolean, required: true}

});


// Export the model
module.exports = mongoose.model('Useremail', UseremailSchema);