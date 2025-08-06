import express from "express";
import { protectRoute } from "../middleware/authmiddleware.js";
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendRequest, getRecommendedUsers, sendFriendRequest } from "../controllers/userController.js";

const userRoutes=express.Router();
userRoutes.use(protectRoute)
userRoutes.get("/",getRecommendedUsers)

userRoutes.get("/friends",getMyFriends)
userRoutes.post("/friend-request/:id", sendFriendRequest)
userRoutes.put("/friend-request/:id/accept",acceptFriendRequest)
userRoutes.get("/friend-requests",getFriendRequests)

userRoutes.get("/outgoing-friend-requests",getOutgoingFriendRequest)




export default userRoutes;