const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WishlistSchema = new Schema({
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true},
    userEmail: {type: String, required: true, max: 100},
    isPublic: {type: Boolean, required: true}

});


// Export the model
module.exports = mongoose.model('Wishlist', WishlistSchema);