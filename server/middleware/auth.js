
const User = require("../models/user");

async function requireAuth(req, res, next) {
  try {
    const userId = req.session.userId; // or from cookie/token
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: "Auth error" });
  }
}

module.exports = { requireAuth };
