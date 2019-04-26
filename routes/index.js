const  Router = require('koa-router');
const router = new Router();
const token = require('../help/token');
const login = require('../controller/login');
const register = require('../controller/register');
const signOut = require('../controller/signOut');
const getUserInfo = require('../controller/getUserInfo');

router.post('/login', login);
router.post('/register', register);
router.get('/signOut', signOut);
router.post('/getUserInfo', token.checkToken, getUserInfo);
// 微博相关
router.use('/wb', require('./wb.js'))

module.exports = router;