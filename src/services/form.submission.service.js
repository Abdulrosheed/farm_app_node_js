const httpStatus = require('http-status');
const { FormSubmission } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a formSubmission
 * @param {Object} formSubmissionBody
 * @returns {Promise<FormSubmission>}
 */
const createFormSubmission = async (formSubmissionBody) => {
  
  return FormSubmission.create(formSubmissionBody);
};

/**
 * Query for formSubmissions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryFormSubmission = async () => {
  return FormSubmission.find().populate({path:'user_id',
  select: '-passWord'}).populate('form_id');
};
/**
 * Get formSubmission by id
 * @param {ObjectId} id
 * @returns {Promise<FormSubmission>}
 */
const getFormSubmissionById = async (id) => {
  return FormSubmission.findById(id).populate({path:'user_id',
  select: '-passWord',}).populate('form_id');
};

/**
 * Get formSubmission by email
 * @param {string} email
 * @returns {Promise<FormSubmission>}
 */
// const getFormSubmissionByEmail = async (email) => {
//   return FormSubmission.findOne({ email });
// };



/**
 * Delete formSubmission by id
 * @param {ObjectId} formSubmissionId
 * @returns {Promise<FormSubmission>}
 */
const deleteFormSubmissionById = async (formSubmissionId) => {
  const formSubmission = await getFormSubmissionById(formSubmissionId);
  if (!formSubmission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FormSubmission not found');
  }
  await formSubmission.remove();
  return formSubmission;
};

module.exports = {
  createFormSubmission,
  getFormSubmissionById,
  deleteFormSubmissionById,
  queryFormSubmission
};
