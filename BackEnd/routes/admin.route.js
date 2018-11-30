const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const admin_controller = require('../controllers/admin.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', admin_controller.test);

router.post('/create', admin_controller.admin_create);

router.put('/update/:id', admin_controller.admin_update);

router.delete('/delete/:id', admin_controller.admin_delete);

// Lab3 Functionalities

router.get('/getOne/:id', admin_controller.admin_details);

router.get('/getAll', admin_controller.admin_getAll);



module.exports = router;