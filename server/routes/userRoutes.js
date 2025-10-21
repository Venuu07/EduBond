import express from 'express'
import {loginUser,
        registerUser,
        getUserProfile,
        updateUserProfile,
        addUserSkill,
        getUserById,
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

   router.route('/:id').get(getUserById);
export default router;