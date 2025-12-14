const mongoose = require("mongoose");
const TrainerPlan = require("./models/Trainer Model/TrainerPlan");
require("dotenv").config({ path: "./.env" });

const removePlans = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");

    const result = await TrainerPlan.deleteMany({});
    console.log("Deleted plans:", result.deletedCount);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

removePlans();
