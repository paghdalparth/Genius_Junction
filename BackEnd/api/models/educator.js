const mongoose = require('mongoose');

const educatorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: /^\d{10}$/,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    upiID: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]/
    },
    bio: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
    },
    courseCreated: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course'
    }
});

const Educator = mongoose.model('Educator', educatorSchema);

module.exports = Educator;