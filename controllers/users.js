const express = require('express');
const router = express.Router();

//database
const db = require('../models');

router.get('/:userId', async (req, res) => {
    try {
        const user = await db.User.findById(req.params.userId, {password: 0, email: 0, __v: 0});
        if(!user) return res.status(404).json({status: 404, error: 'user not foud'});

        const userPosts = await db.Post.find({user_id: req.params.userId})
            .populate({ path: 'user_id', select: 'name'})
            //.populate('user_id, '-password')// you can use this to find stuff in the object//
            .exec();

        res.json({user, userPosts});

    } catch(err) {
        console.log(err);

        return res.status(500).json({status: 500, error: 'something went wrong'});
    }
})


module.exports = router;