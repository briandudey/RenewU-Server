const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', {
	session: false,
	failWithError: true
});

router.get('/', (req, res) => {
	res.send('It Works');
});

//Landing page is handled by client side but will leave this here if I have time to add additional functionality
router.get('/LandingPage', (req, res) => {
	res.send('Landing Page');
});

//For testing only, will remove once app is in prod
router.get('/api', (req, res) => {
	res.send('Now I am working');
});

//video list stored server side
router.get('/api/watch', (req, res) => {
	const videos = [
		'https://ia800300.us.archive.org/13/items/meditation_techniques/meditation_techniques.mp4',
		'https://ia800201.us.archive.org/23/items/BuddhaQuotes/Buddha%20Quotes.mp4',
		'https://ia800100.us.archive.org/3/items/WhatIsMeditationVideoMeditationLifeSkills/What%20Is%20Meditation%20Video%20-%20Meditation%20Life%20Skills.mp4',
		'https://ia801907.us.archive.org/29/items/Can_Science_and_Spirituality_Co-exist/Can_Science_and_Spirituality_Co-exist.mpeg4',
		'https://ia800202.us.archive.org/6/items/TheChurchOfOprahExposed/TheChurchOfOprahExposed_512kb.mp4',
		'https://ia801206.us.archive.org/17/items/MeditationAndTheBrain_201609/Meditation%20and%20the%20Brain.mp4'
	];
	res.json(videos);
});

//reading list stored server side - this is an extended feature
router.get('/api/read', (req, res) => {
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

//meditation playlist stored server side - Needs more tracks with photos and quotes.
router.get('/api/meditation', (req, res) => {
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

router.get('/api/userwatchID', jwtAuth, (req, res, next) => {
	const userId = req.user._id;

	User.findById(userId)
		.select('userId userWatchID')
		.then(result => {
			if (result) {
				res.json(result);
			} else {
				next();
			}
		})
		.catch(next);
});

router.post('/api/userwatchID', jwtAuth, (req, res, next) => {
	const { userWatchID } = req.body;
	const userId = req.user._id;
	console.log(req.user._id);
	const updateItem = { userWatchID };

	if (mongoose.Types.ObjectId.isValid(userId)) {
		updateItem.userWatchID = userWatchID;
	}

	User.findByIdAndUpdate(userId, updateItem)
		.select('userId userWatchID')
		// .populate('userWatchID')
		.then(result => {
			if (result) {
				res.json(result);
			} else {
				next();
			}
		})
		.catch(next);
});

// working on the logic to store a userWatchId that informs the video player what video it should start at and updates the userWatchId as the user progresses. Really need help with this.
// router.get('/api/watch', (res, res) => {
// 	let userWatchID = userWatchId;
// 	if (userWatchID === videoIndex) {
// 		play video
// 	}
// 	else if (userWatchID !== videoIndex) {
// 		change videoIndex to match userWatchID
// 	}
// 	else (userWatchID > videoIndex.length) {
// 		alert('You have reached the end of the videos. Return soon to discover more learning opportunities.')
// 	}
// })

// router.put('/api/watch', (req, res) => {
// 	if (videIndex is greater than 0) {
// 		change the userWatchId to the videoIndex
// 	}
// })

module.exports = router;
