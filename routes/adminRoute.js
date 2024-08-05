const router = require('express')()
const admController = require('../controllers/adminController');

router.post('/signin', admController.signin);
router.get('/vendor', admController.vendorList);
router.get('/vendor/:id', admController.vendorDetails);
router.patch('/vendor/:id', admController.approveVendor);


module.exports = router