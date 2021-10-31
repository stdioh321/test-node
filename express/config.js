const path = require("path");
const dotenv = require("dotenv");
let env = `.env`;

if (process.env.NODE_ENV)
    env += `.${process.env.NODE_ENV}`;

dotenv.config({
    path: path.resolve(__dirname, env)
});

console.log("NODE_ENV: ", process.env.NODE_ENV);

module.exports = {
    NODE_ENV: process.env.NODE_ENV
}