var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds047682.mongolab.com:47682/listacontato', ['listacontato']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json());

app.get('/listacontato', function(req, res){
	console.log("Eu recebi a requesicao GET")

	db.listacontato.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});

});

app.post('/listacontato', function (req, res){
	console.log(req.body);
	db.listacontato.insert(req.body, function(err, doc) {
		res.json(doc);
	})
});

app.delete('/listacontato/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	db.listacontato.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	})
});

app.get('/listacontato/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	db.listacontato.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	});
});

app.put('/listacontato/:id', function (req, res){
	var id = req.params.id;
	console.log(req.body.nome);
	db.listacontato.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update:{$set: {nome: req.body.nome, email: req.body.email, numero: req.body.numero}},
		new: true}, function (err, doc){
			res.json(doc);
		});
});

app.listen(process.env.PORT || 80);
//console.log("Server rodando na porta 3000");