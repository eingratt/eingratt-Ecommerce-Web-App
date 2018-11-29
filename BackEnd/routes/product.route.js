const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);

router.post('/create', product_controller.product_create);

router.put('/update/:id', product_controller.product_update);

router.delete('/delete/:id', product_controller.product_delete);

// Lab3 Functionalities

router.get('/getOne/:id', product_controller.product_details);

router.get('/getAll', product_controller.product_getAll);

router.put('/updateAmount/:id', product_controller.product_updateAmount);

router.put('/updateTaxRate/:id', product_controller.product_updateTaxRate);



module.exports = router;