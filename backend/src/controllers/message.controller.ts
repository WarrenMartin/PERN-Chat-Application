import { Request,Response } from "express";
import prisma from "../db/prisma.js";

export const sendMessage=async (req:Request,res:Response)=>{
    try {
        const {message} =req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user.id;

        // check if we have a conversation or not

        let conversation=await prisma.conversation.findFirst({
            where :{
                participantIds:{
                    hasEvery:[senderId,receiverId]
                }
            }
        }) //that means there is a convo if there is no convo create new convo

        if(!conversation){
            //create a new conversation if no convo exists
            conversation=await prisma.conversation.create({
                data:{
                    participantIds:{
                        set:[senderId,receiverId]
                    }
                }
            })
        }

        const newMessage=await prisma.message.create({
            data:{
                senderId,
                body:message,
                conversationId:conversation.id
            }
        });

        //abov we created a new message, now we need to update the conversation with that
        if (newMessage){
            conversation = await prisma.conversation.update({
                where: { 
                    id: conversation.id 
                }, 
                data: { 
                    id:newMessage.id,

                 } 
              });
              
        }


        // this line is sending the message once created here we will have socket.io for real time communication
        res.status(201).json(newMessage)
    } catch (error:any) {
        console.error("Errror in sendMessage",error.message);
        res.status(500).json({error:"Internal Server error"});
    }
}