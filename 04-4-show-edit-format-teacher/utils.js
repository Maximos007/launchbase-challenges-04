module.exports = {
	age: function (timestamp) {
		const today = new Date();
		const birthDay = new Date(timestamp);

		let age = today.getYear() - birthDay.getYear();
		const month = today.getMonth() - birthDay.getMonth();

		if (month < 0 || month ==0 && today.getDate() < birthDay.getDate()) {
			age -= 1;
		}

		return age;
	},

	graduation: function (education) {
		return	(education == 'medio') ? 'Ensino Médio Completo'
			: (education == 'superior') ? 'Ensino Superior Completo'
				: (education == 'mestrado') ? 'Mestrado'
					: 'Doutorado';

	},

	date: function (timestamp) {
		const date = new Date(timestamp);
		const year = date.getUTCFullYear();
		const month = `0${date.getUTCMonth() + 1}`.slice(-2);
		const day = `0${date.getUTCDay()}`.slice(-2);

		return `${year}-${month}-${day}`;
	}
};