const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { WebClient } = require('@slack/web-api');


app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));

app.post('/api/events', (req, res, next) => {
	return res.status(200).send({ "challenge": req.body.challenge });
});

app.get('/', (req, res, next) => {
	if (req.query.code) {
		const result = await(new WebClient()).oauth.access({
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			code: req.query.code
		});
		console.log(JSON.stringify(result));
	}
	app.use(express.static(path.join(__dirname, 'public')));
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.set('SERVER_PORT', process.env.PORT || 3000);
app.listen(app.get('SERVER_PORT'), () => {
	console.log(`[app] Server running on port ${app.get('SERVER_PORT')}`);
});