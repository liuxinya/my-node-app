const  Router = require('koa-router');
const router = new Router();
const login = require('../controller/login');
const register = require('../controller/register');
router.post('/login',login)
router.post('/register', register)

module.exports = router;