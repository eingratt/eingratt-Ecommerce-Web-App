const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const wishlistitem_controller = require('../controllers/wishlistitem.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', wishlistitem_controller.test);

router.post('/create', wishlistitem_controller.wishlistitem_create);

router.put('/update/:id', wishlistitem_controller.wishlistitem_update);

router.delete('/delete/:id', wishlistitem_controller.wishlistitem_delete);

// Lab3 Functionalities

router.get('/getOne/:id', wishlistitem_controller.wishlistitem_details);

router.get('/getAll', wishlistitem_controller.wishlistitem_getAll);

router.put('/updateAmount/:id', wishlistitem_controller.wishlistitem_updateAmount);

router.put('/updateTaxRate/:id', wishlistitem_controller.wishlistitem_updateTaxRate);



module.exports = router;