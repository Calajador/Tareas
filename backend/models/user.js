const mongoose = require('mongoose');
const {Schema} = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');


const UserSchema = new Schema ({
    name: {type: String},
    email:{type: String},
    password: {type: String},
    date: {type: Date, default: Date.now}
});

UserSchema.methods.generateKJWT = function() {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        password: this.password
    }, config.secret);
};

UserSchema.methods.encriptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
