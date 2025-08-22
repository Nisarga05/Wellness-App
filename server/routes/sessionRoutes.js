const express = require("express");
const Session = require("../models/sessions");


const router = express.Router();

// ✅ Public wellness sessions
router.get("/sessions", async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

// User's own sessions (draft + published)
router.get("/my-sessions", async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});
// ✅ Single session
router.get("/my-sessions/:id", async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch session" });
  }
});

// ✅ Save draft session
router.post("/my-sessions/save-draft", async (req, res) => {
  try {
    const { title, description, date, duration } = req.body;
    const session = new Session({ title, description, date, duration });
    await session.save();
    res.json({ message: "Draft session saved", session });
  } catch (err) {
    res.status(400).json({ error: "Failed to save draft" });
  }
});

// ✅ Publish session
router.post("/my-sessions/publish", async (req, res) => {
  try {
    const { title, description, date, duration } = req.body;
    const session = new Session({ title, description, date, duration });
    await session.save();
    res.json({ message: "Session published", session });
  } catch (err) {
    res.status(400).json({ error: "Failed to publish session" });
  }
});



router.put("/sessions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { title, description, date, duration } = req.body;

    // ✅ Convert date string into a Date object if it exists
    if (date) {
      date = new Date(date);
    }

    // ✅ Ensure duration is a number
    if (duration) {
      duration = Number(duration);
    }

    const updated = await Session.findByIdAndUpdate(
      id,
      { title, description, date, duration },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ message: "Session updated successfully", session: updated });
  } catch (err) {
    console.error("Error updating session:", err.message);
    res.status(500).json({ error: err.message }); // ✅ show real error
  }
});


module.exports = router;
