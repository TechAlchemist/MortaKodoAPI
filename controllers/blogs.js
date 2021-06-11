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
    if (req.query.page && req.query.limit) {
        const page = req.query.page;
        const limit = req.query.limit;
        // scoped as var to reach slice in find
        var startIndex = (page - 1) * limit;
        var endIndex = page * limit;
        sliceArray = true;
    }
    Blog.find({}, (error, articles) => {
        if (error) return res.send(500).json('Error fetching blogs.');
        if (sliceArray) articles = articles.slice(startIndex, endIndex)
        return res.status(200).json(articles);
    });
}

async function getBlog(req, res) {
    Blog.find({ _id: req.params._id}, (error, article) => {
        if (error) return res.status(500).json('Failed to retrive article.');
        return res.status(200).json(article);
    })
}

module.exports = {
    createNewBlog,
    getAllBlogs,
    getBlog
}