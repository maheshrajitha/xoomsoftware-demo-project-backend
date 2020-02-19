/**
 * Authentication middleware
 * @module Authentication.middleware
 */
const env = process.env;
const exception = require('./error');
const errorValues = require('./error.value');
const userRepository = require('./repositories/user.repository');
let authUser = (req, role, callback) => {
    userRepository.getOne({ id: req.cookies['user_cookie'] }, (databaseRetriveError, databaseResponse) => { 
        if (databaseRetriveError)
            callback(true, databaseResponse);
        else {
            req.userId = databaseResponse.id;
            callback(false, databaseResponse);
        }
    });
}
module.exports = function (role) {
    return [
        (req, res, next) => {
            authUser(req, role, (tokenValidationError, validatedToken) => {
                if (tokenValidationError) {
                    next(new exception(errorValues.UNAUTHORIZED_USER, validatedToken, 401));
                } else {
                    next();
                }
            })
        }
    ]
}
