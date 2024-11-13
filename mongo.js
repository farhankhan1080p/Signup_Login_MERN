const mongoose = require("mongoose");

// Connect to your MongoDB database "FarhanDb"
mongoose.connect("mongodb+srv://fk510199:MRAzJmU69Miz0A8u@cluster0.7j2xk.mongodb.net/FarhanDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected successfully to FarhanDb");
})
.catch((err) => {
    console.log('Failed to connect to MongoDB:', err);
});


// Define schema
const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a collection model
const collection = mongoose.model("users", newSchema);
module.exports = collection;
