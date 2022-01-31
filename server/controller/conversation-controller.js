import { request, response } from "express";
import  Conversation  from "../model/conversation.js";

export const newConversation = async (request, response) =>{
    let senderId = request.body.senderId;
    let receiverId = request.body.receiverId;
    try{

        const exist = await Conversation.findOne({ members :{ $all: [receiverId,senderId]}});

        if(exist){
            response.status(200).json('Conversation Already Exist');
            return;
        }

        const newConversation = new Conversation({
            members :[senderId,receiverId]
        })

        await newConversation.save();
        response.status(200).json('New Conversation Added Successfully');

    } catch(error){
        response.status(500).json(error);
    }
}


export const getConversation = async (request,response) => {
    try{
        const conversation =  await Conversation.findOne({ members : { $all: [request.body.sender , request.body.receiver] }})
        response.status(200).json(conversation);
    }catch(error){
        response.status(500).json(error);
    }
}
