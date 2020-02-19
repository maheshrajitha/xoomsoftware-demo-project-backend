const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const env = process.env;
const app = express();
const httpServer = http.createServer(app);
app.use(cookieParser());
httpServer.listen(env.APP_SERVER_PORT, () => {
    console.log(`${new Date().toDateString()} server started at port ${env.APP_SERVER_PORT}`);
});
app.use(cookieParser());
app.use(express.json());
app.use(require('./router'));
app.use((err, req, res, next) => {
    if (typeof err.error === 'object' && typeof err.error.message === 'string' && typeof err.error.code === 'string') {
        err.message = err.error.message;
        err.error = err.error.code;
    } else {
        err.message = err.error;
        err.error = 'UNEXPECTED_ERROR';
    }
    console.debug(`Responsed Error '${err.message}'`);
    let statusCode = err.statusCode || 500;
    delete err.statusCode;
    return res.status(statusCode).json(err);
});