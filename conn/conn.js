const mongoose = require('mongoose');
const conn = async (req, res) => {
    mongoose.connect('mongodb://localhost:27017/Server')
    console.log('connected to db');
}
conn();
