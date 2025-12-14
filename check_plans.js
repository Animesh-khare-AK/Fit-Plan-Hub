const mongoose = require("mongoose");
const TrainerPlan = require("./server/models/Trainer Model/TrainerPlan");
require("dotenv").config({ path: "./server/.env" });
const { v4: uuidv4 } = require("uuid");

const checkPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const plans = await TrainerPlan.find({});
    console.log("Plans found:", plans.length);

    if (plans.length === 0) {
      console.log("No plans found. Creating a dummy plan...");
      const newPlan = new TrainerPlan({
        uuid: uuidv4(),
        TrainerEmail: "test@trainer.com",
        Title: "Test Plan from DB",
        Description: "This is a test plan fetched from MongoDB.",
        Price: 999,
        Duration: 30,
      });
      await newPlan.save();
      console.log("Dummy plan created.");
    } else {
      console.log("Plans exist:");
      plans.forEach((p) => console.log(`- ${p.Title} (${p.Price})`));
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkPlans();
