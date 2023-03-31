const METHODS = 'GET, OPTIONS, PATCH, DELETE, POST, PUT';
const requestHeader = 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version';

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', METHODS);
  res.setHeader('Access-Control-Allow-Headers', requestHeader);

  if (req.method === 'OPTIONS') {
    res.status(200);
    res.header('Access-Control-Allow-Methods', METHODS);
    res.header('Access-Control-Allow-Headers', requestHeader);
    res.end();
  }
};
