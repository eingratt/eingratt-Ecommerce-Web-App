const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const policylog_controller = require('../controllers/policylog.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', policylog_controller.test);

router.post('/create', policylog_controller.policylog_create);

router.put('/update/:id', policylog_controller.policylog_update);

router.delete('/delete/:id', policylog_controller.policylog_delete);

// Lab3 Functionalities

router.get('/getOne/:id', policylog_controller.policylog_details);

router.get('/getAll', policylog_controller.policylog_getAll);

router.put('/updateAmount/:id', policylog_controller.policylog_updateAmount);

router.put('/updateTaxRate/:id', policylog_controller.policylog_updateTaxRate);



module.exports = router;