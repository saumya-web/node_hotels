const express = require('express')
const {handleGetAll,handlegetBy,handleUpdateBy,handleDeleteBy,handleCreate,handleGetByWork,handleLogin,handleProfile} = require('../controllers/user')
const{jsonAuthMiddleware}= require('../jwt');
const router = express.Router();


router.post('/signup',handleCreate);
router.post('/login',handleLogin);
router.get('/profile',jsonAuthMiddleware,handleProfile);
router.get('/',jsonAuthMiddleware,handleGetAll);
router.patch('/:id',handleUpdateBy);
router.delete('/:id',handleDeleteBy);
router.get('/:id',handlegetBy);
router.get('/work',handleGetByWork);

module.exports = router;