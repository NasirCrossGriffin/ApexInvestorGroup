express = require('express')
const router = express.Router()
dotenv = require("dotenv").config();
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin.js')



router.post('/new', async (req, res) => {
    if (req.body.key !== process.env.ADMIN_KEY) res.status(403)

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const protoAdmin = new Admin({
        username : req.body.username,
        password : hash
    });

    try {
        const newAdmin = await protoAdmin.save();
        res.status(200).json(newAdmin);
    } catch(err) {
        console.log(err)
        res.status(500)
    }
});

router.post('/login', async (req, res) => {
    try {
        const foundAdmin = await Admin.findOne({username : req.body.username})

        if (foundAdmin === null) res.status(400);

        const match = await bcrypt.compare(req.body.password, foundAdmin.password);

        console.log(match);

        if (!match) {
            res.status(400);
            return;
        }

        // Set session
        req.session.adminId = foundAdmin._id.toString();
        req.session.username = foundAdmin.username;

        return res.status(200).json({
        message: "Login successful",
        admin: { _id: foundAdmin._id, username: foundAdmin.username },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Login failed" });
    }
});

router.post('/check', async (req, res) => {
    try {
        const adminId = req.session.adminId;

        console.log(adminId);

        if (!adminId) {res.status(400).json("Admin verification failed"); return;}

        const verifyAdmin = await Admin.findOne({_id : adminId});

        if (!verifyAdmin) {res.status(400).json("Admin verification failed"); return;}

        console.log("Verification Successful")

        res.status(200).json("Admin verification passed"); return;
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Admin verification failed" });
    }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });

    // clear cookie
    res.clearCookie("trinity_portfolio");
    return res.status(200).json({ message: "Logged out" });
  });
});


module.exports = router