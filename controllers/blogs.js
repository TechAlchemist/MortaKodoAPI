const Blog = require('../models/blog');

async function createNewBlog(req, res) {
    const blog = new Blog(req.body);
    try {
        blog.save();
        return res.status(201).json('Blog was created. Very cool!');
    } 
    catch(error) {
        return res.status(500).json('OH GOD! OH NOOO! WE FAILED TO CREATE THE ASSET!');
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
        if (error) return res.send(500).json('Error fetching blogs.');
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
    Blog.deleteOne({ _id: req.params.id}, (error) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json('Blog article deleted.');
    });
}

async function updateBlog(req, res) {
    Blog.findOneAndUpdate(req.params.id, req.body, {useFindAndModify: false}, (error, article) => {
        if (error) res.status(500).json('error');
        return res.status(200).json('updated')
   });
    
}

module.exports = {
    createNewBlog,
    getAllBlogs,
    getBlog,
    deleteBlog,
    updateBlog
}