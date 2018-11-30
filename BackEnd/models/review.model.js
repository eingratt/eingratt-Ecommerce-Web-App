const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    review: {type: String, required: true, max: 100},
    rating: {type: Number, required: true},
    productName: {type: String, required: true, max: 100},
    userEmail: {type: String, required: true, max: 100}
});


// Export the model
module.exports = mongoose.model('Review', ReviewSchema);