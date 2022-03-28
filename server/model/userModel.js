import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    institute: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false 
    },
    events: {
        type: [Schema.Types.ObjectId],
        ref: 'Event',
        default: []
    }

},
    {timestamps: true}
);

const User = mongoose.model('User', userSchema);
export default User;
