const express = require('express');
const morgan = require('morgan')
require('dotenv').config();

const recipeRoutes = require('./routes/recipes');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    return res.json({hi : "Hello World"})
})

app.use("/api/recipes", recipeRoutes);


app.listen(process.env.PORT, () => {
    console.log('app is listening at port 4000...');
})