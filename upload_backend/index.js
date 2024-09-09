const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const employeeRouter = require('./routes/EmployeeRouter');
const adminRouter = require('./routes/AdminRouter');

require('./db/db');

const app = express();

const PORT = 5000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({origin: ["http://localhost:3000","http://localhost:3006"]}));
app.use(employeeRouter);
app.use(adminRouter);

app.get('/',(req,res)=>{
    res.status(200).send({ message: "Hello world"})
})

app.listen(PORT,()=> {
    console.log(`Server has started on PORT ${PORT}`);
})