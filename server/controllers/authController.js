const User = require('../models/user')
const{ hashPassword, comparePassword} = require('../helpers/auth')
const jwt  = require('jsonwebtoken')

const test =(req,res)=>{
    res.json('test is working')
}
//signup user
const signupUser = async (req, res) =>{
  try{
    const {name, email, password}= req.body;
    //check name was entered
    if(!name){ 
        return res.json({
            error: 'name is required'
        })
    };
    //check for password
    if(!password|| password.length < 6){
        return res.json({
            error: "password is required and should be at least 6 characters long"
        })
    }
    //check for email
    const exist = await User.findOne({email});
    if(exist){
        return res.json({
            error : 'Email is taken already'
        })
    }
    const hashedPassword = await hashPassword(password)
    const user = await User.create({
        name,
        email,
        password : hashedPassword,
    })
    return res.json(user)
  }catch(error){
    console.log(error)
  }
}

//loginuser
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: 'No user found' });
    }

    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: 'Invalid password' });
    }

    // ✅ create token
    jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;

        // ✅ set cookie and send success response
        res.cookie('token', token, {
          httpOnly: true,
          secure: false, // set true in production
          sameSite: "lax"
        }).json({
          message: "Login successful",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getProfile = async (req, res) => {
  const { token } = req.cookies || {};

  if (!token) return res.json(null);

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.error("JWT verify error:", err.message);
      return res.status(401).json({ error: "Invalid token" });
    }

    try {
      // Fetch user from DB without password
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(404).json({ error: "User not found" });

      res.json(user);
    } catch (dbError) {
      console.error("DB error:", dbError.message);
      res.status(500).json({ error: "Database error" });
    }
  });
};





module.exports = {
    test,
    signupUser,
    loginUser,
    getProfile
}
