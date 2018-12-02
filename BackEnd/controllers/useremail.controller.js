const Useremail = require('../models/useremail.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.useremail_create = function (req, res) {
    let useremail = new Useremail(
         {
            userEmail: req.body.userEmail,
            isEnabled: req.body.isEnabled
        }
    );

    useremail.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json({message: 'useremail Created successfully'})
    })
};

exports.useremail_details = function (req, res) {
    Useremail.findById(req.params.id, function (err, useremail) {
        if (err) return next(err);
        res.json(useremail);
    })
};

exports.useremail_update = function (req, res) {
    Useremail.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, useremail) {
        if (err) return next(err);
        res.json({message:'useremail udpated.'});
    });
};

exports.useremail_delete = function (req, res) {
    Useremail.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json({message: 'Deleted useremail successfully!'});
    })
};

exports.useremail_updateAmount = function (req, res) {
    Useremail.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, useremail) {
        if (err) return next(err);
        res.json({message:'useremail udpated.'});
    });
};

exports.useremail_updateTaxRate = function (req, res) {
    Useremail.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, useremail) {
        if (err) return next(err);
        res.json({message:'useremail udpated.'});
    });
};

exports.useremail_getAll = function (req, res){
        Useremail.find(function(err, items) {
            if (err)
                res.send(err);
                
            res.json(items);
    });
}