import { Router } from 'express';
import { receiveTokens } from '../controllers/authController';

const router = Router();

router.post('/tokens', receiveTokens);

export default router;
