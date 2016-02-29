#Create an Express Middleware

##To Submit this Assignment
  * fork this repository
  * write all of your code in a folder containing your name
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas

##Description
Create an express middleware function that parses incoming JSON, 
on a successful parse the JSON object should be saved to `req.body`
and the next function called. On a failed parse the middleware should
send back the appropriate status code and a message of "invalid json".
Also, the middleware should be tested in both a unit and integration test
format.

##Rubric
  * Proper Middleware Function: 2pts
  * Error handling: 2pts
  * Proper use of streams and async functionality: 2pts
  * Testing: 4pts
