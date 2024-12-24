const mongoose = require("mongoose");

 

mongoose
  .connect('mongodb+srv://dognepiyush3d:dayh4AO7Z9Mc4ihh@cluster0.ebogh.mongodb.net/')
  .then(() => console.log('DB connection successful!')).catch(err=>{
    console.log(err)
  });