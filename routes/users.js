var express = require("express");
var User = require("../models").User;
var router = express.Router();
var fs = require("fs");
const path = require("path");

const timeout = (time) =>
  new Promise((res, rej) => setTimeout(() => res(), time));

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await timeout(500);
  const user = await User.find({ where: { username, password } });
  if (user) {
    const response = {
      status: 1,
      name: user.name,
      config: JSON.parse(user.config),
    };
    res.status(200);
    res.send(response);
  } else {
    res.status(401);
    res.send({ status: 0, message: "USER NOT FOUND" });
  }
});

router.get("/server", (req, res) => {
  fs.readFile(
    path.join(__dirname, "..", "client_files", "gameserver.txt"),
    (err, data) => {
      res.type("text/plain");
      res.send(data);
    }
  );
});

router.get("/reset", (req, res) => {
  fs.readFile(
    path.join(__dirname, "..", "client_files", "resetnetwork.txt"),
    (err, data) => {
      res.type("text/plain");
      res.send(data);
    }
  );
});

module.exports = router;
