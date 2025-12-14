const { v4: uuidv4 } = require("uuid");
const { isValidEmail } = require("../../utils/validator");
const TrainerPlan = require("../../models/Trainer Model/TrainerPlan")
const newFitnessPlan = async (req, res) => {
    const { Email, Description, Title, Duration, Price } = req.body;

    if (!isValidEmail(Email) || !Description || !Title || !Duration || !Price) {
        return res.status(404).json({
            success: false,
            msg: "Need the required fields"
        });
    }

    try {
        const unique_id = uuidv4();
        const newPlan = new TrainerPlan({
            uuid: unique_id,
            TrainerEmail: Email,
            Title: Title,
            Description: Description,
            Price: Price,
            Duration: Duration,

        })
        await newPlan.save();
        return res.status(200).json({
            success: true,
            msg: "Plan created Successfully"
        })

    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
}
const EditFitnessPlan = async (req, res) => {

    const { uuid, Email, Description, Title, Duration, Price } = req.body;

    if (!isValidEmail(Email) || !Description || !Title || !Duration || !Price || uuid) {
        return res.status(404).json({
            success: false,
            msg: "Need the required fields"
        });
    }
    try {
        const updated = await TrainerPlan.findOneAndUpdate(
            { uuid },
            req.body,
            { new: true, }
        )

        if (!updated) {
            return res.status(403).json({
                success: false,
                msg: "Fails to edit your Form"
            });
        }
        else {
            return res.status(200).json({
                success: true,
                msg: "Plan edit successfully"
            });
        }
    }

    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }

}

module.exports = { newFitnessPlan, EditFitnessPlan };