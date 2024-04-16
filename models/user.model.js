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
        type: String,
        enum: ['rh', 'admin', 'employee'],
        required: false,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task',
        }
    ]
},
    {
        timestamps: true
    });

const userSchema = mongoose.model('User', UserSchema);
module.exports = userSchema;