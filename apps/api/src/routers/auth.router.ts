import { loginValidation } from '@/middleware/validator/login';
import { AuthController } from '../controllers/auth.controller';
import { registerValidation } from '../middleware/validator/register';
import { Router } from 'express';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/register',
      registerValidation,
      this.authController.register,
    );

    this.router.post('/login', loginValidation, this.authController.login);
  }
}
