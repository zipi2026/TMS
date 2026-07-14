const express = require('express');
const router = express.Router();
const { getUsers, addUser, deleteUser } = require('./../utils/usersUtils');
const { requireAuth, requireAdmin } = require('./../middleware/authMiddleware');

// All user routes require authentication AND admin role
router.use(requireAuth);
router.use(requireAdmin);

router.get('/getusers', async function (req, res) {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        console.error('Get users error:', err);
        res.status(500).json({ error: 'שגיאה בטעינת משתמשים' });
    }
});

router.post('/adduser', async function (req, res) {
    try {
        const user = req.body;
        if (!user.userName || !user.password) {
            return res.status(400).json({ error: 'יש להזין שם משתמש וסיסמה' });
        }
        await addUser(user);
        res.json({ success: true });
    } catch (err) {
        console.error('Add user error:', err);
        res.status(500).json({ error: 'שגיאה בהוספת משתמש' });
    }
});

router.delete('/deleteuser', async function (req, res) {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: 'חסר מזהה משתמש' });
        }
        await deleteUser(Number(userId));
        res.json({ success: true });
    } catch (err) {
        console.error('Delete user error:', err);
        res.status(500).json({ error: 'שגיאה במחיקת משתמש' });
    }
});

module.exports = router;
