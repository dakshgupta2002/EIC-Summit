import mongoose from "mongoose";
const { Schema } = mongoose

const EventSchema = new Schema({
    host: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date
    },
    fees:{
        type: Number,
        required: true,
        default: 0
    }, 
    location: {
        type: String,
        default: 'Chandigarh'
    },
    image: {
        type: String
    },
    likes:{
        type: Number,
        default: 0
    },
    qrscan:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Event = mongoose.model("Event", EventSchema);
export default Event;
