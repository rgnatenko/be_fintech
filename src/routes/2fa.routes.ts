import TwoFactorController from '../controllers/twoFactor.controller';

import { Router } from 'express';

const TwoFactorRouter = Router();

TwoFactorRouter.post('/request', TwoFactorController.request2FACode);
TwoFactorRouter.post('/verify', TwoFactorController.verify2FACode);

export default TwoFactorRouter;
