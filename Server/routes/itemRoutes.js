
const express = require('express');
const router = express.Router();
const multer = require('multer');
const itemController = require('../controllers/itemController');


// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {

        console.log('hee')
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });


router.get('/', itemController.getAllItems);
router.post('/', upload.single('image'), itemController.createItem);
router.put('/:id', upload.single('image'), itemController.updateItem); 
router.delete('/:id', itemController.deleteItem);

module.exports = router;
