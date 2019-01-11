/*
This is a boilerplate for a nodejs backend which connects to a mongoDB database with 'mongoose'. 
It is build with 'express' and uses the 'cors' module to handle accessibility.

_______DEPENDENCIES_________

express
mongoose
cors
body-parser
*/

import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import { connect } from "mongoose";
import { resolve } from "path";

// initialize app
const app = express();

/*
_____CONFIGURATIONS______

//---PORT---*/

const port = process.env.PORT || 5000;

//--- MONGOURI ---
import { mongoURI } from "./config/secrets";
/* The file should have a setup of:
module.exports = {
  mongoURI: <personal mongoURI>,
  SECRET_KEY: <personal Secret Key>
} */

// general CONFIGS
app.use(json());
app.use(cors());
app.use(
  urlencoded({
    extended: true
  })
);

// connect to MongoDB
connect(
  mongoURI,
  { useNewUrlParser: true }
)
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));

// ROUTES
import route from "./routes/Example";

app.use("/", route);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/"));

  app.get("*", (req, res) => {
    res.sendFile(resolve("client/", "index.html"), err => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
