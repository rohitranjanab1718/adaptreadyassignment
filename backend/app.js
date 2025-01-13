const express = require('express');
const app = express();
app.use(express.json());

const dishRouter = require('./routes/dishRouter');

app.use("/api",dishRouter);
const port = '3010'
app.listen(port,()=>{
    console.log('server is running on '+ port);
})
