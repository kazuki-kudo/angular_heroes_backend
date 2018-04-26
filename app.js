var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());



// CORSを許可する
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

    next();
});

var server = app.listen(3000, function () {
    console.log("Node.js is listening to PORT:" + server.address().port);
});

heroes = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
];


/** 全件取得 */
app.get("/api/heroes/", function (req, res, next) {
    console.log('GET /api/heroes/');
    res.json(heroes);
});

/** 一件取得 */
app.get("/api/heroes/:id", function (req, res, next) {
    console.log('GET /api/heroes/' + req.params.id);
    let i = getIndex(req.params.id);
    if (i != -1) {
        res.json(heroes[i]);
        return;
    }
    res.status(404).send('id ' + req.params.id + ' not exist');
});

/** 削除 */
app.delete("/api/heroes/:id", function (req, res, next) {
    console.log('DELETE /api/heroes/' + req.params.id);
    let i = getIndex(req.params.id);
    if (i != -1) {
        res.json(heroes[i]);
        heroes.splice(i, 1);
        return;
    }
    res.status(404).send('id ' + req.params.id + ' not exist');
});

/** 追加 */
app.post("/api/heroes/", function (req, res, next) {
    console.log('POST /api/heroes/' + req.params.id);

    var id = req.body.id;
    var name = req.body.name;
    if (id && name) {
        let i = getIndex(id);
        if (i != -1) {
            res.status(400).send('id ' + id + ' duplicate');
            return;
        }
        heroes.push(req.body);
        res.json(req.body);
    } else {
        res.status(400).json(req.body);
    }
});

/** 更新 */
app.put("/api/heroes/", function (req, res, next) {
    console.log('PUT /api/heroes/' + req.body.id);
    let i = getIndex(req.body.id);
    if (i != -1) {
        heroes[i] = req.body;
        res.json(req.body);
        return;
    }
    res.status(404).send('id ' + req.body.id + ' not exist');
});


function getIndex(id) {
    for (var i = 0; i < heroes.length; i++) {
        if (heroes[i].id == id) {
            return i;
        }
    }
    return -1;
}

/** ログインユーザ情報取得 */
app.get("/api/loginuser", function (req, res, next) {
    console.log('GET /api/loginuser/');
    let username = req.get('oidc_claim_preferred_username');

    if(!username) { username = 'no user'}
    let jsonFormat = {"id":username};
    res.json(jsonFormat);
});
