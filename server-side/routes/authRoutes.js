const express = require('express')
const router = express.Router()
const {loginAdmin, logoutAdmin } = require('../controllers/authController')
const {ensureAuthenticated} = require('../middlewares/auth')
// const { verifyToken } = require('../middlewares/authMiddleware')


// router.get('/admin', verifyAdmin)

// router.post('/admin', createAdmin)

router.post('/login', loginAdmin)

router.post('/logout',ensureAuthenticated, logoutAdmin)

module.exports = router 
