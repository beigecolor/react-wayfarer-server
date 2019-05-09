const express = require('express');
const router = express.Router();

//database
const db = require('../models');

// show GET for posts//
router.get('/:postId', async (req, res) => {
    try {
        const post = await db.Post.findById(req.params.postId)
        .populate('user_id', '-password - __v')
        .populate('city_id')
        .exec();

    res.json({post})
    } catch(err) {
        console.log(err);
        return res.status(500).json({status: 500, error: 'something went wrong'});
    }
});

// delete post destroy route //
router.delete('/:postId', async (req, res) => {
    // if (!req.session.currentUser) {
        // return res.status(401).json({status: 401, error: 'unauthorized'});
    // }
try {
    const post = await db.Post.findById(req.params.postId);
    if (post.user_id.toString === req.session.currentUser) {
        const deletedPost = await post.deleteOne();
        res.sendStatus(200);
    }
    res.status(401).json({status: 401,err: 'unathorized please log in'})
} catch(err) {
    console.log(err);
     return res.status(500).json({status: 500, error: 'something went wrong'});
}
});

module.exports = router;