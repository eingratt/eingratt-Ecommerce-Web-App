const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const review_controller = require('../controllers/review.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', review_controller.test);

router.post('/create', review_controller.review_create);

router.put('/update/:id', review_controller.review_update);

router.delete('/delete/:id', review_controller.review_delete);

// Lab3 Functionalities

router.get('/getOne/:id', review_controller.review_details);

router.get('/getAll', review_controller.review_getAll);

router.put('/updateAmount/:id', review_controller.review_updateAmount);

router.put('/updateTaxRate/:id', review_controller.review_updateTaxRate);



module.exports = router;