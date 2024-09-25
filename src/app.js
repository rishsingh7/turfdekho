const express = require('express');
const app = express();
const connectDB = require('./config/database')
const Owner = require('./models/user')
app.use(express.json())
app.post("/signup", async(req, res) => {

    const owner = new Owner(req.body)

    try{
        await owner.save()
        res.send("Owner added successfully")
    }
    catch(err){
        res.status(401).send("Owner couldn't be added due to:", err.message);
    }
})

connectDB().then(() => {
    console.log("DB connected");
    app.listen(8080, () => {
        console.log("Listening on port 8080")
    })
}).catch(() => {
    console.log("DB disconnected");
})
