import mongoose from "mongoose";

const portfolioItemSchema = new mongoose.Schema({

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
        required:true,
    },
    context:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        type:{
            type:String,
            required:true,
            enum:['Gig','SkillExchange'],
        },
    },
},
{
    timestamps:true,
});

const PortfolioItem = mongoose.model('PortfolioItem',portfolioItemSchema);

export default PortfolioItem;