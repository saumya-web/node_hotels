const express = require('express')
const {handleGetBy,handlegetBy,handleUpdateBy,handleDeleteBy,handleCreate,handleGetByWork} = require('../controllers/user')
const router = express.Router();

router.get('/',handleGetBy);
router.post('/create',handleCreate);
router.patch('/:id',handleUpdateBy);
router.delete('/:id',handleDeleteBy);
router.get('/:id',handlegetBy);
router.get('/',handleGetByWork);
module.exports = router;