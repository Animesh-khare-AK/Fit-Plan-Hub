const { v4: uuidv4 } = require("uuid");
const TrainerPlan = require("../../models/Trainer Model/TrainerPlan");

const newFitnessPlan = async (req, res) => {
  try {
    const { Title, Description, Price, Duration, Email } = req.body;

    // Basic validation
    if (!Title || !Description || !Price || !Duration) {
      return res.status(400).json({
        success: false,
        msg: "Please fill all fields",
      });
    }

    const unique_id = uuidv4();

    const newPlan = new TrainerPlan({
      uuid: unique_id,
      TrainerEmail: Email, // Expecting email from frontend
      Title,
      Description,
      Price,
      Duration,
    });

    await newPlan.save();

    return res.status(200).json({
      success: true,
      msg: "Plan created Successfully",
      data: newPlan,
    });
  } catch (error) {
    console.error("Error creating plan:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const EditFitnessPlan = async (req, res) => {
  try {
    const { id } = req.params; // This is the _id
    const { Title, Description, Price, Duration } = req.body;

    const updated = await TrainerPlan.findByIdAndUpdate(
      id,
      { Title, Description, Price, Duration },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        msg: "Plan not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Plan updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating plan:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const deleteFitnessPlan = async (req, res) => {
  try {
    const { id } = req.params; // This is the _id

    const deleted = await TrainerPlan.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        msg: "Plan not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting plan:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const getTrainerPlans = async (req, res) => {
  try {
    const { email } = req.query;
    const query = email ? { TrainerEmail: email } : {};

    const plans = await TrainerPlan.find(query);

    return res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error) {
    console.error("Error fetching plans:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  newFitnessPlan,
  EditFitnessPlan,
  deleteFitnessPlan,
  getTrainerPlans,
};
