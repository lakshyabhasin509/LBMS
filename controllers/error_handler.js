function errorHandler(res, error) {
  // console.log(error);
  try {
    return res.status(error.cause).send(error.message);
  } catch {
    return res.sendStatus(500);
  }
}

module.exports = { errorHandler };
