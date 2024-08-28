require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routers = require('./routers')


const port = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use(express.json());
app.use(routers);


app.listen(port, console.log(`API running at port ${port}`))
