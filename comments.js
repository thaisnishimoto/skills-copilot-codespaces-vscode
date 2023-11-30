// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment');

// Get all comments
router.get('/', function(req, res) {
    Comment.find({}, function(err, comments) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(comments);
        }
    });
});

// Get comment by id
router.get('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(comment);
        }
    });
});

// Create comment
router.post('/', function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(comment);
        }
    });
});

// Update comment
router.put('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            res.status(500).send(err);
        } else {
            comment.author = req.body.author;
            comment.text = req.body.text;
            comment.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send(comment);
                }
            });
        }
    });
});

// Delete comment
router.delete('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            res.status(500).send(err);
        } else {
            comment.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Comment removed');
                }
            });
        }
    });
});

module.exports = router;