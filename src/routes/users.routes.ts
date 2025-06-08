import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/users.controller";
import { UserService } from "../services/user.service";
import { AuthMiddleware } from "../middlewares";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new UserController(new UserService());

    router.post("/", (req: Request, res: Response, next: NextFunction) => {
      controller.createUser(req, res).catch(next);
    });

    router.post("/login", (req: Request, res: Response, next: NextFunction) => {
      controller.login(req, res).catch(next);
    });

    router.get(
      "/",
      AuthMiddleware.validateUserJwt,
      AuthMiddleware.verificarRol("admin"),
      (req: Request, res: Response, next: NextFunction) => {
        controller.getAllUsers(req, res).catch(next);
      }
    );

    router.get(
      "/:id",
      AuthMiddleware.validateUserJwt,
      (req: Request, res: Response, next: NextFunction) => {
        controller.getUserById(req, res).catch(next);
      }
    );

    router.put(
      "/:id",
      AuthMiddleware.validateUserJwt,
      (req: Request, res: Response, next: NextFunction) => {
        controller.updateUser(req, res).catch(next);
      }
    );

    router.patch(
      "/:id",
      AuthMiddleware.validateUserJwt,
      (req: Request, res: Response, next: NextFunction) => {
        controller.updateUser(req, res).catch(next);
      }
    );

    router.delete(
      "/:id",
      AuthMiddleware.validateUserJwt,
      (req: Request, res: Response, next: NextFunction) => {
        controller.deleteUser(req, res).catch(next);
      }
    );

    return router;
  }
}
