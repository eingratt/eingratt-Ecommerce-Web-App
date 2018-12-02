const Wishlist = require('../models/wishlist.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.wishlist_create = function (req, res) {
    let wishlist = new Wishlist(
         {
            name: req.body.name,
            description: req.body.description,
            userEmail: req.body.userEmail,
            isPublic: req.body.isPublic
        }
    );

    wishlist.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json({message: 'Wishlist Created successfully'})
    })
};

exports.wishlist_details = function (req, res) {
    Wishlist.findById(req.params.id, function (err, wishlist) {
        if (err) return next(err);
        res.json(wishlist);
    })
};

exports.wishlist_update = function (req, res) {
    Wishlist.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, wishlist) {
        if (err) return next(err);
        res.json({message:'Wishlist udpated.'});
    });
};

exports.wishlist_delete = function (req, res) {
    Wishlist.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json({message: 'Deleted wishlist successfully!'});
    })
};

exports.wishlist_updateAmount = function (req, res) {
    Wishlist.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, wishlist) {
        if (err) return next(err);
        res.json({message:'Wishlist udpated.'});
    });
};

exports.wishlist_updateTaxRate = function (req, res) {
    Wishlist.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, wishlist) {
        if (err) return next(err);
        res.json({message:'Wishlist udpated.'});
    });
};

exports.wishlist_getAll = function (req, res){
        Wishlist.find(function(err, items) {
            if (err)
                res.send(err);
                
            res.json(items);
    });
}