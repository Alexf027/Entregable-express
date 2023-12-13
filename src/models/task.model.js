const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    priority:{
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: false,
    },
    completed:{
        type: Boolean,
        default: false,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Task', taskSchema);