import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';

const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        skills:{
            type:[String],
            default:[],
        },
       // --- NEW FIELDS ---
    bio: {
      type: String,
      default: '',
      maxlength: 500 // Optional: Limit bio length
    },
    socialLinks: {
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      portfolio: { type: String, default: '' }, // Personal website/portfolio link
    }, 
    },{
        timestamps:true,
    }
);

userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        return next();
    }

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

const User=mongoose.model('User',userSchema);

export default User;