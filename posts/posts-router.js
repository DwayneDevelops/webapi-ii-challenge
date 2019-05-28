const Posts = require('./posts-router.js');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.body);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the posts'
        });
    }
});

module.exports = router;