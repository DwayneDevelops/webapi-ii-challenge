const Posts = require('../data/db.js');

const router = require('express').Router();

router.post('/', async (req, res) => {
    const {title, contents} = req.body;
    
    if ( !title && !contents ) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        try {
            const post = await Posts.insert(req.body);
            res.status(201).json(post);
        } catch (error) {
            console.log(error);
            res.status(500).json({ 
                error: "There was an error while saving the post to the database"
            });
        }
    }
});

router.post('/:id/comments', async (req, res) => {
    const { text } = req.body;

    if ( post ) {
        try {
            const post = await Posts.insertComment({ text });
                res.status(201).json(post);
            } catch (error) {
                console.log(error);
                res.status(500).json({ 
                    message: "Error retrieving the post"
                });
            }
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
});

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

router.get('/:id/comments', async (req, res) => {
    try {

    } catch {

    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({ message: 'The post has been deleted'});
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            error: "The post could not be removed"
        });
    }
});

router.put('/:id', async (req, res) => {
    const { title, contents } = req.body;

    if ( !title && !contents ) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        try {
            const post = await Posts.update(req.params.id, req.body);
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ 
                    message: "The post with the specified ID does not exist."
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ 
                error: "The post information could not be modified."
            });
        }
    }
});

module.exports = router;