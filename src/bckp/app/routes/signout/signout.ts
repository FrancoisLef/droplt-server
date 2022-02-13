import { Response, Router } from 'express';

import { SignoutRequest } from './schema';

const router = Router();

router.get('/api/signout', async (req: SignoutRequest, res: Response) => {
  res.clearCookie('refresh_token').json({ success: true });
});

export default router;
