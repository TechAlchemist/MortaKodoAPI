const express = require('express');
const router = express.Router();
const blogController = require('../../../controllers/blogs');

router.post('/createBlog', blogController.createNewBlog);
router.get('/getAllBlogs', blogController.getAllBlogs);
router.get('/getBlog/:_id', blogController.getBlog);


module.exports = router;