const 
	path = require('path'),
	express = require('express'),
	utils = require('./utils'),
	session = require('express-session');
	app = express();

app.use(express.static('client'));
app.use(session({
	secret: 'vavara',
	resave: false,
	saveUninitialized: true,
}));

app.use(express.json());

app.get('/list', (req, res) => {
	if (req.session.isLogin) {
		const fileList = utils.readFileAll();
		res.json(fileList)
	} else {
		res.redirect('/');
	}
})

app.post('/notepad', (req, res) => {
	if (req.session.isLogin) {
		const isSuccess = utils.postFile(req.body.title, req.body.text);
		res.json({success: isSuccess, title: req.body.title, text: req.body.text})
	} else {
		res.redirect('/');
	}
});

app.put('/notepad', (req, res) => {
	if (req.session.isLogin) {
		const isSuccess = utils.putFile(req.body.oldTitle, req.body.title, req.body.text);
		res.json({success: isSuccess, title: req.body.title, text: req.body.text})
	}
});

app.post('/userdata', (req, res) => {
	if (req.session.isLogin) {
		const data = req.body;
		const isSuccess = utils.saveUserdata(data.userId, data.tabs, data.selectedTab, data.cursor);
		res.json({success: isSuccess});
	}
});

app.get('/userdata', (req, res) => {
	if (req.session.userId) {
		const data = utils.readUserData(req.session.userId)
		if (data) {
			res.json({
				tabs: data[0],
				selectedTab: data[1],
				cursor: data[2],
				success: true
			})
		} else {
			res.json({success: false, isLogin: false});
		}
	} else {
		res.json({success: false, isLogin: false})
	}
})

app.post('/login', (req, res) => {
	const user = utils.login(req.body.userId, req.body.password);
	if (user.isLogin) {
		res.cookie('sessionId', req.session.id);
		res.cookie('isLogin', user.isLogin);
		res.cookie('userId', user.userId);
		res.cookie('nickname', user.nickname);
		req.session.userId = user.userId;
		req.session.isLogin = true;
		res.json({
			isLogin: user.isLogin,
			userId: user.userId || 'error',
			username: user.nickname
		})
	} else {
		res.json({ isLogin: false })
	}
});

app.post('/logout', (req, res) => {
	req.session.destroy();
	res.cookie('isLogin', false);
	res.cookie('nickname', 'undefined');
	res.json({
		result: true,
	});
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(8080, () => {
	console.log('Server started!');
});
