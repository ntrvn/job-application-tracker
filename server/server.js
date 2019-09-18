var express = require('express');
var cors = require('cors');
var Job = require('./database/mongoConnection').Job;
var app = express();
var port = 8000;

// cors
app.use(cors());

app.get('/api/jobs', (reg,res) => {
    Job.find({}, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
});

app.listen(port,() => console.log("server is running"));
