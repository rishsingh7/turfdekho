const express = require('express');
const bcrypt = require('bcrypt')
const app = express();
const connectDB = require('./config/database')
const Owner = require('./models/owners')
app.use(express.json())
app.post("/signup", async (req, res) => {

    const owner = new Owner(req.body)
    try {
        const { firstName,
            lastName,
            email,
            password,
            phone,
            turfArea,
            photoUrl } = req.body;
        const passwordHash = await bcrypt.hash(password, 10)
        const owner = new Owner({
            firstName,
            lastName,
            email,
            password: passwordHash,
            phone,
            turfArea,
            photoUrl
        })
        await owner.save()
        res.send("Owner added successfully")
    }
    catch (err) {
        res.send("Owner couldn't be added" + err.errmsg);
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Owner.findOne({ email: email })
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (isPasswordMatch) {
            res.send("Login Successfull")
        }
        else {
            throw new Error("Invalid Credentials")
        }
    }
    catch (err) {
        res.send("Something went wrong due to: " + err.message);
    }
})

app.get("/turfs", async (req, res) => {
    try {
        const owner = await Owner.find({})
        res.send(owner)
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
})

app.delete("/owner", async (req, res) => {
    const userId = req.body.userId;

    try {
        const ownerDelete = await Owner.findByIdAndDelete(userId)
        res.send("User deleted successfully")
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
})

app.put("/owner", async (req, res) => {
    const email = req.body.email
    const data = req.body
    try {
        await Owner.updateOne({ email: email, data })
        res.send("User updated successfully")
    }
    catch (err) {
        res.status(400).send("Something went wrong")
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
