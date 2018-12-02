const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const useremail_controller = require('../controllers/useremail.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', useremail_controller.test);

router.post('/create', useremail_controller.useremail_create);

router.put('/update/:id', useremail_controller.useremail_update);

router.delete('/delete/:id', useremail_controller.useremail_delete);

// Lab3 Functionalities

router.get('/getOne/:id', useremail_controller.useremail_details);

router.get('/getAll', useremail_controller.useremail_getAll);

router.put('/updateAmount/:id', useremail_controller.useremail_updateAmount);

router.put('/updateTaxRate/:id', useremail_controller.useremail_updateTaxRate);



module.exports = router;