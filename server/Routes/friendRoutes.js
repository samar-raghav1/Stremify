import express from 'express'
import { protectRoute } from '../middleware/authmiddleware.js';
import { deleteFriends } from '../controllers/friendController.js';


const friendRoute=express();


friendRoute.delete("/delete-friend",deleteFriends)


export default friendRoute