const error = require('../error');
const errorValues = require('../error.value');

const userRepository = require('../repositories/user.repository');

module.exports = {
    login: (req, res, next) => {
	console.log(req.body.email);
        userRepository.getOne({ email: req.body.email }, (databaseRetriveError, databaseResults) => { 
            if (databaseRetriveError)
                next(new error(errorValues.USER_NOT_FOUND, databaseResults, 401));
            else {
                if (req.body.password === databaseResults.password) {
                    res.cookie('user_cookie', databaseResults.id, { maxAge: 3600000, httpOnly: false });
                    res.status(200).json(databaseResults);
                } else
                    next(new error(errorValues.PASSWORDS_NOT_MATCH, undefined, 401));
            }
        });
    }
}
