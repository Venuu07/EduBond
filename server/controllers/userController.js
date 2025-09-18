import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';

export const registerUser=asyncHandler(async (req,res)=>{
    const {name,email,password}=req.body;

    if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }



    const userExists=await User.findOne({email});

    if(userExists){
       
        throw new ApiError(409,"User with this email already exists");
    }

    const user=await User.create({
        name,
        email,
        password,
    });

    const createdUser=await User.findById(user._id).select("-password")

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }
    return res.status(201)
    .json(
        new ApiResponse(201,createdUser,"User registered successfully")
    )
})


export const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){

        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'30d'}
        );
        res.status(200).json(
            new ApiResponse(
                200,
                {
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    token:token,
                },
                "User logged in successfully"
            )
        );
    }
    else{
        throw new ApiError(401, "Invalid email or password");
    }
})

export const getUserProfile=asyncHandler(async(req,res)=>{

    const user=req.user;

    if(user){
        res.status(200).json(
            new ApiResponse(200,{
              _id: user._id,
              name: user.name,
              email: user.email,   
            })
        )
    }
    else{
        throw new ApiError(404,'User not found');
    }
})

export const updateUserProfile=asyncHandler(async(req,res)=>{
    
    const user=await User.findById(req.user._id);

    if(user){
        user.name=req.body.name|| user.name;
        user.email=req.body.email || user.email;

        //password for later

        const updatedUser=await user.save();

        res.status(200).json(
            new ApiResponse(
                200,
                {
                    _id:updatedUser._id,
                    name:updatedUser.name,
                    email:updatedUser.email
                },
                "Profile updated Succesfully"
            )
        );
    }
    else{
        throw new ApiError(404,"user not found");
    }
});

export const addUserSkill=asyncHandler(async (req,res)=>{
    const {skill}=req.body;

    if(!skill){
        throw new ApiError(400,"Skill cannot be empty")
    }

    const user=await User.findById(req.user._id);

    if(user){
        // Add the new skill to the array if it's not already there

        if(!user.skills.includes(skill)){
            user.skills.push(skill);
            await user.save();
        }
        res.status(200)
        .json(new ApiResponse(200,user.skills,'Skill added successfully'))
    }
    else{
        throw new ApiError(404, 'User not found');
    }
})