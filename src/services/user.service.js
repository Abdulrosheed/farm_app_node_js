const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (email,passWord,role) => {
    const user = new User({
      email : email,
      passWord : passWord,
      role : role,
      
    });
  return User.create(user);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async () => {
  const users = await User.find();
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};
const loginUser = async(email,passWord) =>{
  return  await User.findOne({ email: email, passWord: passWord });

}

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
// const getUserByEmail = async (email) => {
//   return User.findOne({ email });
// };

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

// const addLecturerToUser = async (userId, lecturerId) => {
//   const user = await getUserById(userId);
//   if (!user) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'Assignment not found');
//   }
//   user.lecturers.push(lecturerId);
//   await user.save()
//   return user;
// };
// const addStudentToUser = async (userId, studentId) => {
//   const user = await getUserById(userId);
//   if (!user) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'Assignment not found');
//   }
//   user.students.push(studentId);
//   await user.save()
//   return user;
// };
// const addAdminToUser = async (userId, adminId) => {
//   const user = await getUserById(userId);
//   if (!user) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'Assignment not found');
//   }
//   user.admins.push(adminId);
//   await user.save()
//   return user;
// };

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser
  

};
