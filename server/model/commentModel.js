import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }
}
    , { timestamps: true }
);

commentSchema.pre('insert', ()=>{
    console.log('pre insert');
})

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;