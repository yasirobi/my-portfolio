const express = require('express');
const { register, signin } = require('../controllers/userController')


const router = express.Router();

router.post('/register', register)
router.post('/signin', signin)


module.exports = router;