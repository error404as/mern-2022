const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();
const User = require('../models/User');

// /api/auth +
router.post('/register', [
        check('email', 'invalid email').isEmail(),
        check('password', 'min password length is 6').isLength({min: 6}),
    ], async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: 'incorrect data' });
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({message: 'user exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({message: 'user created'});
    } catch (error) {
        res.status(500).json({message: 'try again'});
    }
});
router.post('/login', [
        check('email', 'invalid email').normalizeEmail().isEmail(),
        check('password', 'password is null').exists(),
    ], async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: 'incorrect entry data' });
        }

        const {email, password} = req.body;

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'user not exists'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'incorrect password'});
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );
        res.json({ token, userId: user.id });

    } catch (error) {
        res.status(500).json({message: 'try again'});
    }
});


module.exports = router;

