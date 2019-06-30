const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));

app.post('/api/challenge', (req, res, next) => {
	console.log(`Recieved a request at /api/challenge`);
	console.log(JSON.stringify(req.body));
	return res.status(200).send({ "challenge": req.body.challenge });
});

app.set('SERVER_PORT', process.env.SERVER_PORT || 3000);
app.listen(app.get('SERVER_PORT'), () => {
	console.log(`[app] Server running on port ${app.get('SERVER_PORT')}`);
});