const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let whileList = [
    'http://localhost:8081'
];
let corsOption = {
    origin: function(origin, callback){
        if(whileList.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded([{ extended: true }]));

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Express Mysql"
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
});