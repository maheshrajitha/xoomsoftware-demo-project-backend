const error = require('../error');
const errorValues = require('../error.value');
const uuid = require('uuid/v1');
const appoinmentRepository = require('../repositories/appoinment.repository');

module.exports = {
    newAppoinment: (req, res, next) => {
        let newAppoinment = {
            id: uuid(),
            userId: req.userId,
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            appoinmentDate: req.body.date,
	    name : req.body.name
        } 
        appoinmentRepository.save(newAppoinment, (databaseSavingError, responseFromDatabase) => { 
            if (databaseSavingError)
                next(new error(errorValues.SOMETHING_WENT_WRONG, responseFromDatabase, 500));
            else
                res.status(201).json(responseFromDatabase);
        });
    },
    getAppoinmentByUserId: (req, res, next) => {
        appoinmentRepository.runQuery('select * from appoinments where userId = "'+req.userId+'"', (dbError, dbResponse) => {
            if (dbError)
                next(new error(errorValues.UNAUTHORIZED_USER, dbResponse, 401));
            else
                res.status(200).json(dbResponse);
        });
    }
}
