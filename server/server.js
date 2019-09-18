var express = require('express');
var cors = require('cors');
var Job = require('./database/mongoConnection').Job;
var bodyParser = require('body-parser');

var app = express();
var port = 8000;

app.use(cors());
app.use(bodyParser());

// get all jobs that are in the db
app.get('/api/jobs', (req,res) => {
    Job.find({}, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
});

// add job to db
app.post('/api/add_job', (req,res) => {
    var newJob = req.body; 
    delete newJob['tableData'];
    const NewData = new Job(newJob);
    var returnVal = NewData.save((err,resp) => {
        if (err) res.status(500).send(err.message)
        res.send("saved")
    })
})


app.listen(port,() => console.log("server is running"));
