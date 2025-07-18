const express= require('express');
const User=require('../model/user');
const {register, login}= require('../controller/authcontroller');
const router= express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/session', (req, res) => {
  if (req.session && req.session.user && req.session.user.role) {
    console.log("User session found:", req.session.user);
    return res.status(200).json({
        id: req.session.user.id,
        role: req.session.user.role,
        userName: req.session.user.userName
    });
  } else {
    console.log("No active session found");
    return res.status(401).json({ message: 'Not authenticated' });
  }
});

//Logout route
router.post('/logout',(req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log('Logout Error:',err)
            return res.status(500).json({message:'Logout Failed'});
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({message:'Logout Successfull'});
    })
})

module.exports=router;