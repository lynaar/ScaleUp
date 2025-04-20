import express from 'express';
import { authController } from '../controllers/authController.js';
import multer from 'multer'; // pour lire FormData

const router = express.Router();
const upload = multer();

router.post('/login', authController.login);
router.post('/register', upload.none(), authController.register);
router.put('/updateMotdepasse', authController.updatePassword);

export default router;