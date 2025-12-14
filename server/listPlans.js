const mongoose = require("mongoose");
const TrainerPlan = require("./models/Trainer Model/TrainerPlan");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (err) {
    console.error("Error in database connection: " + err);
    process.exit(1);
  }
};

const listPlans = async () => {
  await connectDB();

  try {
    const allPlans = await TrainerPlan.find({}, { Title: 1 });
    console.log("Current Plans in DB:", JSON.stringify(allPlans, null, 2));
  } catch (error) {
    console.error("Error listing plans:", error);
  } finally {
    mongoose.connection.close();
  }
};

listPlans();
