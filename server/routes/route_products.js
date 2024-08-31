
const {Router} = require('express')


const controller = require('../controllers/productController');



const router = Router();



//ROUTES..

router.get('/products/list', controller.productsList);



module.exports = router;