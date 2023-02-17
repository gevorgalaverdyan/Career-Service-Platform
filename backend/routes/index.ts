import { registerNewUser } from '../controllers/auth-controller';

const express = require('express');

const router = express.Router();

router.post('/users/create', registerNewUser);

export default router;
