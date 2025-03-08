const Product= require('../model/schema');
const multer= require('multer');

//Multer
const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'product_images/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    }
});

const processCategories= (categoryString='')=>{
    return categoryString.split(',').map(category=> category.trim()).filter(category=> category !=='');
}

//Add products
exports.addProducts=async(req, res)=>{
    try{
        const {productName, price, brand,category, description}=req.body;
        const productImg=req.file ? `/product_images/${req.file.filename}` : null;
        const categoryArray= processCategories(category);

        const newProduct= new Product({
            productImg, 
            productName,
            brand,
            price, 
            category: categoryArray, 
            description});
        await newProduct.save();
        res.status(201).json({message:'Product added successfully'});

    }catch(error){
        res.status(500).json({message:error.message});
    }
};

//Update procucts
exports.updateProduct=async(req, res)=>{
    try{
        const {productName, brand, price, category, description}=req.body;
        const productId=req.params.id;

        let updateData={
            productName, 
            brand, 
            price, 
            description
        };
        if(category){
            updateData.category= processCategories(category);
        }

        if(req.file){
            updateData.productImg=`/product_images/${req.file.filename}`;
        }

        const updateProduct= await Product.findByIdAndUpdate(
            productId,
            {$set: updateData},
            {new:true, runValidators:true}
        );

        if(!updateProduct){
            return res.status(404).json({message:'Product not found'});
        }
        res.json({message:'Product updated successfully'})
    }catch(error){
        res.status(500).json({message:error.message});

    }
}

//Delete Products
exports.deleteProduct=async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.upload=multer({storage});