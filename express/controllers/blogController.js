const _ = require("lodash");
const Blog = require("../models/blog");
const ObjectId = require("mongoose").Types.ObjectId;
const { redirectAfterTime } = require("../util/utils");

module.exports.index = async(req, res) => {
    let blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("blogs/index", { blogs: blogs });
};

module.exports.create = async(req, res) => {
    res.render("blogs/update", { blog: null });
};

module.exports.edit = (req, res, next) => {

    const id = req.params.id;
    Blog.findById(id, (err, data) => {
        if (data) {
            return res.render("blogs/update", { blog: data });
        } else {
            return res.redirect("/blogs");
        }


    });
};

module.exports.show = async(req, res) => {
    // res.sendFile(path.join(__dirname, "/views/home.html"));

    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(422).send();
    let blog = await Blog.findById(id);
    if (!blog) return res.status(404).send();
    res.json(blog);
}


module.exports.store = async(req, res) => {
    const blog = new Blog(req.body);
    let error = blog.validateSync();
    if (error)
        return res.render("blogs/update", { blog: req.body, msg: "Validation error", errors: error.errors });

    const newBlog = await blog.save();
    if (!newBlog) return res.render("blogs/update", { blog: req.body, msg: "Unable to save blog" });

    return redirectAfterTime(res, { url: "/blogs" });

}


module.exports.destroy = async(req, res) => {
    const id = req.params.id;

    Blog.findByIdAndRemove(id, (err, data) => {
        if (data) return res.json(data);
        if (err) return res.status(400).send();
        return res.status(404).send();
    });
};


module.exports.update = async(req, res) => {
    const body = req.body;
    console.log(body);
    Blog.findByIdAndUpdate({ _id: req.params.id }, req.body, async(err, data) => {
        if (data) {
            return redirectAfterTime(res, { url: "/blogs" });
        }
        if (err) return res.redirect("back")
        res.redirect("back");
    });
}