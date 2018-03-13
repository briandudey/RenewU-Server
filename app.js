const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const app = express();

app.use(
	morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
		skip: (req, res) => process.env.NODE_ENV === 'test'
	})
);

app.use(
	cors({
		origin: CLIENT_ORIGIN
	})
);

app.get('/api/watch', (req, res) => {
	const videos = [
		'https://ia800300.us.archive.org/13/items/meditation_techniques/meditation_techniques.mp4',
		'https://ia801408.us.archive.org/7/items/Nycmasseur-Meditation928/Nycmasseur-Meditation928.mp4',
		'https://ia800100.us.archive.org/3/items/WhatIsMeditationVideoMeditationLifeSkills/What%20Is%20Meditation%20Video%20-%20Meditation%20Life%20Skills.mp4',
		'https://ia801206.us.archive.org/17/items/MeditationAndTheBrain_201609/Meditation%20and%20the%20Brain.mp4'
	];
	res.json(videos);
});

function runServer(port = PORT) {
	const server = app
		.listen(port, () => {
			console.info(`App listening on port ${server.address().port}`);
		})
		.on('error', err => {
			console.error('Express failed to start');
			console.error(err);
		});
}

if (require.main === module) {
	dbConnect();
	runServer();
}

module.exports = { app };
