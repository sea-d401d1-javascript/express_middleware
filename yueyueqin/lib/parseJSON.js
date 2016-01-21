module.exports = exports = function(req,res,next){
  var jsonString = '';
  req.on('data', function(chunckData) {
    jsonString += chunckData.toString();
  });

  req.on('end', function() {
    try{
      JSON.parse(jsonString);
      req.body = jsonString;
      next();
    }catch(e){
      res.status(500).json({ error: 'invalid json' });
    }
  });
};
