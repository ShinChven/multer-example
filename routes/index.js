var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

var upload = require('./fileupload');

router.post('/upload', upload('/your/directory/', '/upload.file').single('file'), function (req, res, next) {

    console.log(req.file);
    res.json(req.file);

});

module.exports = router;
