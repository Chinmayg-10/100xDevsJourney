const express = require("express");
const cors = require("cors"); // Import CORS module

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

app.post("/", function (req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({ ans: a + b });
});

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/sum.html"); 
// });

app.listen(3000, () => console.log("Server running on port 3000"));
