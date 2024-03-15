const express = require('express');
// const cors = require('cors');
require('dotenv').config();
const app = express();
const moment = require("moment");
var cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT_APP
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//conex typeorm - database
 
    var corsOptions = {
        origin: 'http://localhost',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
      }
 
//load page init    
app.get('/', (req, res) => {
res.send('<h1 style="text-align:center">Test: Lisbeth Rosero</h1>')
})
     
let rutes = require('./routes/routes');
app.use('/',rutes);
let db = require('./utils/db');
let dbinitial = require('./utils/loadData');

db
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        dbinitial.CreateType();
        dbinitial.CreateUnits();
        dbinitial.CreateSuppliers();
        dbinitial.CreateUser();
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

