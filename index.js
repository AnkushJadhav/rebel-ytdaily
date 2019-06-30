const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));

app.post('/api/events', (req, res, next) => {
	return res.status(200).send({ "challenge": req.body.challenge });
});

app.get('/', (req, res, next) => {
	app.use(express.static(path.join(__dirname, 'public')));
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.set('SERVER_PORT', process.env.PORT || 3000);
app.listen(app.get('SERVER_PORT'), () => {
	console.log(`[app] Server running on port ${app.get('SERVER_PORT')}`);
});