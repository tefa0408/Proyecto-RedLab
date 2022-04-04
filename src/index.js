const express = require('express');
const morgan = require ('morgan');

const labRoutes = require('./routes/lab.routes');

const app= express();
app.use(morgan('dev'))

app.use(express.json())

app.use(labRoutes)
app.listen(3000)
console.log('Server on port 3000')