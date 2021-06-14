const Blog = require('../models/blog');
const User = require('../models/user');
const { authRequest } = require('../utils/api-auth');

async function createNewBlog(req, res) {
    const authorizied = await authRequest(req.headers['user-id']);
    if (!authorizied) return res.status(403).json('Could not authenticate request.'); 
    const blog = new Blog(req.body);
    try {
        blog.save();
        return res.status(201).json('Blog was created.');
    } 
    catch(error) {
        return res.status(500).json('Failed to create blog article.');
    }
} 

async function getAllBlogs(req, res) {
    let sliceArray = false;
    const results = {};
    if (req.query.page && req.query.limit) {
        var page = parseInt(req.query.page);
        var limit = parseInt(req.query.limit);
        var startIndex = (page - 1) * limit;
        var endIndex = page * limit;
        sliceArray = true;
    }
    Blog.find({}, (error, articles) => {
        results.results = articles;
        if (error) return res.send(500).json('Failed to retrieve articles.');
        // format data for pagination
        if (sliceArray) {
            results.results = articles.slice(startIndex, endIndex);
            if (endIndex <  articles.length) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
        }
        return res.status(200).json(results);
    });
}

async function getBlog(req, res) {
    Blog.find({ _id: req.params.id}, (error, article) => {
        if (error) return res.status(500).json('Failed to retrive article.');
        return res.status(200).json(article);
    })
}

async function deleteBlog(req, res) {
    const authorizied = await authRequest(req.headers['user-id']);
    if (!authorizied) return res.status(403).json('Could not authenticate request.'); 
    Blog.deleteOne({ _id: req.params.id}, (error) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json('Blog article was deleted.');
    });
}

async function updateBlog(req, res) {
    const authorizied = await authRequest(req.headers['user-id']);
    if (!authorizied) return res.status(403).json('Could not authenticate request.'); 
    Blog.findOneAndUpdate(req.params.id, req.body, {useFindAndModify: false}, (error, article) => {
        if (error) res.status(500).json('Failed to update blog.');
        return res.status(200).json('Blog article was updated.');
   });
    
}

module.exports = {
    createNewBlog,
    getAllBlogs,
    getBlog,
    deleteBlog,
    updateBlog
}