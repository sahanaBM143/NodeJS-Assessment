const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
let connectdatabase=(uri)=>
{
    return mongoose.connect(uri)
}

module.exports=connectdatabase;