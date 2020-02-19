module.exports =  function(error, exception, statusCode){
    Error.captureStackTrace(this, this.constructor);
    this.error = error || 'Application Error';
    this.exception = exception;
    this.statusCode = statusCode || 400;
}
