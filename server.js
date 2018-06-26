//made by chenyi 2018-06-21

let express = require('express');
let router = express.Router();

let port = process.env.PORT || 8888;
let app = express();

app.use(express.static('./'));

app.use(router);

router.get('/', function(req, res, next) {
	console.log(port)
});

app.listen(port, () => {
    console.log(`服务已成功启动，端口: ${port}`);
});