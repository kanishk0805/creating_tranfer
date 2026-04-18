require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const connectDB = require("./db");
const User = require("./models/user");
const routes = require("./routes/index");
connectDB();

app.use(cors(
    {
        origin: "*"
    }
));

app.use(express.json());
app.use("/api/v1", routes);

 
app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`);
});
 