module.exports = exports = function(req,res,next){
  var jsonString = '';
  req.on('data', function(chunckData) {
    jsonString += chunckData.toString();
  });

  req.on('end', function() {
    try{
      req.body = JSON.parse(jsonString);
    }catch(e){
      return res.status(400).json({ error: 'invalid json' });
    }

    next();
  });
};
