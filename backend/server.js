const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});