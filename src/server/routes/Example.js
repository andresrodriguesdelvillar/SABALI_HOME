/* This is a boilerplate route file for an express backend.

_____DEPENDENCIES_______

express
cors
*/
import express from "express";
import cors from "cors";

/*____CONFIGS_____

---SECRET_KEY*/
import { SECRET_KEY } from "../config/secrets";
process.env.SECRET_KEY = SECRET_KEY;

//--- mongoose Model---
import Example from "../models/example";
// initialize route
const route = express.Router();
// use cors for route
route.use(cors());
// ROUTES please include your routes
route.post("/", (req, res) => {
  Example.create({
    Name: "Test",
    Password: "Test"
  });
});

export default route;
