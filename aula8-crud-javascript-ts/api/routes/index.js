const cors = require('cors');
const router = require('express').Router();
const users = require('./users');
const login = require('./login');
const states = require('./states');
const cities = require('./cities');

router.use(cors());

router.use(login);
router.use(users);
router.use(states);
router.use(cities);

module.exports = router;
