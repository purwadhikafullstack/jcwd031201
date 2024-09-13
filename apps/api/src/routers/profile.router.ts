import { ProfileController } from '@/controllers/profile.controller';
import { uploader } from '@/middleware/uploader';
import { createProfileValidation } from '@/middleware/validator/createProfile';
import { verifyToken } from '@/middleware/verifyToken';
import { Router } from 'express';

export class ProfileRouter {
  private router: Router;
  private profileController: ProfileController;
  constructor() {
    this.router = Router();
    this.profileController = new ProfileController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '',
      createProfileValidation,
      verifyToken,
      uploader('/profile', 'USR').single('img'),
      this.profileController.createProfile,
    );
    this.router.get('', verifyToken, this.profileController.getProfile);
    this.router.patch(
      '',
      verifyToken,
      uploader('/profile', 'USR').single('img'),
      this.profileController.updateProfile,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}