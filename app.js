require('dotenv').config();
const express =  require('express');
const app = express();
const mongoose = require('mongoose');
const chalk = require('chalk');
const morgan = require('morgan');
const PORT = process.env.PORT || 30001;

//import api routes
const api = require('./src/routes/api');

//express version
console.log("**Express version: ", require('express/package').version);

//setup mongoose and mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/api-jobs-crud', {
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.log('Succesful');
});

//middleware
app.use(morgan('combined')); // setup the logger
app.use(express.json()); // parse application/json
app.use(express.urlencoded({extended: true})); // parse application/x-www-form-urlencoded

//json format
app.set('json spaces', 2);

//test
app.get('/', (req, res) => {
    res.send('API Jobs api/v1');
});

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-COntrol-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');

    next();
});

app.options('*', (req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.send(200);
    
    next();
});

//API route
app.use('/api/v1', api);

//error 404
app.use((req, res) => {
    const ERROR = {message: '404. Not Found'};
    res.status(404).json(ERROR);
});

//error 500
app.use((req, res) => {
    const ERROR = {message: '500. Server Error'};
    res.status(500).json(ERROR);
});

app.listen(PORT, () => {
    const msg = chalk.blue(`Node Server is running on PORT: ${PORT}`);

    console.log(msg);
});