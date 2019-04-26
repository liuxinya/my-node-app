const  Router = require('koa-router');
const router = new Router();
const token = require('../help/token');
const wb = require('../controller/wb');

router.post('/write',token.checkToken, wb.write);

router.get('/typeList/', wb.getTypeList);

router.get('/list/:id', wb.getWbList);

router.get('/delete', token.checkToken, wb.deleteWb);

module.exports = router.routes();