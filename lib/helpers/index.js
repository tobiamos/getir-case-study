const sendJSONResponse = (res, status, data, method, message) => {
  res.status(status);
  res.json({
    status,
    method,
    message,
    data,
  });
};

module.exports = {
  sendJSONResponse,
};
