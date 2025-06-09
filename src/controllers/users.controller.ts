
import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AppController } from "./share/AppController";
import { CreateUserDto, UpdateUserDto } from "../dtos/index.dto";
import { JwtService } from "../services/auth/jwt.service";


export class UserController extends AppController {
  constructor(
          private readonly userService: UserService,
      ) { super(); }

  public getAllUsers = async (req: Request, res: Response) => {
        await this.userService.getAllUsers()
            .then(data => res.json(data))
            .catch(error => this.triggerError(error, res));
    }

    public getUserById = async (req: Request, res: Response) => {
        await this.userService.getUserById({ id: Number(req.params.id) })
        .then(data => res.json(data))
        .catch(error => this.triggerError(error, res));
    }

    public createUser = async (req: Request, res: Response) => {
        const [validationError, userDTO] = await CreateUserDto.create(req.body);
        if (validationError || !userDTO) {
            res.status(400).json({ validationError });
            return; 
        }

        try {
            const newUser = await this.userService.createUser(userDTO);
            res.status(201).json(newUser);
        } catch (error) {
            this.triggerError(error, res);
        }
    }

    //PERMITE PUT Y PATCH
    public updateUser = async (req: Request, res: Response) => {
        try {
            const isPatch = req.method === "PATCH"; // Detecta si es PATCH
            const [validationError, userDTO] = await UpdateUserDto.create(
                { ...req.body, id: Number(req.params.id) },
                isPatch // Pasa el flag al DTO
            );
            
            if (validationError || !userDTO) {
                return res.status(400).json({ validationError });
            }

            const searchIdDto = { id: Number(req.params.id) };
            const updatedUser = await this.userService.updateUser(searchIdDto, userDTO);
            
            return res.status(200).json(updatedUser);
        } catch (error) {
            this.triggerError(error, res);
        }
    }

    public deleteUser = async ( req: Request, res: Response) => {
        try {
            const searchIdDto = { id: Number(req.params.id) };
            await this.userService.deleteUser(searchIdDto);
            res.status(204).send();
        } catch (error) {
            this.triggerError(error, res);
        }
    }

    public login = async (req: Request, res: Response) => {
        const { email, password } = req.body
        try {
            const user =  await this.userService.authenticateUser(email, password);
            const token = await JwtService.generateToken({
                id: user.id,
                rol: user.rol
            });

            res.status(200).json({ token, user});
        } catch(error: any){
            return res.status(401).json({
                error: error.message || "Error al autenticar el usuario"
            });
        }
    }

}
