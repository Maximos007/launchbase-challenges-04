const express = require('express');
const routes = express.Router();
const teachers = require('./teachers');

routes.get('/', (req, res) => {
	return res.redirect('/instructors');
});

routes.get('/instructors', (req, res) => {
	return res.render('instructors/index');
});

routes.get('/instructors/create', (req, res) => {
	return res.render('instructors/create');
});

routes.post('/instructors', teachers.save);

routes.get('/members', (req, res) => {
	return res.send('members');
});

module.exports = routes;