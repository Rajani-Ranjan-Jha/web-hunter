const express = require('express')
const router = express.Router()

const { CreateWeb, ReadWeb, UpdateWeb, DeleteWeb, SearchWeb } = require('../controllers/webController')
const {checkForToken, ensureAuthenticated} = require('../middlewares/auth')


//CRUD: Create Read Update Delete Operation
//ADMIN Routes
router.post('/web',ensureAuthenticated, CreateWeb)
router.put('/web/:id', UpdateWeb)
router.delete('/web/:id', DeleteWeb)




//User Routes
router.get('/web', ReadWeb)
// router.get('/web/search', SearchWeb)
// Search by name [ /web/search?name=someName use this to search]



module.exports = router
