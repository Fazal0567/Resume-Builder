
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fullName: {
        type: String,
        default:""
    },
    role:{
        type:String,
        default:""
    },

    title: {
        type: String,
        required: true,
        trim:true
    },

    contact: {
        email: { type: String },
        phone: { type: String },
        location: { type: String },
        linkedin: { type: String },
        github: { type: String },
        website: { type: String },
    },

    summary: {
        type: String,
        default:""
    },

    skills: [String],

    education: [
        {
            institution: { type: String},
            degree: { type: String },
            startYear: { type: Number },
            endYear: { type: Number },
            gpa:{type:Number},
             _id:false
        },
    ],

    experience: [
        {
            company: { type: String},
            role: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            description: { type: String },
            _id:false
        },
    ],
    projects: [
        {
            name: { type: String},
            description: { type: String },
            techStack: [String],
            github: { type: String },
            liveDemo: { type: String },
             _id:false
        },
    ],

    certificates: [
        {
            title: String,
            issuer: String,
            year: String,
            link: { type: String },
             _id:false
        },
    ],

    languages: [String],

    interests: [String],

}, { versionKey: false, timestamps: true });

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume
