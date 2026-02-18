const express = require('express')
const {handleGetBy,handlegetBy,handleUpdateBy,handleDeleteBy,handleCreate,handleGetByWork,handleLogin} = require('../controllers/user')
const router = express.Router();

router.get('/',handleGetBy);
router.post('/signup',handleCreate);
router.patch('/:id',handleUpdateBy);
router.delete('/:id',handleDeleteBy);
router.get('/:id',handlegetBy);
router.get('/',handleGetByWork);
router.post('/login',handleLogin);
module.exports = router;