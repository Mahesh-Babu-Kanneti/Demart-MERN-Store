const productSchema = require('../models/products_models');






const productsList = async (req,res)=>{
        try {
    
            const productsList = await productSchema.find();
            return res.json(productsList);
    
        }
    
        catch (err) {
            console.log(err);
            return res.status(500).send('Server Error...');
        }

}


module.exports = {productsList}