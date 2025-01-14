const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
require("dotenv").config();
app.use(express.json());

const dishRouter = require('./routes/dishRouter');

app.use("/api",dishRouter);
// const port = '3010'
app.listen(process.env.port,()=>{
    console.log('server is running on '+ process.env.port);
})
