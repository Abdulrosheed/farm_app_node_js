const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');


const login = catchAsync(async (req, res) => {
  const { email, passWord } = req.body;
  const user = await userService.loginUser(email, passWord);
  console.log(user);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});


module.exports = {
  login,
};
