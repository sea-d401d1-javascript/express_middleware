'use strict';

module.exports = exports = (req, res, next) => {
  let content = '';

  req.on('data', data => content += data.toString());

  req.on('end', () => {
    try {
      const json = JSON.parse(content);
      req.body = json;
      next();
    } catch (e) {
      res.status(500).send('invalid json');
    }
  });
};
