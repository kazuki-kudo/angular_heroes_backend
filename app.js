var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var server = app.listen(3000, function () {
    console.log("Node.js is listening to PORT:" + server.address().port);
});

var heroes = {
    11: 'Mr. Nice',
    12: 'Narco',
    13: 'Bombasto',
    14: 'Celeritas',
    15: 'Magneta',
    16: 'RubberMan',
    17: 'Dynama',
    18: 'Dr IQ',
    19: 'Magma',
    20: 'Tornado'
};


/** 全件取得 */
app.get("/api/hero/", function (req, res, next) {
    res.json(heroes);
});

/** 一件取得 */
app.get("/api/hero/:id", function (req, res, next) {
    var name = heroes[req.params.id];
    if (name) {
        res.status(200).send('{' + req.params.id + ':"' + name + '"}');
    } else {
        res.status(404).send('id ' + req.params.id + ' not exist');
    }

});

/** 削除 */
app.delete("/api/hero/:id", function (req, res, next) {
    var name = heroes[req.params.id];
    if (name) {
        delete heroes[req.params.id];
        res.status(200).send('{' + req.params.id + ':"' + name + '"}');
    } else {
        res.status(404).send('id ' + req.params.id + ' not exist');
    }

});

/** 追加 */
app.post("/api/hero/", function (req, res, next) {
    var id = req.body.id;
    var name = req.body.name;
    if (id && name) {
        heroes[id] = name;
        res.json(req.body);
    } else {
        res.status(400).json(req.body);
    }
});

/** 更新 */
app.put("/api/hero/:id", function (req, res, next) {
    var name = heroes[req.params.id];
    if (name) {
        heroes[req.params.id] = req.body.name;
        res.status(200).send('{' + req.params.id + ':"' + req.body.name + '"}');
    } else {
        res.status(404).send('id ' + req.params.id + ' not exist');
    }

});