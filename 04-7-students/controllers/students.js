const fs = require('fs');
const data = require('../data.json');
const { grade, date, formatHours } = require('../utils');

module.exports = {

	index(req, res) {

		return res.render('students/index', { students: data.students });
	},

	create(req, res) {
		return res.render('students/create');
	},

	post(req, res) {
		const keys = Object.keys(req.body);

		// eslint-disable-next-line no-undef
		for (key of keys) {
			// eslint-disable-next-line no-undef
			if(req.body[key] == '')
      
				return res.send('Please, fill all fields!');
		}
    
		// eslint-disable-next-line no-undef
		birth = Date.parse(req.body.birth);
		// eslint-disable-next-line no-undef
		weekly_classes = Number(req.body.weekly_classes);
		let id = 1;
		
		const lastStudent = data.students[data.students.length - 1];
		if(lastStudent) {
			id = lastStudent.id +1;
		}

		data.students.push({
			...req.body,
			id,
			// eslint-disable-next-line no-undef
			birth,
			// eslint-disable-next-line no-undef
			weekly_classes
		});

		fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
			if (err) return res.send('Write file error!');

			return res.redirect('/students');
			// return res.send('was successfully created'); // /students
		});

	},

	show(req, res) {

		const { id } = req.params;

		const foundStudent = data.students.find(student => {
			return student.id == id;
		});

		if(!foundStudent) return res.send('Student not found!');

		const students = {
			...foundStudent,
			birth: date(foundStudent.birth).birthDay,
			education: grade(foundStudent.education),
			weekly_classes: formatHours(foundStudent.weekly_classes)
		};

		return res.render('students/show', { students });
	},

	edit(req, res) {

		const { id } = req.params;

		const foundStudent = data.students.find(student => {
			return student.id == id;
		});

		if(!foundStudent) return res.send('Student not found!');

		const students = {
			...foundStudent,
			birth: date(foundStudent.birth).iso
		};

		return res.render('students/edit', { students });
	},

	put(req, res) {
		const { id } = req.body;
		let index;

		const foundStudent = data.students.find((student, foundIndex) => {
			if(student.id == id) {
				index = foundIndex;

				return true;
			}
		});

		if(!foundStudent) return res.send('Student not found!');

		const students = { 
			...foundStudent,
			...req.body,
			id:  Number(id),
			birth: Date.parse(req.body.birth),
			weekly_classes: Number(req.body.weekly_classes)
		};

		data.students[index] = students;

		fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
			if(err) return res.send('Write error!');

			// return res.redirect(`/students/${id}`);
			return res.send('Success!');
		});
	},

	delete(req, res) {
		const { id } = req.body;

		const filteredStudents = data.students.filter((students) => {
			return students.id != id;
		});

		data.students = filteredStudents;

		fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
			if (err) return res.send('Write error!');

			return res.send('successfully deleted');
			// return res.redirect('/students');
		});
	}
};