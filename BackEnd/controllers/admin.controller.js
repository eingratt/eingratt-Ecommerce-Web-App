const Admin = require('../models/admin.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.admin_create = function (req, res) {
    let admin = new Admin(
         {
            name: req.body.name,
            userEmail: req.body.userEmail,
        }
    );

    admin.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json({message: 'Admin Created successfully'})
    })
};

exports.admin_details = function (req, res) {
    Admin.findById(req.params.id, function (err, admin) {
        if (err) return next(err);
        res.json(admin);
    })
};

exports.admin_update = function (req, res) {
    Admin.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, admin) {
        if (err) return next(err);
        res.json({message:'Admin udpated.'});
    });
};

exports.admin_delete = function (req, res) {
    Admin.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json({message: 'Admin Deleted successfully!'});
    })
};

exports.admin_getAll = function (req, res){
        Admin.find(function(err, items) {
            if (err)
                res.send(err);
                
            res.json(items);
    });
}