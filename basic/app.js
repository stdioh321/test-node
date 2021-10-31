const os = require("os");
const fs = require("fs");
const f1 = `${__dirname}/docs/file1.txt`;
fs.readFile(f1, (err, data) => {
    console.log(data.toString());
    fs.writeFile(f1, "\nextra", (err) => {
        if (err)
            console.log("Something went wrong.", err);
    });
});