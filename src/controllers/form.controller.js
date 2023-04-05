const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { formService } = require('../services');
const { adminService } = require('../services');

const createForm = catchAsync(async (req, res) => {
  req.body.user_id = req.user;
  const form = await formService.createForm(req.body);
  adminService.addFormToAdmin(req.body.user_id , form.id);
  res.status(httpStatus.CREATED).send(form);
});

const getFormsByUserId = catchAsync(async (req, res) => {
  const result = await formService.getFormsByUserId(req.user);
  res.send(result);
});

const getForm = catchAsync(async (req, res) => {
  const form = await formService.getFormById(req.params.id);
  if (!form) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
  }
  res.send(form);
});
const forms = catchAsync(async (req, res) => {
  const forms = await formService.queryForms();
  if (!forms) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
  }
  res.send(forms);
});
const formsForAdmin = catchAsync(async (req, res) => {
  const forms = await formService.queryFormsForAdmin();
  if (!forms) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
  }
  res.send(forms);
});
const getAgentsAttachedToForm = catchAsync(async (req, res) => {
  const forms = await formService.getAgentsAttachedToForm(req.params.id);
  if (!forms) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
  }
  res.send(forms);
});
const getFormSubmissionsAttachedToForm = catchAsync(async (req, res) => {
  const forms = await formService.getFormSubmissionAddedToForm(req.params.id);
  if (!forms) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
  }
  res.send(forms);
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
  getFormSubmissionsAttachedToForm,
  getAgentsAttachedToForm,
  forms,
  getForm,
  getFormsByUserId,
  createForm,
  formsForAdmin
};
