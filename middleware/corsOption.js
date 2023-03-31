const allowedCORS = '*';
const METHODS = 'GET, OPTIONS, PATCH, DELETE, POST, PUT';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeader = req.headers['access-control-request-headers'];
  res.headers('Access-Control-Allow-Credentials', false);

  if (allowedCORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', METHODS);
    res.header('Access-Control-Allow-Headers', requestHeader);
    res.end();
  }
  next();
};
