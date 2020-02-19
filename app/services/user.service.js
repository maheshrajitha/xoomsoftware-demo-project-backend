const error = require('../error');
const errorValues = require('../error.value');
const uuid = require('uuid');

const userRepository = require('../repositories/user.repository');
module.exports = {
    userSignup: (req,res,next) => {
        let newUser = {
            id: uuid(),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            role: 2,
            status: 0,
            verificationcode: Math.floor(Math.random() * 1000),
            email: req.body.email
        }
        userRepository.save(newUser, (databaseSavingError, responseFromDatabase) => { 
            if (databaseSavingError)
                next(new error(errorValues.USER_SAVING_ERROR, responseFromDatabase, 500));
            else
                res.status(201).json(responseFromDatabase);
        });
    }
}