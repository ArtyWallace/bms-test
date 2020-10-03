const { Router } = require("express");
const User = require("../models/User");

const router = Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find({ ...req.query });
        res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        throw err;
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        throw err;
    }
});

module.exports = router;