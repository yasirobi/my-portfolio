const User = require('../models/User')
const JWT = require('jsonwebtoken')
const { hashPassword, comparePassword } = require('../helpers/hashedPassword');



exports.register = async(req,res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        //validations
        if (!name) {
          return res.send({ error: "Name is Required" });
        }
        if (!email) {
          return res.send({ message: "Email is Required" });
        }
        if (!password) {
          return res.send({ message: "Password is Required" });
        }
        if (!phone) {
          return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
          return res.send({ message: "Address is Required" });
        }
        // if (!answer) {
        //   return res.send({ message: "Answer is Required" });
        // }
        //check user
        const exisitingUser = await User.findOne({ email });
        //exisiting user
        if (exisitingUser) {
          return res.status(200).send({
            success: false,
            message: "Already Register please login",
          });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new User({
          name,
          email,
          phone,
          address,
          password: hashedPassword,
        
        }).save();
    
        res.status(201).send({
          success: true,
          message: "User Register Successfully",
          user,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Errro in Registeration",
          error,
        });
      }
}


exports.signin = async (req,res) => {
    const { email, password } = req.body;
    try {
        //fields validation
        if(!email || !password) return res.status(401).send({
            success:false,
            message:'invalid email and password'
        })
        //check a user
        const user = await User.findOne({email})
        if(!user) return res.status(400).send({
            success:false,
            message:'user is not register'
        })
        //check the match password for login
        const match = await comparePassword(password, user.password,)
        if(!match) return res.status(402).send({
            success:false,
            message:'not a valid user for login'
        })
        //authanticate the user with jwt token
        const token = await JWT.sign({_id: user.id}, process.env.JWT_SECRET, {expiresIn : process.env.EXPIRES_IN}) 
        res.status(200).send({
            success:true,
            message:'you are successfully logged in',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token

        })
    } catch (error) {
        res.status(500).send({
          success:false,
          message: "Errro in login",
          error
        })
        
    }
}