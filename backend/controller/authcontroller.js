const User= require('../model/user');

//Register User
exports.register= async(req,res)=>{
    try{
        const {userName, email, password}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"User already exist"});

        const newUser= new User({userName, email, password});
        await newUser.save();
        
        res.status(201).json({message:"User saves successfully", user:newUser});
    } catch(error){
        res.status(500).json({message:error.message});
    }
};

//Login User
exports.login= async(req,res)=>{
    try{
        const{email, password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        if(user.password!=password){
            return res.status(400).json({message:"Invalid email or password"});
        }
        req.session.user={id:user._id, role:user.role, userName:user.userName};
        req.session.save((err)=>{
            if(err){
                console.error("Session save error:",err);
                return res.status(500).json({message:"Session error"});
            }
            res.status(200).json({message:"Login successful", role:user.role});
        });
    }catch(error){
        res.status(500).json({message:error.message})
    }
};