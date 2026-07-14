function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    return res.status(401).json({ error: 'יש להתחבר למערכת' });
}

function requireAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.roleId === 2) {
        return next();
    }
    if (!req.session || !req.session.user) {
        return res.status(401).json({ error: 'יש להתחבר למערכת' });
    }
    return res.status(403).json({ error: 'אין הרשאות מנהל לביצוע פעולה זו' });
}

module.exports = { requireAuth, requireAdmin };
