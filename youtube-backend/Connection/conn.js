const mongoose = require("mongoose");
require('dotenv').config();

const MONGODBURI = process.env.MONGODBURI;

mongoose
  .connect(MONGODBURI)
  .then(() => console.log('DB connection successful!')).catch(err=>{
    console.log(err)
  });