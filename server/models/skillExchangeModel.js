import mongoose from "mongoose";

const skillExchangeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    skillOffered:{
       type:String,
       required:[true,'Please specify the skill you are offering'] ,
    },
    skillSought:{
        type:String,
        required:[true,'Please specify the skill you are looking for'],
    },
    description:{
      type: String,
      required: true,  
    },
    status:{
      type: String,
      enum: ['open', 'matched', 'completed'],
      default: 'open', 
    },

    proposals:[
      {
        user:{
          type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:'User',
        },
      },
    ],
    matchedWith:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
},{
    timestamps:true,
})

const SkillExchange=mongoose.model('SkillExchange',skillExchangeSchema);

export default SkillExchange;