const express = require('express')
const router = express.Router();
const {signup, signin} = require("../../controller/admin/auth")
const requireSignin = require("../../common-middleware/index");
const { check } = require("express-validator");
const { validateSignupRequest,validateSigninRequest, isRequestValidated } = require('../../validator');

router.post('/admin/signin',validateSigninRequest ,isRequestValidated, signin);
router.post('/admin/signup',validateSignupRequest,isRequestValidated, signup);

// router.post('/profile', requireSignin, (req,res)=>{
//     res.status(200).json({user:req.user})
// })

module.exports = router;

