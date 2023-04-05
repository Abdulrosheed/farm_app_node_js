const httpStatus = require('http-status');
const { Admin } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a admin
 * @param {Object} adminBody
 * @returns {Promise<Admin>}
 */
const createAdmin = async (adminBody) => {
  
  return Admin.create(adminBody);
};

/**
 * Query for admins
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAdmins = async () => {
  const admins = await Admin.find().populate({path: 'user_id',
  select: '-passWord',});
  return admins;
};

/**
 * Get admin by id
 * @param {ObjectId} id
 * @returns {Promise<Admin>}
 */
const getAdminById = async (id) => {
  return Admin.findById(id).populate({path: 'user_id',
  select: '-passWord',});
};
const getFormsCreatedByAdmin = async (id) => {
  console.log(id);
  return Admin.find({user_id : id} , 'id').populate("forms");
};
const addFormToAdmin = async (id, formId) => {
  const admin = await Admin.findOne({user_id : id});
  console.log(admin.forms);
  if (!admin) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
  }

  admin.forms.push(formId);
  await admin.save()
  return admin;
};

/**
 * Get admin by email
 * @param {string} email
 * @returns {Promise<Admin>}
 */
// const getAdminByEmail = async (email) => {
//   return Admin.findOne({ email });
// };

/**
 * Update admin by id
 * @param {ObjectId} adminId
 * @param {Object} updateBody
 * @returns {Promise<Admin>}
 */
const updateAdminById = async (adminId, updateBody) => {
  const admin = await getAdminById(adminId);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  // if (updateBody.email && (await Admin.isEmailTaken(updateBody.email, adminId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  Object.assign(admin, updateBody);
  await admin.save();
  return admin;
};

/**
 * Delete admin by id
 * @param {ObjectId} adminId
 * @returns {Promise<Admin>}
 */
const deleteAdminById = async (adminId) => {
  const admin = await getAdminById(adminId);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  await admin.remove();
  return admin;
};

module.exports = {
  createAdmin,
  queryAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  getFormsCreatedByAdmin,
  addFormToAdmin
};
