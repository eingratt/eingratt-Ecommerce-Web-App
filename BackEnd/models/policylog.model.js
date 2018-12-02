const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PolicylogSchema = new Schema({
    header: {type: String, required: true, max: 100},
    information: {type: String, required: true}
    
});


// Export the model
module.exports = mongoose.model('Policylog', PolicylogSchema);