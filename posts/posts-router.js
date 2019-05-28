const Posts = require('../data/db.js');

const router = require('express').Router();

router.post('/', async (req, res) => {
    const {title, contents} = req.body;
    
    if ( title && contents ){
        try {
            const post = await Posts.insert(req.body)
            res.status(201).json(post);
        } catch (error) {
            console.log(error);
            res.status(500).json({ 
                message: 'Error retrieving post'
            });
        }
    } else {
        res.status(404).json({ message: 'Please fill in Title and Contents and try again'});
    }
});

router.post('/:id/comments', async (req, res) => {
    
})

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

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Could not find the post with the specified ID'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the post'
        });
    }
});

module.exports = router;