const mongoose = require('mongoose');


// const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
// mongodb+srv://<username>:<password>@cluster0.fiwrj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


console.log(url);
module.exports.connection = mongoose.createConnection(url);

// module.exports.mongoose = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });