var mongoose = require('mongoose');
mongoose.set('useFindAndModify',false);

// reading my db name and password
var fs = require('fs');
configPath = '/config.json';
var parsed = JSON.parse(fs.readFileSync(__dirname + configPath, 'UTF-8'));

// connecting to mongo cluster
const uri = `mongodb+srv://${parsed.dbName}:${parsed.dbPass}@job-search-hip77.mongodb.net/job-search?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology: true, userFindAndModify:false });
var db = mongoose.connection;
// testing connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to Mongo Database")
});

// getting jobs schema
var jobSchema = new mongoose.Schema({
    name: String,
    status: String,
    date: Date
}, {collection: "jobs"});
var jobModel = mongoose.model('jobModel', jobSchema);

module.exports = {
    Job: jobModel
}