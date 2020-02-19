let user = {
    id: 'varchar(100) primary key',
    firstname: 'varchar(100)',
    lastname:'varchar(100)',
    password: 'text',
    email: 'varchar(100)',
    role: 'int',
    status: 'int',
    verificationcode: 'int',
    deviceToken: 'text'
}
module.exports = new(require('../mysql/mysql.client'))('users', user);