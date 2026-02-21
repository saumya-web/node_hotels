const express = require('express')
const upload = require('../middleware/upload')
const{handleBy,handleCreate,handleDelete}= require('../controllers/user2')
const router = express.Router()

router.get('/',handleBy);
router.post('/create',upload.fields([
  { name: "images", maxCount: 5 },
  { name: "videos", maxCount: 2 }
]),handleCreate);
router.delete('/:id',handleDelete);
module.exports = router;