const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WishlistitemSchema = new Schema({
    listName: {type: String, required: true, max: 100},
    itemName: {type: String, required: true},
    amount: {type: Number, required: true}

});


// Export the model
module.exports = mongoose.model('Wishlistitem', WishlistitemSchema);