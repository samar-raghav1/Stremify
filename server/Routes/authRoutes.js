import express from  "express";
import { Login, Logout, signUp , onboard } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authmiddleware.js";

const router =express.Router();

router.post("/signup",signUp)
router.post("/login",Login)
router.post("/logout",Logout)

router.post("/onboarding",protectRoute,onboard)




router.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user})
});
export default router
