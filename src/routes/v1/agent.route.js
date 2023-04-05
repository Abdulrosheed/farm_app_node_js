const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const courseValidation = require('../../validations/course.validation');
const agentController = require('../../controllers/agent.controller');
const { authMiddleware } = require('../../services/token.service');

const router = express.Router();


router.post('/agent/create', agentController.createAgent);
router.get('/agents' , agentController.Agents);
router.get('/agent/attachForm/:id' , agentController.AttachFormToAgent)
router.get('/agent/:id' , agentController.getAgent);
router.get('/getAgentForms' , authMiddleware,agentController.getAgentForms);

// router.delete('/course/delete/:id' , courseController.deleteCourse);
// router.patch('/course/update/:id' , courseController.updateCourse);

module.exports = router;