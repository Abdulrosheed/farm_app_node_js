const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { formService } = require('../services');
const { formSubmissionService } = require('../services');

const createFormSubmission = catchAsync(async (req, res) => {
  req.body.user_id = req.user;
  req.body.form_id = req.params.id
  const formSubmission = await formSubmissionService.createFormSubmission(req.body);
  formService.addFormSubmissionToForm(req.params.id , formSubmission.id);
  res.status(httpStatus.CREATED).send(formSubmission);
});

const formSubmissions = catchAsync(async (req, res) => {
  const formSubmissions = await formSubmissionService.queryFormSubmission();
  if (!formSubmissions) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
  }
  res.send(formSubmissions);
});
const getFormSubmission = catchAsync(async (req, res) => {
  const formSubmissions = await formSubmissionService.getFormSubmissionById(req.params.id);
  if (!formSubmissions) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
  }
  res.send(formSubmissions);
});


// const updateAssignment = catchAsync(async (req, res) => {
//   const assignment = await assignmentService.updateAssignmentById(req.params.assignmentId, req.body);
//   res.send(assignment);
// });

// const deleteAssignment = catchAsync(async (req, res) => {
//   await assignmentService.deleteAssignmentById(req.params.assignmentId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createFormSubmission,
  formSubmissions,
  getFormSubmission
  
};
