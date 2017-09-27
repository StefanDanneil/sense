const models = require('./models');

module.exports = function(){
	models.user.create({
		userName : 'stefanKarlsson',
		password : 'hejhej',
		email : 'karlssonstefan88@gmail.com'
	})

	models.device.create({
		location: 'garderoben',
		name: 'StefansDevice',
		password: 'ndm1',
		userId: 1
	})

	models.device.create({
		location: 'hemma',
		name: 'StefansAndraDevice',
		password: 'ndm234',
		userId: 1
	})

	models.measureType.create({
		name: 'Temperature'
	});

	models.measureType.create({
		name: 'Humidity'
	});

	models.measure.create({
		value: 0.5,
		measureTypeId: 1,
		deviceId: 1
	})

	models.measure.create({
		value: 24.5,
		measureTypeId: 1,
		deviceId: 1
	})

	models.measure.create({
		value: 100023.1,
		measureTypeId: 1,
		deviceId: 1
	})

	models.measure.create({
		value: 23.1,
		measureTypeId: 1,
		deviceId: 2
	})

	models.user.create({
		userName : 'natalieWahlstrom',
		password : 'hejhej2',
		email : 'natalie.wahlstrom@gmail.com'
	})

	models.device.create({
		location: 'blommorna',
		name: 'NataliesDevice',
		password: 'ndm1',
		userId: 2
	})

	models.device.create({
		location: 'balkongen',
		name: 'NataliesAndraDevice',
		password: 'ndm234',
		userId: 2
	})

	models.measure.create({
		value: 22.5,
		measureTypeId: 1,
		deviceId: 3
	})

	models.measure.create({
		value: 24.5,
		measureTypeId: 1,
		deviceId: 3
	})

	models.measure.create({
		value: 23.1,
		measureTypeId: 1,
		deviceId: 3
	})

	models.measure.create({
		value: 23.1,
		measureTypeId: 1,
		deviceId: 4
	})
}