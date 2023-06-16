const User = require('../../models/user');
const jwt = require("jsonwebtoken");
const {validationResult} = require('express-validator');

exports.signup = (req , res) => {

    User.findOne({email: req.body.email}).exec().then((error,user) => {
        if(user) {
            return res.status(400).json({
            message: 'Admin already registered'
        })
    }
        const {
            firstName,
            lastName,
            email,
            password
    } = req.body;

    
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString(),
            role:'admin'
        });

        _user.save().then((data,error)=> {
            if(error){
                return res.status(400).json({ 
                    message: "Something went wrong"
                })
            }
            if(data){
                return res.status(201).json({
                    message:"Admin created successfully"
                })
            }
        })

    })
}

exports.signin = (req,res) =>{
    User.findOne({email:req.body.email}).exec().then((user, error)=>{
        if (error) return res.status(400).json({message:"Error Occured"});
        if(user){
            if(user.authenticate(req.body.password) && user.role === 'admin'){
                
                const { _id, firstName, lastName , email, role, fullName } = user;
                const token = jwt.sign({_id: user._id, role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
                
                return res.status(201).json({
                    token,
                    user:{
                        _id, firstName, lastName , email, role, fullName
                    }
                });
            }else{
                return res.status(400).json({
                    message:'Invalid Password!'
                })
            }  
        }else{
            return res.status(400).json({message:'Something went wrong'});
        }
    });
}

// exports.requireSignin = (req,res,next) =>{
//     const token = req.headers.authorization.split(" ")[1];

//     try{
//         const user = jwt.verify(token, process.env.JWT_SECRET); 
//         req.user = user;
//         next();
//     } catch(e){
//                 res.status(500).json({message:"Invalid Token"})
//     }   
// }

