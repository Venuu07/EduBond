import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
duration: { // Duration in minutes
    type: Number,
    required: true,
    default: 30,
  },
isBooked: {
    type: Boolean,
    default: false,
},
 bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
 }
});

const mentorshipSessionSchema = new mongoose.Schema({
    mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,},
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    slots:[timeSlotSchema],
},{
    timestamps:true,
})

const MentorshipSession=mongoose.model('MentorshipSession',mentorshipSessionSchema);
export default MentorshipSession;