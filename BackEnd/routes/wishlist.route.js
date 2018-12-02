const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const wishlist_controller = require('../controllers/wishlist.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', wishlist_controller.test);

router.post('/create', wishlist_controller.wishlist_create);

router.put('/update/:id', wishlist_controller.wishlist_update);

router.delete('/delete/:id', wishlist_controller.wishlist_delete);

// Lab3 Functionalities

router.get('/getOne/:id', wishlist_controller.wishlist_details);

router.get('/getAll', wishlist_controller.wishlist_getAll);

router.put('/updateAmount/:id', wishlist_controller.wishlist_updateAmount);

router.put('/updateTaxRate/:id', wishlist_controller.wishlist_updateTaxRate);



module.exports = router;