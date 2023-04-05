const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { agentService } = require('../services');
const { userService } = require('../services');
const { formService } = require('../services');

const createAgent = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body.email , req.body.passWord ,  "Agent");
  console.log(user);
  req.body.user_id = user.id;
  const agent = await agentService.createAgent(req.body);
  
  res.status(httpStatus.CREATED).send(agent);
});



const Agents = catchAsync(async (req, res) => {
  const result = await agentService.queryAgents();
  res.send(result);
});

const getAgent = catchAsync(async (req, res) => {
  const agent = await agentService.getAgentById(req.params.id);
  if (!agent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agent not found');
  }
  res.send(agent);
});
const getAgentForms = catchAsync(async (req, res) => {
  const forms = await agentService.getFormsAssignedToAgent(req.user);
  if (!forms) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agent not found');
  }
  res.send(forms);
});
const AttachFormToAgent = catchAsync(async (req, res) => {
  const agent = await agentService.addFormToAgent(req.query.agent_id , req.params.id);
  console.log(agent);
  const form = await formService.addAgentToForm(req.params.id , req.query.agent_id);
  if (!agent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agent not found');
  }
  res.send(agent);
});





// const updateCourse = catchAsync(async (req, res) => {
//   const course = await courseService.updateCourseById(req.params.courseId, req.body);
//   res.send(course);
// });

// const deleteCourse = catchAsync(async (req, res) => {
//   await courseService.deleteCourseById(req.params.courseId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createAgent,
  Agents,
  getAgent,
  getAgentForms,
  AttachFormToAgent
};
