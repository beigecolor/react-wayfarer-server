const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/react-wayfarer';

mongoose.connect(DB_URL, { useNewUrlParser: true,
useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('MongoDB Dude'))
    .catch((err) => console.log(err));

module.exports = {
    User:
    Post:
    City:
};