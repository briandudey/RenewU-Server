const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const keys = require('./keys');
const mongoose = require('mongoose');
const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const auth = require('./routes/auth');
const app = express();

// app.put('/api/watch', (req, res) => {
// 	let userWatchIndex;
// 	if (req.body.userIndex) {
// 		userIndex++;
// 	}
// 	console.log(userIndex);
// });
//Passport Config
require('./config/passport')(passport);
//load routes

app.use(
	morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
		skip: (req, res) => process.env.NODE_ENV === 'test'
	})
);

app.use('/auth', auth);

app.use(
	cors({
		origin: CLIENT_ORIGIN
	})
);

app.get('/api', (req, res) => {
	res.send('Now I am working');
});

app.get('/api/watch', (req, res) => {
	const videos = [
		'https://ia800300.us.archive.org/13/items/meditation_techniques/meditation_techniques.mp4',
		'https://ia801408.us.archive.org/7/items/Nycmasseur-Meditation928/Nycmasseur-Meditation928.mp4',
		'https://ia800100.us.archive.org/3/items/WhatIsMeditationVideoMeditationLifeSkills/What%20Is%20Meditation%20Video%20-%20Meditation%20Life%20Skills.mp4',
		'https://ia801206.us.archive.org/17/items/MeditationAndTheBrain_201609/Meditation%20and%20the%20Brain.mp4'
	];
	res.json(videos);
});

app.get('/api/read', (req, res) => {
	const readings = [
		'https://www.dhammatalks.org/Archive/Writings/EachAndEveryBreath_v130123.pdf',
		'http://soundstrue-media.s3.amazonaws.com/pdf/K1250D_Meditation%20for%20Beginners%20web%20sample.pdf',
		'http://www.buddhanet.net/pdf_file/chanmed1.pdf',
		'https://www.tarabrach.com/wp-content/uploads/pdf/how-to-meditate.pdf',
		'https://www.wisdompubs.org/sites/default/files/preview/How%20To%20Meditate%20Book%20Preview.pdf',
		'https://alifeofproductivity.com/wp-content/uploads/2013/05/Meditation-Guide.pdf',
		'http://milesneale.com/pdf/6Preliminaries.pdf',
		'http://www.ahandfulofleaves.org/documents/The%20Origin%20of%20Buddhist%20Meditation_Alexande%20Wynne.pdf',
		'http://www.shambhala.com/images/illus/buddha_is_still_teaching_meditations.pdf'
	];
	res.json(readings);
});

app.get('/api/meditation', (req, res) => {
	const playlist = [
		{
			url:
				'https://ia800801.us.archive.org/8/items/RelaxingMeditation/Relaxing%20Meditation.mp3',
			cover: 'https://i.ytimg.com/vi/9SZhVXmnXtU/maxresdefault.jpg',
			title: 'Relaxing Meditation',
			artist: [
				'Your mind will answer most questions if you learn to relax and wait for the answer.',
				'William S. Borough'
			]
		},
		{
			url:
				'https://ia801600.us.archive.org/7/items/GratitudeMeditation_299/Gratitude.mp3',
			cover:
				'http://www.wisdomofspringrolls.co.za/wp-content/uploads/2016/07/gratitude-inspiration.jpg',
			title: 'Gratitude Meditation',
			artist: [
				'The essence of all beautiful art, all great art, is gratitude',
				'Friedrich Nietzsche'
			]
		}
	];
	res.json(playlist);
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
