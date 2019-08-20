import { Router } from 'express';

import authMiddleware from './app/middlewares/Auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// aplica o middleware para as rotas abaixo
routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
