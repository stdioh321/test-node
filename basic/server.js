const http = require("http");
const url = require("url");
const fs = require("fs");
const _ = require("lodash");

const port = process.env.PORT || 8080;
const host = process.env.HOST || "0.0.0.0";

const server = http.createServer((req, res) => {
    const greet = _.once(() => {
        console.log("ONCE");
    });

    // const queryObject = url.parse(req.url, true).query;
    let path = "./views";
    switch (req.url) {
        case "/":
            path += "/hello.html";
            break;
        case "/about":
            path += "/about.html";
            break;
        default:
            path += "/404.html";
            break;


    }

    res.write(fs.readFileSync(path));

    res.end();
})
server.listen(port, () => {
    console.log(`Server listening at: ${host}:${port}`);
});