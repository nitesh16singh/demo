import authConfig from '../config/oauth'
import passport from 'passport'
import express from 'express';
const router = express.Router();


/**
* @api {get} /auth/facebook login with Facebook
* @apiName LoginWithFacebook
* @apiGroup User
*
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*    
*    {
    "_id" : "bfyd3ozzMkBMaYi2j",
    "createdAt" : ISODate("2016-12-13T08:51:54.865Z"),
    "services" : {
        "password" : {
            "bcrypt" : "$2a$10$goCwJEBWWz.WGtXwq2pJcOZA0a.Bj0zpV3QzlYmT2annfHRln1KS."
        },
        "resume" : {
            "loginTokens" : [
                {
                    "when" : ISODate("2016-12-13T08:51:55.071Z"),
                    "hashedToken" : "qa7ypOUFHkH8iB5qzbwuLb+S5tQEqsc79VP/bqv/2jU="
                }
            ]
        }
    },
    "emails" : [
        {
            "address" : "nitesh16.singh@gmail.com",
            "verified" : false
        }
    ],
    "secure" : {
        "smsCode" : "",
        "numberVerify" : "",
        "passwordResetToken" : "",
        "activationToken" : "057b4802e89d21e54712"
    },
    "metadata" : {
        "smsVerified" : "",
        "isActivated" : true
    },
    "connections" : {
        "connected" : [ ],
        "blocked" : [ ],
        "following" : [ ]
    },
    "workspaces" : [ ],
    "notifications" : [ ],
    "pinned" : [ ],
    "settings" : {
        "phonePublic" : true,
        "emailPublic" : true,
        "addressPublic" : true,
        "profilePrivate" : false,
        "deactivated" : false
    },
    "profile" : {
        "firstName" : "Nitesh",
        "lastName" : "Singh",
        "fullName" : "Nitesh Singh",
        "company" : "",
        "searchEmail" : "nitesh16.singhemailAtgmail.com",
        "title" : "",
        "phoneNumber" : "",
        "streetAddress" : "",
        "city" : "",
        "state" : "",
        "zip" : "",
        "webAddress" : "",
        "profileImage" : "https://smf.imgix.net/profilePhotos/defaultUser.png",
        "linkedInProfileUrl" : "",
        "facebookProfileUrl" : "",
        "twitterProfileUrl" : "",
        "subscription" : null
    },
    "status" : {
        "online" : true,
        "lastLogin" : {
            "date" : ISODate("2016-12-13T08:51:56.741Z"),
            "ipAddr" : "127.0.0.1",
            "userAgent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.100 Safari/537.36"
        },
        "idle" : false
    }
  }
*
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 400 Not Found
*     {
*       message :'Login Unsuccessful'
*     }
*
*/
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',(req,res,next) => {
    passport.authenticate('facebook',(error,user) => {
        if(error) {
            return res.status(400).send({'message':'Login Unsuccessful'});
        } else {
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                    return;
            });
            return res.status(200).send(user);

        }
    })(req, res, next);
})


// router.get('/instagram', passport.authenticate('instagram'));
// router.get('/instagram/callback', passport.authenticate('instagram', {
//     successRedirect: '/app',
//     failureRedirect: '/'
// }))

// router.get('/google', passport.authenticate('google'));
// router.get('/google/callback', passport.authenticate('google', {
//     successRedirect: '/app',
//     failureRedirect: '/'
// }))

// router.get('/github', passport.authenticate('github'));
// router.get('/github/callback', passport.authenticate('github', {
//     successRedirect: '/app',
//     failureRedirect: '/'
// }))

// router.get('/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));
// router.get('/linkedin/callback', passport.authenticate('linkedin', {
//     successRedirect: '/app',
//     failureRedirect: '/'
// }))

// router.get('/twitter', passport.authenticate('twitter'));
// router.get('/twitter/callback', passport.authenticate('twitter', {
//     successRedirect: '/app',
//     failureRedirect: '/'
// }))

export default router
