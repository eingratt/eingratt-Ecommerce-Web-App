const Wishlistitem = require('../models/wishlistitem.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.wishlistitem_create = function (req, res) {
    let wishlistitem = new Wishlistitem(
         {
            listName: req.body.listName,
            itemName: req.body.itemName,
            amount: req.body.amount
        }
    );

    wishlistitem.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json({message: 'Wishlistitem Created successfully'})
    })
};

exports.wishlistitem_details = function (req, res) {
    Wishlistitem.findById(req.params.id, function (err, wishlistitem) {
        if (err) return next(err);
        res.json(wishlistitem);
    })
};

exports.wishlistitem_update = function (req, res) {
    Wishlistitem.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, wishlistitem) {
        if (err) return next(err);
        res.json({message:'Wishlistitem udpated.'});
    });
};

exports.wishlistitem_delete = function (req, res) {
    Wishlistitem.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json({message: 'Deleted wishlistitem successfully!'});
    })
};

exports.wishlistitem_updateAmount = function (req, res) {
    Wishlistitem.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, wishlistitem) {
        if (err) return next(err);
        res.json({message:'Wishlistitem udpated.'});
    });
};

exports.wishlistitem_updateTaxRate = function (req, res) {
    Wishlistitem.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, wishlistitem) {
        if (err) return next(err);
        res.json({message:'Wishlistitem udpated.'});
    });
};

exports.wishlistitem_getAll = function (req, res){
        Wishlistitem.find(function(err, items) {
            if (err)
                res.send(err);
                
            res.json(items);
    });
}