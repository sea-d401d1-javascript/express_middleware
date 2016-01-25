module.exports = exports = function(req, res, next) {
  req.on('data', (chunk) => !req.body ? req.body = chunk.toString() : req.body += chunk.toString());
  req.on('end', () => {
    try { req.body = JSON.parse(req.body), next(); } catch(e) { res.status(400).send('invalid json').end(); }
  });
}
