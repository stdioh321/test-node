const config = require("./config");
const { text } = require("express");
const express = require("express");
const _ = require("lodash");
const path = require("path");
// const connectMongoose = require("./db/mongoose");
const app = express();
const port = process.env.PORT || 8080;
const blogs = require("./routes/blogs");
const { ApiError, ApiSubError } = require("./models/ApiError");
const BasicException = require("./exceptions/BasicException");

// connectMongoose.mongoose
//     .then(res => {
//         console.log("Connected to DB");
//         const server = app.listen(port, () => {
//             console.log(`Server running at port: ${port}`);
//         });
//         // console.log(res);
//     })
//     .catch(err => {
//         console.log("Error connecting to DB");
//         console.log(err);
//     });



// app.use(morgan('common'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// (Optional) express already uses the folder "views" as default
app.set("views", path.join(__dirname, "views/"))
app.use(express.json());
app.use(express.text());
app.use(express.raw());
app.use(express.urlencoded({ extended: true }))




// Middleware ALL
app.use((req, res, next) => {
    // console.log(`# new request #####################################`);
    // console.log(`# host: ${req.hostname}`);
    // console.log(`# path: ${req.path}`);
    // console.log(`# method: ${req.method}`);
    // console.log(`###################################################`);
    res.locals.title = "Express";
    next();
});


app.get("/test", (ret, res) => {
    throw new BasicException({ message: "Tudo Errado" });
});

app.use("/blogs", blogs);

// const route = express.Router();
// route.get("/", (req, res) => {
//     res.send("TMP");
// });
// app.use("/tmp", route);
app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "/views/home.html"));

    res.render("home", { title: "Home" });
});


app.get("/about", (req, res) => {

    let body = Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : undefined;

    let text = body || req.query.text || "Server Text";

    res.render("about", {
        title: "ABOUT",
        text: text,
        list: [
            1, 2, 3, 4, 5, 6
        ]
    });
});
app.use((req, res) => {

    res.status(404).render(`404`);
});

app.use(function(err, req, res, next) {
    let showException = /true/i.test(req.headers["show-exception"]);
    if (err instanceof BasicException) {
        const apiError = new ApiError({ message: err.message, ex: err.originalException || err, showException: showException });
        return res.status(err.code).json(apiError);
    } else {
        return res.status(500).end(new ApiError({
            message: "Server error",
            ex: err,
            showException: showException
        }));
    }

});

async function start() {
    // await connectMongoose.mongoose;

    const server = app.listen(port, () => {
        console.log(`Server running at port: ${port}`);
    });
}
start();

module.exports.app = app;