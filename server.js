const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 4000;

// -------Controllers---------//

const ctrl = require('./controllers');

//----------------------------------------middleware------------------------------//

//helmet first protect headers//
app.use(helmet());

// express session config//
app.use(session({
    secret: process.env.SESSION_SECRET || 'absolutely anything here',
    resave: false,
    saveUninitialized: false,
}));

// bodyparser //
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors // 

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


//---------------------------------HTML Endpoints-------------------------//

//get root route
app.get('/', (req, res) => res.send('<h1>WayFarer Api</h1>'));

//----------------------------------------api endpoints------------------------------//

// auth routes
app.use('/api/v1/auth', ctrl.auth);

//users route
app.use('/api/v1/users', ctrl.users);

//post Routes
app.use('/api/v1/posts', ctrl.posts);

//--------start server------//

app.listen(PORT, () => console.log(`server started on port ${PORT}`));