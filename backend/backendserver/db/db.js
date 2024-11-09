const mongoose = require('mongoose');

const ruleschema = new mongoose.Schema({
    rule: {type: String},
    rules: {type: [String]},
    tree: {type: Object, required: true},
});

module.exports = mongoose.model('Rule', ruleschema);
