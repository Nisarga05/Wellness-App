const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, signupUser, loginUser, getProfile} = require('../controllers/authController')

//middleware
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)
router.get('/', test)

router.post('/signup', signupUser)
router.post('/login' , loginUser) 
router.get('/profile', getProfile)
router.post("/publish", async (req, res) => {
  try {
    const { title, description, date, duration } = req.body;

    const session = new Session({
      title,
      description,
      date,
      duration,
      user: req.user ? req.user._id : null, // temp if no auth
    });

    await session.save();
    res.json({ message: "Session published", session });
  } catch (err) {
    console.error("❌ Session publish error:", err);
    res.status(400).json({ error: "Failed to publish session" });
  }
});

module.exports = router