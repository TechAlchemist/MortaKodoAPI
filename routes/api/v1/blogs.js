const express = require('express');
const router = express.Router();
const blogController = require('../../../controllers/blogs');

router.post('/createBlog', blogController.createNewBlog);
router.put('/updateBlog/:id', blogController.updateBlog);
router.get('/getAllBlogs', blogController.getAllBlogs);
router.get('/getBlog/:id', blogController.getBlog);
router.delete('/deleteBlog/:id', blogController.deleteBlog);

module.exports = router;