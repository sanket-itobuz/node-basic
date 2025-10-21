// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  if (res.statusCode == 200) {
    res.status(500);
  }

  const status = res.statusCode;
  const message = res.message || 'Something went wrong, Please try again';

  res.status(status).json({
    success: false,
    error: message,
  });
};

export default errorHandler;
