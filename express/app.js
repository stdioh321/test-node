const config = require("./config");
const { text } = require("express");
const express = require("express");
const _ = require("lodash");
const path = require("path");
const morgan = require('morgan');



const app = express();
const port = process.env.PORT || 8080;



app.use(morgan('common'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
// (Optional) express already uses the folder "views" as default
app.set("views", path.join(__dirname, "views/"))
app.use(express.json());
app.use(express.text());
app.use(express.raw());

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
// app.get("/*", (req, res) => {
//     res.status(404).sendFile(`/views/404.html`, { root: __dirname });
// });
app.use((req, res) => {

    res.status(404).render(`404`);

});


const server = app.listen(port, () => {
    console.log(`Server running at port: ${port}`);

});