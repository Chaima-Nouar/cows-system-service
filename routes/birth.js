const express = require("express");
const fs = require("fs");
const { randomUUID } = require("crypto");

const router = express.Router();

router.get("/", (req, res) => {
  // Read the cows data from the JSON file
  fs.readFile("./Births.json", (err, data) => {
    if (err) {
      console.error("Error reading Births.json:", err);
      return res.status(500).send("Internal Server Error");
    }

    const Births = JSON.parse(data);
    res.json(Births);
  });
});

router.post("/", (req, res) => {
  const tempBirth = req.body;
  const id = randomUUID()

  const newBirth = {...tempBirth, id:id}
  // Read the current data from the JSON file
  fs.readFile("./Births.json", (err, data) => {
    if (err) {
      console.error("Error reading Births.json:", err);
      return res.status(500).send("Internal Server Error");
    }

    const Births = JSON.parse(data);

    // Add the new cow to the array
    Births.push(newBirth);

    // Write the updated data back to the JSON file
    fs.writeFile("./Births.json", JSON.stringify(Births), (err) => {
      if (err) {
        console.error("Error writing Births.json:", err);
        return res.status(500).send("Internal Server Error");
      }

      console.log("New Birth added:", newBirth);
      res.status(201).json(newBirth); // Send the added cow as the response
    });
  });
});

module.exports = router;
