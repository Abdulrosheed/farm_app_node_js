const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const assignmentSubmissionValidation = require('../../validations/assignmentSubmission.validation');
const adminController = require('../../controllers/admin.controller');
const { authMiddleware } = require('../../services/token.service');
const router = express.Router();


router.post('/admin/create', adminController.createAdmin);
router.post('/admin/createSuper', adminController.createSuperAdmin);
router.get('/admins' , adminController.Admins);
router.get('/admin/:id' , adminController.getAdmin);
router.get('/getadminForms' , authMiddleware, adminController.getAdminForms);

// router.delete('/lecturer/delete/:id' , adminController.deleteAdmin);
// router.get('/assignmentSubmissions' , assignmentSubmissionController.getStudents);
// router.get('/as/:id' , assignmentSubmissionController.getAssignmentSubmission);


module.exports = router;