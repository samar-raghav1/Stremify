import {StreamChat} from "stream-chat";
import "dotenv/config"

const apiKey=process.env.STREMIFY_API_KEY;
const apiSecret=process.env.STREMIFY_API_SECRET;

if(!apiKey|| !apiSecret){
    console.error("Stream Api key or Secret is missing");
    
}
const streamClient=StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser=async(userData)=>{
    try {
        await streamClient.upsertUsers([userData]);
        return userData
    } catch (error) {
        console.error("error upsert Stream user");
        
    }
};
export const generateStreamToken=(userId)=>{
    try {
        const userIdStr=userId.toString();
        return streamClient.createToken(userIdStr)
        res.status(200).json({token});
    } catch (error) {
        console.log("error in generating token:",error);
        
        
    }

}