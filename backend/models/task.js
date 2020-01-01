const mongoose = require('mongoose');
const {Schema} = mongoose;

const TaskSchema = new Schema({
    _listId: mongoose.Types.ObjectId,
    name: String,
    description: String,
    status: String,
    imageUrl: String,
    date: {type: Date, default: Date.now}
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;