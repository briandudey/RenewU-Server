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
		{
			title: 'Meditation for Beginners',
			link:
				'https://www.youtube.com/watch?v=n4fRZU5oEMI&list=PLOnR7vw-tP-nwzKo1gmcs90qYLFDfiaKJ'
		},
		{
			title: 'How to Meditate',
			link:
				'https://www.youtube.com/watch?v=0q-tc9SGuD4&list=PLOnR7vw-tP-nwzKo1gmcs90qYLFDfiaKJ&index=12'
		},
		{
			title: 'Walking Meditation',
			link: 'https://www.youtube.com/watch?v=7t70V__bnds'
		},
		{
			title: 'Mindfulness TED Talk',
			link: 'https://www.youtube.com/watch?v=qzR62JJCMBQ'
		}
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
