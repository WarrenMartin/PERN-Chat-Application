
import { Request,Response } from "express"
import prisma from "../db/prisma.js"
import bcryptjs from "bcryptjs"
import generateToken from "../utils/generateToken.js"

export const signup =async(req:Request,res:Response)=>{
//  now i am going to write the logic for the signup fn, model has been created in the schema.prisma
    try {
        const {fullname, username, password, confirmPassword, gender}=req.body //req.body received by parsing app.use(express.json()); in index.js

        if (!fullname || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({error:"please fill in all field"}) //400 status code=Bad Request.
        }
        if (password !== confirmPassword){
            return res.status(400).json({error:"Passwords don't match"})
        }

        const user=await prisma.user.findUnique({where:{username}}); //help in finding the unique username  and if user then username already taken

        if (user){
            return res.status(400).json({error:"Username already taken"})
        }

        // once username is unique then we will hash password n save it
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);

        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`;

        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser=await prisma.user.create({
            data:{
                fullname:fullname,
                username:username,
                password:hashedPassword,
                gender:gender,
                profilePic:gender==="male"?boyProfilePic:girlProfilePic,
            }
        })

        if(newUser){
            // once new user has been created generate token
            generateToken(newUser.id,res)
            
            res.status(201).json({
                id:newUser.id,
                fullname:newUser.fullname,
                username:newUser.username,
                profilePic:newUser.profilePic,
            })
        }else{
                res.status(400).json({error:"Failed to create new user"})
            }

        }






    catch (error:any) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({error:"Internal server error"})
        
    }
}

// login function
export const login =async(req:Request,res:Response)=>{
   try {
    const {username,password}=req.body;
    const user=await prisma.user.findUnique({where:{username}});
    if (!user){
        return res.status(400).json({error:"Invalid Credentials"});
    }
    const isPasswordCorrect=await bcryptjs.compare(password,user.password);
    if (!isPasswordCorrect){
        return res.status(400).json({error:"Invalid Credentials"});
    }

    generateToken(user.id,res);
    res.status(200).json({
        id:user.id,
        fullname:user.fullname,
        username:user.username,
        profilePic:user.profilePic,
    });

   } catch (error:any) {
    console.log("Error in login controller",error.message);
    res.status(500).json({error:"Internal server error"})
   }
}

export const logout =async(req:Request,res:Response)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error:any) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}
