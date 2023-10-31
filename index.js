const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const cors = require('cors');

dotenv.config();
app.use(express.json());


mongoose.connect(process.env.MONGOURL)
    .then(() => console.log("DB connection successfully!"))

    .catch((err) => {
        console.log(err);
    });

const corsOptions = {
    origin: 'travel-pins-frontend.vercel.app',
    
};
app.use(cors(corsOptions));

app.use("/api/pins", pinRoute);
app.use("/api/user", userRoute);


app.listen(process.env.PORT, () => {
    console.log("Bacekdn server is runing")
})