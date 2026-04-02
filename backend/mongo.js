const { OAuth2Client } = require("google-auth-library");
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();
//we use above because
// if i write mongoose.connect("mongodb+srv://username:password@cluster.mongodb.net/myapp")
// If you write this directly in code → password gets exposed
// If you push to GitHub → anyone can see it ❌
//thus using it  loads .env variables into:process.env

const app=express();
//CORS is a browser security feature that controls which frontends are allowed to access your backend APIs.
app.use(cors({  origin: [
    "http://localhost:5173",
    "https://vi-notes-mernstack-login-vercel-ren.vercel.app"
  ],}));//Only  React app can access backend
//HTTP only sends text (string) or binary
// Reads incoming request
// Checks header:Content-Type: application/json
// Parses JSON string
// Converts into JS object
app.use(express.json());
//mongoose is a library that helps Node.js talk to MongoDB in a structured way
mongoose.connect(process.env.MONGO_URI)//"mongodb://localhost:27017/mydb"
.then(()=>console.log("DB connected"))
.catch(err=>console.log(err));

const UserSchema=new mongoose.Schema({
    email:{type:String,unique: true},
    password:String,
        name:String,
    picture:String,
    isGoogleUser:Boolean
});

const verifier=mongoose.model("User",UserSchema);

const client = new OAuth2Client(process.env.client_id);
app.post("/auth/google",async (req,res)=>{
const {token}=req.body;

try{
const ticket=await client.verifyIdToken({
    idToken:token,
    audience:process.env.client_id
})
const payload=ticket.getPayload();
const {email,name,picture}=payload;
let user=await verifier.findOne({email});
if(!user){
    
     user = await verifier.create({
    email,
    name,
    picture,
    isGoogleUser: true
  });

}
    const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );
   return res.json({
        success:true,
        token
    })


}catch(err){
    console.error("GOOGLE AUTH ERROR:", err); 
res.status(500).json({success:false,message:"Server error"})
}
})
app.post("/login",async (req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    

    try{
        const user=await verifier.findOne({email});

        if(!user){
            return res.json({success:false,message:"No email found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false ,message:"Invalid password"});
    }
//payload(who you are)+secretkey(security)+validity
//JWT is what keeps a user “logged in” across multiple requests
//Without JWT, your app cannot remember the user across requests, making authentication incomplete or inefficient.
        const token = jwt.sign(
      { userId: user._id },
   process.env.JWT_SECRET,  
      { expiresIn: "1h" }
    );

    return res.json({ success: true, token });
    }catch(err){
       return res.status(500).json({error:err})
    }
})
app.post("/register",async (req,res)=>{
  

      console.log(req.body);
    const {email,password}=req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
    try{
          const user=await verifier.findOne({email});
 if(user){
            res.json({success:false,message:"User already registered"});
            const user2 = await verifier.find({});
console.log(user2);

        }else{
          
        await verifier.create({email,password:hashedPassword});
        
        const user2=await verifier.findOne({email});

        if(user2){
            res.json({success:true});
        }else{
            res.json({success:false,message:"Error in registering"});
        }
    }
    }
    catch(err){
        res.status(500).json({error:err})
    }
})
app.get("/", (req, res) => {
  res.send("Backend is running");
});
const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})