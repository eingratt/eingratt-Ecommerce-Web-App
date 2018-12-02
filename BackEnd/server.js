const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app

const product = require('./routes/product.route'); // Imports routes for the products
const review = require('./routes/review.route'); // Imports routes for the reviews
const admin = require('./routes/admin.route'); // Imports routes for the admins
const policylog = require('./routes/policylog.route'); // Imports routes for the policylogs
const wishlist = require('./routes/wishlist.route'); // Imports routes for the wishlists
const wishlistitem = require('./routes/wishlistitem.route'); // Imports routes for the wishlistitems

const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://eingratt:19970522may@ds031865.mlab.com:31865/lab5eingratt3316a';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);
app.use('/reviews', review);
app.use('/admins', admin);
app.use('/policylogs', policylog);
app.use('/wishlists', wishlist);
app.use('/wishlistitems', wishlistitem);


app.use(express.static('../lab5v3/src/app'));

let port = 8081;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});