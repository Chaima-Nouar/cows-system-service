const express = require("express");
const fs = require("fs");
const { randomUUID } = require("crypto");

const router = express.Router();

router.get("/", (req, res) => {
  // Read the cows data from the JSON file
  fs.readFile("./MilkProduction.json", (err, data) => {
    if (err) {
      console.error("Error reading milkProduction.json:", err);
      return res.status(500).send("Internal Server Error");
    }

    const Productions = JSON.parse(data);
    res.json(Productions);
  });
});

router.post("/", (req, res) => {
  const tempProduction = req.body;
  const id = randomUUID()

  const newProduction = {...tempProduction, id:id}
  // Read the current data from the JSON file
  fs.readFile("./MilkProduction.json", (err, data) => {
    if (err) {
      console.error("Error reading milkProduction.json:", err);
      return res.status(500).send("Internal Server Error");
    }

    const Productions = JSON.parse(data);

    // Add the new cow to the array
    Productions.push(newProduction);

    // Write the updated data back to the JSON file
    fs.writeFile("./MilkProduction.json", JSON.stringify(Productions), (err) => {
      if (err) {
        console.error("Error writing milkProduction.json:", err);
        return res.status(500).send("Internal Server Error");
      }

      console.log("New milk Production added:", newProduction);
      res.status(201).json(newProduction); // Send the added cow as the response
    });
  });
});

module.exports = router;
