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
import expressStaticGzip from "express-static-gzip";

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
  mongoURI: <personal mongoURI>
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

import Users from "./routes/Users";

app.use("/user", Users);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  // app.use(express.static("client"));
  app.use(
    expressStaticGzip("client", {
      enableBrotli: true,
      orderPreference: ["br", "gz"]
    })
  );

  app.get("/*", (req, res) => {
    // const App = ReactDomServer.renderToString(React.createElement(Provider));

    // const indexFile = resolve("../client/public/index.html");
    // fs.readFile(indexFile, "utf8", (err, data) => {
    //   if (err) {
    //     console.error("Something went wrong:", err);
    //     return res.status(500).send("Oops, better luck next time!");
    //   }
    //   console.log(data);
    //   return res.send(
    //     data.replace('<div id="root"></div>', `<div id="root">${App}</div>`)
    //   );
    // });
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
