const Review = require('../models/review.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.review_create = function (req, res) {
    let review = new Review(
         {
            review: req.body.review,
            rating: req.body.rating,
            productName:req.body.productName,
            userEmail: req.body.userEmail
        }
    );

    review.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json({message: 'Review Created successfully'})
    })
};

exports.review_details = function (req, res) {
    Review.findById(req.params.id, function (err, review) {
        if (err) return next(err);
        res.json(review);
    })
};

exports.review_update = function (req, res) {
    Review.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, review) {
        if (err) return next(err);
        res.json({message:'Review udpated.'});
    });
};

exports.review_delete = function (req, res) {
    Review.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json({message: 'Deleted Review successfully!'});
    })
};

exports.review_updateAmount = function (req, res) {
    Review.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, review) {
        if (err) return next(err);
        res.json({message:'Review udpated.'});
    });
};

exports.review_updateTaxRate = function (req, res) {
    Review.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, review) {
        if (err) return next(err);
        res.json({message:'Review udpated.'});
    });
};

exports.review_getAll = function (req, res){
        Review.find(function(err, items) {
            if (err)
                res.send(err);
                
            res.json(items);
    });
}