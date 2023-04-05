const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { adminService } = require('../services');
const { userService } = require('../services');
const mongoose = require('mongoose');



const createAdmin = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body.email , req.body.passWord ,  "Admin");
  console.log(user);
  req.body.user_id = user.id;
  const admin = await adminService.createAdmin(req.body);
  
  res.status(httpStatus.CREATED).send(admin);
});
const createSuperAdmin = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body.email , req.body.passWord ,  "SuperAdmin");
  console.log(user);
  req.body.user_id = user.id;
  const admin = await adminService.createAdmin(req.body);
  
  res.status(httpStatus.CREATED).send(admin);
});

const Admins = catchAsync(async (req, res) => {
  const result = await adminService.queryAdmins();
  res.send(result);
});

const getAdmin = catchAsync(async (req, res) => {
  const admin = await adminService.getAdminById(req.params.id);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  res.send(admin);
});
const getAdminForms = catchAsync(async (req, res) => {
  const admin = await adminService.getFormsCreatedByAdmin(req.user);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  res.send(admin);
});

// const updateAdmin = catchAsync(async (req, res) => {
//   const admin = await adminService.updateAdminById(req.params.adminId, req.body);
//   res.send(admin);
// });

// const deleteAdmin = catchAsync(async (req, res) => {
//   await adminService.deleteAdminById(req.params.adminId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createAdmin,
  Admins,
  getAdmin,
  createSuperAdmin,
  getAdminForms
 
};
