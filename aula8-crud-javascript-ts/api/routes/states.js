const router = require('express').Router();
const StateModel = require('../models/State');
const statesController = require('../controllers/StatesController');

const validateStateId = async (req, res, next) => {
    const state = await StateModel.findByPk(req.params.stateId);
    if (!state) {
        return res.status(404).json({ error: 'State not found' });
    }
    next();
}

router.post('/states', statesController.create);

router.get('/states', statesController.index);

router.get('/states/:stateId', validateStateId, statesController.show);

router.put('/states/:stateId', validateStateId, statesController.update);

router.delete('/states/:stateId', validateStateId, statesController.delete);

module.exports = router;
