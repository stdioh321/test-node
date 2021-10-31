const os = require("os");
const fs = require("fs");
const f1 = `${__dirname}/docs/file1.txt`;
fs.readFile(f1, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    fs.writeFile(f1, "\nextra", (err) => {
        if (err)
            console.log("Something went wrong.", err);
    });
});

fs.mkdir("./eraseme", () => {
    console.log("LOG");
});
fs.exists("./eraseme", (exists) => {
    if (exists) {
        setTimeout(() => {
            fs.rmdir("./eraseme", () => {});
        }, 3000)
    }
})