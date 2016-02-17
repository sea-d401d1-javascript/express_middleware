module.exports = exports = function(req, res, next) {
  
  var dataObj = '';

  req.on('data', (chunk) => {
    dataObj += chunk;
  });

  req.on('end', () => {
    
    if(dataObj) {
      try {
        req.body = JSON.parse(dataObj);
      } catch(e) {
        return res.status(400).json( { msg: 'invalid json' } );
      }
    }
    next();
  });
};
