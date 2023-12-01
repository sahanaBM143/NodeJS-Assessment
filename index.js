const express = require('express');
const myproducts = require('./routes/myproducts.route');
const dbconnection = require('./database/dbconnection');


require('dotenv').config();


let app = express();

app.use(express.json())
app.use("/api/v1", myproducts)

//* error handler

app.use((req, res, next) => {
    res.status(404).json({ status: false,message:"Page not found"});
})

app.use((err,req, res, next) => {
    res.status(500).json({ status: false,message:err});
})

let port=process.env.PORT || 5000

let start = async () => {
    try {
        await dbconnection(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`server running on port ${port}`)
        })
        console.log("connected to mongodb")

    }
    catch (err) {
        console.log(err)
    }
}



start();