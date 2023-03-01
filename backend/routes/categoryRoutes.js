const express = require('express');
const { create } = require('../controllers/categoryController');
const { requireSignIn, isAdmin } = require('../middlewares/auth');


const router = express.Router();

router.post('/create/category',requireSignIn, isAdmin, create)



module.exports = router;