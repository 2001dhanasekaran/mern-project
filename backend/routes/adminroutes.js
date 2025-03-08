const express=require('express');
const { addProducts, updateProduct, upload, deleteProduct } = require('../controller/admincontroller');
const router=express.Router();
const Product= require('../model/schema');

router.get("/", async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};

        if (category) {
            query.category = {$in:[category]};
        }

        const products = await Product.find(query); 
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post('/add_products', upload.single('productImg'),addProducts);
router.put('/update_product/:id', upload.single('productImg'),updateProduct);
router.delete('/delete_product/:id', deleteProduct);

module.exports=router;