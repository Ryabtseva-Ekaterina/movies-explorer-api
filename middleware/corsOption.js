const allowedCors = [
  'https://movies-explorer-frontend-henna.vercel.app/',
  'http://movies-explorer-frontend-henna.vercel.app/',
  'http://localhost:3001',
];

const corsOption = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  const DEFAULT_ALLOWED_METHODS = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.status(200);
    res.setheader('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.setheader('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = corsOption;
