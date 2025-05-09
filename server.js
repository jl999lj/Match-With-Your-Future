const express = require("express")
const cors = require("cors")
const multer = require("multer");
const jwt = require("jsonwebtoken")
const upload = multer(); // For parsing multipart/form-data

const database = [] //databaza bosh si fillim
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.post('/register', upload.none(), (req, res) => {
    const user = req.body
    if(!user) return res.status(400).json({message: "Invalid user data"})
    const userAlreadyExists = database.find(x => x.email === user.email)
    if(userAlreadyExists) return res.status(409).json({message: "User already exists"})
    user.uid = Date.now()
    database.push(user)
    res.status(201).json({message: "User registered Successfully"})
})

app.post("/login", upload.none(), (req, res) => {
    const user = req.body
    if(!user) return res.status(400).json({message: "Invalid user data"})
    
    const foundUser = database.find(x => x.email === user.email)
    if(!foundUser) return res.status(404).json({message: "User does not exist"})

    if(user.password !== foundUser.password) return res.status(401).json({message: "Incorrect password"})
    try {
        const token = jwt.sign({uid:foundUser.uid, email:foundUser.email}, "Temp_KEY", {expiresIn: "1h"})
        res.json({token, message: "User logged in successfully"})
    }
    catch(err){
        res.status(500).json({message: err.message || "Something went wrong", error: err})
    }
    
})


const port = 3300
app.listen(port, () => {
    console.log(`Hackathon server started on port ${port}`)
})