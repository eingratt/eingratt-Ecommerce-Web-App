const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AdminSchema = new Schema({
    name: {type: String, required: true, max: 100},
    userEmail: {type: String, required: true, max: 200}
});


// Export the model
module.exports = mongoose.model('Admin', AdminSchema);