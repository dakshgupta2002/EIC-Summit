import mongoose from "mongoose";
const { Schema } = mongoose

const EventSchema = new Schema({
    host: {
        type: Schema.Types.ObjectId,    
        ref: "User"
    },
    name: {
        type: String,
        required: true
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
    }
}, {
    timestamps: true
})

// trigger: "AFTER INSERT" of new event
// called middleware in NoSQL
EventSchema.post('save', ()=>{
    console.log('Event has been saved')
});

//create scheduled trigger 
//create explore page for events

//comment schema in the end 
const Event = mongoose.model("Event", EventSchema);
export default Event;
