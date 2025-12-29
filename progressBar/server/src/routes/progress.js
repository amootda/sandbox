import express from 'express';
import { simulateProgress, healthCheck } from '../controllers/progressController.js';

const router = express.Router();

router.get('/simulate', simulateProgress);
router.get('/health', healthCheck);

export default router;
