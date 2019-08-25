import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificatioController from './app/controllers/NotificatioController';

import authmiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authmiddleware);
// Daqui pra baixo utilizara o middleware authmiddleware
routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/providers', ProviderController.index);
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.get('/schedule', ScheduleController.index);
routes.get('/notifications', NotificatioController.index);
routes.put('/notifications/:id', NotificatioController.update);
routes.delete('/appointments/:id', AppointmentController.delete);

export default routes;
