import { Router } from 'express';
import { 
  getResenasPorProducto, 
  postResena,
  deleteResena
} from '../controllers/resenas.controller';
import { RequestHandler } from 'express';

export class ResenaRoutes {
    static get routes(): Router {
        const router = Router();

        router.get('/producto/:id', getResenasPorProducto as RequestHandler);
        router.post('/', postResena as RequestHandler);
        router.delete('/:id', deleteResena as RequestHandler);
        

        return router;
    }
}
