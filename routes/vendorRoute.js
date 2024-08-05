const router = require('express')()
const vdrController = require('../controllers/vendorController');
const upload = require('../config/multer');

router.post('/signup', vdrController.signup);
router.post('/signin', vdrController.signin);
router.post('/product', upload.single('file'), vdrController.addProduct);
router.get('/product', vdrController.getProducts);
router.get('/sample', vdrController.sample);

module.exports = router