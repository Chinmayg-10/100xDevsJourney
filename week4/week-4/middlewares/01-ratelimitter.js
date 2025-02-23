// You have to create a middleware for rate limiting a users request based on their username passed in the header

const express = require('express');
const app = express();

// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)

function rate_limit(req,res,next){
    const user_id=req.header("user-id");
    if(!user_id){
      res.json({
        message:"Missing user_id!"
      })
      return;
    }
    numberOfRequestsForUser[user_id]=(numberOfRequestsForUser[user_id]||0)+1;
    if(numberOfRequestsForUser[user_id]>5){
      res.status(404).json({
        message:"too many request sent!"
      })  
      return;
    }
    next();
}
app.use(rate_limit);
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});
app.listen(3000);

module.exports = app;