import { application } from "express";
import mongoose from "mongoose";

const gigSchema =mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User',
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            requierd:true,
        },
        skills:{
            type:[String], //e.g., ["design", "photoshop"]
            required:true,
        },
        price:{
            type:Number,
            required:true,
            default:0,
        },
    // We'll add more fields like status and delivery Time later

        status:{
            type:String,
            enum:['open','assigned','completed'],
            default:'open',
        },

        assignedTo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            default:null,
        },

 applicants:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'User',
            },
        },
    ]
    }
    ,
    {
        timestamps:true,
    }
);

const Gig =mongoose.model('Gig',gigSchema);

export default Gig;