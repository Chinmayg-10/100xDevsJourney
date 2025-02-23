//  Create a middleware that logs all incoming requests to the console.

const express = require('express');
const app = express();
let requestCnt=0;
function logRequests(req, res, next) {
    // write the logic for request log here
    requestCnt++;
    console.log("request called here " + requestCnt);
    next();
}

app.use(logRequests);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});
app.listen(3001);
module.exports = app;
