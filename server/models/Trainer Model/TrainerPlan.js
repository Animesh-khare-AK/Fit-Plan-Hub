const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
    uuid: {
        type: String,
        require,
        unique: true,
    },

    TrainerEmail: {
        type: String,
        require
    },

    Title: {
        type: String,
        require,
    },

    Description: {
        type: String,
        require
    },

    Price: {
        type: Number,
        require
    },
    Duration: {
        type: Number,
        require
    }
})

const TrainerPlan = mongoose.model("TrainerPlan", TrainerSchema);
module.exports = TrainerPlan;