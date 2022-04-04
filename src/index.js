const express = require('express');
const morgan = require ('morgan');
const cors = require ('cors');

const labRoutes = require('./routes/lab.routes');

const app= express();

app.use(cors());
app.use(morgan('dev'))

app.use(express.json())

app.use(labRoutes)
app.listen(4000)
console.log('Server on port 4000')