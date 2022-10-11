import cors from 'cors';
import express, { Express, Request,Response } from 'express';
import StateModel from '../models/State';
import statesController from '../controllers/StatesController';
const routerStates = express.Router();

const validateStateId = async (req : Request, res : Response, next : any) => 
{
    const state = await StateModel.findByPk(req.params.stateId);

    if (!state) 
    {
        return res.status(404).json({ error: 'State not found' });
    }

    next();
}

routerStates.post('/states', statesController.create);
routerStates.get('/states', statesController.index);
routerStates.get('/states/:stateId', validateStateId, statesController.show);
routerStates.put('/states/:stateId', validateStateId, statesController.update);
routerStates.delete('/states/:stateId', validateStateId, statesController.delete);

export default routerStates;