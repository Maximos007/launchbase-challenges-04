const fs = require('fs');
const data = require('./data.json');

module.exports = {
  
	create(req, res) {
		const keys = Object.keys(req.body);

		// eslint-disable-next-line no-undef
		for (key of keys) {
			// eslint-disable-next-line no-undef
			if(req.body[key] == '')
      
				return res.send('Please, fill all fields!');
		}
    
		let { avatar_url, name, birth, education, class_type, services } = req.body;

		birth = Date.parse(birth);
		const created_at = Date.now();
		const id = Number(data.teachers.length + 1);

		data.teachers.push({
			id,
			avatar_url,
			name,
			birth,
			education,
			class_type,
			services,
			created_at,
		});

		fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
			if (err) return res.send('Write file error!');

			return res.redirect('/teachers');
		});

	},

};