import fs from "fs";

import React from "react";
import ReactDomServer from "react-dom/server";

import Provider from "../client/src/contexts/Provider.js";

module.exports = function(app) {
  app.get("/*", (req, res) => {
    const App = ReactDomServer.renderToString(<Provider />);

    const indexFile = resolve("../client/public/index.html");
    fs.readFile(indexFile, "utf8", (err, data) => {
      if (err) {
        console.error("Something went wrong:", err);
        return res.status(500).send("Oops, better luck next time!");
      }
      console.log(data);
      return res.send(
        data.replace('<div id="root"></div>', `<div id="root">${App}</div>`)
      );
    });
    // res.sendFile(resolve("client/", "index.html"), err => {
    //   if (err) {
    //     res.status(500).send(err);
    //   }
    // });
  });
};
