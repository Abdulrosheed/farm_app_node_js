const express = require('express');
const formSubmissionController = require('../../controllers/form.submission.controller');
const { authMiddleware } = require('../../services/token.service');


const router = express.Router();

router.post('/formSubmission/create/:id', authMiddleware,formSubmissionController.createFormSubmission);
router.get('/formSubmissions' , formSubmissionController.formSubmissions);
router.get('/formSubmissions/:id' , formSubmissionController.getFormSubmission);




module.exports = router;