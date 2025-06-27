const Resume = require('../models/resumeModel');
const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/customError');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const hbs = require('handlebars')
const moment = require('moment')
const imagekit = require('../utils/imagekit');


const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), 'templates', `${templateName}.html`);
    const html = await fs.readFile(filePath, 'utf-8');
    const template = hbs.compile(html);
    return template(data);
};

hbs.registerHelper('formatDate', function (date) {
    return moment(date).format('MMM YYYY'); // e.g., Jun 2023
});

hbs.registerHelper('join', function (arr, sep) {
  return Array.isArray(arr) ? arr.join(sep) : arr;
});


const createResume = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title) {
        throw new CustomError("Title is required.", 400);
    }
    const isExist = await Resume.findOne({ user: req.user._id, title: title });

    if (isExist) {
        throw new CustomError('Resume already exist with this title.', 400)
    }

    const newResume = new Resume({
        user: req.user._id,
        ...req.body
    })

    await newResume.save()

    res.status(201).json(newResume);
});

const getUserResumes = asyncHandler(async (req, res) => {

    const resumes = await Resume.find({ user: req.user._id }).select("title").sort({ updatedAt: -1 });

    if (!resumes) {
        throw new CustomError("Resume not found.", 404)
    }
    res.status(200).json(resumes);
});

const getResumeById = asyncHandler(async (req, res) => {

    const resumeId = req.params.id;

    const resume = await Resume.findOne({ user: req.user._id, _id: resumeId });

    if (!resume) {
        throw new CustomError("Resume not found.", 404)
    }

    res.status(200).json(resume);
});

const updateResume = asyncHandler(async (req, res) => {

    const resumeId = req.params.id;

    const resume = await Resume.findOne({ user: req.user._id, _id: resumeId });

    if (!resume) {
        throw new CustomError("Resume not found.", 404)
    }

    //merge updated resume value
    Object.assign(resume, req.body);

    const savedResume = await resume.save();

    res.status(200).json({
        message: "Resume updated successfully.",
        success: true,
        data: savedResume
    });
});

const deleteResume = asyncHandler(async (req, res) => {

    const resumeId = req.params.id;

    const resume = await Resume.findOneAndDelete({ user: req.user._id, _id: resumeId });

    if (!resume) {
        throw new CustomError("Resume not found.", 404)
    }

    res.status(200).json({
        success: true,
        message: "Resume deleted successfully."
    });
});

const generatePdf = asyncHandler(async (req, res) => {
    const { template, resumeId } = req.body;
    const resume = await Resume.findOne({ _id: resumeId, user: req.user._id }).lean();

    if (!resume) {
        throw new CustomError("Resume not found", 404);
    }

    const content = await compile(template, resume);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: './.puppeteer-cache/chrome/linux-137.0.7151.119/chrome-linux64/chrome'
    });

    // const browser = await puppeteer.launch()
    const page = await browser.newPage();

    await page.setContent(content, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');

    const fileName = `${resume.title}_${resume.user}.pdf`;
    const pdfPath = path.join(process.cwd(), 'uploads', fileName);

    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true
    });

    await browser.close();

    // Upload to ImageKit
    const pdfBuffer = await fs.readFile(pdfPath);

    const uploadResponse = await imagekit.upload({
        file: pdfBuffer,         // required
        fileName: fileName,       // required
        folder: "/resumes",       // optional
        useUniqueFileName: true   // optional
    });

    // Delete local PDF file
    await fs.unlink(pdfPath);

    // Send response with uploaded file URL
    res.status(200).json({
        success: true,
        message: "PDF generated successfully.",
        url: uploadResponse.url
    });
});



module.exports = {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
    generatePdf
}