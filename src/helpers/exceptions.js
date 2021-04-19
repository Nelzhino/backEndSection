module.exports.exceptions = function(infoError) {
    const error = new Error();
    error.status = infoError.status;
    error.message = infoError.message;
    throw error;
}