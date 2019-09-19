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
        if (err) res.status(500).send(err.message);
        res.send(data);
    })
});

// add job to db
app.post('/api/add_job', (req,res) => {
    var newJob = req.body; 
    delete newJob['tableData'];
    const NewData = new Job(newJob);
    NewData.save((err,resp) => {
        if (err) res.status(500).send(err.message)
        res.send("saved")
    })
});

// update the old job detail with new detail
app.post('/api/update_job', (req,res) => {
    var oldData = req.body.oldJob;
    delete oldData['__v'];
    delete oldData['tableData'];

    var newData = req.body.newJob;
    delete newData['__v'];
    delete newData['tableData'];

    Job.findOneAndUpdate(oldData, newData, {userFindAndModify:false}, (err, doc) => {
        if (err) res.status(500).send(err.message);
        res.send(doc);
    })
});

// delete job from database
app.post('/api/delete_job', (req,res) => {
    var data = req.body;
    delete data['__v'];
    delete data['tableData'];
    
    Job.findOneAndDelete(data, (err, resp) => {
        if (err) res.status(500).send(err.message);
        res.send("Deleted");
    })
});


app.listen(port,() => console.log("server is running"));
