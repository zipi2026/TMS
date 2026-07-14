const express = require('express');
const router = express.Router();
const { checkLogin } = require('./../utils/authUtils');

router.post('/check-login', async function (req, res) {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ error: 'יש להזין שם משתמש וסיסמה' });
        }

        const user = await checkLogin(userName, password);

        if (!user) {
            return res.status(401).json({ error: 'שם משתמש או סיסמה שגויים' });
        }

        // Save user in session
        req.session.user = {
            userId: user.userId,
            userName: user.userName,
            email: user.email,
            phone: user.phone,
            roleId: user.roleId
        };

        return res.json(req.session.user);
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'שגיאת שרת' });
    }
});

router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            return res.status(500).json({ error: 'שגיאה בהתנתקות' });
        }
        res.clearCookie('connect.sid');
        return res.json({ success: true });
    });
});

router.get('/session', function (req, res) {
    if (req.session && req.session.user) {
        return res.json(req.session.user);
    }
    return res.status(401).json({ error: 'לא מחובר' });
});

module.exports = router;
