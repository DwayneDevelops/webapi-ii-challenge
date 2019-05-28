const express = require('express');

const server = express();

const postsRouter = require('../posts/posts-router.js');

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
    <h2>Challenge 2</h2>
    <p> Start Here<p>
    `);
});

server.use('/api/posts', postsRouter);

module.exports = server;