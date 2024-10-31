require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routers = require('./routers')



const app = express();


app.use(cors());
app.use(express.json());
app.use(routers);


app.listen(process.env.PORT, console.log(`API running at port ${process.env.PORT}`))
