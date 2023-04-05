const httpStatus = require('http-status');
const { Form } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a form
 * @param {Object} formBody
 * @returns {Promise<Form>}
 */
const createForm = async (formBody) => {
  return Form.create(formBody);
};


/**
 * Query for forms
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryForms = async () => {
  const forms = await Form.find().populate({path: 'user_id',
  select: '-passWord',});
  return forms;
};
const queryFormsForAdmin = async () => {
  const forms = await Form.find({isPublic : true}).populate({path: 'user_id',
  select: '-passWord',});
  return forms;
};

/**
 * Get form by id
 * @param {ObjectId} id
 * @returns {Promise<Form>}
 */
const getFormById = async (id) => {
  return Form.findOne({_id : id}).populate({path: 'user_id',
  select: '-passWord',});
};
const getFormsByUserId = async (user_id) => {
  return Form.find({user_id : user_id}).populate({path: 'user_id',
  select: '-passWord',});
};
const getFormSubmissionAddedToForm = async (id) => {
  return Form.find({_id : id} , 'formSubmissions').populate({path: 'user_id',
  select: '-passWord',});
};
const getAgentsAttachedToForm = async (id) => {
  return Form.find({_id : id} , 'agents').populate({path: 'user_id',
  select: '-passWord',});
};

/**
 * Get form by email
 * @param {string} email
 * @returns {Promise<Form>}
 */
// const getFormByEmail = async (email) => {
//   return Form.findOne({ email });
// };

/**
 * Update form by id
 * @param {ObjectId} formId
 * @param {Object} updateBody
 * @returns {Promise<Form>}
 */

const addFormSubmissionToForm = async (formId, formSubmissionId) => {
    const form = await getFormById(formId);
    if (!form) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
    }
    form.formSubmissions.push(formSubmissionId);
    await form.save()
    return form;
};
const addAgentToForm = async (formId, agentId) => {
  const form = await getFormById(formId);
  console.log(form)

  if (!form) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
  }
  form.agents.push(agentId);
  await form.save()
  return form;
};


/**
 * Delete form by id
 * @param {ObjectId} formId
 * @returns {Promise<Form>}
 */
const deleteFormById = async (formId) => {
  const form = await getFormById(formId);
  if (!form) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
  }
  await form.remove();
  return form;
};

module.exports = {
  createForm,
  queryForms,
  getFormById,
  deleteFormById,
  addFormSubmissionToForm,
  addAgentToForm,
  getFormsByUserId,
  getFormSubmissionAddedToForm,
  getAgentsAttachedToForm,
  queryFormsForAdmin
};
