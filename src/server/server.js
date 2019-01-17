/*
This is a robust user Backend

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
import { redirectToHTTPS } from "express-http-to-https";

// initialize app
const app = express();

/*
_____CONFIGURATIONS______

//---PORT---*/

import { port } from "./config/main";

//--- MongoURI ---
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
const ignoreHosts = [/localhost:3000/, /localhost:5000/];
const ignoreRoutes = [];
app.use(redirectToHTTPS(ignoreHosts, ignoreRoutes));

// connect to MongoDB
connect(
  mongoURI,
  { useNewUrlParser: true }
)
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));

// ROUTES
import route from "./routes/Users";

app.use("/user", route);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client"));
  app.get("/sw.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/", "sw.js"));
  });
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
