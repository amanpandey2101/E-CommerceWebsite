const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const { createCategory, getCategories } = require("../controller/category");
const router = express.Router();
const multer = require("multer");
const path = require("path")
const shortid = require("shortid");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function(req,file,cb){
        cb(null,shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage });
router.post('/category/createCategory',requireSignin, adminMiddleware, upload.single('categoryImage'),createCategory);
router.get('/category/getCategory', getCategories);


module.exports = router;