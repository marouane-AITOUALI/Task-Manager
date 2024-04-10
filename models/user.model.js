const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    fullName: {
        type: String
    },
    job: {
        type: String
    },
    role: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
},
    {
        timestamps: true
    });

const userSchema = mongoose.model('User', UserSchema);
module.exports = userSchema;