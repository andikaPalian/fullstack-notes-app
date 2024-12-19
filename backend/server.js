const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDb = require("./config/db");
const app = express();
dotenv.config();
const port = process.env.PORT;

connectDb();
app.use(cors({
    // Sesuaikan dengan URL frontend 
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/", require("./routes/user.routes"));
app.use("/", require("./routes/notes.routes"));
app.use("/", require("./routes/profile.routes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});