const { Router } = require('express');
const app = Router();

const Jobs =  require('../controllers/jobs/jobs');

app.get('/jobs', Jobs.index);
app.post('/jobs', Jobs.create);
app.get('/jobs/:jobId', Jobs.findBy);
app.delete('/jobs/:jobId', Jobs.removeBy);
app.put('/jobs/:jobId', Jobs.update);

module.exports = app;