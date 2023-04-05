const express = require('express');
const formController = require('../../controllers/form.controller');
const { authMiddleware } = require('../../services/token.service');

const router = express.Router();

router.post('/form/create', authMiddleware,formController.createForm);
router.get('/forms/superAdmin' , formController.forms);
router.get('/forms' , formController.formsForAdmin);
router.get('/forms/user' , authMiddleware,formController.getFormsByUserId);
router.get('/form/:id' , formController.getForm);
router.get('/form/agents/:id' , formController.getAgentsAttachedToForm);
router.get('/form/submissions/:id' , formController.getFormSubmissionsAttachedToForm);




module.exports = router;