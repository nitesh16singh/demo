import express from 'express';
import path from 'path';
// import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import MongoConnect from 'connect-mongo';
import mongoose from 'mongoose';
import busboy from 'connect-busboy';
import  multer  from 'multer';
// custome Module 

import users from './routes/users';
import newsFeedPosts from './routes/newsFeedPosts';
import newsFeedPostsComment from './routes/newsFeedPostsComment'
import social from './routes/social-login';
import uploadimages from './routes/upload'
import settings from './config/oauth';

// MongoDb Connection 

const MongoStore = MongoConnect(session);
mongoose.connect(settings.dbUrl + settings.dbName);

// creating instance of server 
const app = express();
const port = process.env.PORT || settings.PORT|| '1337';
// use for testing database 

app.engine('html', require('ejs').renderFile);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboy());
app.use(busboy({ immediate: true }));



// Creating Session for further Use
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(passport.initialize());
app.use(passport.session());
// require module for password validation
// app.use(multer({ dest: './uploads/',filename:(fieldname, filename) =>  {
//     // console.log("fieldname"+ fieldname);
//     // console.log("filename"+ filename);
//     return filename.replace(/\W+/g, '-').toLowerCase()
//   }}).any());
require("./auth");

app.use('/auth', social);
app.use('/', users);
app.use('/', newsFeedPosts);
app.use('/', newsFeedPostsComment);
app.use('/', uploadimages);
app.use(express.static(__dirname + '/apidoc'));
app.use(express.static(__dirname + '/uploads'));
app.get("/apidoc",(req,res) => {
    res.sendFile(path.join(__dirname, '/apidoc', 'index.html'));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render(err);
});


// server  listen on port 
app.listen(port, () => {
  console.log('Server running at port  '  +  port)
});

//forever start -c "node -r babel-register" ./server.js

