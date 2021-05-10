const fs = require('fs');
const data = require('./data.json');

module.exports = {
  
	save(req, res) {
		const keys = Object.keys(req.body);

		for(key of keys) {
			if(req.body[key] == '')
      
				return res.send('Please, fill all fields!');
		}
    
		let { avatar_url, name, birth, category, services } = req.body;

		birth = new Date(birth);
		const created_at = new Date();
		const id = Number(data.instructors.length + 1);

		data.instructors.push({
			id,
			name,
			avatar_url,
			birth,
			services,
			category,
			created_at,
		});

		fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
			if (err) return res.send('Write file error!');

			return res.redirect('/instructors');
		});

	},
};