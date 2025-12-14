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

const removeDefaultPlans = async () => {
  await connectDB();
  const defaultTitles = [
    "Beginner Full Body Fitness Plan",
    "Fat Loss and Cardio Booster Plan",
    "Strength, Mobility and Flexibility Program",
    "Advanced Muscle Building and Conditioning Plan",
  ];

  try {
    const result = await TrainerPlan.deleteMany({
      Title: { $in: defaultTitles },
    });
    console.log(`Deleted ${result.deletedCount} default plans.`);
  } catch (error) {
    console.error("Error deleting plans:", error);
  } finally {
    mongoose.connection.close();
  }
};

removeDefaultPlans();
