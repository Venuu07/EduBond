import express from 'express'
import {loginUser,
        registerUser,
        getUserProfile,
        updateUserProfile,
        addUserSkill
      } from "../controllers/userController.js" 
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);

router
  .route('/profile')
  .get(protect,getUserProfile)
  .put(protect,updateUserProfile);

  router
   .route('/profile/skills')
   .put(protect,addUserSkill);
export default router;