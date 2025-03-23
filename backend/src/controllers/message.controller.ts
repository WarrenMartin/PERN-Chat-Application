import { Request,Response } from "express";
import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

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
        const receiverSocketId=getReceiverSocketId(receiverId);

        if (receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage);
        }
        
        res.status(201).json(newMessage)
    } catch (error:any) {
        console.error("Errror in sendMessage",error.message);
        res.status(500).json({error:"Internal Server error"});
    }
}

export const getMessages=async (req:Request,res:Response)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user.id;

        //from convo table we will first find the conversation
        const conversation=await prisma.conversation.findFirst({
            where:{
                participantIds:{
                    hasEvery:[senderId,userToChatId]
                }
            },
            //after finding the conversation include all the messages in that convo.
            include:{
                messages:{
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            }
        })

        if(!conversation){
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.messages);
        
    } catch (error:any) {
        console.log("Error in getMessages:",error.message);
        res.status(500).json({error:"Internal Server error"});
        
    }
}

// Now the next one is get conversation to the sidebar that means 
// you opened your acc now u will know who ur talking to.

export const getUsersForSidebar=async (req:Request,res:Response)=>{
    try {
        const authUserId=req.user.id;

        const users=await prisma.user.findMany({
            where:{
                id:{
                    // here it says get all users but not the currently auth one. COnsider seeing ur name in all ur users chat..
                    not:authUserId
                }
            },
            select:{
                id:true,
                fullname:true,
                profilePic:true,
            }
        })
        res.status(200).json(users);
    } catch (error:any) {
        console.error("Error in getusersforsidebar:",error.message);
        res.status(500).json({error:"Internal Server error"});
    }
}