const { randomUUID } = require("crypto");
const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
  // Read the cows data from the JSON file
  fs.readFile("./cows.json", (err, data) => {
    if (err) {
      console.error("Error reading cows.json:", err);
      return res.status(500).send("Internal Server Error");
    }

    const cows = JSON.parse(data);
    res.json(cows);
  });
});

router.post("/", (req, res) => {
  const tempdata = req.body;
  const id = randomUUID()

  const newCow = {...tempdata, id:id}
  // Read the current data from the JSON file
  fs.readFile("./cows.json", (err, data) => {
    if (err) {
      console.error("Error reading cows.json:", err);
      return res.status(500).send("Internal Server Error");
    }

    const cows = JSON.parse(data);

    // Add the new cow to the array
    cows.push(newCow);

    // Write the updated data back to the JSON file
    fs.writeFile("./cows.json", JSON.stringify(cows), (err) => {
      if (err) {
        console.error("Error writing cows.json:", err);
        return res.status(500).send("Internal Server Error");
      }

      console.log("New cow added:", newCow);
      res.status(201).json(newCow); // Send the added cow as the response
    });
  });
});

router.delete("/:id", (req, res)=>{
  const id = req.params.id;

  fs.readFile("./cows.json", (err, data) => {
    if (err) {
      console.error("Error reading cows.json:", err);
      return res.status(500).send("Internal Server Error");
    }

    const cows = JSON.parse(data);
    
    const filterCow = cows.filter(cow => cow.id != id)
    
    if ( cows.length === filterCow.length ) {
      return res.status(409).send({error: true, msg: 'cow does not exist'})
    }
    fs.writeFileSync('cows.json', JSON.stringify(filterCow))

  })
})

module.exports = router;
