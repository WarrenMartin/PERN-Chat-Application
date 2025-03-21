import jwt, { JwtPayload }  from "jsonwebtoken";
import {Request ,Response,NextFunction} from "express";
import prisma from "../db/prisma.js";

interface DecodedToken extends JwtPayload {
    userId:string;
}
declare global{
    namespace Express {
        export interface Request{
            user:{
                id:string;
            };
        }
    }
}

// as name says if once the authentication is successful then we are going to call the next function

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token=req.cookies.jwt;

        if (!token){
            return res.status(401).json({error:"unauthorized-No token provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    
        if (!decoded){
            return res.status(401).json({error:"unauthorized-Invalid token"})
        }
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, username: true, fullname: true, profilePic: true }
        });
        if(!user){
            return res.status(404).json({error:"user not found"})
        }
        // once guest logs it will redirect to /me route after that the protectRoute middleware will verify the cookies and after all the checks are done then 
        // it is going to send (req.user=user) to the next function
        req.user=user;

        

        next()
    } catch (error:any) {
        console.log("Error in protectRoute middleware",error.message)
        res.status(500).json({error:"Internal Server Error"});
    }

}

export default protectRoute;  //exporting the middleware so that we can use it in other routes  //