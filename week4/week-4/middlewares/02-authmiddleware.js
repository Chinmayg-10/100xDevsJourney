
//  Implement an authentication middleware that checks for a valid API key in the request headers.

const express = require('express');
const app = express();
const VALID_API_KEY = '100xdevs_cohort3_super_secret_valid_api_key'; // key is 100xdevs-api-key use that API key for authenticate user


// Middleware to check for a valid API key
function authenticateAPIKey(req, res, next) {
    //  authenticate APIKey here
    const api_key=req.header("api_key");
    if(api_key==VALID_API_KEY){
        next();
    }
    else{
        res.json({
            message:"API KEY not MATCHED"
        })
        return;
    }
}

app.use(authenticateAPIKey);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Access granted' });
});
app.listen(3000);
module.exports = app;


