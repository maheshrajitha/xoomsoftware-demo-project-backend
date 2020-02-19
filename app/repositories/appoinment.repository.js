let appoinment = {
    id: 'varchar(100) primary key',
    userId: 'varchar(100)',
    appoinmentDate: 'datetime',
    date: 'date',
    note:'text',
    name:'varchar(150)'
}
module.exports = new(require('../mysql/mysql.client'))('appoinments', appoinment);
