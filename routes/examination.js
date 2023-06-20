const express = require("express");
const fs = require("fs");
const { randomUUID } = require("crypto");

const router = express.Router();

router.get("/:id", async (req, res) => {
  // Read the cows data from the JSON file
  fs.readFile("./Examination.json", (err, data) => {
    if (err) {
      console.error("Error reading Examination.json:", err);
      return res.status(500).send("Internal Server Error");
    }

    const tempexam = JSON.parse(data);
    
    let id = req.params.id

    const Examinations = tempexam.filter(exam=> exam.cowId == id )

    res.json(Examinations);
  });
});

//needs cow id filtring

router.post("/", (req, res) => {
  const tempExamination = req.body;
  const id = randomUUID()

  const newExamination = {...tempExamination, id:id}
  // Read the current data from the JSON file
  fs.readFile("./Examination.json", (err, data) => {
    if (err) {
      console.error("Error reading Examination.json:", err);
      return res.status(500).send("Internal Server Error");
    }

    const Examinations = JSON.parse(data);

    // Add the new cow to the array
    Examinations.push(newExamination);

    // Write the updated data back to the JSON file
    fs.writeFile("./Examination.json", JSON.stringify(Examinations), (err) => {
      if (err) {
        console.error("Error writing Examination.json:", err);
        return res.status(500).send("Internal Server Error");
      }

      console.log("New Examination added:", newExamination);
      res.status(201).json(newExamination); // Send the added cow as the response
    });
  });
});

router.delete("/:id", (req, res)=>{
  const id = req.params.id;

  fs.readFile("./Examination.json", (err, data) => {
    if (err) {
      console.error("Error reading cows.json:", err);
      return res.status(500).send("Internal Server Error");
    }

    const exams = JSON.parse(data);
    
    const filterExams = exams.filter(exam => exam.id != id)
    
    if ( exams.length === filterExams.length ) {
      return res.status(409).send({error: true, msg: 'exam does not exist'})
    }
    fs.writeFileSync('Examination.json', JSON.stringify(filterCow))

  })
})



module.exports = router;
