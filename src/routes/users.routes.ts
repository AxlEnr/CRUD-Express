import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/users.controller";
import { UserService } from "../services/user.service";
import { AuthMiddleware } from "../middlewares";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new UserController(new UserService());

    //CREAR USUARIO
    router.post("/", (req: Request, res: Response, next: NextFunction) => {
      controller.createUser(req, res).catch(next);
    });

    //LOGUEAR USUARIO 
    router.post("/login", (req: Request, res: Response, next: NextFunction) => {
      controller.login(req, res).catch(next);
    });

    router.get(
      "/",
      AuthMiddleware.validateUserJwt,
      (req: Request, res: Response, next: NextFunction) => {
        controller.getAllUsers(req, res).catch(next);
      }
    );

    //RUTAS PROTEGIDAS (validateUserJwt -> valida JWT en logueo | verificarRol -> Verifica Rol especifico)
    //OBTENER TODOS LOS USUARIOS

    router.get(
      "/me",
      AuthMiddleware.validateUserJwt,
      (req: Request, res: Response, next: NextFunction) => {
        controller.getUserLogged(req, res).catch(next);
      }
    );

    //OBTENER ROL DE USUARIO
    router.get(
      "/rol",
      AuthMiddleware.validateUserJwt,
      (req: Request, res: Response, next: NextFunction) => {
        controller.getUserRol(req, res).catch(next);
      }
    );

    //OBTENER USUARIO POR ID
    router.get(
      "/:id",
      AuthMiddleware.validateUserJwt,
      (req: Request, res: Response, next: NextFunction) => {
        controller.getUserById(req, res).catch(next);
      }
    );

  
    //ELIMINAR USUARIO
    router.delete(
      "/:id",
      AuthMiddleware.validateUserJwt,
      (req: Request, res: Response, next: NextFunction) => {
        controller.deleteUser(req, res).catch(next);
      }
    );

    router.post("/forgot-password",
      AuthMiddleware.validateUserJwt,
      (req: Request, res: Response, next: NextFunction) => {
        controller.generatePassword(req, res).catch(next);
      }
    )

    router.put(
      "/me",
      AuthMiddleware.validateUserJwt,
      (req: Request, res: Response, next: NextFunction) => {
        controller.updateUserLogged(req, res).catch(next);
      }
    );

    router.patch(
      "/me/",
      AuthMiddleware.validateUserJwt,
      (req: Request, res: Response, next: NextFunction) => {
        controller.updateUserLogged(req, res).catch(next);
      }
    );


    return router;
  }
}
