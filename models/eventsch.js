const mongoose = require("mongoose");

const myevent = new mongoose.Schema({
    eventLocation: String,
    eventName: String,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    sourceLanguage: String,
    

})

module.exports = mongoose.model("eventdetails", myevent);