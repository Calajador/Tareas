const mongoose = require('mongoose');
const {Schema} = mongoose;

const ListSchema = new Schema({
    userId: String,
    title:String
});

const List = mongoose.model('List', ListSchema);

module.exports = List;