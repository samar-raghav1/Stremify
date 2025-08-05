import { upsertStreamUser } from "../config/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

export const signUp=async(req,res)=>{
    const {fullName,email,password}=req.body;
    try {
        if(!email || !password || !fullName){
            return res.status(400).json({message:"All fields are Required"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 Character"})
        }

        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"})
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Already exists,Use different email"})
        }
        const index=Math.floor(Math.random()*100)+1;
        const Avatar=`https://avatar.iran.liara.run/public/${index}.png`

        const newUser=new User({
            email,
            fullName,
            password,
            profilePic:Avatar,
        })
         await newUser.save();

        try {
             await upsertStreamUser({
                id:newUser._id,
                name:newUser.fullName,
                image:newUser.profilePic||"",
             })
             console.log(`Stream user created for ${newUser.fullName}`)
        } catch (error) {
            console.error("Error creating Stream User:",error);
            
        }
        const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })

        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"Strict",
            secure:process.env.NODE_ENV==='production'
        })
        res.status(201).json({success:true,user:newUser})
    } catch (error) {
        console.log(error)
    }
     
}
export const Login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email,!password){
            return res.status(400).json({message:"All fields are required"});

        }
        const user=await User.findOne({email});
        if(!user) return res.status(401).json({message:"Invalid email or password"});

        const isPasswordCorrect= await user.matchPassword(password);
        if(!isPasswordCorrect)  return res.status(401).json({message:"Invalid Password"});


        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })

        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"Strict",
            secure:process.env.NODE_ENV==='production'
        });
        res.status(201).json({success:true,user})

    } catch (error) {
        console.error(error.message);
      
    }
}
export const Logout=async(req,res)=>{
    try {
         res.clearCookie("jwt")
         res.status(200).json({success:true,message:"Logout Successfully"})
    } catch (error) {
        console.log(error);
    }
}


export const onboard=async(req,res)=>{
    try {
        const userId=req.user._id;
        const {fullName,bio,nativeLanguage,learningLanguage,location}=req.body;
        if(!fullName ||!bio ||!nativeLanguage|| !learningLanguage|| !location){
            return res.status(400).json({
                message:"All fields are required",
                missingFileds:[
                    !fullName && 'fullName',
                    !bio && 'bio',
                    !nativeLanguage && 'nativeLanguage',
                    !learningLanguage && 'learningLanguage',
                    !location && 'location',
                ].filter(Boolean)
            })
        }

        const updatedUser=await User.findByIdAndUpdate(userId,{
            ...req.body,
            isOnboarded:true,
        },{new:true})
        if(!updatedUser) return res.status(404).json({message:"User not found"});

        try {
            await upsertStreamUser({
                id:updatedUser._id.toString(),
                name:updatedUser.fullName,
                image:updatedUser.profilePic||"",
            })
            console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
        } catch (streamError) {
            console.error("Error updating Stream user during onboarding:",streamError.message);
            
        }
        
        res.status(201).json({success:true,user:updatedUser})
        

        
    } catch (error) {
        console.error("Onboarding error:".error);
        
    }
    

}