const errorHandler = (err, req, res, next) => {
  console.error(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "An error has occured on the server" : message,
  });
  return next();
};

module.exports = errorHandler;
