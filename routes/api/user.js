const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/user");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./client/public/upload/user/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});
var upload = multer({
  
  storage: storage

});
const {
  validatorsignin,
  validatorLogin,
  validatorprofile
} = require("../../validator/validatoruser");
const keys = require("../../config/keys");


router.post("/signin",  async (req, res) => {
 try {
  const { errors, isValid } = validatorsignin(req.body);
  if (!isValid) return res.status(400).json(errors);
  const { fullName, email, password } = req.body;
  const user=await User.findOne({ email })
  if (user) {
    if (user.email === email) {
      errors.noemail = "Email is used";
    }
    return res.status(400).json(errors);
  }
  const newUser = new User({
    fullName,
    email,
    password,
    Image:'noimage.jpg'
  });
  const salt =await  bcrypt.genSalt(10);
  const hash =await  bcrypt.hash(newUser.password, salt);
  newUser.password = hash;
  res.status(200).json(await newUser.save());
 } catch (error) {
   console.log(error)
 }
});
router.post("/login",async  (req, res) => {
  try {
    const { email, password } = req.body;
  const { errors, isValid } = validatorLogin(req.body);
  if (!isValid) return res.status(400).json(errors);
  const user=await User.findOne({ email })
  if (!user) {
    return res.status(404).json({ noemail: "Email not found" });
  }
  const bcryptpassword=await bcrypt.compare(password, user.password)
  if(!bcryptpassword){
    return res.status(400).json({ nopassword: "Password incorrect" });
  }
  else{
    const payload = {
      id: user.id,
      fullName: user.fullName,
      Image: user.Image
    };
    const token=await jwt.sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: 31556926
      })
      res.json({
        success: true,
        token: "Bearer " +  token
      });
  }
 
  } catch (error) {
    console.log(error)
  }
});
router.post("/updateimageuser/:id", upload.any(),(async (req, res) => {
try {
    //check image
    const images=[];
  for(let i=0;i<req.files.length;i++){
      images.unshift(req.files[i].filename)
  } 
  const user= await User.findById(req.params.id)
    user.Image = await user.Image.concat(images);
      res.status(200).json(await user.save());
 
} catch (error) {
 console.log(error) 
}
  
}));
//update profile user
router.post("/updateuser/:id",(async(req,res)=>{
try {
  const {Address,Phone,DOB,Status}=req.body;
  const { errors, isValid } = validatorprofile(req.body);
  if (!isValid) return res.status(400).json(errors);
  let user=await User.findById(req.params.id)
    user.Address=await Address;
    user.Phone=await Phone;
    user.DOB=await DOB;
    user.Status=await Status;
    user.Date=await Date.now
      res.status(200).json(await user.save())
} catch (error) {
  console.log(error)
}
}))
///preview user
router.get('/previewuser/:id',(async (req,res)=>{
  try {
    res.status(200).json(await User.findById(req.params.id))
  } catch (error) {
    console.log(error)
  }
    
}))
//delete user
router.delete('/deleteuser/:id',(req,res)=>{
  User.findByIdAndDelete(req.params.id).then((user)=>{
    res.status(200).json(user);
  })
})
//view all user
router.get('/alluser',(req,res)=>{
  User.find().then((user)=>{
    res.status(200).json(user)
  }).catch(console.log)
})
module.exports = router;
