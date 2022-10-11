import cors from 'cors';
import express, { Express, Request, Response} from 'express';
import UserModel from '../models/User';
import usersController from '../controllers/UsersController';
const routerUsers = express.Router();

const validateUserId = async (req : Request, res : Response, next : any) => 
{
  const user = await UserModel.findByPk(req.params.userId);
  
  if (!user) 
  {
    return res.status(404).json({ error: 'User not found' });
  }

  next();
}

routerUsers.get('/users', usersController.index);
routerUsers.post('/users', usersController.create);
routerUsers.get('/users/:userId', validateUserId, usersController.show);
routerUsers.put('/users/:userId', validateUserId, usersController.update);
routerUsers.delete('/users/:userId', validateUserId, usersController.delete);

export default routerUsers;