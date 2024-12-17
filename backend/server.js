const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/db");
const app = express();
dotenv.config();
const port = process.env.PORT;

connectDb();
app.use(cors());
app.use(express.json());

app.use("/", require("./routes/user.routes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});