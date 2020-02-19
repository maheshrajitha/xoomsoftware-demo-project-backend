const express = require('express');
const userService = require('./services/user.service');
const authServices = require('./services/auth.service');
const appoinmentServices = require('./services/appoinment.service');
const authMiddleWare = require('./auth.middleware');

const router = express.Router();

const userRouter = express.Router();
userRouter.post('', userService.userSignup);
router.use('/users', userRouter);

const authRouter = express.Router();
authRouter.post('',authServices.login);
router.use('/auth', authRouter);

const appoinmentRouter = express.Router();
appoinmentRouter.get('/all', authMiddleWare(3), appoinmentServices.getAppoinmentByUserId);
appoinmentRouter.post('',authMiddleWare(3),appoinmentServices.newAppoinment);
router.use('/appoinment', appoinmentRouter);
module.exports = router;