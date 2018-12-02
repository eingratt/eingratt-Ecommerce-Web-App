const Policylog = require('../models/policylog.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.policylog_create = function (req, res) {
    let policylog = new Policylog(
         {
            header: req.body.header,
            information: req.body.information
        }
    );

    policylog.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json({message: 'Policylog Created successfully'})
    })
};

exports.policylog_details = function (req, res) {
    Policylog.findById(req.params.id, function (err, policylog) {
        if (err) return next(err);
        res.json(policylog);
    })
};

exports.policylog_update = function (req, res) {
    Policylog.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, policylog) {
        if (err) return next(err);
        res.json({message:'Policylog udpated.'});
    });
};

exports.policylog_delete = function (req, res) {
    Policylog.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json({message: 'Deleted Policylog successfully!'});
    })
};

exports.policylog_updateAmount = function (req, res) {
    Policylog.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, policylog) {
        if (err) return next(err);
        res.json({message:'Policylog udpated.'});
    });
};

exports.policylog_updateTaxRate = function (req, res) {
    Policylog.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, policylog) {
        if (err) return next(err);
        res.json({message:'Policylog udpated.'});
    });
};

exports.policylog_getAll = function (req, res){
        Policylog.find(function(err, items) {
            if (err)
                res.send(err);
                
            res.json(items);
    });
}