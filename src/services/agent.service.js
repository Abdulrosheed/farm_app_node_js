const httpStatus = require('http-status');
const { Agent } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a agent
 * @param {Object} agentBody
 * @returns {Promise<Agent>}
 */
const createAgent = async (agentBody) => {
  
  return Agent.create(agentBody);
};

/**
 * Query for agents
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAgents = async () => {
  const agents = await Agent.find().populate({path: 'user_id',
  select: '-passWord',});
  return agents;
};

/**
 * Get agent by id
 * @param {ObjectId} id
 * @returns {Promise<Agent>}
 */
const getAgentById = async (id) => {
  return Agent.findById(id).populate({path: 'user_id',
  select: '-passWord',});
};
const getFormsAssignedToAgent = async (id) => {
  return Agent.find({user_id : id} , 'id').populate('forms');
};
const addFormToAgent = async (id, formId) => {
  const agent = await Agent.findOne({_id : id});
  if (!agent) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
  }
  agent.forms.push(formId);
  await agent.save()
  return agent;
};
/**
 * Get agent by email
 * @param {string} email
 * @returns {Promise<Agent>}
 */
// const getAgentByEmail = async (email) => {
//   return Agent.findOne({ email });
// };

/**
 * Update agent by id
 * @param {ObjectId} agentId
 * @param {Object} updateBody
 * @returns {Promise<Agent>}
 */
const updateAgentById = async (agentId, updateBody) => {
  const agent = await getAgentById(agentId);
  if (!agent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agent not found');
  }
  // if (updateBody.email && (await Agent.isEmailTaken(updateBody.email, agentId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  Object.assign(agent, updateBody);
  await agent.save();
  return agent;
};

/**
 * Delete agent by id
 * @param {ObjectId} agentId
 * @returns {Promise<Agent>}
 */
const deleteAgentById = async (agentId) => {
  const agent = await getAgentById(agentId);
  if (!agent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agent not found');
  }
  await agent.remove();
  return agent;
};

module.exports = {
  createAgent,
  queryAgents,
  getAgentById,
  updateAgentById,
  deleteAgentById,
  getFormsAssignedToAgent,
  addFormToAgent
};
