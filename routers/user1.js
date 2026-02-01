const express = require('express')
const {handleGetById,handlegetById,handleUpdateById,handleDeleteById,handleCreateById} = require('../controllers/user1')
const routers = express.Router();

routers.get('/',handleGetById);
routers.post('/pass',handleCreateById);
routers.patch('/:id',handleUpdateById);
routers.delete('/:id',handleDeleteById);
routers.get('/:id',handlegetById);

module.exports = routers;