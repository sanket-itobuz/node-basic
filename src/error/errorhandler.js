// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  if (res.statusCode == 200) {
    res.status(500);
  }

  const status = res.statusCode;
  const message =
    err.message || 'Something went wrong, Please Refresh the Page';

  res.status(status).json({
    success: false,
    error: message,
  });
};

export default errorHandler;
