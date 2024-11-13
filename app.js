require('dotenv').config();

const express = require("express");
const collection = require("./mongo");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Route for login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email });

        if (user && user.password === password) {
            res.json("exist");
        } else {
            res.json("notexist");
        }
    } catch (e) {
        console.error("Error in login:", e);
        res.status(500).json("fail");
    }
});

// Route for signup
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await collection.findOne({ email });

        if (userExists) {
            res.json("exist");
        } else {
            const newUser = new collection({ email, password });
            await newUser.save();
            res.json("notexist");
        }
    } catch (e) {
        console.error("Error in signup:", e);
        res.status(500).json("fail");
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
