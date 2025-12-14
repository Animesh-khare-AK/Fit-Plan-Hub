const express = require("express");
const router = express.Router();

const {
  newFitnessPlan,
  EditFitnessPlan,
  deleteFitnessPlan,
  getTrainerPlans,
} = require("../controllers/Trainer Operations/Traineroperations");

router.post("/create-plan", newFitnessPlan);
router.put("/update-plan/:id", EditFitnessPlan);
router.delete("/delete-plan/:id", deleteFitnessPlan);
router.get("/get-plans", getTrainerPlans);

module.exports = router;
