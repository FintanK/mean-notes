var Note = require('./models/note');

// Our Notes REST API

function getNotes(res){
	Note.find(function(err, notes) {

			if (err) {
				res.send(err);
			}

			res.json(notes);
		});
};

module.exports = function(app) {

	app.get('/api/notes', function(req, res) {
		getNotes(res);
	});


	app.post('/api/notes', function(req, res) {

		Note.create({
			text : req.body.text,
			done : false
		}, function(err, note) {
			if (err)
				res.send(err);

			getNotes(res);
		});

	});

	app.delete('/api/notes/:note_id', function(req, res) {
		Note.remove({
			_id : req.params.note_id
		}, function(err, note) {
			if (err)
				res.send(err);

			getNotes(res);
		});
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};